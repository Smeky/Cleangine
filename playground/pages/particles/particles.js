import * as Pixi from 'pixi.js'
import { ZenithApplication } from 'zenith/zenith-application'
import { createCircleTexture } from 'zenith/graphics/utils/createCircleTexture'

export default class ParticlesApp extends ZenithApplication {
    async init(options) {
        super.init(options)

        this.particles = []
        this.particleDef = {
            texture: Pixi.Texture.from(createCircleTexture(8, '#ff0000')),
            size: 8,
            count: 3000,
            speed: 100,
        }

        for (let i = 0; i < this.particleDef.count; i++) {
            const particle = this.createParticle()
            this.particles.push(particle)
            this.scene.addChild(particle.sprite)
        }
    
        this.events.on('update', this.update.bind(this))
    }

    createParticle() {
        const { texture, size, speed } = this.particleDef

        const sprite = new Pixi.Sprite(texture)
        const scale = Math.min(Math.random())

        sprite.anchor.set(0.5)
        sprite.scale.set(scale)
        sprite.position.x = Math.random() * this.graphics.canvasWidth
        sprite.position.y = Math.random() * this.graphics.canvasHeight

        return {
            sprite,
            velocity: {
                x: (Math.random() - 0.5) * speed,
                y: (Math.random() - 0.5) * speed,
            },
            size: size * scale,
        }
    }

    update(delta) {
        const { canvasWidth, canvasHeight } = this.graphics

        this.particles.forEach((particle) => {
            particle.sprite.position.x += particle.velocity.x * delta
            particle.sprite.position.y += particle.velocity.y * delta

            if (particle.sprite.position.x < 0) {
                particle.sprite.position.x = canvasWidth
            } else if (particle.sprite.position.x > canvasWidth) {
                particle.sprite.position.x = 0
            }

            if (particle.sprite.position.y < 0) {
                particle.sprite.position.y = canvasHeight
            } else if (particle.sprite.position.y > canvasHeight) {
                particle.sprite.position.y = 0
            }
        })
    }
}
