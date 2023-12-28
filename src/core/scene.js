import { System } from "./system"

/**
 * This is the 3D Scene claas.
 */
export class Scene extends System {
    constructor({ container }) { 
        super()

        console.assert(container, 'Scene requires container. Scene container can be created by the Graphics module.')

        this.container = container
    }

    addChild(...objects) {
        const addFn = this.container.add || this.container.addChild
        addFn.bind(this.container)(...objects)
        return objects.length === 1 ? objects[0] : objects
    }

    removeChild(...objects) {
        const removeFn = this.container.remove || this.container.removeChild
        removeFn.bind(this.container)(...objects)
        return objects.length === 1 ? objects[0] : objects
    }
    
    addModule(module) {
        console.assert(module?.isSceneModule, 'Scene module must be an instance of SceneModule')
        super.addModule(...arguments)
    }

    // Todo: 
    //  - Obsolote, use addModule and init() instead
    //  - Scene should handle data() function before init() is called
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
