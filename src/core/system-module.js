
/**
 * @abstract
 * @class SystemModule
 * @classdesc Base class for all system modules.
 */
export class SystemModule {
    constructor() {
        if (arguments.length)
            throw new Error('SystemModule constructor does not accept arguments. Use the init() method instead.')
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
     * @param {Number} delta 
     * @param {Number} time 
     */
    update(delta, time) {}
}
