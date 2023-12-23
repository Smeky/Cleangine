
import { defineStyle } from '../style'

export default defineStyle((element) => {
    // Todo: should be done via some api/interface coming in context (such as engine or ui)
    const onCursorEnter = () => window.document.body.style.cursor = 'pointer'
    const onCursorLeave = () => window.document.body.style.cursor = ''

    return {
        name: 'cursorPointer',
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
