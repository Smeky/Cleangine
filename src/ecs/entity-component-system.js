
import { Entity } from './entity'
import { createSimpleIdGenerator } from '../utils/id'
import { SystemModule } from '../core/system-module'

function getMissingSystems(systems, types) {
    return systems.reduce((acc, system) => {
        const missing = system.dependencies.filter(dependency => !types.includes(dependency))
        if (missing.length > 0) acc[system.type] = missing
        return acc
    }, {})
}

/**
 * Todo: Systems should be added dynamically by the ecs based on what components are present in the 
 * active entities. This way, we don't have to manually add systems to the ecs.
 * 
 * Todo: System should have a list of component types that it requires. If an entity doesn't have all of
 * the required components, the system should not be added to the ecs.
 * 
 * Todo: Systems should have a list of entities that have the system's component. This way, we don't have
 * to loop through all entities to find the ones that have the system's component.
 * 
 */

export class EntityComponentSystem extends SystemModule {
    init() {
        this.idGenerator = createSimpleIdGenerator()
        this.entities = []
        this.systems = []
        this.activeSystems = []
    }

    dispose() {

    }

    update(delta, time) {
        // Remove destroyed entities
        this.entities = this.entities.filter(entity => {
            if (entity.destroyed) {
                this.activeSystems
                    .filter(system => entity.hasComponent(system.type))
                    .forEach(system => system.destroyComponent(entity.components[system.type], entity))
                
                return false
            }

            return true
        })

        this.activeSystems.forEach(system => {
            // This can be optimized by only looping through entities that have the system's component
            // instead of looping through all entities. This can be done by keeping a list of entities
            // that have the system's component inside the system itself.
            this.entities
                .filter(entity => entity.hasComponent(system.type))
                .forEach(entity => {
                    system.updateEntity(entity, delta, time)
                })
        })
    }

    registerSystems(systems) {
        this.systems = systems
    }

    addSystem(type) {
        if (this.activeSystems.find(system => system.type === type))
            throw new Error(`System for component type "${type}" already exists.`)

        if (!this.systems.hasOwnProperty(type)) 
            throw new Error(`System for component type "${type}" not found.`)

        const system = this.systems[type]({ ecs: this })
        this.activeSystems.push(system)

        return system
    }
    
    removeSystem(system) {
        const index = this.activeSystems.indexOf(system)
        if (index === -1) return

        this.activeSystems.splice(index, 1)
        system.dispose()
    }

    ensureSystems(types) {
        const systems = this.activeSystems.filter(system => types.some(key => system.type === key))

        // In case some systems are missing, initialize them
        if (systems.length < types.length) {
            systems.push(...types
                .filter(type => !systems.find(system => system.type === type))
                .map(type => this.addSystem(type))
            )
        }

        return systems
    }

    /**
     * 
     * @param {Array | Object<string, Object | true>} componentsList A list of components to add to the entity or an object with the component name as the key and the object as the component options. If the value is true, the component will be created by the system.
     * @returns {Entity} The created entity
     */
    createEntity(componentsList = []) {
        const types = Array.isArray(componentsList) ? componentsList : Object.keys(componentsList)
        const systems = this.ensureSystems(types)

        // Setup entity components
        const components = types.reduce((acc, type) => {
            const system = systems.find(system => system.type === type)
            const options = componentsList[type] ?? {}

            acc[type] = system.createComponent(options)

            return acc
        }, {})

        // Get systems and their respective missing dependencies
        const missingDeps = getMissingSystems(systems, types)

        if (Object.keys(missingDeps).length > 0) {
            console.error('Failed to create entity:')

            for (const [key, missing] of Object.entries(missingDeps)) {
                console.error(`System for component "${key}" is missing required component: ${missing.join(', ')}`)
            }

            return null
        }

        // Create entity
        const entity = new Entity()
        entity.setup(this.idGenerator(), components)

        this.entities.push(entity)
        return entity
    }
}
