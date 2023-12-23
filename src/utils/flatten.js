
export const flatten = (array) => {
    return array.reduce((acc, val) => acc.concat(val), [])
}
