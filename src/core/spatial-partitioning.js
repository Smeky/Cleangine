
/**
 * @typedef {Object} Bounds
 * @property {number} left
 * @property {number} right
 * @property {number} top
 * @property {number} bottom
 */

/**
 * @typedef {Object} Cell
 * @property {number} x
 * @property {number} y
 * @property {Object[]} objects
 */

class SpatialCell {
    constructor(partitioning, { index, x, y, size }) {
        this.partitioning = partitioning
        this.index = index
        this.x = x
        this.y = y
        this.size = size
        this.objects = []
    }

    add(object) {
        this.objects.push(object)
    }

    remove(object) {
        this.objects = this.objects.filter(obj => obj !== object)
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors
    }

    getNeighbors() {
        return this.neighbors   
    }

    /**
     * Gets all objects in the radius of the given point. If the radius is outside of the cell, the neighbors are also checked.
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} radius 
     * @returns 
     */
    getObjectsInRadius(x, y, radius) {
        const objects = []
    }

    isOutside(x, y) {
        return x < this.x || x > this.x + this.size || y < this.y || y > this.y + this.size
    }
}

/**
 * Todo: Move to engine as another module. Should be always available. OR perhaps even into ECS as a subsystem
 */

export class SpatialPartitioning {
    constructor() {
        this.cells = []
        this.cellSize = 100

        this.bounds = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        }
    }

    setupCells() {
        const { left, right, top, bottom } = this.bounds
        const width = right - left
        const height = bottom - top
        const cellCount = Math.ceil(width / this.cellSize) * Math.ceil(height / this.cellSize)

        this.cells = new Array(cellCount).fill().map((_, index) => {
            return new SpatialCell(this, {
                index,
                size: this.cellSize,
                x: index % Math.ceil(width / this.cellSize) * this.cellSize,
                y: Math.floor(index / Math.ceil(width / this.cellSize)) * this.cellSize,
            })
        })

        this.cells.forEach(cell => cell.setNeighbors(this.getNeighborsForCell(cell)))

        console.log('cells', this.cells)
    }

    /**
     * 
     * @param {Bounds} bounds
     */
    setBounds(left, top, right, bottom) {
        this.bounds = { left, top, right, bottom }
        this.setupCells()
    }
    
    /**
     * 
     * @param {number} cellSize 
     */
    setCellSize(cellSize) {
        this.cellSize = cellSize
        this.setupCells()
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @return {Cell}
     */
    getCell(x, y) {
        const { left, top } = this.bounds
        const cellX = Math.floor((x - left) / this.cellSize)
        const cellY = Math.floor((y - top) / this.cellSize)
        let cellIndex = cellX + cellY * Math.ceil((this.bounds.right - left) / this.cellSize)

        // In case the cell is outside of the bounds, return the cell on the other side of the bounds
        if (cellX < 0) cellIndex += Math.ceil((this.bounds.right - left) / this.cellSize)
        else if (cellX >= Math.ceil((this.bounds.right - left) / this.cellSize)) cellIndex -= Math.ceil((this.bounds.right - left) / this.cellSize)

        if (cellY < 0) cellIndex += this.cells.length
        else if (cellY >= Math.ceil((this.bounds.bottom - top) / this.cellSize)) cellIndex -= this.cells.length

        return this.cells[cellIndex]
    }

    getNeighborsForCell(cell) {
        const cellsPerRow = Math.ceil((this.bounds.right - this.bounds.left) / this.cellSize)
        const numRows = Math.ceil(this.cells.length / cellsPerRow)
        const cellIndex = cell.index
        const neighbors = []
    
        // Offsets for all 8 directions with wrap-around
        const offsets = [-cellsPerRow - 1, -cellsPerRow, -cellsPerRow + 1, -1, +1, cellsPerRow - 1, cellsPerRow, cellsPerRow + 1]
    
        offsets.forEach(offset => {
            let neighborIndex = cellIndex + offset
    
            // Wrap around horizontally
            if (offset === -1 && cellIndex % cellsPerRow === 0) {
                neighborIndex += cellsPerRow
            } else if (offset === 1 && (cellIndex + 1) % cellsPerRow === 0) {
                neighborIndex -= cellsPerRow
            }
    
            // Wrap around vertically
            if (offset < 0 && cellIndex < cellsPerRow) {
                neighborIndex += this.cells.length
            } else if (offset > 0 && cellIndex >= this.cells.length - cellsPerRow) {
                neighborIndex -= this.cells.length
            }
    
            if (neighborIndex >= 0 && neighborIndex < this.cells.length) {
                neighbors.push(this.cells[neighborIndex])
            }
        })
    
        return neighbors
    }
    
}
