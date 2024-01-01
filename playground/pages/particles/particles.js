import * as Pixi from 'pixi.js'
import { ZenithApplication } from 'zenith/zenith-application'
import { createCircleTexture } from 'zenith/graphics/utils/createCircleTexture'
import { createRectangleTexture } from 'zenith/graphics/utils/createRectangleTexture'

import ECSForce from './ecs/force'
import ECSColor from './ecs/color'
import ECSOutOfBounds from './ecs/teleport-bounds'

function seededRandom(seed) {
    var x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
}

/**
 * Generates an attraction table for a given set of colors.
 * Each color has a unique attraction value for every other color.
 * 
 * @param {string[]} colors - An array of color strings.
 * @param {number} seed - The seed for the random number generator.
 * @returns {Object[]} An array of objects, each representing a color and its attractions to other colors.
 * 
 * @example
 * // returns [
 * //   { color: '#ff0000', attractions: { '#ff0000': 0.73, '#00ff00': 0.32, ... } },
 * //   { color: '#00ff00', attractions: { '#ff0000': 0.47, '#00ff00': 0.89, ... } },
 * //   ...
 * // ]
 * generateAttractionTable(['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'], 12345);
 */
function generateAttractionTable(colors, seed = Math.random() * 10000) {
    let table = []
    colors.forEach(color1 => {
        let attractions = {}
        colors.forEach(color2 => {
            seed++
            attractions[color2] = Math.round((seededRandom(seed) * 2 - 1) * 100) / 100
        })
        table.push({ color: color1, attractions: attractions })
    })
    return table
}

/**
 * Interpolates between red, black, and green based on the attraction value.
 * @param {number} value - The attraction value between -1 and 1.
 * @returns {string} The RGB color string.
 */
function getAttractionColor(value) {
    let red, green

    if (value < 0) {
        red = Math.round(255 * Math.abs(value)) // More negative, more red
        green = 0
    } else {
        green = Math.round(255 * value) // More positive, more green
        red = 0
    }

    return `rgb(${red},${green},0)`
}

/**
 * Creates an HTML table element representing the attraction table.
 * @param {Object[]} attractionTable - The attraction table array.
 * @returns {HTMLTableElement} The HTML table element.
 */
function createAttractionTableElement(attractionTable) {
    let table = document.createElement('table')
    let thead = table.createTHead()
    let tbody = table.createTBody()

    // Header Row
    let headerRow = thead.insertRow()
    headerRow.insertCell()
    attractionTable.forEach(item => {
        let cell = headerRow.insertCell()
        cell.style.backgroundColor = item.color
        cell.style.width = '1em'
        cell.style.height = '1em'
    })

    // Data Rows
    attractionTable.forEach(rowItem => {
        let row = tbody.insertRow()
        let headerCell = row.insertCell()
        headerCell.style.backgroundColor = rowItem.color
        headerCell.style.width = '1em'
        headerCell.style.height = '1em'

        attractionTable.forEach(colItem => {
            let cell = row.insertCell()
            let attractionValue = rowItem.attractions[colItem.color]
            cell.textContent = attractionValue.toFixed(2)
            cell.style.backgroundColor = getAttractionColor(attractionValue)
            cell.style.color = Math.abs(attractionValue) <= 0.5 ? 'white' : 'black'
            cell.style.textAlign = 'center'
            cell.style.fontWeight = 'bold'
            cell.style.padding = '0.2em'
        })
    })

    return table
}

export default class ParticlesApp extends ZenithApplication {
    async init(options) {
        super.init(options)

        this.ecs.addSystem({ name: 'force', class: ECSForce })
        this.ecs.addSystem({ name: 'color', class: ECSColor })
        this.ecs.addSystem({ name: 'bounds', class: ECSOutOfBounds })

        this.particles = []
        this.particleDef = {
            texture: Pixi.Texture.from(createCircleTexture(5, '#ffffff')),
            size: 5,
            count: 1000,
            speed: 100,
        }

        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff']
        const seed = 123456
        this.attractionTable = generateAttractionTable(colors)

        console.table(this.attractionTable.map(({ color, attractions }) => ({ color, ...attractions })))

        const table = createAttractionTableElement(this.attractionTable)
        document.body.appendChild(table)
        table.style.position = 'absolute'
        table.style.top = '0'
        table.style.right = '0'

        this.width = this.graphics.canvasWidth
        this.height = this.graphics.canvasHeight
        this.offset = {
            x: this.graphics.canvasWidth / 2 - this.width / 2,
            y: this.graphics.canvasHeight / 2 - this.height / 2,
        }

        for (let i = 0; i < this.particleDef.count; i++) {
            const particle = this.createParticle()
            this.particles.push(particle)
        }
    }

    createParticle() {
        const { texture, size, speed } = this.particleDef

        const sprite = new Pixi.Sprite(texture)
        const attractor = this.attractionTable[Math.floor(Math.random() * this.attractionTable.length)]

        return this.ecs.createEntity({
            sprite,
            color: attractor.color,
            bounds: {
                top: this.offset.y,
                left: this.offset.x,
                bottom: this.offset.y + this.height,
                right: this.offset.x + this.width,
            },
            force: {
                color: attractor.color,
                attractions: attractor.attractions,
            },
            transform: {
                position: {
                    x: this.offset.x + Math.random() * this.width,
                    y: this.offset.y + Math.random() * this.height,
                },
                rotation: 0,
            },
            velocity: {
                x: 0,
                y: 0,
            }
            // velocity: {
            //     x: Math.random() * speed - speed / 2,
            //     y: Math.random() * speed - speed / 2,
            // },
        })
    }
}
