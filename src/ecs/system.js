
/**
 * @typedef {Object} SystemDefinitionObj A function that returns a system definition object.
 * @property {string} type The name of the system.
 * @property {Function} [dispose] A function that disposes the system.
 * @property {Function} [createComponent] A function that returns a component.
 * @property {Function} [destroyComponent] A function that destroys a component.
 * @property {Function} [updateEntity] A function that updates an entity.
 * @property {string} [dependencies] The dependencies of the system.
 */

/**
 * @typedef {Function} SystemDefinitionFn A function that returns a system definition object.
 * @param {Object} context The context of the system definition.
 * 
 * @returns {SystemDefinitionObj}
 */

function validateDefinition(definition) {
    if (!definition.type) throw new Error('System type is undefined.')
}

/**
 * 
 * @param {SystemDefinitionFn} definitionFn 
 * @returns {SystemDefinitionFn} The system definition function.
 */
export const defineSystem = (definitionFn) => {
    return (...context) => {
        const definition = definitionFn(...context)
        validateDefinition(definition)

        definition.dispose = definition.dispose ?? (() => {})
        definition.createComponent = definition.createComponent ?? (() => {})
        definition.destroyComponent = definition.destroyComponent ?? (() => {})
        definition.updateEntity = definition.updateEntity ?? (() => {})
        definition.dependencies = definition.dependencies ?? []

        return definition
    }
}
