import EventEmitter from './event-emitter'

/**
 * SystemBase class that extends EventEmitter. Holds a list of modules and provides methods for adding and removing them.
 * @class
 * @extends EventEmitter
 */
export class SystemBase extends EventEmitter {
    /**
     * Creates a new SystemBase instance.
     * @constructor
     */
    constructor() {
        super()

        /**
         * List of modules.
         * @type {Array}
         */
        this.modulesList = []

        /**
         * Object of modules.
         * @type {Object}
         */
        this.modules = {}
    }

    /**
     * Adds a module to the system.
     * @param {Object} module - The module to add.
     * @param {number} [index=-1] - The index at which to add the module.
     * @throws {Error} If the module does not have a name.
     * @throws {Error} If the module is already registered.
     */
    addModule(module, index = -1) {
        if (!module.constructor.name)
            throw new Error('Module must have a name')

        if (this.modules[module.constructor.name])
            throw new Error(`Module ${module.constructor.name} already registered`)

        this.modules[module.constructor.name] = module
        this.modulesList.splice(index, 0, module)
    }


    /**
     * Removes a module from the system.
     * @param {string} name - The name of the module to remove.
     * @throws {Error} If the module is not registered.
     */
    removeModule(name) {
        if (!this.modules[name])
            throw new Error(`Tried to remove module ${name} that is not registered`)

        const index = this.modulesList.findIndex(module => module.constructor.name === name)
        if (index !== -1) {
            this.modulesList.splice(index, 1)
        }
        delete this.modules[name]
    }
}
