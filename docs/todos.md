# List of things To Do

## Playground
- [ ] Add navbar to the playground
- [ ] Add a way to switch between 2d and 3d scene (can be pages with different apps for now)

## Tests
- [x] Setup test environment
- [ ] Tests for `core` files that are cosidered stable
    - [x] `eventemitter.js`
    - [ ] `system-base.js`
    - [ ] `system.js`
    - [ ] `system-module.js`
    - [ ] `scene.js`
    - [ ] `scene-module.js`
- [ ] Tests for `scene` files that are cosidered stable
- [ ] Tests for `utils` files

## Library
- [ ] Make the engine into a library (installable via npm)

## Engine
- [x] Every important class should have explicit name file. (e.g. `class Game` should be in `game.js` file, not `index.js`)
- [ ] Create Scene class as an interface to support 2D and 3D scenes
    - Or figure out different solution to be able to add 2D and 3D scenes to the engine
- [x] Fix all EventEmitter related functionality as the emitter has been changed
- [ ] `Application`
    - [ ] Should become a base class for app-specific logic (e.g. `Game` class)
    - [ ] Should be the base ground for all the logic that scene modules can't, such as loading state, logic for changing scenes, etc.
    - [ ] Add a way to set the scene from modules
    - [ ] Add a way to set the scene from a definition
    - [ ] Add a clear way to set ECS systems
    - [ ] Add a way to load assets from a definition (or a list of definitions)
    - [ ] Add a way to load assets from a scene definition
- [ ] `Scene`
    - [ ] Aren't modules technically controllers?
- [ ] Fix resize handling for both 2D and 3D

## Add 2D
- [ ] create namespace for both 2D and 3D
- [ ] move 3d to `/3d` namespace
- [ ] create `2d` namespace and reflect 3D structure

## Assets
- [x] Add `AssetManager` class to `engine` namespace
- [x] `AssetLoader`s should be each a separate file and ideally just a function
- [ ] Autoload `AssetLoader`s from `engine/assets/loaders` directory by type when needed (when assets of their type get loaded)
- [ ] Create custom AssetLoader for loading individual assets (e.g. `AssetLoaderImage` for loading images)
  - Mostly wraps around Three.js and Pixi.js loaders
- [ ] Figure out a clean way to differentiate between asset types (e.g. `AssetType.Image`, `AssetType.Model`, etc.)

## User Interface
- [ ] Refactor UI to support both 2D and 3D rendering 
    - Goal here is to save as much work as possible when adding 2D support

## Debug
- [ ] Add `Debug` class to `engine` namespace
- [ ] Add custom logging functionality
  - [ ] Should behave statically or as a singleton, not stored in the engine instance
  - [ ] Should be able to specify loggin target (e.g. console, api, etc.)
  - [ ] Add mild background to the log messages to make them distinguishable from the rest in the console

## Technical Debt
- [ ] All jsdoc type should be lowercase (e.g. `string` instead of `String`)

## Documentation
- [ ] Add a way to generate documentation from jsdoc
- [ ] Automate documentation generation on build (or use workflow to generate it on push to master)