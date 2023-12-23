
function validateDefinition(definition) {
    console.assert(typeof definition.name === 'string', 'Style definition must have a name.', definition)
    console.assert(typeof definition.add === 'function', 'Style definition must have an add function.', definition)
    console.assert(typeof definition.remove === 'function', 'Style definition must have a remove function.', definition)
}

/**
 * 
 * @param {Function} definitionFn 
 * @returns {Function} useStyle function that returns the style 
 */
export const defineStyle = (definitionFn) => {
    /**
     * @param {Object} context Context object passed to the definition function
     * @param {UIElement} context.element The element the style is being added to
     * @param {Object} [context.options] Optional options object passed to the definition function
     */
    return (...context) => {
        const definition = definitionFn(...context)
        validateDefinition(definition)

        return definition
    }
}
