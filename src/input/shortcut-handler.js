
import { SystemBase } from '../core/system-base'
import { Shortcut } from './shortcut'

/**
 * @typedef {Object} ShortcutsMap - Map of shortcuts by type and key
 * @property {Object.<string, Shortcut[]>} key - Map of shortcuts by key
 * @property {Object.<string, Shortcut[]>} mouse - Map of shortcuts by key
 */

export class ShortcutHandler extends SystemBase {
    constructor(engine) {
        super()

        this.engine = engine

        /**
         * @type {ShortcutsMap}
         */
        this.shortcutsMap = {
            [Shortcut.Type.Key]: {},
            [Shortcut.Type.Mouse]: {},
        }
    }

    dispose() {

    }

    loadFromData(data) {

    }
    
    saveToData() {

    }

    addShortcut(shortcut) {
        if (!(shortcut instanceof Shortcut)) throw new Error('ShortcutHandler.addShortcut requires a Shortcut instance!')

        const shortcuts = this.shortcutsMap[shortcut.type]

        if (!shortcuts[shortcut.key])
            shortcuts[shortcut.key] = []

        shortcuts[shortcut.key].push(shortcut)

        return shortcut
    }

    /**
     * 
     * @param {KeyboardEvent} event
     */
    onKeyDown = (event) => {
        const { key } = event

        const shortcuts = this.shortcutsMap[Shortcut.Type.Key][key] || []

        for (const shortcut of shortcuts) {
            shortcut.isPressed = true

            // Not needed at the moment
            // shortcut.dispatchEvent({ type: 'press', shortcut })
        }
    }

    /**
     * 
     * @param {KeyboardEvent} event
     */
    onKeyUp = (event) => {
        const { key } = event

        const shortcuts = this.shortcutsMap[Shortcut.Type.Key][key] || []

        for (const shortcut of shortcuts) {
            if (!shortcut.isPressed) continue

            shortcut.dispatchEvent({ type: 'trigger', shortcut })
            shortcut.isPressed = false
        }
    }

    onMouseDown = (event) => {
        console.warn('ShortcutHandler.onMouseDown not implemented yet')
    }

    onMouseUp = (event) => {
        console.warn('ShortcutHandler.onMouseUp not implemented yet')
    }
}
