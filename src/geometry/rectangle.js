/**
 * @typedef {Object} Rectangle
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

/**
 * Creates a rectangle object.
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns {Rectangle}
 */
export const rectangle = (x, y, width, height) => {
    return {
        x,
        y,
        width,
        height,
    }
}

/**
 * Creates a rectangle object from an object.
 * 
 * @param {Object} obj
 * @param {number} obj.x
 * @param {number} obj.y
 * @param {number} obj.width
 * @param {number} obj.height
 * 
 * @returns {Rectangle}
 */
export const rectangleFromObject = (obj) => {
    return {
        x: obj.x,
        y: obj.y,
        width: obj.width,
        height: obj.height,
    }
}

/**
 * Creates a rectangle object from two points.
 * 
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {Rectangle}
 */
export const rectangleFromPoints = (x1, y1, x2, y2) => {
    return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1,
    }
}

/**
 * Creates a rectangle object from bounds.
 * 
 * @param {Object} bounds
 * @param {number} bounds.left
 * @param {number} bounds.top
 * @param {number} bounds.right
 * @param {number} bounds.bottom
 * @returns {Rectangle}
 */
export const rectangleFromBounds = (bounds) => {
    return {
        x: bounds.left,
        y: bounds.top,
        width: bounds.right - bounds.left,
        height: bounds.bottom - bounds.top,
    }
}

/**
 * Creates a rectangle object from size.
 * 
 * @param {number} width
 * @param {number} height
 * @returns {Rectangle}
 */
export const rectangleFromSize = (width, height) => {
    return {
        x: 0,
        y: 0,
        width,
        height,
    }
}

/**
 * Checks if two rectangles intersect.
 * 
 * @param {Rectangle} a
 * @param {Rectangle} b
 * @returns {boolean}
 */
export const intersects = (a, b) => {
    return !(
        b.x > a.x + a.width ||  // b is right of a
        b.x + b.width < a.x ||  // b is left of a
        b.y > a.y + a.height || // b is below a
        b.y + b.height < a.y    // b is above a
    )
}

/**
 * Checks if rectangle a contains rectangle b.
 * 
 * @param {Rectangle} a
 * @param {Rectangle} b
 * @returns {boolean}
 */
export const contains = (a, b) => {
    return a.x <= b.x && a.x + a.width >= b.x + b.width &&
        a.y <= b.y && a.y + a.height >= b.y + b.height
}

/**
 * Checks if rectangle a contains point (x, y).
 * 
 * @param {Rectangle} a
 * @param {number} x
 * @param {number} y
 * @returns {boolean}
 */
export const containsPoint = (a, x, y) => {
    if (x < a.x || x > a.x + a.width) return false
    if (y < a.y || y > a.y + a.height) return false

    return true
}
