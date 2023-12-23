import EventEmitter from './event-emitter'

export class SystemBase extends EventEmitter {
    constructor() {
        super()

        this.modules = {}
    }

    init() {
        Object.values(this.modules).forEach(module => module.init())
    }

    dispose() {
        Object.values(this.modules).forEach(module => module.dispose())
        this.modules = {}
    }

    update(delta, time) {
        Object.values(this.modules).forEach(module => module.update(delta, time))
    }

    registerModule(module) {
        if (!module.constructor.name)
            throw new Error('Module must have a name')

        if (this.modules[module.constructor.name])
            throw new Error(`Module ${module.constructor.name} already registered`)

        this.modules[module.constructor.name] = module
    }

    removeModule(name) {
        if (!this.modules[name])
            throw new Error(`Tried to remove module ${name} that is not registered`)

        delete this.modules[name]
    }
}
