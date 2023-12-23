
function validateDefinition(definition) {
    // Nothing at the moment.
}

export const defineSceneModule = (definitionFn) => {
    return (...context) => {
        const definition = definitionFn(...context)
        validateDefinition(definition)

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
