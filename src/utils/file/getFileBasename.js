
/**
 * Returns the basename of a file path.
 * @param {string} path - The file path.
 * @returns {string} The basename of the file.
 */
export const getFileBasename = (path) => {
    const parts = path.split('/')
    const lastPart = parts[parts.length - 1]
    const basename = lastPart.split('.')[0]
    return basename
}
