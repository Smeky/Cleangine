# List of things To Do

## Tests
- [ ] Setup test environment
- [ ] Tests for `core` files that are cosidered stable
- [ ] Tests for `scene` files that are cosidered stable
- [ ] Tests for `utils` files

## Engine
- [ ] Every important class should have explicit name file. (e.g. `class Game` should be in `game.js` file, not `index.js`)
- [ ] Create Scene class as an interface for 2D and 3D scenes
- [ ] Create 2D Scene class
- [ ] Refactor 3D Scene class
- [ ] Add `Game` base class to `engine` namespace
- [x] Fix all EventEmitter related functionality as the emitter has been changed

## Assets
- [ ] Add `AssetManager` class to `engine` namespace
- [ ] `AssetLoader`s should be each a separate file and ideally just a function
- [ ] Autoload `AssetLoader`s from `engine/assets/loaders` directory by type when needed (when assets of their type get loaded)
