import { EntitySystem } from 'zenith/ecs/system'

export default class ECSColor extends EntitySystem {
    init() {
        this.disableUpdates()
    }

    createComponent({ color }) {
        return color
    }

    updateEntity(entity, delta) {
        console.log('color updated?!')
    }
}
