import { getObjectsMesh } from "./getObjectsMesh"

export const getObjectsMaterial = (object) => {
    return getObjectsMesh(object)?.material
}
