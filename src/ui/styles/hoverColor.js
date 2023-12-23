
import { defineStyle } from '../style'

const defaultOptions = {
    hoverColor: 0x00ff00,
}

export default defineStyle((element, options) => {
    options = { ...defaultOptions, ...options }

    let material = null
    let originalColor = null

    const onCursorEnter = () => {
        material = element.getMesh()?.material

        if (material) {
            originalColor = material.color.clone()
            material.color.set(options.hoverColor)
        }
    }

    const onCursorLeave = () => {
        if (material && originalColor) {
            material.color.copy(originalColor)
            material = null // Todo: is this necessary? If UIElement's material is changed, this would be wrong otherwise
        }
    }

    return {
        name: 'hoverColor',
        add: () => {
            element.addEventListener('cursorenter', onCursorEnter)
            element.addEventListener('cursorleave', onCursorLeave)
        },
        remove: () => {
            onCursorLeave()

            element.removeEventListener('cursorenter', onCursorEnter)
            element.removeEventListener('cursorleave', onCursorLeave)
        },
    }
})
