<template>
    <div ref="containerRef" class="zenith-app"></div>
</template>

<script setup>
import { useZenithApp } from '~/composables/useZenithApp'

const containerRef = ref(null)
const props = defineProps({
    options: {
        type: Object,
        default: () => ({})
    }
})

const app = useZenithApp(containerRef, props.options)

defineExpose({ app })
</script>

<style lang="scss">
.zenith-app {
    height: 100dvh;
    width: 100%;
    overflow: hidden;
}
</style>
