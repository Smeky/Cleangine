
export class QuadtreeNode {
    constructor(quadtree, x, y, width, height) {
        this.quadtree = quadtree
        this.x = x
        this.y = y
        this.width = width
        this.height = height

        this.entities = []
        this.children = []
    }
}
