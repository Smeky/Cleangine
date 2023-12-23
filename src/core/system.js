import { SystemBase } from "./system-base"

/**
 * @class System class that can be used to create a system. 
 * @classdesc Additional value of this class is that it automatically calls init(), dispose() and update() methods of all modules.
 */
export class System extends SystemBase {
    /**
     * Initializes the system modules
     */
    init() {
        this.modulesList.forEach(module => module.init())
    }

    /**
     * Disposes the system modules
     */
    dispose() {
        this.modulesList.forEach(module => module.dispose())
        this.modulesList = []
        this.modules = {}
    }

    /**
     * Updates the system modules
     * @param {Number} delta 
     * @param {Number} time 
     */
    update(delta, time) {
        this.modulesList.forEach(module => module.update(delta, time))
    }
}
