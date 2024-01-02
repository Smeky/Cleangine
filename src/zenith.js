import { AssetManager } from './assets/asset-manager'
import { EntityComponentSystem } from './ecs/entity-component-system'
import { EventEmitter } from './core/eventemitter'
import { Graphics2D } from './graphics/2d/graphics'
import { Graphics3D } from './graphics/3d/graphics'
import { InputManager } from './input/input-manager'
import { Scene } from './core/scene'
import { PerformanceModule } from './debug/performance'
import { SystemBase } from './core/system-base'
import { TweensManager } from './core/tweens-manager'
import { UserInterface } from './ui/user-interface'

/**
 * @typedef {Object} ZenithOptions
 * @property {HTMLElement} container
 * @property {String} mode - '2d' or '3d'. Default: '3d'
 */
export const ZenithOptions = {
    container: document.body,
    renderingMode: '3d',
    stopOnBlur: true,
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
        
        
        if (this.options.renderingMode === '3d') {
            /** @type {Graphics3D} */
            this.graphics = this.addModule(new Graphics3D())
        }
        else if (this.options.renderingMode === '2d') {
            /** @type {Graphics2D} */
            this.graphics = this.addModule(new Graphics2D())
        }
        else {
            throw new Error(`Invalid rendering mode: ${this.options.renderingMode}`)
        }

        /** @type {InputManager} */
        this.input = this.addModule(new InputManager())
        /** @type {EntityComponentSystem} */
        this.ecs = this.addModule(new EntityComponentSystem())
        /** @type {UserInterface} */
        // this.ui = this.addModule(new UserInterface())
        /** @type {TweensManager} */
        this.tweens = this.addModule(new TweensManager())
        /** @type {AssetManager} */
        this.assets = this.addModule(new AssetManager())

        this.debug = {
            performance: this.addModule(new PerformanceModule()),
        }

        /** @type {EventEmitter} */
        this.events = new EventEmitter()
        /** @type {Scene} */
        this.scene = this.graphics.createScene()

        // Initialize modules
        this.modulesList.forEach(module => module.init(this))

        if (this.options.stopOnBlur)
            this.enableStopOnBlur()
    }

    dispose() {
        this.events.removeAllListeners()
    }

    /**
     * Starts the engine's main loop.
     */
    start() {
        this.isRunning = true
        this.lastFrameTime = 0
        window.requestAnimationFrame(this.update)
    }

    /**
     * Stops the engine's main loop.
     */
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

        this.debug.performance.begin()

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
        // this.ui.update(this.delta, time)

        // Not needed atm
        // this.events.emit('update:after', this.delta, time)

        this.debug.performance.end()

        window.requestAnimationFrame(this.update)
    }

    enableStopOnBlur() {
        window.addEventListener('blur', this.onBlur, false)
        window.addEventListener('focus', this.onFocus, false)

        if (!document.hasFocus())
            this.stop()
    }

    disableStopOnBlur() {
        window.removeEventListener('blur', this.onBlur, false)
        window.removeEventListener('focus', this.onFocus, false)
    }

    onBlur = () => this.stop()
    onFocus = () => this.start()
}
