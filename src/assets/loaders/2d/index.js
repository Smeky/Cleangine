import { getModuleExports } from '../../../utils/module/getModuleExports'

const Loaders = getModuleExports(
    import.meta.glob(['./*.js', '!./index.js'], { eager: true })
)

const cachedLoaders = {}

export default {
    getLoader: (ext) => {
        if (!cachedLoaders[ext]) {
            const createLoader = Loaders[ext] // || Loaders['*']

            if (!createLoader)
                throw new Error(`No loader found for extension: .${ext}`)

            cachedLoaders[ext] = createLoader()
        }

        return cachedLoaders[ext]
    }
}
