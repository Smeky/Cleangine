import { EntityComponentSystem } from './ecs/entity-component-system'
import { Graphics } from './graphics/index'
import { InputManager } from './input/input-manager'
import { Scene } from './core/scene'
import { TweensManager } from './core/tweens-manager'
import { UserInterface } from './ui/index'
import { SystemBase } from './core/system-base'
import { EventEmitter } from './core/eventemitter'

import { disposables } from './utils/disposables'

/**
 * @typedef {Object} ZenithOptions
 * @property {HTMLElement} container
 */
export const ZenithOptions = {
    container: document.body
}

/**
 * @class Zenith Engine
 * @classdesc The main class of the engine.
 * 
 * @event update - Fired every frame
 * @event update:before - Fired before the update
 * @event update:after - Fired after the update
 */
export class Zenith extends SystemBase {
    static get DeltaFactor() { return 1 / 1000 }

    constructor() {
        super()

        this.update = this.update.bind(this)

        this.isRunning = false
        this.lastFrameTime = 0
        this.delta = 0
        this.disposables = disposables()
    }

    /**
     * 
     * @param {ZenithOptions} options 
     */
    setup(options = {}) {
        this.options = {
            ...ZenithOptions,
            ...options
        }

        /** @type {EventEmitter} */
        this.events = new EventEmitter()
        /** @type {Scene} */
        this.scene = this.disposables.add(new Scene())
        
        /** @type {Graphics} */
        this.graphics = this.addModule(new Graphics())
        /** @type {InputManager} */
        this.input = this.addModule(new InputManager())
        /** @type {EntityComponentSystem} */
        this.ecs = this.addModule(new EntityComponentSystem())
        /** @type {UserInterface} */
        this.ui = this.addModule(new UserInterface())
        /** @type {TweensManager} */
        this.tweens = this.addModule(new TweensManager())

        this.modulesList.forEach(module => module.init(this))

        window.addEventListener('blur', this.onBlur, false)
        window.addEventListener('focus', this.onFocus, false)
    }

    dispose() {
        this.events.removeAllListeners()
        this.disposables.dispose()
    }

    start() {
        this.isRunning = true
        this.lastFrameTime = 0
        window.requestAnimationFrame(this.update)
    }

    stop() {
        this.isRunning = false
    }

    /**
     * 
     * @param {Number} time
     */
    update(time) {
        if (!this.isRunning) 
            return

        if (!this.lastFrameTime)
            this.lastFrameTime = time

        this.delta = (time - this.lastFrameTime) * Zenith.DeltaFactor
        this.lastFrameTime = time

        // Not needed atm
        // this.events.emit('update:before', this.delta, time)

        this.ecs.update(this.delta, time)
        this.scene.update(this.delta, time)
        this.tweens.update(this.delta, time)

        this.events.emit('update', this.delta, time)

        this.graphics.update(this.delta, time)
        this.ui.update(this.delta, time)

        // Not needed atm
        // this.events.emit('update:after', this.delta, time)

        window.requestAnimationFrame(this.update)
    }

    onBlur = () => this.stop()
    onFocus = () => this.start()
}
