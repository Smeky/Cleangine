
/**
 * @typedef { import('./entity.js').Entity } Entity
 * @typedef { import('./component.js').EntityComponent } EntityComponent
 */

/**
 * @class EntitySystem represents a system that operates on entities.
 * @classdesc EntitySystem is an abstract class.
 * 
 * @property {string} name The name of the component.
 * @property {EntityComponent[]} dependencies The dependency components for the system to operate on an entity.
 * 
 * @abstract
 */
export class EntitySystem {
    dependencies = []

    constructor({ name, ecs, engine }) {
        this.name = name
        this.ecs = ecs
        this.engine = engine
        this.entities = []

        this.isUpdateDisabled = false
    }

    /**
     * Adds an entity to the system.
     * 
     * @param {Entity} entity
     * @returns {void}
     */
    addEntity(entity) {
        this.entities.push(entity)
    }

    /**
     * Removes an entity from the system.
     *  
     * @param {Entity} entity
     * @returns {void}
    */
    removeEntity(entity) {
        this.entities = this.entities.filter(e => e !== entity)
    }

    /**
     * Updates the system's entities.
     * 
     * @param {number} delta
     * @param {number} time
     * @returns {void}
     */
    update(delta, time) {
        this.entities.forEach(entity => {
            this.updateEntity(entity, delta, time)
        })
    }

    /**
     * Disables the system's update on its entities.
     */
    disableUpdates() {
        this.isUpdateDisabled = true
    }

    /**
     * Enables the system's update on its entities.
     */
    enableUpdates() {
        this.isUpdateDisabled = false
    }

    /**
     * @abstract
     */
    init() {}

    /**
     * @abstract
     */
    dispose() {}

    /**
     * @abstract
     * 
     * @param {Object} options The options for the component.
     * @returns {Object} The component.
     */
    createComponent(options) {}

    /**
     * @abstract
     * 
     * @param {Object} component The component to destroy.
     * @param {Entity} entity The entity that owns the component.
     * @returns {void}
     */
    destroyComponent(component, entity) {}

    /**
     * @abstract
     * 
     * @param {Entity} entity 
     * @param {number} delta
     * @param {number} time
     */
    updateEntity(entity, delta, time) {}
}
