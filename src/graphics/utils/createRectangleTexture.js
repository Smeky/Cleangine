
/**
 * 
 * @param {Object} options
 * @param {Number} [options.width] Width of the rectangle. Default is 1.
 * @param {Number} [options.height] Height of the rectangle. Default is 1.
 * @param {Number} [options.color] Color of the rectangle. Default is 0xffffff.
 * @param {Number} [options.gradient] Gradient of the rectangle. Default is null. Format: { from: 0x000000, to: 0xffffff, angle: 0 }
 * @param {Number} [options.gradient.from] Color of the gradient start.
 * @param {Number} [options.gradient.to] Color of the gradient end.
 * @param {Number} [options.gradient.angle] Angle of the gradient in radians.
 * @param {Number} [options.borderRadius] Border radius of the rectangle. Default is 0.
 * 
 * @returns {HTMLCanvasElement} Canvas element with the rectangle drawn on it.
 */
export const createRectangleTexture = (options = {}) => {
    const { width = 1, height = 1, color = 0xffffff, gradient = null, borderRadius = 0 } = options

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')

    if (gradient) {
        const angle = gradient.angle - Math.PI || 0
        const origin = { x: width / 2, y: height / 2 }
        const rotatedWidth = Math.abs(Math.cos(angle) * width) + Math.abs(Math.sin(angle) * height)
        const rotatedHeight = Math.abs(Math.sin(angle) * width) + Math.abs(Math.cos(angle) * height)

        const x1 = origin.x + Math.cos(angle) * rotatedWidth / 2
        const y1 = origin.y + Math.sin(angle) * rotatedHeight / 2
        const x2 = origin.x + Math.cos(angle + Math.PI) * rotatedWidth / 2
        const y2 = origin.y + Math.sin(angle + Math.PI) * rotatedHeight / 2
        const canvasGradient = context.createLinearGradient(x1, y1, x2, y2)
        canvasGradient.addColorStop(0, gradient.from)
        canvasGradient.addColorStop(1, gradient.to)
        context.fillStyle = canvasGradient
    }
    else {
        context.fillStyle = color
    }

    if (borderRadius > 0) {
        context.beginPath()
        context.moveTo(borderRadius, 0)
        context.lineTo(width - borderRadius, 0)
        context.quadraticCurveTo(width, 0, width, borderRadius)
        context.lineTo(width, height - borderRadius)
        context.quadraticCurveTo(width, height, width - borderRadius, height)
        context.lineTo(borderRadius, height)
        context.quadraticCurveTo(0, height, 0, height - borderRadius)
        context.lineTo(0, borderRadius)
        context.quadraticCurveTo(0, 0, borderRadius, 0)
        context.closePath()
        context.fill()
    }
    else {
        context.fillRect(0, 0, width, height)
    }

    return canvas
}
