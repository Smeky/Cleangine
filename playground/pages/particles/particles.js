import * as Pixi from 'pixi.js'
import { ZenithApplication } from 'zenith/zenith-application'
import { createCircleTexture } from 'zenith/graphics/utils/createCircleTexture'

import ECSForce from './ecs/force'
import ECSColor from './ecs/color'

export default class ParticlesApp extends ZenithApplication {
    async init(options) {
        super.init(options)

        this.ecs.addSystem({ name: 'force', class: ECSForce })
        this.ecs.addSystem({ name: 'color', class: ECSColor })

        this.particles = []
        this.particleDef = {
            texture: Pixi.Texture.from(createCircleTexture(6, '#ffffff')),
            size: 6,
            count: 1000,
            speed: 100,
        }

        for (let i = 0; i < this.particleDef.count; i++) {
            this.particles.push(this.createParticle())
        }
    }

    createParticle() {
        const { texture, size, speed } = this.particleDef

        const sprite = new Pixi.Sprite(texture)
        const color = [
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#00ffff',
        ][Math.floor(Math.random() * 5)]

        return this.ecs.createEntity({
            sprite,
            color,
            transform: {
                position: {
                    x: Math.random() * this.graphics.canvasWidth,
                    y: Math.random() * this.graphics.canvasHeight,
                },
                rotation: 0,
            },
            velocity: {
                x: 0,
                y: 0,
            },
        })
    }
}
