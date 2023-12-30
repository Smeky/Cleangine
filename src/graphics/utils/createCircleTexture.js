
/**
 * 
 * @param {number} radius
 * @param {number} color
 * 
 * @returns {HTMLCanvasElement} Canvas element with the circle drawn on it. 
 */
export const createCircleTexture = (radius, color) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = radius * 2
    canvas.height = radius * 2

    context.fillStyle = color
    context.beginPath()
    context.arc(radius, radius, radius, 0, Math.PI * 2)
    context.fill()

    return canvas
}
