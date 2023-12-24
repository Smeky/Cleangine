/**
 * Transforms a camelCase string into a kebab-case string.
 * @param {string} str - The camelCase string to transform.
 * @returns {string} The transformed kebab-case string.
 */
export function camelToKebab(str) {
    return str
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
        .replace(/^-/, '') // Remove leading hyphen if it exists
        .toLowerCase()
}
