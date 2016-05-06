# Syncano Javascript Library
[![npm version](https://badge.fury.io/js/syncano.svg)](https://badge.fury.io/js/syncano) [![Circle CI](https://circleci.com/gh/Syncano/syncano-js/tree/master.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-js/tree/master)

This library enables you to interact with the [Syncano](http://syncano.io) platform via Javascript. For more information on the platform, please refer to the [docs](http://docs.syncano.io/docs/getting-started-with-syncano/) and the [FAQ](https://www.syncano.io/support/).

Also check out our libraries for [iOS](https://github.com/Syncano/syncano-ios), [Python](https://github.com/Syncano/syncano-python), [Ruby](https://github.com/Syncano/syncano-ruby), [Android](https://github.com/Syncano/syncano-android) and [Arduino](https://github.com/Syncano/syncano-arduino). We also have an [AngularJs integration](https://github.com/Syncano/ng-syncano) available.

## Getting started

In order to use the plaftorm, you need an account - you can sign up [here](https://dashboard.syncano.io/?utm_source=github&utm_medium=readme&utm_campaign=syncano-js).

The library can be used server-side and client-side. You can install the library using `npm`, `bower` or by downloading a [release](https://github.com/Syncano/syncano-js/releases) from the Github repository.

### Installing from Bower

```
bower install syncano --save
```

### Client-side usage

```
<script src="path/to/bower_components/syncano/dist/syncano.min.js"></script>
```

### Installing from NPM

```
npm install syncano --save
```

### Server-side usage

The library supports the CommonJS syntax:

```
var Syncano = require('syncano');
```

You can also use it with ES6 modules:

```
import Syncano from 'syncano';
```

## Creating a connection

To create a connection, simply initialize the `Syncano` object with the following configuration parameters:

```
// create a connection with an account key
var connection = Syncano({ accountKey: 'MY_ACCOUNT_KEY'});

// create a connection with a user key
var connection = Syncano({ userKey: 'USER_KEY'});

// create a connection with a social token
var connection = Syncano({ socialToken: 'SOCIAL_TOKEN'});

// create a connection with a api key
var connection = Syncano({ apiKey: 'API_KEY'});
```

From now on, you can access all of the objects on the platform via the `connection` object.

## Basic interactions

### Model instances

The `connection` you configured in the previous step has a set of factories that  make interacting with objects on the platform easier. For example, if you would like to create a new instance object, you can do it like so:

```
var instance = connection.Instance({ name: 'INSTANCE_NAME', description: 'INSTANCE_DESCRIPTION' });
```

You can later save the instance, by calling its `save` method:

```
instance.save();

```

### Nested models

The objects (models) are also nested, so if you would like to list the `Classes` of an `Instance`, there's an elegant function chain for that:

```
connection.Instance({name: 'silent-dawn-3609'}).classes().list()
```
### QuerySet

Every model has a static `please` method that returns a `QuerySet` object allowing you to perform additional queries like like listing objects:

```
connection.Instance.please().list();
```

### Promises

The library uses Promises to enforce writing more readable and elegant code. You can get the result of a query with the `then` metod and the errors with the `catch` method:

```
connection.Instance.please().list()
  .then(function(result) {
    // handle result
  })
  .catch(function(error) {
    // handle error
  });
```

## Contributing

This library is built using [Stampit](https://github.com/stampit-org/stampit). If you find a bug, feel free to submit an [issue](https://github.com/Syncano/syncano-js/issues). If you would like to directly contribute to the library, we are open for pull requests.

## Contributors
* Daniel Kopka - [twitter](https://twitter.com/danielkopka), [github](https://github.com/dancio)
* Jakub Bilko - [twitter](https://twitter.com/jakubbilko), [github](https://github.com/jakubbilko)
