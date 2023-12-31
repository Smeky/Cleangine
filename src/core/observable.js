/**
 * GPT-4 implementation of observable
 */

/**
 * @typedef {Object} Observable An observable object.
 * @property {Function} observe - Adds an observer to the observable object.
 * @property {any} value - The value of the observable object (can be set).
 */

const isObject = (value) => {
    return typeof value === 'object' && value !== null
}

/**
 * Creates an observable object from a regular object.
 * 
 * @param {Object} obj The object to make observable.
 * @param {Function} notify The function to call when the object changes.
 * @returns {Object} An observable object.
 */
const createObservableObject = (obj, notify) => {
    return new Proxy(obj, {
        get(target, property) {
            const value = target[property]
            return isObject(value) && !value._isObservable ? createObservableObject(value, notify) : value
        },
        set(target, property, value) {
            if (isObject(value) && !value._isObservable) {
                value = createObservableObject(value, notify)
            }
            target[property] = value
            notify()
            return true
        }
    })
}

/**
 * Makes a value or object observable.
 * 
 * @param {any} value
 * @returns {Observable} An observable object.
 */
export const makeObservable = (value) => {
    let observers = []
    let observableValue

    const notifyObservers = () => {
        observers.forEach(observer => observer(observableValue))
    }

    observableValue = isObject(value) ? createObservableObject(value, notifyObservers) : value

    return {
        observe: function(callback) {
            observers.push(callback)
            return () => {
                observers = observers.filter(observer => observer !== callback)
            }
        },
        set value(newValue) {
            if (observableValue !== newValue) {
                observableValue = isObject(newValue) ? createObservableObject(newValue, notifyObservers) : newValue
                notifyObservers()
            }
        },
        get value() {
            return observableValue
        }
    }
}
