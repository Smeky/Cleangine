<template>
    <div class="zenith" ref="containerRef"></div>
</template>

<script setup>
import { ZenithApplication } from 'zenith/zenith-application'
import { useZenithApp } from '~/composables/useZenithApp'

class App3D extends ZenithApplication {
    async init(options) {
        super.init(options)

        // await this.assets.loadAssets({
        //     'cube': ['/models/cube.glb', (obj) => obj.scene],
        // })

        await this.assets.loadAssets({
            'cube': ['/models/cube.glb', (obj) => obj.scene],
        })

        this.camera.position.x = 0
        this.camera.position.y = 2
        this.camera.position.z = 3
        this.controls.autoRotate = false
        
        this.cube = this.assets.get('cube').clone()
        this.scene.addChild(this.cube)

        this.events.on('update', (delta) => {
            this.cube.rotation.y += 0.5 * delta
        })
    }
}

const containerRef = ref(null)
useZenithApp(containerRef, {
    renderingMode: '3d',
    application: App3D
})
</script>

<style lang="scss">

</style>
