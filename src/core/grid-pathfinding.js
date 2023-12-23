
/**
 * Our pathfinding algorithm is based on the A* algorithm.
 * 
 * It consists of 2 main steps:
 *  - A* pathfinding by grid cells
 *  - Finding a smooth path by resulting grid cells
 * 
 * The first step is implemented in the `findPathInGrid` function.
 * The second step is implemented in the `findPathInCells` function.
 */

function getChebyshevDistance(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
}

function getNeighbours(grid, cell, filter) {
    const neighbours = []

    if (cell.x > 0 && filter(grid[cell.y][cell.x - 1]?.original)) {
        neighbours.push(grid[cell.y][cell.x - 1])
    }

    if (cell.x < grid[0].length - 1 && filter(grid[cell.y][cell.x + 1]?.original)) {
        neighbours.push(grid[cell.y][cell.x + 1])
    }

    if (cell.y > 0 && filter(grid[cell.y - 1][cell.x]?.original)) {
        neighbours.push(grid[cell.y - 1][cell.x])
    }

    if (cell.y < grid.length - 1 && filter(grid[cell.y + 1][cell.x]?.original)) {
        neighbours.push(grid[cell.y + 1][cell.x])
    }

    return neighbours
}

function reconstructPath(cell) {
    const path = []

    while (cell.parent) {
        path.push(cell)
        cell = cell.parent
    }

    // Ensure that the first cell is included
    if (!path.includes(cell)) {
        path.push(cell)
    }

    return path.reverse()
}

function smoothenDiagonalEdges(path) {
    const newPath = []

    for (let i = 0; i < path.length; i++) {
        const currentCell = path[i]
        const nextCell = path[i + 1]
        const nextNextCell = path[i + 2]

        if (!nextNextCell) {
            newPath.push(currentCell)
            break
        }

        if (currentCell.x !== nextNextCell.x && currentCell.y !== nextNextCell.y) {
            newPath.push(currentCell)
            i++
        } else {
            newPath.push(currentCell)
        }
    }

    // Ensure that the last cell is included
    if (!newPath.includes(path[path.length - 1])) {
        newPath.push(path[path.length - 1])
    }

    return newPath
}

/**
 * Finds a path by grid cells. It uses the A* algorithm with the Chebyshev distance heuristic.
 * 
 * @param {Array<Array<{ x, y }>>} grid 2D array of grid cells
 * @param {{ x, y }} start 
 * @param {{ x, y }} end 
 * @param {(cell: { x, y }) => boolean} [filter] Optional filter function that returns true if the cell is walkable. Default: () => true
 * 
 * @returns {Array<{ x, y }>}
 */
export const findPathInGrid = (grid, start, end, filter = () => true) => {
    // Copy grid to avoid mutating the original grid cells. We want only x and y properties.
    const gridCopy = grid.map(row => row.map((original) => ({ x: original.x, y: original.y, original })))

    const open = []
    const closed = []

    const startCell = gridCopy[start.y][start.x]
    const endCell = gridCopy[end.y][end.x]

    startCell.g = 0
    startCell.h = getChebyshevDistance(startCell, endCell)
    startCell.f = startCell.g + startCell.h

    open.push(startCell)

    while (open.length > 0) {
        const currentCell = open.sort((a, b) => a.f - b.f).shift()

        if (currentCell === endCell) {
            let path = reconstructPath(currentCell)
                path = smoothenDiagonalEdges(path)
            
            // Return original grid cells
            return path.map(cell => cell.original)
        }

        closed.push(currentCell)

        const neighbours = getNeighbours(gridCopy, currentCell, filter)

        neighbours.forEach(neighbour => {
            if (closed.includes(neighbour) || !filter(neighbour.original)) {
                return
            }

            const g = currentCell.g + getChebyshevDistance(currentCell, neighbour)

            if (!open.includes(neighbour)) {
                open.push(neighbour)
            } else if (g >= neighbour.g) {
                return
            }

            neighbour.parent = currentCell
            neighbour.g = g
            neighbour.h = getChebyshevDistance(neighbour, endCell)
            neighbour.f = neighbour.g + neighbour.h
        })
    }

    return []
}

/**
 * Finds a smooth path in 2D space by grid cells.
 * 
 * @param {Array<{ x, y }>} cells
 */
export const findPathInCells = (cells) => {
    
}
