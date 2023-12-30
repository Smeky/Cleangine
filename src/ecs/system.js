
// /**
//  * @typedef {Object} SystemDefinitionObj A function that returns a system definition object.
//  * @property {string} type The name of the system.
//  * @property {Function} [dispose] A function that disposes the system.
//  * @property {Function} [createComponent] A function that returns a component.
//  * @property {Function} [destroyComponent] A function that destroys a component.
//  * @property {Function} [updateEntity] A function that updates an entity.
//  * @property {string} [dependencies] The dependencies of the system.
//  */

// /**
//  * @typedef {Function} SystemDefinitionFn A function that returns a system definition object.
//  * @param {Object} context The context of the system definition.
//  * 
//  * @returns {SystemDefinitionObj}
//  */

// function validateDefinition(definition) {
//     if (!definition.type) throw new Error('System type is undefined.')
// }

// /**
//  * 
//  * @param {SystemDefinitionFn} definitionFn 
//  * @returns {SystemDefinitionFn} The system definition function.
//  */
// export const defineSystem = (definitionFn) => {
//     return (...context) => {
//         const definition = definitionFn(...context)
//         validateDefinition(definition)

//         definition.dispose = definition.dispose ?? (() => {})
//         definition.createComponent = definition.createComponent ?? (() => {})
//         definition.destroyComponent = definition.destroyComponent ?? (() => {})
//         definition.updateEntity = definition.updateEntity ?? (() => {})
//         definition.dependencies = definition.dependencies ?? []

//         return definition
//     }
// }


/**
 * @typedef { import('./entity.js').Entity } Entity
 * @typedef { import('./component.js').EntityComponent } EntityComponent
 */

/**
 * @class EntitySystem represents a system that operates on entities.
 * @classdesc EntitySystem is an abstract class.
 * 
 * @property {string} name The name of the component.
 * @property {EntityComponent[]} dependencies The dependency components for the system to operate on an entity.
 * 
 * @abstract
 */
export class EntitySystem {
    dependencies = []

    constructor({ name, ecs, engine }) {
        this.name = name
        this.ecs = ecs
        this.engine = engine
    }

    /**
     * @abstract
     */
    init() {}

    /**
     * @abstract
     */
    dispose() {}

    /**
     * @abstract
     * 
     * @param {Object} options The options for the component.
     * @returns {Object} The component.
     */
    createComponent(options) {}

    /**
     * @abstract
     * 
     * @param {Object} component The component to destroy.
     * @returns {void}
     */
    destroyComponent(component) {}

    /**
     * @abstract
     * 
     * @param {Entity} entity 
     * @param {number} delta
     * @param {number} time
     */
    updateEntity(entity, delta, time) {}
}
