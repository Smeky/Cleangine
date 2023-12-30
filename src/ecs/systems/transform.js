import { EntitySystem } from '../system'

/**
 * @typedef {import('three').Vector3} Vector3
 * @typedef {import('three').Euler} Euler
 * @typedef {import('pixi.js').Point} Point
 * 
 */

export default class ECSTransform extends EntitySystem {
    /**
     * 
     * @param {object} options
     * @param {Vector3 | Point} options.position
     * @param {Euler | number} options.rotation
     * @param {Vector3 | Point} options.scale
     * @returns 
     */
    createComponent({ position, rotation, scale }) {
        return { position, rotation, scale }
    }
}
