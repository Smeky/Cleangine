import * as Three from 'three'

import UIElements from './elements'
import UIStyles from './styles'

import { SystemModule } from '../core/system-module'
export { UIStyles }

/**
 * We need to handle camera in 2 ways:
 *  - 3D camera for the main scene where UI objects are positioned relative to the world
 *  - 2D camera for the UI scene where UI objects are positioned relative to the screen
 * 
 * To do that we need to create a separate scene and camera for UI.
 *  - UI camera should be orthographic
 * 
 */

export class UserInterface extends SystemModule {
    init(engine) {
        const { renderer, camera, scene, canvasWidth, canvasHeight } = engine.graphics

        this.engine = engine
        this.renderer = renderer

        this.worldCamera = camera
        this.worldScene = scene
        this.camera = new Three.OrthographicCamera(-canvasWidth / 2, canvasWidth / 2, canvasHeight / 2, -canvasHeight / 2, -10000, 10000)
        this.scene = new Three.Scene()
        this.scene.add(this.camera)

        this.raycaster = new Three.Raycaster()
        this.interactiveElements = []
        this.hoveredElements = []

        // Todo: Entire UI scene should be handled by a separate system that will be responsible for rendering it
        this.directionalLight = new Three.DirectionalLight(0xffffff, 2)
        this.directionalLight.position.set(0, 2, 3)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.bias = - 0.0001
        this.directionalLight.shadow.mapSize.width = 1024 * 4
        this.directionalLight.shadow.mapSize.height = 1024 * 4

        this.ambientLight = new Three.AmbientLight(0xffffff, 1)

        this.scene.add(this.directionalLight)
        this.scene.add(this.ambientLight)

        this.engine.input.addEventListener('cursor:move', this.onCursorMove)
        this.engine.input.addEventListener('cursor:click', this.onCursorClick)

        window.addEventListener('resize', this.onResize)
    }
    
    update() {
        // this.renderer.render(this.worldScene, this.worldCamera)
        this.renderer.render(this.scene, this.camera)
    }

    dispose() {
        window.removeEventListener('resize', this.onResize)

        this.engine.input.removeEventListener('cursor:move', this.onCursorMove)
        this.engine.input.removeEventListener('cursor:click', this.onCursorClick)
    }

    onResize = () => {
        const { graphics } = this.engine

        this.camera.left = -graphics.canvasWidth / 2
        this.camera.right = graphics.canvasWidth / 2
        this.camera.top = graphics.canvasHeight / 2
        this.camera.bottom = -graphics.canvasHeight / 2
        this.camera.updateProjectionMatrix()
    }

    /**
     * @param {String} [type] Optional type of the element. Default is 'element'.
     * @param {Object} [options] Optional options to pass to the element.
     * @returns 
     */
    createElement(type = 'element', options = {}) {
        const element = new UIElements[type](this, options)
        this.scene.add(element)
        
        return element
    }

    setElementInteractive(element, interactive = true) {
        if (interactive && !element.isInteractive) {
            if (!element.getMesh())
                throw new Error('Interactive element must have a mesh')

            element.isInteractive = true
            this.interactiveElements.push(element)
        }
        else if (!interactive && element.isInteractive) {
            element.isInteractive = false
            this.interactiveElements.splice(this.interactiveElements.indexOf(element), 1)
        }
    }

    /**
     * 
     * @param {Three.Vector3} position 
     * @returns {Three.Vector3} Relative position to the center of the screen (0, 0, 0)
     */
    getRelativePosition(position) {
        const { canvasWidth, canvasHeight } = this.engine.graphics

        return new Three.Vector3(
            position.x * canvasWidth / 2,
            position.y * canvasHeight / 2,
            position.z
        )
    }

    raycastInteractiveElements(cursor) {
        this.raycaster.setFromCamera(cursor.relativePosition, this.camera)
        const meshes = this.interactiveElements.map(element => element.getMesh())

        return this.raycaster
            .intersectObjects(meshes, true)
            .map(intersect => ({
                ...intersect,
                object: meshes.find(mesh => mesh === intersect.object)
                    .parent
            }))
    }

    onCursorMove = ({ cursor }) => {
        // Todo: UI interactity should be done in 2D space, not 3D. But for now performance is not an issue here.
        const intersects = this.raycastInteractiveElements(cursor)

        intersects.forEach(intersect => {
            const { object: element, point } = intersect
            element.dispatchEvent({ type: 'hover', cursor: point })

            if (!this.hoveredElements.includes(element)) {
                element.isHovered = true
                element.dispatchEvent({ type: 'cursorenter', cursor: point })
                this.hoveredElements.push(element)
            }
        })

        this.hoveredElements.forEach(element => {
            if (!intersects.find(intersect => intersect.object === element)) {
                element.isHovered = false
                element.dispatchEvent({ type: 'cursorleave', cursor: null })

                this.hoveredElements.splice(this.hoveredElements.indexOf(element), 1)
            }
        })
    }

    onCursorClick = ({ cursor }) => {
        this.raycaster.setFromCamera(cursor.relativePosition, this.camera)
        const intersects = this.raycaster.intersectObjects(this.interactiveElements, true)

        intersects.forEach(intersect => {
            let object = intersect.object
            while (!this.interactiveElements.includes(object)) 
                object = object.parent

            object.dispatchEvent({ type: 'click', cursor: intersect.point })
        })
    }
}
