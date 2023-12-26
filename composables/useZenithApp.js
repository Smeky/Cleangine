import { ZenithApplication } from "~/src/zenith-application"

/**
 * 
 * @param {Ref<HTMLElement>} containerRef 
 * @param {Object} options // Todo: add options type
 * @returns 
 */
export const useZenithApp = (containerRef, options = {}) => {
    const Application = options.application ?? ZenithApplication
    const app = new Application()

    delete options.application // Remove the application from the options

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
