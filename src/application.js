import { Zenith } from './zenith'
import { AssetManager } from './asset-manager'
import { disposables } from './utils/disposables'

// import { Systems } from '~/src/game/ecs/systems'
// import Assets from '~/src/game/assets'
// import SceneModules from '~/src/game/modules'
// import Scenes from '~/src/game/definitions/scenes'

export class Application {
    constructor() { 
        if (process.env.NODE_ENV === 'development') {
            console.info('Application instance created, available at <window.app>')
            window.app = this
        }
    }

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
     * @param {Object} options
     * @param {HTMLElement} options.container
     */
    async init({ container }) {
        this.disposables = disposables()
        // this.store = useGameStore()

        this.engine = this.disposables.add(new Zenith())
        this.assets = this.disposables.add(new AssetManager())

        this.engine.setup({ container, renderingMode: '2d' })
        this.engine.events.on('update', this.update.bind(this))

        // this.engine.ecs.registerSystems(Systems)

        // await this.assets.loadAssets({
        //     'cube': ['/models/cube.glb', (obj) => obj.scene],
        // })

        // this.camera.position.x = 0
        // this.camera.position.y = 2
        // this.camera.position.z = 3
        // this.controls.autoRotate = false
        
        // this.cube = this.assets.get('cube').clone()
        // this.scene.add(this.cube)
    }

    dispose() {
        this.disposables.dispose()
    }

    start() {
        this.engine.start()
    }

    stop() {
        this.engine.stop()
    }

    /**
     * 
     * @param {Number} delta 
     * @param {Number} time 
     */
    update(delta, time) {
        // this.cube.rotation.y += delta * 0.5
    }

    setScene(sceneDefinition, options = {}) {
        const modules = sceneDefinition.modules.reduce((acc, moduleName) => {
            if (!SceneModules[moduleName])
                console.error(`Scene module "${moduleName}" does not exist`)
            else
                acc[moduleName] = SceneModules[moduleName]

            return acc
        }, {})

        this.scene.setSceneFromModules(modules, options)
    }
}

const instance = new Application()
export default instance
