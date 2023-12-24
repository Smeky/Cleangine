import EventEmitter from './event-emitter'
import { camelToKebab } from '../utils/string/cambel-to-kebab'

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
     * @param {SystemModule<T>} module - The module to add.
     * @param {number} [index=-1] - The index at which to add the module.
     * @throws {Error} If the module is already registered.
     * 
     * @returns {SystemModule<T>} The added module.
     * @template T - The class that extends SystemModule.
     */
    addModule(module, index = -1) {
        const name = camelToKebab(module.constructor.name)
        
        if (this.modules[name])
        throw new Error(`Module ${name} already registered`)
    
        // Todo: Can't this be done in the module constructor?
        module.module_name = name
        this.modules[name] = module

        if (index === -1)
            this.modulesList.push(module)
        else
            // Even though -1 should always add to the end, it doesn't atm. So we need to check for it.
            this.modulesList.splice(index, 0, module)

        return module
    }

    /**
     * Removes a module from the system.
     * @param {string} name - The name of the module to remove.
     * @throws {Error} If the module is not registered.
     */
    removeModule(name) {
        if (!this.modules[name])
            throw new Error(`Tried to remove module ${name} that is not registered`)

        const index = this.modulesList.findIndex(module => module.module_name === name)
        if (index !== -1) {
            this.modulesList.splice(index, 1)
        }
        delete this.modules[name]
    }
}
