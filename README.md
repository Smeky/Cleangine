# Zenith Engine

<img src="./docs/zenith-logo.svg" alt="Alt text" width="200" height="200" style="pointer-events: none; user-select: none;"/>

Zenith Engine, not just a game engine but a framework, streamlines the development of simple games and apps. It leverages [Three.js](https://threejs.org/) for 3D graphics and [Pixi.js](https://www.pixijs.com/) for 2D, offering a robust foundation. 

**Note:** Configuration is code-based, intentionally omitting a UI for a lean, coder-friendly experience.

**Disclaimer:** Primarily crafted for my personal and professional projects, Zenith Engine isn't your run-of-the-mill general purpose engine. However, it as an open-source project and you can feel free to adopt it for your endeavors.

The essence of this project? Well-documented, straightforward code with an architecture that's a easy to comprehend and extend.

### Noteworthy Features
- [x] 2D and 3D rendering
- [ ] Simple physics
- [ ] Audio
- [ ] Headless UI library
  - [ ] UI components
- [ ] Same ECS components for 2D and 3D, making it easy to switch rendering modes
- [ ] Seemless transition between 2D and 3D


## Documentation
- [Todo List](./docs/todos.md)
- [Issues](./docs/issues.md)

## Quick Start

```bash
pnpm i
pnpm dev
```

## Example usage
```html
<template>
    <div class="zenith" ref="containerRef"></div>
</template>

<script setup>
import { ZenithApplication } from 'zenith/zenith-application'
import { useZenithApp } from '~/composables/useZenithApp'

class App3D extends ZenithApplication {
    async init(options) {
        super.init(options)

        await this.assets.loadAssets({
            'cube': ['/models/cube.glb', (obj) => obj.scene],
        })

        this.camera.position.x = 0
        this.camera.position.y = 2
        this.camera.position.z = 3
        this.controls.autoRotate = false
        
        this.cube = this.assets.get('cube').clone()
        this.scene.addChild(this.cube)

        this.events.on('update', (delta) => {
            this.cube.rotation.y += 0.5 * delta
        })
    }
}

const containerRef = ref(null)
useZenithApp(containerRef, {
    renderingMode: '3d',
    application: App3D
})
</script>

<style lang="scss">

</style>
```

## License
MIT License
