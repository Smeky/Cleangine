<template>
    <div class="zenith" ref="containerRef"></div>
</template>

<script setup>
import { useZenithApp } from '~/composables/useZenithApp'
import ParticlesApp from './particles'

const containerRef = ref(null)
useZenithApp(containerRef, {
    renderingMode: '2d',
    application: ParticlesApp
})
</script>

<style lang="scss">

</style>
