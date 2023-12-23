import * as Three from 'three'

/**
 * 
 * @param {Object} options
 * @param {Number} [options.width] Width of the rectangle. Default is 1.
 * @param {Number} [options.height] Height of the rectangle. Default is 1.
 * @param {Number} [options.color] Color of the rectangle. Default is 0xffffff.
 * @param {Number} [options.texture] Texture of the rectangle. Default is null. If texture is set, color is ignored.
 */
export const createRectangleShape = (options = {}) => {
    const { width = 1, height = 1, color = 0xffffff, texture = null } = options

    const geometry = new Three.PlaneGeometry(width, height)
    const material = new Three.MeshStandardMaterial({ color, map: texture })

    return new Three.Mesh(geometry, material)    
}
