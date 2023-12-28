
/**
 * Returns an object with module names as keys and their default exports as values.
 * @param {Object} modules - An object containing all the modules. Generally comes from import.meta.glob
 * @returns {Object} - An object with module names as keys and their default exports as values.
 */
export const getModuleExports = (modules) => {
    return Object.entries(modules).reduce((acc, [path, module]) => {
        const name = path.split('./')[1].split('/').join('-').split('.')[0]
        acc[name] = module.default
        return acc
    }, {})
}
