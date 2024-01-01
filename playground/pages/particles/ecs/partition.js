import { EntitySystem } from 'zenith/ecs/system'

export default class ECSPartition extends EntitySystem {
    dependencies = ['transform']

    updateEntity(entity) {
        const { partition, transform } = entity.components

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
