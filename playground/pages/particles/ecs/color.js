import { EntitySystem } from 'zenith/ecs/system'
import { makeObservable } from 'zenith/core/observable'

export default class ECSColor extends EntitySystem {
    init() {
        this.disableUpdates()
    }

    createComponent(color, entity) {
        const observableColor = makeObservable(color)
        
        observableColor.observe((newColor) => 
            this.setEntityColor(entity, newColor)
        )

        return observableColor
    }

    setupComponent(entity) {
        const { color } = entity.components
        this.setEntityColor(entity, color.value)
    }
    
    setEntityColor(entity, color) {
        const { sprite } = entity.components

        if (sprite) {
            sprite.tint = color
        }
    }
}
