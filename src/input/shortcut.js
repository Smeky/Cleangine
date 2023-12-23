
import { EventDispatcher } from 'three'

/**
 * @event trigger - Shortcut is triggered
 */
export class Shortcut extends EventDispatcher {
    static Type = {
        Key: 'key',
        Mouse: 'mouse',
    }

    /**
     * 
     * @param {Object} options - Options for the shortcut
     * @param {String} options.key - Required key to be pressed for the shortcut to be activated.
     * @param {String} [options.type] - Type of the shortcut. Default is Shortcut.Type.Key.
     * @param {String} [options.secondaryKey] - Optional secondary key to be pressed with the primary key. 
     * @param {Function} [options.onTrigger] - Optional callback function to be called when the shortcut is triggered.
     */
    constructor(options = { type: Shortcut.Type.Key }) {
        if (!options.key) throw new Error('Shortcut requires a key!')

        super()

        this.options = options
        this.isPressed = false

        this.key = options.key
        this.type = options.type ?? Shortcut.Type.Key
        this.secondaryKey = options.secondaryKey ?? null

        if (options.onTrigger) 
            this.addEventListener('trigger', options.onTrigger)
    }
}
