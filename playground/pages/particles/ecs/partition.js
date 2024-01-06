import { SpatialPartitioning } from 'zenith/core/spatial-partitioning'
import { EntitySystem } from 'zenith/ecs/system'

export default class ECSPartition extends EntitySystem {
    dependencies = ['transform']

    init() {
        const { canvasWidth, canvasHeight } = this.engine.graphics

        this.system = new SpatialPartitioning()
        this.system.setBounds(0, 0, canvasWidth, canvasHeight)
    }

    createComponent() {
        return { cell: null }
    }

    setupComponent(entity) {
        const { partition, transform } = entity.components
        const { x, y } = transform.position

        partition.cell = this.system.getCell(x, y)
        partition.cell.objects.push(entity)
    }

    updateEntity(entity) {
        const { partition, transform } = entity.components
        const { x, y } = transform.position

        if (partition.cell.isOutside(x, y)) {
            partition.cell.remove(entity)
            partition.cell = this.system.getCell(x, y)
            partition.cell.add(entity)
        }
    }
}
