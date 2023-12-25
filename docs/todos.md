# List of things To Do

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

## Engine
- [x] Every important class should have explicit name file. (e.g. `class Game` should be in `game.js` file, not `index.js`)
- [ ] Create Scene class as an interface to support 2D and 3D scenes
  - Or figure out different solution to be able to add 2D and 3D scenes to the engine
- [ ] Add `Game` base class to `engine` namespace
- [x] Fix all EventEmitter related functionality as the emitter has been changed

## Add 2D
- [ ] create namespace for both 2D and 3D
- [ ] move 3d to `/3d` namespace
- [ ] create `2d` namespace and reflect 3D structure

## Assets
- [ ] Add `AssetManager` class to `engine` namespace
- [ ] `AssetLoader`s should be each a separate file and ideally just a function
- [ ] Autoload `AssetLoader`s from `engine/assets/loaders` directory by type when needed (when assets of their type get loaded)

## User Interface
- [ ] Refactor UI to support both 2D and 3D rendering 
  - Goal here is to save as much work as possible when adding 2D support
