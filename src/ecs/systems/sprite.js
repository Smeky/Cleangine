import { EntitySystem } from '../system'

export default class ECSSprite extends EntitySystem {
    dependencies = ['transform']

    createComponent(sprite) {
        this.engine.scene.addChild(sprite) // TODO: Remove this
        
        return sprite
    }

    destroyComponent(sprite) {
        this.engine.scene.removeChild(sprite) // TODO: Remove this
    }

    updateEntity(entity) {
        const { sprite, transform } = entity.components

        sprite.position.x = transform.position.x
        sprite.position.y = transform.position.y
        sprite.rotation = transform.rotation
        sprite.scale.x = transform.scale.x
        sprite.scale.y = transform.scale.y
    }
}
