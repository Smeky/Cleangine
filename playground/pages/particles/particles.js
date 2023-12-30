import * as Pixi from 'pixi.js'
import { ZenithApplication } from 'zenith/zenith-application'
import { createCircleTexture } from 'zenith/graphics/utils/createCircleTexture'

import ForceSystem from './ecs/force'

export default class ParticlesApp extends ZenithApplication {
    async init(options) {
        super.init(options)

        this.ecs.addSystem({ name: 'force', class: ForceSystem })

        this.particles = []
        this.particleDef = {
            texture: Pixi.Texture.from(createCircleTexture(8, '#ff0000')),
            size: 8,
            count: 1,
            speed: 100,
        }

        for (let i = 0; i < this.particleDef.count; i++) {
            this.particles.push(this.createParticle())
        }
    }

    createParticle() {
        const { texture, size, speed } = this.particleDef

        const sprite = new Pixi.Sprite(texture)
        const scale = Math.min(Math.random())

        return this.ecs.createEntity({
            sprite,
            transform: {
                position: {
                    x: Math.random() * this.graphics.canvasWidth,
                    y: Math.random() * this.graphics.canvasHeight,
                },
                rotation: 0,
                scale: {
                    x: scale,
                    y: scale,
                },
            },
            velocity: {
                x: (Math.random() - 0.5) * speed,
                y: (Math.random() - 0.5) * speed,
            },
        })
    }
}
