import { SystemBase } from '../core/system-base.js'
import { ShortcutHandler } from './shortcut-handler.js'

const setRelativeCursorPosition = (position, cursorX, cursorY, windowWidth, windowHeight) => {
    position.x = (cursorX / windowWidth) * 2 - 1
    position.y = - (cursorY / windowHeight) * 2 + 1
}

/**
 * @event cursor:move - Fired when the cursor moves
 * @event cursor:click - Fired when the cursor is clicked
 * @event key:down - Fired when a key is pressed
 * @event key:up - Fired when a key is released
 */
export class InputManager extends SystemBase {
    init(engine) {
        this.engine = engine
        this.shortcuts = new ShortcutHandler(this.engine)
        this.cursor = {
            position: { x: 0, y: 0 },
            relativePosition: { x: 0, y: 0 },
            isPressed: false,
            button: 0,
        }

        window.addEventListener('mousemove', this.onCursorMove)
        window.addEventListener('mousedown', this.onCursorDown)
        window.addEventListener('mouseup', this.onCursorUp)
        window.addEventListener('click', this.onClick)
        
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('keyup', this.onKeyUp)
    }

    dispose() {
        window.removeEventListener('mousemove', this.onCursorMove)
        window.removeEventListener('mousedown', this.onCursorDown)
        window.removeEventListener('mouseup', this.onCursorUp)
        window.removeEventListener('click', this.onClick)

        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    }

    onCursorMove = (event) => {
        this.cursor.position.x = event.clientX
        this.cursor.position.y = event.clientY

        const { graphics } = this.engine
        setRelativeCursorPosition(this.cursor.relativePosition, event.clientX, event.clientY, graphics.canvasWidth, graphics.canvasHeight)

        this.dispatchEvent({ type: 'cursor:move', cursor: this.cursor })
    }

    onCursorDown = (event) => {
        this.cursor.isPressed = true
        this.cursor.button = event.button
    }

    onCursorUp = (event) => {
        this.cursor.isPressed = false
        this.cursor.button = event.button
    }

    onClick = () => {
        this.dispatchEvent({ type: 'cursor:click', cursor: this.cursor })
    }

    onKeyDown = (event) => {
        // Todo: transform event into a custom event 

        this.dispatchEvent({ type: 'key:down', key: event.key })
        this.shortcuts.onKeyDown(event)
    }

    onKeyUp = (event) => {
        this.dispatchEvent({ type: 'key:up', key: event.key })
        this.shortcuts.onKeyUp(event)
    }
}