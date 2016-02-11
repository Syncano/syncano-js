This tutorial will walk you through our ORM syntax and how to use it to make proper API calls.

### Creating a Connection

In each example I'll be assuming that you have configured connection to `syncano` and you are using `ES6` syntax:

```
import Syncano from 'syncano';

const connection = Syncano({accountKey: 'YOUR_KEY'})
```

### Creating objects

A model class represents a single ``Syncano API`` endpoint, and an instance of that class represents a particular record in this endpoint.

To create an object, instantiate it using **object** argument and then call {@link Model.save} to save it to the ``Syncano API``.

Here’s an example:

```
connection.Instance({name: 'test-one', description:''}).save().then((instance) => {
   // your new instance
});
```

This performs a **POST** request to ``Syncano API`` behind the scenes.
Syncano doesn’t hit the API until you explicitly call {@link Model#save}.

##### Note
To create and save **an object** in a single step, use the {@link QuerySet#create} method.


### Saving changes to objects

To save changes to an object that’s already in the ``Syncano API``, use {@link Model#save}.
Regarding our **instance** from previous example, this example changes its description and updates its record in the ``Syncano API``:

```
instance.description = 'new description'
instance.save().then((updatedInstance) => {
    console.log(updatedInstance.description); // will produce 'new description'
});
```

This performs a **PUT** request to ``Syncano API`` behind the scenes.
Syncano doesn’t hit the API until you explicitly call {@link Model#save}.

##### Note
To change and save **an object** in a single step, use the {@link QuerySet#create} method.


Retrieving objects
------------------

To retrieve objects from ``Syncano API``, construct a query via a {@link QuerySet} on your model class.

Each model has only one {@link QuerySet#create}, and it’s called **please** by default.
Access it directly via the model class, like so:

```
connection.Instance.please()
```

##### Note
{@link QuerySet} is accessible only via model classes, rather than from model instances,
to enforce a separation between “table-level” operations and “record-level” operations.


### Retrieving all objects

The simplest way to retrieve objects from a ``Syncano API`` is to get all of them.
To do this, use the {@link QuerySet#list} method on a {@link QuerySet}:

```
connection.Instance.please().list().then((instances) => {
    console.log('instances', instances);
});
```

##### Note
This performs a **GET** request to ``Syncano API`` list endpoint behind the scenes.


QuerySet is lazy
---------------

{@link QuerySet} is lazy – the act of creating a **QuerySet** doesn’t involve any API activity.
You can stack QuerySet methods all day long, and Syncano won’t actually run the API call until the **QuerySet** is evaluated.
Take a look at this example::

```
Instance.please().pageSize(1).ordering('desc').then(() => {

});
```

Though this looks like two API calls, in fact it hits API only once, at the last chain (``then``).
In general, the results of a {@link QuerySet} aren’t fetched from API until you “ask” for them.