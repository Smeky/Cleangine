import { Zenith, ZenithOptions } from './zenith'

// import { Systems } from 'zenith/game/ecs/systems'
// import Assets from 'zenith/game/assets'
// import SceneModules from 'zenith/game/modules'
// import Scenes from 'zenith/game/definitions/scenes'

/**
 * @class ZenithApplication
 * @classdesc The main application class that serves as the entry point for the game and also interface for the engine.
 * 
 * The Application is meant to be used either as such or to be class extended by the user.
 * 
 * Todo: (reflected in todos.md)
 *  - Add a way to set the scene from modules
 *  - Add a way to set the scene from a definition
 *  - Add a clear way to set ECS systems
 *  - Add a way to load assets from a definition (or a list of definitions)
 *  - Add a way to load assets from a scene definition
 */
export class ZenithApplication {
    get assets () { return this.engine.assets }
    get camera() { return this.engine.graphics.camera }
    get controls() { return this.engine.graphics.controls } // Should have an interace (some kind of input manager)
    get ecs() { return this.engine.ecs }
    get events() { return this.engine.events }
    get graphics() { return this.engine.graphics }
    get input() { return this.engine.input }
    get scene() { return this.engine.scene }
    get tweens() { return this.engine.tweens }
    get ui() { return this.engine.ui }

    /**
     * 
     * @param {ZenithOptions} options
     */
    async init(options) {
        this.engine = new Zenith()
        this.engine.setup(options)

        if (process.env.NODE_ENV === 'development') {
            console.info('Zenith Application created, available at <window.zenith>')
            window.zenith = this
        }
    }

    dispose() {
        this.engine.dispose()
        this.assets.dispose()
    }

    /**
     * Starts the engine's main loop
     */
    start() {
        this.engine.start()
    }

    /**
     * Stops the engine's main loop
     */
    stop() {
        this.engine.stop()
    }

    // setScene(sceneDefinition, options = {}) {
    //     const modules = sceneDefinition.modules.reduce((acc, moduleName) => {
    //         if (!SceneModules[moduleName])
    //             console.error(`Scene module "${moduleName}" does not exist`)
    //         else
    //             acc[moduleName] = SceneModules[moduleName]

    //         return acc
    //     }, {})

    //     this.scene.setSceneFromModules(modules, options)
    // }
}
