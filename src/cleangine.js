import { EntityComponentSystem } from './ecs/index.js'
import { Graphics } from './graphics/index.js'
import { InputSystem } from './input/index.js'
import { Scene } from './core/scene.js'
import { Tweens } from './core/tweens.js'
import { UserInterface } from './ui/index.js'

import { disposables } from './utils/disposables.js'
import EventEmitter from 'eventemitter3'

export class Cleangine {
    static DeltaFactor = 1 / 1000

    constructor() {
        this.isRunning = false
        this.lastFrameTime = 0
        this.delta = 0
        this.disposables = disposables()

        // Todo: move into this.hooks and create a simple hook system
        this._onBeforeUpdateCbs = []
        this._onAfterUpdateCbs = []

        this.update = this.update.bind(this)
    }

    /**
     * 
     * @param {Object} options 
     * @param {HTMLElement} options.container
     */
    setup({ container }) {
        this.events = new EventEmitter()
        this.scene = this.disposables.add(new Scene())
        this.graphics = this.disposables.add(new Graphics(container, this.scene))
        this.input = this.disposables.add(new InputSystem())
        this.ecs = this.disposables.add(new EntityComponentSystem())
        this.ui = this.disposables.add(new UserInterface())
        this.tweens = this.disposables.add(new Tweens())

        // Todo: All systems should be a SystemBase class that has init() and dispose() methods
        // - init() should be called when all systems are added to the engine
        
        this.input.init(this)
        this.ui.init(this)

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

        this.delta = (time - this.lastFrameTime) * Cleangine.DeltaFactor
        this.lastFrameTime = time

        this._onBeforeUpdateCbs.forEach(cb => cb(this.delta, time))

        this.ecs.update(this.delta, time)
        this.scene.update(this.delta, time)
        this.tweens.update(this.delta, time)
        this.graphics.update(this.delta, time)
        this.ui.update(this.delta, time)

        this._onAfterUpdateCbs.forEach(cb => cb(this.delta, time))

        window.requestAnimationFrame(this.update)
    }

    /**
     * 
     * @param {Function} cb 
     */
    onBeforeUpdate(cb) {
        this._onBeforeUpdateCbs.push(cb)
    }

    /**
     * 
     * @param {Function} cb 
     */
    onAfterUpdate(cb) {
        this._onAfterUpdateCbs.push(cb)
    }

    onBlur = () => this.stop()
    onFocus = () => this.start()
}
