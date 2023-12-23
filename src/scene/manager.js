
export class SceneManager {
    constructor({ container }) {
        console.assert(container, 'SceneManager: container is required')

        this.scene = null
        this.container = container
    }

    set(scene) {
        if (this.scene) {
            this.container.remove(this.scene)
            this.scene.dispose()
        }

        this.container.add(scene)
        this.scene = scene
        this.scene.init()
    }

    dispose() {
        this.scene?.dispose()
        this.scene = null
    }

    update(delta, time) {
        if (!this.scene)
            return

        this.scene.update(delta, time)
    }
}
