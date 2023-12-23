import UIElement from "./element"

export default class UIButton extends UIElement {
    constructor() {
        super(...arguments)

        if (this.options.mesh)
            this.setMesh(this.options.mesh)

        if (this.options.onClick)
            this.addEventListener('click', this.options.onClick)
    }

    dispose() {
        // if (this.options.onClick)
        //     this.element.removeEventListener('click', this.options.onClick)
    }
}
