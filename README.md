# Zenith Engine

<img src="./docs/zenith-logo.svg" alt="Alt text" width="200" height="200">

Zenith Engine is a game engine **or rather framework** for simple games & apps. It is built on top of [Three.js](https://threejs.org/) for 3D & [Pixi.js](https://www.pixijs.com/) for 2D.
Currently, there is no user interface and all configuration is done through code. This is by design as I want to keep the engine as simple as possible from a programmer's perspective.

**DISCLAIMER:**
It is my custom engine for my personal & work projects and as such is not meant to be a general purpose engine, however it is open source and you are free to use it for your own projects.

My main goal with this project is to have well documented code with simple & easy to understand and extend architecture.

[Todos](./docs/todos.md)
[Issues](./docs/issues.md)

## Getting Started

```bash
pnpm i
pnpm dev
```

## Engine Structure
### Zenith
Center of the engine, contains all the core systems as modules and the application interface. Handles the main loop.

**Modules**: (modules are a way to extend the engine with custom functionality. Each core system is a module)

    zenith.ecs - entity component system
    zenith.input - input handling
    zenith.graphics - rendering
    zenith.scene - scene management system
    zenith.tweens - tweening
    zenith.assets - asset management
    zenith.audio - todo
    zenith.networking - todo

### Application
Interface for the engine. You'll find access to everything you need from the engine here.

### Scene
Scene as such is just a simple system holding modules (or controllers if you will) that add the specific functionality needed by the scene. For example, enemy-spawner, player-controller, etc.

**Scene Module** - todo

## License

MIT
