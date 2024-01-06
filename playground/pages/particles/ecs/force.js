import { EntitySystem } from 'zenith/ecs/system'

const linearPeak = (x) => {
    if (x < 0.5)
        return 2 * x
    else 
        return 2 * (1 - x)
}

export default class ECSForce extends EntitySystem {
    dependencies = ['transform', 'velocity']

    init() {
        this.force = 100
        // this.attraction = 1
        this.repulsion = 1.5
        this.attractionRadius = 120
        this.attractionRadiusSquared = this.attractionRadius * this.attractionRadius
        this.frictionFactor = 0.75
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

        let velocityX = 0
        let velocityY = 0

        this.entities.forEach(other => {
            if (other.id === entity.id) 
                return

            const dx = other.components.transform.position.x - transform.position.x
            const dy = other.components.transform.position.y - transform.position.y
            const distanceSquared = dx * dx + dy * dy

            if (distanceSquared  === 0 || distanceSquared > this.attractionRadiusSquared) return

            // Even though this implementation is not physically accurate, it is visually pleasing
            // and works well in 2d space. The force magnitude is calculated using a linear function

            const distance = Math.sqrt(distanceSquared)
            const relativeDistance = distance / this.attractionRadius
            let forceMagnitude

            // Linear repulsion force
            if (relativeDistance < 0.2) {
                forceMagnitude = - this.repulsion * (1 - relativeDistance / 0.25)
            }
            // Linear attraction force
            else {
                const attraction = force.attractions[other.components.force.color] ?? 0
                forceMagnitude = attraction * (this.attractionRadius / distance) * 2 * linearPeak(relativeDistance - 0.25)
            }

            velocityX += forceMagnitude * this.force * (dx / distance)
            velocityY += forceMagnitude * this.force * (dy / distance)
        })

        velocity.x *= this.frictionFactor
        velocity.y *= this.frictionFactor

        velocity.x += velocityX * delta
        velocity.y += velocityY * delta
    }
}