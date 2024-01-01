import { EntitySystem } from 'zenith/ecs/system'

export default class ECSBounds extends EntitySystem {
    dependencies = ['transform']

    createComponent({ top, left, bottom, right }) {
        return {
            top: top ?? 0,
            left: left ?? 0,
            bottom: bottom ?? 0,
            right: right ?? 0,
        }
    }
    
    updateEntity(entity) {
        const { bounds, transform } = entity.components

        if (transform.position.x < bounds.left) {
            transform.position.x = bounds.right
        }
        else if (transform.position.x > bounds.right) {
            transform.position.x = bounds.left
        }

        if (transform.position.y < bounds.top) {
            transform.position.y = bounds.bottom
        }
        else if (transform.position.y > bounds.bottom) {
            transform.position.y = bounds.top
        }
    }
}
