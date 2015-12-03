# Syncano javascript library v 4.0 alpha

## JavaScript QuickStart Guide

You can find quick start on installing and using Syncano's JS library in our [documentation](http://docs.syncano.com/v1.0/docs/javascript).

For more detailed information on how to use Syncano and its features - our [Developer Manual](http://docs.syncano.com/v1.0/docs/getting-started-with-syncano) should be very helpful.

In case you need help working with the library - email us at libraries@syncano.com - we will be happy to help!

## Directory structure:

* lib/ - js library
* examples/browser - examples for browser (in form of web page)
* examples/node - simple node.js test script

## To run code samples

First, you need a Syncano account.
To create one please follow these steps:

* open `examples/node/createAccount.js` in your favourite editor and fill your data (email, password and name)
* `cd examples/node`
* `npm install`
* `node createAccount.js`
* create `examples/browser/js/config.js` file and place the structure returned by createAccount.js in it:

```javascript
var Config = {
	instance: '...',
	email: '...',
	password: '...',
	apiKey: ''
};
```

* download latest jquery and put it in `examples/browser/vendor/jquery.js`
* open `examples/browser/index.html` file
* press the `Connect with email/password` button
* button should become green in a second and you'll see an apiKey in the site header
* put this apiKey in previously generated config.js

Phew! Now you have your own account and instance and you are ready to play with api. Simply reload `examples/browser/index.html` and play with buttons.

## Docs

Generate docs with yuidoc

```
yuidoc -o docs lib/
```

## Examples

### Backbone.js

https://github.com/Syncano/syncano4-js-backbone

### node.js

https://github.com/Syncano/syncano4-js-node

### TodoMVC

https://github.com/Syncano/syncano4-js-todomvc
