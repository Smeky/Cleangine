
/**
 * 
 * @typedef {Object} SceneModule - Scene modules are used to add functionality to the scene.
 * @property {string} name - The name of the module.
 * @property {function} data - Returns data for the module.
 * @property {function} init - Initializes the module.
 * @property {function} dispose - Disposes the module.
 * @property {function} update - Updates the module.
 * @property {Object} events - Events of the module.
 * @property {Array} emits - Events emitted by the module.
 * @property {Array} dependencies - Dependencies of the module.
 */

function validateDefinition(definition) {
    // Nothing at the moment.
}

/**
 * 
 * @param {function} definitionFn
 * @returns {function(): SceneModule} A function that takes context and returns the scene module.
 */
export const defineSceneModule = (definitionFn) => {
    return (...context) => {
        const definition = definitionFn(...context)
        validateDefinition(definition)

        definition.isSceneModule = true
        definition.data = definition.data ?? (() => {})
        definition.init = definition.init ?? (() => {})
        definition.dispose = definition.dispose ?? (() => {})
        definition.update = definition.update ?? (() => {})
        definition.events = definition.events ?? {}
        definition.emits = definition.emits ?? []
        definition.dependencies = definition.dependencies ?? []

        return definition
    }
}
