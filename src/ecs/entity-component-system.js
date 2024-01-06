import { camelToKebab } from '../utils/string/cambel-to-kebab'
import { createSimpleIdGenerator } from '../utils/id'
import { Entity } from './entity'
import { Quadtree } from './quadtree'
import { SystemModule } from '../core/system-module'
import Systems from './systems'

/**
 * @class EntityComponentSystem represents an entity-component-system.
 * 
 * @property {Entity[]} entities The list of entities.
 * @property {Object<string, EntitySystem>} systems The list of registered systems.
 * @property {EntitySystem[]} activeSystems The list of currently active systems based on the active entities' components.
 */
export class EntityComponentSystem extends SystemModule {
    init(engine) {
        this.engine = engine
        this.idGenerator = createSimpleIdGenerator()
        this.systems = {}
        this.quadtree = new Quadtree(this)
        this.activeSystems = []
        this.toRemoveEntities = []

        this.addSystems(Systems)
    }

    dispose() {
        this.entities.forEach(entity => entity.destroy())
        this.entities = []

        this.activeSystems.forEach(system => {
            system.forEach(entity => system.destroyComponent(entity.components[system.name], entity))
            system.dispose()
        })

        this.systems = {}
        this.activeSystems = []
    }

    update(delta, time) {
        this.activeSystems
            .filter(system => !system.isUpdateDisabled)
            .forEach(system => system.update(delta, time))
    
        this.flushRemovedEntities() // Must be called after all systems have updated for several reasons
    }

    /**
     * @param {object} options System definition options
     * @param {string} options.name The name of the system
     * @param {EntitySystem} options.class The system class to instantiate and add to the ecs.
     * @returns {EntitySystem} The added system.
     */
    addSystem(options) {
        console.assert(options.name, 'System name is undefined.')
        console.assert(options.class, 'System class is undefined.')

        const system = new options.class({ 
            name: camelToKebab(options.name),
            ecs: this,
            engine: this.engine, 
        })

        this.systems[system.name] = system

        return system
    }

    /**
     * Adds multiple systems.
     * 
     * @param {Object<string, object>} systems A map of system options with the system name as the key.
     */
    addSystems(systems) {
        Object.entries(systems).forEach(([name, system]) => {
            this.addSystem({ name, class: system })
        })
    }
    
    removeSystem(system) {
        const index = this.activeSystems.indexOf(system)
        if (index === -1) return

        this.activeSystems.splice(index, 1)
        system.dispose()
    }

    activateSystem(system) {
        if (this.activeSystems.includes(system))
            return system

        this.activeSystems.push(system)
        system.init()

        return system
    }

    deactivateSystem(system) {
        const index = this.activeSystems.indexOf(system)
        if (index === -1) return

        system.dispose()

        this.activeSystems.splice(index, 1)
    }

    /**
     * Ensures that the systems exist and are active.
     * 
     * @param {string[]} names A list of system names to ensure that they exist
     * @returns {Object<string, EntitySystem>} A map of systems with the system name as the key.
     */
    ensureSystems(names) {
        const active = this.activeSystems.filter(system => names.some(key => system.name === key))
        const newlyActive = []

        // Activate missing systems
        if (active.length !== names.length) {
            const missing = names.filter(name => !active.find(system => system.name === name))
            const missingSystems = missing.map(name => this.systems[name])

            // Throw error if system does not exist
            missingSystems.forEach((system, index) => {
                if (!system)
                    throw new Error(`System "${names[index]}" does not exist.`)
            })

            // Add missing systems to the active systems list
            newlyActive.push(
                // Activate missing systems 
                ...missingSystems.map(system => this.activateSystem(system))
            )

            active.push(...newlyActive)
        }

        // Ensure dependencies are active. Dependencies should be activated before the system that depends on them.
        // If that doesn't happen in the code above, then it means that the system is missing a dependency.
        newlyActive.forEach(system => {
            if (system.dependencies.some(dependency => !active.find(system => system.name === dependency))) {
                throw new Error(`System "${system.name}" is missing required dependencies: ${system.dependencies.join(', ')}`)
            }
        })

        return active.reduce((acc, system) => { acc[system.name] = system; return acc }, {})
    }

    /**
     * Distributes an entity to its systems based on its components so that the systems can operate on the entity.
     * 
     * @param {Entity} entity The entity to distribute to its systems.
     * @returns {void}
     */
    distributeEntityToSystems(entity) {
        const names = Object.keys(entity.components)
        const systems = this.activeSystems.filter(system => names.includes(system.name))

        systems.forEach(system => system.addEntity(entity))
    }

    /**
     * 
     * @param {Array | Object<string, Object | true>} componentsList A list of components to add to the entity or an object with the component name as the key and the object as the component options. If the value is true, the component will be created by the system.
     * @returns {Entity} The created entity
     */
    createEntity(componentsList = []) {
        // Create entity
        const entity = new Entity()
        const components = this.createEntityComponents(entity, componentsList)

        entity.setComponents(components)
        entity.on('destroy', () => this.markEntityForRemoval(entity))

        this.distributeEntityToSystems(entity)
        this.setupEntity(entity)

        return entity
    }

    /**
     * Creates components for an entity.
     * 
     * @param {Entity} entity The entity to create components for.
     * @param {Array | Object<string, Object | true>} componentsList A list of components to add to the entity or an object with the component name as the key and the object as the component options. If the value is true, the component will be created by the system.
     * @returns {Object<string, EntityComponent>} The created components map.
     */
    createEntityComponents(entity, componentsList = []) {
        const names = Array.isArray(componentsList) ? componentsList : Object.keys(componentsList)

        // Ensure every component has respective system
        this.ensureSystems(names)

        return names.reduce((acc, name) => {
            const system = this.systems[name]
            const options = componentsList[name] ?? {}

            acc[name] = system.createComponent(options, entity)

            return acc
        }, {})
    }

    /**
     * Sets up an entity.
     * 
     * @param {Entity} entity The entity to set up.
    */
    setupEntity(entity) {
        const names = Object.keys(entity.components)
        const systems = this.activeSystems.filter(system => names.includes(system.name))

        entity.setup(this.idGenerator())
        systems.forEach(system => system.setupComponent(entity))
    }

    /**
     * Entities are removed at the end of update loop.
     * 
     * @param {Entity} entity The entity to remove.
     */
    markEntityForRemoval(entity) {
        this.toRemoveEntities.push(entity)
    }

    /**
     * Removes entities that have been marked for removal.
     */
    flushRemovedEntities() {
        this.toRemoveEntities.forEach(entity => {
            const names = Object.keys(entity.components)
            const systems = this.activeSystems.filter(system => names.includes(system.name))

            systems.forEach(system => {
                system.removeEntity(entity)
                system.destroyComponent(entity.components[system.name], entity)

                if (system.entities.length === 0) {
                    this.deactivateSystem(system)
                }
            })
        })

        this.toRemoveEntities = []
    }
}
