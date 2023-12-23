
export const getObjectsMesh = (object) => {
    let mesh = null

    object.traverse(child => {
        if (child.isMesh)
            return mesh = child
    })

    return mesh
}
