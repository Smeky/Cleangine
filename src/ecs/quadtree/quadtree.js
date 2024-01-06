import { QuadtreeNode } from './quadtree-node.js'

export class Quadtree {
    constructor(ecs) {
        this.ecs = ecs
        this.root = new QuadtreeNode(this, 0, 0, 0, 0)
    }
}
