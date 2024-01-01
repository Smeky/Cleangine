import { EntitySystem } from 'zenith/ecs/system'

const linearPeak = (x) => {
    if (x < 0.5)
        return 2 * x
    else 
        return 2 * (1 - x)
}

export default class ECSForce extends EntitySystem {
    init() {
        this.force = 20
        // this.attraction = 1
        this.repulsion = 1
        this.attractionRadius = 300
    }

    createComponent({ attractions, color }) {
        return { 
            // attraction: attraction ?? 1,
            attractions: attractions ?? {},
            color: color ?? '#ffffff',
        }
    }

    updateEntity(entity, delta) {
        const { force, transform, velocity } = entity.components

        this.entities.forEach(other => {
            if (other.id === entity.id) 
                return

            const { transform: otherTransform } = other.components
            const dx = otherTransform.position.x - transform.position.x
            const dy = otherTransform.position.y - transform.position.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const relativeDistance = distance / this.attractionRadius

            if (distance === 0 || relativeDistance > 1) return

            // Even though this implementation is not physically accurate, it is visually pleasing
            // and works well in 2d space. The force magnitude is calculated using a linear function

            let forceMagnitude

            // Linear repulsion force
            if (relativeDistance < 0.25) {
                forceMagnitude = - this.repulsion * (1 - relativeDistance / 0.25)
            }
            // Linear attraction force
            else {
                const { force: otherForce } = other.components
                const attraction = force.attractions[otherForce.color] ?? 0
                forceMagnitude = attraction * linearPeak(relativeDistance - 0.25)
            }

            // Normalizing the direction vector
            const directionX = dx / distance
            const directionY = dy / distance

            // Applying the net force in the normalized direction
            velocity.x += (forceMagnitude * this.force * directionX) * delta
            velocity.y += (forceMagnitude * this.force * directionY) * delta
        })

        velocity.x *= 0.99
        velocity.y *= 0.99
    }
}