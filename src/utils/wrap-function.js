
export function wrapFunction(obj, funcName, wrapper) {
    const originalFunc = obj[funcName]

    obj[funcName] = function(...args) {
        wrapper.call(this, originalFunc.bind(this), ...args)
    }

    return obj[funcName]
}
