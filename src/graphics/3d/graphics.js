import * as Three from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

import { SystemModule } from '../../core/system-module'
import { Scene } from '../../core/scene'
import { Camera } from './camera'

/**
 * Graphics class for rendering 3D graphics using Three.js library.
 */
export class Graphics3D extends SystemModule {
    /**
     * Creates a new Graphics instance.
     * 
     * @param {@import { Zenith } from '../zenith.js'} engine - The engine instance.
     */
    init(engine) {
        // Canvas
        this.container = engine.options.container
        this.canvasWidth = this.container.offsetWidth
        this.canvasHeight = this.container.offsetHeight

        this.canvas = document.createElement('canvas')
        this.container.appendChild(this.canvas)

        // Renderer
        this.renderer = new Three.WebGLRenderer({ canvas: this.canvas, antialias: true, powerPreference: 'high-performance' })
        this.renderer.setSize(this.canvasWidth, this.canvasHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearColor(0x111111, 1)
        this.renderer.autoClear = false

        this.raycaster = new Three.Raycaster()
        
        // Scene
        this.scene = engine.scene

        // Camera
        this.camera = new Camera(75, this.canvasWidth / this.canvasHeight, 0.1, 5000)
        this.scene.addChild(this.camera)

        // Lights
        this.directionalLight = new Three.DirectionalLight(0xffffff, 3)
        this.directionalLight.position.set(5, 2, 3)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.bias = - 0.0001
        this.directionalLight.shadow.mapSize.width = 1024 * 4
        this.directionalLight.shadow.mapSize.height = 1024 * 4

        this.ambientLight = new Three.AmbientLight(0xffffff, 1)

        this.scene.addChild(this.directionalLight)
        this.scene.addChild(this.ambientLight)

        this.controls = new OrbitControls(this.camera, this.canvas)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.2
        this.controls.zoomSpeed = 2

        this.controls.autoRotate = true
        this.controls.autoRotateSpeed = 1
        const stopAutoRotate = () => {
            this.controls.autoRotate = false
            this.controls.removeEventListener('start', stopAutoRotate)
        }
        this.controls.addEventListener('start', stopAutoRotate)

        window.addEventListener('resize', this.onResize)
    }

    /**
     * Disposes of the Graphics instance and removes event listeners.
     */
    dispose() {
        window.removeEventListener('resize', this.onResize)

        this.renderer.dispose()
        this.canvas.remove()
    }

    /**
     * Updates the Graphics instance with the given delta time.
     * @param {number} delta - The time elapsed since the last update.
     */
    update(delta) {
        this.controls.update(delta)
        this.renderer.clear()
        this.renderer.render(this.scene.container, this.camera)
    }

    createScene() {
        return new Scene({ container: new Three.Scene() })
    }

    /**
     * Handles the resize event and updates the canvas size accordingly.
     */
    onResize = () => {
        this.canvasWidth = this.container.offsetWidth
        this.canvasHeight = this.container.offsetHeight

        this.camera.aspect = this.canvasWidth / this.canvasHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.canvasWidth, this.canvasHeight)
    }

    /**
     * Performs a raycast from the given position onto the given objects.
     * @param {Three.Vector2} position - The position to cast the ray from.
     * @param {Three.Object3D | Array[Three.Object3D]} objects - The object or array of objects to intersect with the ray.
     * @returns {Three.Intersection} The first intersection found.
     */
    raycast(position, objects) {
        this.raycaster.setFromCamera(position, this.camera)
        return this.raycaster.intersectObjects(objects, false)[0]
    }

    /**
     * Performs a raycast from the mouse position onto the given objects.
     * @param {Object} mousePosition - The position of the mouse.
     * @param {number} mousePosition.x - The x-coordinate of the mouse position.
     * @param {number} mousePosition.y - The y-coordinate of the mouse position.
     * @param {Three.Object3D | Array[Three.Object3D]} objects - The object or array of objects to intersect with the ray.
     * @returns {Three.Intersection} The first intersection found.
     */
    raycastFromMouse(mousePosition, objects) {
        const { clientWidth, clientHeight } = this.renderer.domElement
        const { x, y } = mousePosition
        const relativePosition = { x: (x / clientWidth) * 2 - 1, y: -(y / clientHeight) * 2 + 1 }

        return this.raycast(relativePosition, objects)
    }
}
