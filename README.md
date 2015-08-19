# Syncano

[![NPM](https://nodei.co/npm/syncano.png?compact=true)](https://www.npmjs.com/package/syncano)

[![Code Climate](https://codeclimate.com/github/Syncano/syncano-js-lib/badges/gpa.svg)](https://codeclimate.com/github/Syncano/syncano-js-lib)  [![Test Coverage](https://codeclimate.com/github/Syncano/syncano-js-lib/badges/coverage.svg)](https://codeclimate.com/github/Syncano/syncano-js-lib/coverage)

## Getting Started
This library is inteded to be used with a [Syncano](http://www.syncano.com/) account. If you don't already have one - you can sign up [here](https://dashboard.syncano.io/?utm_source=syncano-js&utm_medium=readme&utm_campaign=github).

`syncano` is available as a client-side or server-side library. Depending on your requirements, you can use `bower` or `npm`.  Once downloaded, you can use it in your project.

**Install from Bower**

```bash
bower install syncano --save
```

**Client-Side Usage**

Bower will install both [`bluebird`](https://github.com/petkaantonov/bluebird) and [`lodash`](https://lodash.com/) as dependencies. You will need to include those prior to `syncano.min.js`.

```html
<script src="path/to/bower_components/bluebird/js/browser/bluebird.min.js"></script>
<script src="path/to/bower_components/lodash/lodash.min.js"></script>
<script src="path/to/bower_components/syncano/dist/syncano.min.js"></script>
```

**Install from NPM**

```bash
npm install syncano --save
```

**Server-Side Usage**

`syncano` is written in CommonJS style, and is usable with build tools like [`Browserify`](http://browserify.org/).

```js
var Syncano = require('syncano');
```

## Using the Library

With the Syncano platform, there are two basic ways to interact with your account.
 * **Account Level Scope** - Interact with your account as the super admin (recommended for server side interaction)
 * **Instance Level Scope** - Connects to a specific app instance, and has limited permissions. This is what your app will utilize most, as the user specific methods are accessible here using the `userKey`.

Each of these scopes have different types of functionality, and utilize different apiKeys. Check out the [full documentation] (http://docs.syncano.com/v1.0/docs/authentication) on authentication to be sure you get the appropriate key.

### Create a New Connection

Based on the type of authentication you need, you can initialize `syncano` with the following method and parameters:

```js
//returns an account scoped object
var account = new Syncano({accountKey : "MY_ACCOUNT_KEY"});  

//returns an instance scoped object
var instance = new Syncano({apiKey : "MY_INSTANCE_KEY", instance: "MY_INSTANCE_NAME"});
```

Once you have created your initial object, all subsequent calls will be scoped under the initial object, until a new one is created. This should eliminate confusion around what your objects currently are responsible for.

### General Syncano Object Info

#### Method Chaining
All types of `syncano` objects use a method chaining pattern.  The typical pattern looks like this:

```js
scope.object([id]).method([id, params, filter {, callback}]); //return a promise
```

Depending on the method, `id`, `params`, or both may be required.  `filter` is never required, and `callback` is only required if you are not using promises.

#### Callbacks/Promises

For clarity - both of these patterns are acceptable:

```js
//Using Callbacks
scope.object().method(function(err, res){
   if (err) {console.log(err); return;}
   console.log(res);
   return;
});

//Using Promises - you must handle your errors!
scope.object().method()
.then(function(res){
   console.log(res);
   return;
})
.catch(function(err){
   console.log(err);
   return;
});
```

#### Passing `id`

The `object` never requires `id`, however, if passed it allows the chain to be scoped to a specific object in your account. Scoped objects like this, typically produce a different set of functionality than the non-scoped objects (since they are now tied to a specific item in your account).

For example, methods like `detail()` could be called with the `id` in the object place or the method place. This is mostly a preference based on how you are getting your data.

```js
account.instance().detail(MY_INSTANCE_NAME); //return a promise with MY_INSTANCE_NAME details
account.instance(MY_INSTANCE_NAME).detail(); //return a promise with MY_INSTANCE_NAME details
```
You can also continue to chain by passing in `id`s to get to the correct object.

```js
account.instance(MY_INSTANCE_NAME).class(MY_CLASS_NAME).dataobject(ID).detail(); //return a promise with the details of DataObject 'id' in class 'MY_CLASS_NAME', in the instance 'MY_INSTANCE_NAME`
```

#### Using as a Constructor

Every object is a `constructor` method, and will return a scoped object that you can store in memory for later usage. To invoke, simply use the `new` keyword to initialize.

```js
var my_instance = new account.instance(MY_INSTANCE_NAME)//returns an object scoped to 'MY_INSTANCE_NAME'
```
You can then continue the chaining as normal, and all promises and callbacks work as expected. The above `dataobject` example could look something like this, if you wanted to have a scoped object to that class in memory:

```js
var my_class = new account.instance(MY_INSTANCE_NAME).class(MY_CLASS_NAME) //return a class object scoped to 'MY_CLASS_NAME'
my_class.dataobject(ID).detail(); // also my_class.dataobject().detail(ID) - returns a promise with the data object's details.
```


### Contributors

* Kelly Andrews  - [twitter](https://twitter.com/kellyjandrews), [github](https://github.com/kellyjandrews)
* Patrick Devivo - [twitter](https://twitter.com/patrickdevivo), [github](https://github.com/patrickdevivo)
* Jhishan Khan - [twitter](https://twitter.com/jhishan), [github](https://github.com/jhishan)

### Change Log
* **0.2.6** - 2015-08-19
    * Added gulp-bump for versioning
* **0.2.5** - 2015-08-12
    * Fixes minification error with instances
* **0.2.4** - 2015-08-06
    * Fixed bug in standalone `syncano.js`
      * Added `browserify-shim` to get global modules for `Promise` and `_`
    * Updated `package.json` with additinal fields
    * Corrected version mismatch in bower module.
* **0.2.3** - 2015-08-04
    * Fixed token bug with social login
    * Corrected `user().group` and `group().user` pattern
      * Did not follow chainable method pattern
      * Now `user().group()` and `group().user()`
    * Added filter options `lastId` and `room`
      * Used with `channel().poll()` and `channel().history()`
    * Updated testing
* **0.2.2** - 2015-07-30
    * Added `baseUrl` to config
        * `new Syncano({baseUrl: 'http://newurl.com'});`
        * allows for testing with sandbox acocunt
    * Updated testing
* **0.2.1** - 2015-07-29
    * Added debug feature
        * `new Syncano({debug: true});``
        * Returns request response object in res.debug
    * Added check for query or filter when filtering data objects.
    * Fixed bug with query being encoded incorrectly
* **0.2.0** - 2015-07-28
    * complete overhaul of the library
    * removed dependancies from syncnano.js
      * syncano.js now depends on bluebird and lodash for client-side
    * completed unit testing
* **0.1.9** - 2015-07-07
    * added client side dist folder with minified and map versions
* **0.1.8** - 2015-07-06
    * added core functionality for instance level operations
    * unit testing for main functions started
