import { EntitySystem } from '../system'

export default class ECSVelocity extends EntitySystem {
    dependencies = ['transform']

    createComponent({ x, y, z }) {
        return { x: x ?? 0, y: y ?? 0, z: z ?? 0 }
    }

    updateEntity(entity, delta) {
        const transform = entity.components.transform
        const velocity = entity.components.velocity

        transform.position.x += velocity.x * delta
        transform.position.y += velocity.y * delta

        if (transform.position.z)
            transform.position.z += velocity.z * delta
    }
}
