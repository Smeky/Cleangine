import { EntitySystem } from '../system'

export default class ECSVelocity extends EntitySystem {
    dependencies = ['transform']

    createComponent({ x, y, z }) {
        return { x, y, z }
    }

    updateEntity(entity, delta) {
        const { velocity, transform } = entity.components

        transform.position.x += velocity.x * delta
        transform.position.y += velocity.y * delta

        if (transform.position.z)
            transform.position.z += velocity.z * delta
    }
}
