import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { ObjectLoader } from 'three'
import { SystemModule } from '../core/system-module'

const getAssetPath = (asset) => {
    if (typeof asset === 'function')
        return ''

    if (typeof asset === 'string')
        return asset

    return asset[0]
}

const getGlbAssets = (assets) => {
    return Object.entries(assets).reduce((acc, [id, asset]) => {
        if (getAssetPath(asset).endsWith('.glb'))
            acc[id] = asset
    
        return acc
    }, {})
}

const getJsonAssets = (assets) => {
    return Object.entries(assets).reduce((acc, [id, asset]) => {
        if (getAssetPath(asset).endsWith('.json'))
            acc[id] = asset
    
        return acc
    }, {})
}

const getFunctionAssets = (assets) => {
    return Object.entries(assets).reduce((acc, [id, asset]) => {
        if (typeof asset === 'function')
            acc[id] = asset
    
        return acc
    }, {})
}

export class AssetManager extends SystemModule {
    init() {
        this.items = {}
    }

    dispose() {
        this.items = {}
    }

    get(id) { return this.items[id] }

    /**
     * 
     * @param {Object} assetList  An object with keys as asset ids and values as asset paths
     */
    async loadAssets(assetList) {
        const loadAssetsUsingLoader = async(loader, assets) => {
            const promises = Object.entries(assets).map(([id, asset]) => {
                return new Promise((resolve, reject) => {
                    const path = getAssetPath(asset)
                    const onLoad = Array.isArray(asset) ? asset[1] : undefined

                    loader.load(path, (data) => {
                        this.items[id] = onLoad ? onLoad(data) : data
                        resolve()
                    })
                })
            })

            await Promise.all(promises)
        }

        const objLoader = new ObjectLoader()
        await loadAssetsUsingLoader(objLoader, getJsonAssets(assetList))

        const gltfLoader = new GLTFLoader()
        await loadAssetsUsingLoader(gltfLoader, getGlbAssets(assetList))

        const functionAssets = getFunctionAssets(assetList)
        Object.entries(functionAssets).forEach(([id, asset]) => {
            this.items[id] = asset()
        })
    }
}
