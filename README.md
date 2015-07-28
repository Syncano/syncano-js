# Syncano

[![NPM](https://nodei.co/npm/syncano.png?compact=true)](https://www.npmjs.com/package/syncano)

[![Code Climate](https://codeclimate.com/github/Syncano/syncano-js-lib/badges/gpa.svg)](https://codeclimate.com/github/Syncano/syncano-js-lib)  [![Test Coverage](https://codeclimate.com/github/Syncano/syncano-js-lib/badges/coverage.svg)](https://codeclimate.com/github/Syncano/syncano-js-lib/coverage)

## Getting Started
This library is inteded to be used with a [Syncano](http://www.syncano.com/) account. If you don't already have one - you can sign up [here](https://dashboard.syncano.io/?utm_source=syncano-js&utm_medium=readme&utm_campaign=github).

`syncano` is available as a client-side or server-side library. Depending on your requirements, you can use `bower` or `npm`.  Once downloaded, you can use in your project.

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

Each of these scopes have different types of functionality, and utilize different apiKeys.  Be sure to check the [full documentation] (http://docs.syncano.com/v4.0/docs/authentication) on authentication to be sure you get the appropriate key.

### Create a New Connection

Based on the type of authentication you need, you can initialize `syncano` with the following method and parameters:

```js
//returns an account scoped object
var account = new Syncano({accountKey : "MY_ACCOUNT_KEY"});  

//returns an instance scoped object
var instance = new Syncano({apiKey : "MY_INSTANCE_KEY", instance: "MY_INSTANCE_NAME"}); 
```

Once you have created, your initial object, all subsequent calls will be scoped under the initial object, until a new one is created. This should eliminate confusion around what your objects currently are responsible for. 

#### Account.Instance vs Instance Scope

It is important to note the difference between the Account Scope `instance` method, and the Instance scope.  `account.instance` allows you to manage _every_ instance in your Syncano account. This is something you need to be very cautious with, as the permissions are completely open with your `accountKey`. We recommend using this server side to act as a proxy to Syncano. 

The Instance scope, however, uses the `apiKey` and should be used from your applications client side.

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

The `object` never requires `id`, however, if passed allows the chain to be scoped to a specific object in your account. Scoped objects like this, typically produce a different set of functionality than the non-scoped objects (since they are now tied to a specific item in your account).

For example, methods like `detail()` could be celled with the `id` in the object place or the method place. This is mostly a preference based on how you are getting your data.

```js
account.instance().detail(MY_INSTANCE_NAME); //return a promise with MY_INSTANCE_NAME details
account.instance(MY_INSTANCE_NAME).detail(); //return a promise with MY_INSTANCE_NAME details
```
You can also continue to chain, passing in `id`s to get to correct object you need:

```js
account.instance(MY_INSTANCE_NAME).class(MY_CLASS_NAME).dataobject(ID).detail(); //return a promise with the details of DataObject 'id' in class 'MY_CLASS_NAME', in the instance 'MY_INSTANCE_NAME`
```




### Contributors

* Kelly Andrews  - [twitter](https://twitter.com/kellyjandrews), [github](https://github.com/kellyjandrews)
* Patrick Devivo - [twitter](https://twitter.com/patrickdevivo), [github](https://github.com/patrickdevivo)

### ChangeLog
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
