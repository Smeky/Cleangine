import { EntitySystem } from 'zenith/ecs/system'
import { makeObservable } from 'zenith/core/observable'

export default class ECSColor extends EntitySystem {
    init() {
        this.disableUpdates()
    }

    createComponent(color, entity) {
        const observableColor = makeObservable(color)
        
        observableColor.observe((newColor) => 
            this.setEntityColor(color.entity, newColor)
        )

        return observableColor
    }

    setupEntity(entity) {
        const { color } = entity.components
        this.setEntityColor(entity, color.value)
    }

    updateEntity(entity, delta) {
        console.log('color updated?!')
    }
    
    setEntityColor(entity, color) {
        // const { sprite } = entity.components
        // console.log('setEntityColor', sprite, color)

        // if (sprite) {
        //     sprite.tint = color
        // }
    }
}
