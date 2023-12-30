import { camelToKebab } from '../utils/string/cambel-to-kebab'
import { createSimpleIdGenerator } from '../utils/id'
import { Entity } from './entity'
import { SystemModule } from '../core/system-module'
import Systems from './systems'

function getMissingSystems(systems, names) {
    return systems.reduce((acc, system) => {
        const missing = system.dependencies.filter(dependency => !names.includes(dependency))
        if (missing.length > 0) acc[system.type] = missing
        return acc
    }, {})
}

/**
 * Todo: Systems should be added dynamically by the ecs based on what components are present in the 
 * active entities. This way, we don't have to manually add systems to the ecs.
 * 
 * Todo: System should have a list of component names that it requires. If an entity doesn't have all of
 * the required components, the system should not be added to the ecs.
 * 
 * Todo: Systems should have a list of entities that have the system's component. This way, we don't have
 * to loop through all entities to find the ones that have the system's component.
 * 
 */

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
        this.entities = []
        this.systems = {}
        this.activeSystems = []

        // Add common systems
        Object.entries(Systems).forEach(([name, system]) => {
            this.addSystem({ name, class: system })
        })
    }

    dispose() {
        this.entities.forEach(entity => entity.destroy())
        this.entities = []

        this.activeSystems.forEach(system => system.dispose())
        this.activeSystems = []

        this.systems = {}
    }

    update(delta, time) {
        // Remove destroyed entities
        this.entities = this.entities.filter(entity => {
            if (entity.destroyed) {
                this.activeSystems
                    .filter(system => entity.hasComponent(system.name))
                    .forEach(system => system.destroyComponent(entity.components[system.name], entity))
                
                return false
            }

            return true
        })

        this.activeSystems.forEach(system => {
            // This can be optimized by only looping through entities that have the system's component
            // instead of looping through all entities. This can be done by keeping a list of entities
            // that have the system's component inside the system itself.
            this.entities
                .filter(entity => entity.hasComponent(system.name))
                .forEach(entity => {
                    system.updateEntity(entity, delta, time)
                })
        })
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

        const system = new options.class({ engine: this.engine, ecs: this })
        system.name = camelToKebab(options.name)

        this.systems[system.name] = system

        return system
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

        return system
    }

    deactivateSystem(system) {
        const index = this.activeSystems.indexOf(system)
        if (index === -1) return

        this.activeSystems.splice(index, 1)
    }

    /**
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

            // Add missing systems to the active systems list
            newlyActive.push(
                // Activate missing systems 
                ...missing.map(name => this.activateSystem(this.systems[name]))
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
     * 
     * @param {Array | Object<string, Object | true>} componentsList A list of components to add to the entity or an object with the component name as the key and the object as the component options. If the value is true, the component will be created by the system.
     * @returns {Entity} The created entity
     */
    createEntity(componentsList = []) {
        const names = Array.isArray(componentsList) ? componentsList : Object.keys(componentsList)
        
        this.ensureSystems(names)

        // Setup entity components
        const components = names.reduce((acc, name) => {
            const system = this.systems[name]
            const options = componentsList[name] ?? {}

            acc[name] = system.createComponent(options)

            return acc
        }, {})

        // Create entity
        const entity = new Entity()
        entity.setup(this.idGenerator(), components)

        this.entities.push(entity)
        return entity
    }
}
