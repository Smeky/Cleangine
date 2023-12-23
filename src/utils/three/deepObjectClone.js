  
export const deepObjectClone = (object) => {
    const clone = new object.constructor()
    clone.copy(object, true)
    clone.children = []

    object.children.forEach((child) => {
        if (child !== object && child.isObject3D) {
            const childClone = deepObjectClone(child)
            clone.add(childClone)

            if (child.material) {
                childClone.material = child.material.clone()
            }
        }
    })

    return clone
}
