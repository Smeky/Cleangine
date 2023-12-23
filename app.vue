<template>
    <div class="app" ref="container"></div>
</template>

<script setup>
import Application from '~/src/application'

const container = ref(null)

onMounted(() => {
    nextTick(() => {
        Application
            .init({ container: container.value })
            .then(() => Application.start())
    })
})
onUnmounted(() => {
    Application.stop()
    Application.dispose()
})
</script>

<style lang="scss">
.app {
    height: 100dvh;
    width: 100%;
    overflow: hidden;
}
</style>
