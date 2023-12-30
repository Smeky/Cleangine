<template>
    <div class="zenith" ref="containerRef"></div>
</template>

<script setup>
import { ZenithApplication } from 'zenith/zenith-application'
import { useZenithApp } from '~/composables/useZenithApp'
import { Sprite } from 'pixi.js'

class App2D extends ZenithApplication {
    async init(options) {
        super.init(options)

        await this.assets.loadAssets({
            'square': '/sprites/square.jpg',
        })

        const texture = this.assets.get('square')
        const square = this.scene.addChild(new Sprite(texture))
        square.anchor.set(0.5)
        square.x = this.graphics.canvasWidth / 2
        square.y = this.graphics.canvasHeight / 2

        this.engine.events.on('update', (delta) => {
            square.rotation += 0.5 * delta
        })
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
