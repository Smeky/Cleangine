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
    
    updateEntity(entity, delta) {
        const bounds = entity.components.bounds
        const velocity = entity.components.velocity
        const transform = entity.components.transform

        if (transform.position.x < bounds.left) {
            transform.position.x = bounds.right - 20
            velocity.x = - 20000 * delta
        }
        else if (transform.position.x > bounds.right) {
            transform.position.x = bounds.left + 20
            velocity.x = 20000 * delta
        }

        if (transform.position.y < bounds.top) {
            transform.position.y = bounds.bottom - 20
            velocity.y = - 20000 * delta
        }
        else if (transform.position.y > bounds.bottom) {
            transform.position.y = bounds.top + 20
            velocity.y = 20000 * delta
        }
    }
}
