import EventEmitter3 from 'eventemitter3'

/**
 * @class EventEmitter
 * @classdesc An interface for EventEmitter3 that is compatible with Three.js and DOM events.
 * @extends EventEmitter3
 */
export class EventEmitter extends EventEmitter3 {
    addEventListener() { this.on(...arguments) }
    removeEventListener() { this.off(...arguments) }

    dispatchEvent(event) {
        this.emit(event.type, event)
    }
}

