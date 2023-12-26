<template>
    <div class="zenith" ref="containerRef"></div>
</template>

<script setup>
import { ZenithApplication } from '~/src/zenith-application'
import { useZenithApp } from '~/composables/useZenithApp'

class App2D extends ZenithApplication {
    async init(options) {
        super.init(options)

        await this.assets.loadAssets({
            'square': '/sprites/square.jpg',
        })

        // this.square = this.assets.get('square').clone()
        // this.scene.addChild(this.square)

        // this.engine.events.on('update', (delta) => {
        //     this.square.rotation += 0.5 * delta
        // })
    }
}

const containerRef = ref(null)
useZenithApp(containerRef, {
    renderingMode: '2d',
    application: App2D
})
</script>

<style lang="scss">

</style>
