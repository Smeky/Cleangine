
/**
 * @abstract
 * @class SystemModule
 * @classdesc Base class for all system modules.
 */
export class SystemModule {
    static name = 'unnamed-system-module'

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
     * @param {Number} delta 
     * @param {Number} time 
     */
    update(delta, time) {}
}
