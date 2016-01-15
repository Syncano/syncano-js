This quickstart guide will walk you through the installation steps of the Syncano javascript library.

If you don't have a Syncano account yet, you can read about how to create one [here](http://docs.syncano.io/docs/getting-started-with-syncano).

## Installation

We offer a few ways of installing the library - `npm`, `bower`, a GitHub repository or through our cdn.

### NPM

Install the [npm module](https://www.npmjs.com/package/syncano) using:

`npm install syncano --save`

### Bower

Install the [bower module](https://www.bower.io/) using:

`bower install syncano`

### Github

Download the latest release [here](https://github.com/Syncano/syncano-js/releases) or [browse the library](https://github.com/Syncano/syncano-js).

### CDN

The library is available on our official [CDN](http://cdn.syncano.com/syncano.js):

`http://cdn.syncano.com/syncano.js` 

## Including the library in your project

### Script tag

To use the library on the client side, include it via a script tag in your HTML document:

`<script src="path/to/bower_components/syncano/dist/syncano.min.js"></script>`

### CommonJS

The library can be used as CommonJS module via `require`:

`var Syncano = require('syncano');`

### ES6 modules

You can also use the library via `import`:

`import Syncano from 'syncano'`