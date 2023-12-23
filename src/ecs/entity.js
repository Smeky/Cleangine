import EventEmitter from "eventemitter3"

/**
 * @class Entity represents a game object.
 * @extends EventEmitter
 * 
 * @property {string} id The unique id of the entity.
 * 
 * @emits destroy When the entity is destroyed.
 */
export class Entity extends EventEmitter {
    constructor() { super() }

    setup(id, components) {
        // Initialization is in setup instead of constructor because the entity
        // can be reused, and the constructor is only called once.

        this.id = id
        this.active = true
        this.destroyed = false
        this.components = components
    }

    destroy() {
        this.destroyed = true
        this.emit('destroy')
        this.removeAllListeners()
    }

    hasComponent(name) {
        return this.components.hasOwnProperty(name)
    }
}
