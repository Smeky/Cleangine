
export const deepObjectDispose = (object) => {
    object.removeFromParent()
    object.traverse(child => {
        if (child.isMesh) {
            child.geometry.dispose()
            child.material.dispose()
        }
    })
}
