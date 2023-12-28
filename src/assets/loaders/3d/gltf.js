import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default () => {
    const loader = new GLTFLoader()

    return {
        load: async (path) => {
            return await loader.loadAsync(path)
        }
    }
}
