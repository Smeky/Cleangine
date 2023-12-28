import { SystemModule } from '../core/system-module'

/**
 * Parses an asset definition from various input formats.
 * 
 * @param {string|object|array} def - The asset definition. Can be:
 *  - a string representing the path,
 *  - an object with properties `path`, `type`, and `onLoad`,
 *  - an array, where:
 *    - 1 element is the path,
 *    - 2 elements are path and onLoad,
 *    - 3 elements are path, type, and onLoad.
 * @returns {{path: string, type: string, onLoad: Function}} The parsed asset definition.
 */
const parseAssetDefinition = (def) => {
    let path, type, onLoad

    if (typeof def === 'string') {
        path = def
    }
    else if (Array.isArray(def)) {
        if (def.length === 1)
            path = def[0]
        else if (def.length === 2)
            [path, onLoad] = def
        else if (def.length === 3)
            [path, type, onLoad] = def
    }
    else if (typeof def === 'object') {
        path = def.path
        type = def.type
        onLoad = def.onLoad
    }
    else {
        throw new Error(`Invalid asset definition: ${def}`)
    }

    return { path, type, onLoad }
}

export class AssetManager extends SystemModule {
    init(engine) {
        this.engine = engine
        this.items = {}
    }

    dispose() {
        this.items = {}
    }

    get(id) { return this.items[id] }

    /**
     * 
     * @param {Object} assetsMap  An object with keys as asset ids and values as asset paths
     */
    async loadAssets(assetsMap) {
        const mode = this.engine.options.renderingMode
        const Loaders = await import(/* @vite-ignore */ './loaders/' + mode).then(m => m.default)

        for (const [id, def] of Object.entries(assetsMap)) {
            const { path, type, onLoad } = parseAssetDefinition(def)
            const ext = path.split('.').pop()
            const loader = Loaders.getLoader(type ?? ext)

            const data = await loader.load(path)
            this.items[id] = onLoad ? onLoad(data) : data
        }
    }
}
