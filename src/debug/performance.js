import Stats from 'stats.js'
import { SystemModule } from '../core/system-module'

/**
 * The PerformanceModule class is responsible for managing the performance statistics.
 */
export class PerformanceModule extends SystemModule {
    /**
     * Initializes the statistics.
     * @param {Object} engine - The engine object.
     */
    init(engine) {
        this.stats = this.createStatsPanels(3)
    }

    /**
     * Cleans up the statistics.
     */
    dispose() {
        this.stats.forEach(stat => document.body.removeChild(stat.dom))
    }

    /**
     * Begins the performance measurement.
     */
    begin() {
        this.stats.forEach(stat => stat.begin())
    }

    /**
     * Ends the performance measurement.
     */
    end() {
        this.stats.forEach(stat => stat.end())
    }
    
    /**
     * Creates a specified number of statistics panels.
     * @param {number} count - The number of statistics panels to create.
     * @returns {Array} An array of the created statistics panels.
     */
    createStatsPanels(count) {
        const panels = []

        for (let i = 0; i < count; i++) {
            const stat = new Stats()
            stat.showPanel(i)
            stat.dom.style.left = `${i * 80}px`
            document.body.appendChild(stat.dom)
            panels.push(stat)
        }

        return panels
    }
}