import EventEmitter from "eventemitter3"

/**
 * @class Entity represents a game object.
 * @extends EventEmitter
 * 
 * @property {string} id The unique id of the entity.
 * @property {boolean} active Whether the entity is active.
 * @property {boolean} destroyed Whether the entity is destroyed.
 * 
 * @emits destroy When the entity is destroyed.
 */
export class Entity extends EventEmitter {
    constructor() { 
        super() 
        
        this.components = []
    }

    setup(id) {
        // Initialization is in setup instead of constructor because the entity
        // can be reused, and the constructor is only called once.

        this.id = id
        this.active = true
        this.destroyed = false
    }

    destroy() {
        this.destroyed = true
        this.emit('destroy')
        this.removeAllListeners()
    }

    /**
     * @property {Object<string, EntityComponent>} components The map of components.
     */
    setComponents(components) {
        this.components = components
    }

    hasComponent(name) {
        return this.components.hasOwnProperty(name)
    }
}
