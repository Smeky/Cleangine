
/**
 * @typedef {Object} TweenOptions
 * @property {Object} object - Object to tween
 * @property {String} property - Property name
 * @property {Number} target - Target value
 * @property {Number} duration - In milliseconds
 * @property {Function} easing - Easing function from Tween.Easing
 */

export class Tween {
    /**
     * @param {TweenOptions} options
     * @returns {Tween}
     * @example
     * const tween = new Tween({
     *     object: camera.position,
     *     property: 'x',
     *     target: 10,
     *     duration: 1000,
     *     easing: Tween.Easing.Linear
     * })
    */
    constructor({ object, property, target, duration, easing }) {
        this.object = object
        this.property = property
        this.target = target
        this.duration = duration
        this.easing = easing

        this.startTime = null
        this.startValue = null
        this.endValue = null
        this.deltaValue = null
        this.done = false
    }

    update(delta, time) {
        if (this.done)
            return true

        if (this.startTime === null) {
            this.startTime = time
            this.startValue = this.object[this.property]
            this.endValue = this.target
            this.deltaValue = this.endValue - this.startValue
        }

        const elapsed = time - this.startTime
        const progress = Math.min(elapsed / this.duration, 1)

        this.object[this.property] = this.startValue + this.deltaValue * this.easing(progress)
        
        if (elapsed >= this.duration) {
            this.done = true
            this.object[this.property] = this.target
        }

        return this.done
    }

    dispose() {
        this.object = null
        this.property = null
        this.target = null
        this.duration = null
        this.easing = null
        this.startTime = null
        this.startValue = null
        this.endValue = null
        this.deltaValue = null
        this.done = null
    }
}
