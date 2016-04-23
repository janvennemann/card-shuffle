# card-shuffle
Shuffling cards with a doubly linked list (using ES6 syntax).

## Install
Clone the repo and run `npm install`

## Usage
The ES6 version can be transpiled on the fly through `babel-node` which is configured as the npm start script.
```
npm start -- -n <cards>
```
Or you can build it using gulp und run it directly from the build directory.
```
npm run build
node build/index.js -n <cards>
```

Tests for the underlying doubly linked list can be run with
```
npm test
```
