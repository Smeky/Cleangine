import { EntitySystem } from '../system'

/**
 * @typedef {import('three').Vector3} Vector3
 * @typedef {import('three').Euler} Euler
 * @typedef {import('pixi.js').Point} Point
 * 
 */

/**
 * Todo: Transform should have default values for position, rotation, and scale.
 *  - For this to work, we need to always work with 3d data and as such handle Euler rotation in 2D somehow.
 *    We can't set it right away we use rotation as a number in 2D, not Euler.
 *     - Perhaps create a Rotation object that can be either Euler or number and provides setter/getter for both?
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
        return { 
            position, 
            rotation, 
            scale 
        }
    }
}
