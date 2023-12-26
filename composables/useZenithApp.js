import { ZenithApplication } from "~/src/zenith-application"

export const useZenithApp = (containerRef, options = {}) => {
    const app = new ZenithApplication()
    
    onMounted(() => {
        nextTick(() => {
            app.init({ container: containerRef.value, ...options })
               .then(() => app.start())
        })
    })
    
    onUnmounted(() => {
        app.stop()
        app.dispose()
    })

    return app
}