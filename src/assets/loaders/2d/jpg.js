import { Assets } from 'pixi.js'

export default () => {
    const loader = Assets.loader

    return {
        load: async (path) => {
            return await loader.load(path)
        }
    }
}
