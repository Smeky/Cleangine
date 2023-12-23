import * as Three from 'three'

export class Scene extends Three.Scene {
    constructor() { 
        super(...arguments)
        this.modules = {}
        this.modulesList = []
    }

    add(...objects) {
        super.add(...objects)
        return objects.length === 1 ? objects[0] : objects
    }

    update(delta, time) {
        this.modulesList.forEach(module => module.update(delta, time))
    }

    setSceneFromModules(modules, options = {}) {
        this.modulesList.forEach(module => module.dipose())
        this.modulesList = []

        this.modules = Object.entries(modules).reduce((acc, [name, Module]) => {
            acc[name] = Module({
                options: options[name] ?? {},
                scene: this,
                modules: acc,
                // Todo: data - ref to game data / state
            })
            return acc
        }, {})

        this.modulesList = Object.values(this.modules)
        this.modulesList.forEach(module => {
            // Todo: if module returns data, store in the store under its name
            module.data()
            module.init()
        })
    }
}
