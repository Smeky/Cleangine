import { Object3D, Vector3 } from 'three'

/**
 * Todo: UI Element should not extend Object3D but rather be an event emitter with .object or mesh property
 * 
 */

/**
 * UIElement is a base class for all UI elements
 * 
 */
export default class UIElement extends Object3D {
    static InteractiveEvents = ['click', 'cursorenter', 'cursorleave', 'hover', 'focus', 'blur']
    
    constructor(ui, options = {}) {
        super()

        // Todo: decorate addEventListener and removeEventListener to add/remove from ui.interactiveElements

        this.ui = ui
        this.options = options
        this.styles = {}
        this.mesh = null
        this.shortcut = null
        this.isInteractive = false
        this.isHovered = false
        this.isFocused = false

        this._relativePosition = new Vector3(0, 0, 0)

        // Save the original addEventListener and removeEventListener methods
        const _addEventListener = this.addEventListener.bind(this)
        const _removeEventListener = this.removeEventListener.bind(this)

        // Decorate the addEventListener and removeEventListener methods
        this.addEventListener = (type, listener, options) => {
            _addEventListener(type, listener, options)

        if (UIElement.InteractiveEvents.includes(type)) {
                this.ui.setElementInteractive(this, true)
            }
        }

        this.removeEventListener = (type, listener, options) => {
            _removeEventListener(type, listener, options)
            
            if (UIElement.InteractiveEvents.includes(type)) {
                this.ui.setElementInteractive(this, false)
            }
        }
    }
    
    get relativePosition() { return this._relativePosition }
    set relativePosition(_) {
        throw new Error('UIElement.relativePosition is read-only. Use UIElement.setRelativePosition instead.')
    }
    setRelativePosition(relPosition) { 
        this._relativePosition.copy(relPosition)
        this.position.copy(this.ui.getRelativePosition(this._relativePosition)) 
    }

    dispose() {}

    setMesh(mesh) {
        this.mesh = mesh
        this.add(mesh)
    }

    getMesh() {
        return this.mesh
    }

    /**
     * 
     * @param {Function} useStyle useStyle function returned by defineStyle
     * @param {Object} [options] Optional options to pass to the style
     */
    addStyle(useStyle, options = {}) {
        const style = useStyle(this, options)
        this.styles[style.name] = style

        style.add()

        return this
    }

    setShortcut(shortcut) {
        if (this.shortcut)
            this.shortcut.removeEventListener('trigger', this.onShortcutTrigger)

        this.shortcut = shortcut
        this.shortcut.addEventListener('trigger', this.onShortcutTrigger)

        return this
    }

    onShortcutTrigger = (event) => {
        this.dispatchEvent({ type: 'click', event })
    }
}
