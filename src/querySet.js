import stampit from 'stampit';
import Promise from 'bluebird';
import _ from 'lodash';
import Request from './request';


const QuerySetRequest = stampit().compose(Request)
  .refs({
    model: null
  })
  .props({
    endpoint: 'list',
    method: 'GET',
    headers: {},

    properties: {},
    query: {},
    payload: {},
    attachments: {},
    _serialize: true
  })
  .methods({

    /**
    * Converts raw objects to {@link https://github.com/stampit-org/stampit|stampit} instances

    * @memberOf QuerySet
    * @instance
    * @private

    * @param {Object} response raw JavaScript objects
    * @returns {Object}
    */
    serialize(response) {
      if (this._serialize === false) {
        return response;
      }

      if (this.endpoint === 'list') {
        return _.map(response.objects, (object) => this.model.fromJSON(object, this.properties));
      }

      return this.model.fromJSON(response, this.properties);
    },

    /**
    * Executes current state of QuerySet

    * @memberOf QuerySet
    * @instance
    * @returns {Promise}

    * @example {@lang javascript}
    * Instance.please().list().request().then(function(instance) {});

    */
    request() {
      const meta = this.model.getMeta();
      const endpoint = meta.endpoints[this.endpoint] || {};
      const allowedMethods = endpoint.methods || [];
      const path = meta.resolveEndpointPath(this.endpoint, this.properties);
      const method = this.method.toLowerCase();
      const requestOptions = {
        headers: this.headers,
        query: this.query,
        payload: this.payload,
        attachments: this.attachments
      };

      return new Promise((resolve, reject) => {
        if (!_.includes(allowedMethods, method)) {
          return reject(new Error(`Invalid request method: "${this.method}".`));
        }

        this.makeRequest(method, path, requestOptions, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(this.serialize(res.body), res);
        });
      })
    },

    /**
    * Wrapper around {@link Queryset.request} method

    * @memberOf QuerySet
    * @instance

    * @param {function} callback
    * @returns {Promise}
    */
    then(callback) {
      return this.request().then(callback);
    }
  });


const Create = stampit().methods({

  /**
  * A convenience method for creating an object and saving it all in one step.

  * @memberOf QuerySet
  * @instance

  * @param {Object} object
  * @returns {Promise}

  * @example {@lang javascript}
  * // Thus:
  *
  * Instance
  *  .please()
  *  .create({name: 'test-one', description: 'description'})
  *  .then(function(instance) {});
  *
  * // and:
  *
  * var instance = Instance({name: 'test-one', description: 'description'});
  * instance.save().then(function(instance) {});
  *
  * // are equivalent.

  */
  create(object) {
    const attrs = _.assign({}, this.properties, object);
    const instance = this.model(attrs);

    return instance.save();
  }
});

const Get = stampit().methods({

  /**
  * Returns the object matching the given lookup properties.
  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance.please().get({name: 'test-one'}).then(function(instance) {});

  */
  get(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'detail';

    return this;
  }
});

const GetOrCreate = stampit().methods({

  /**
  * A convenience method for looking up an object with the given lookup properties, creating one if necessary.
  * Successful callback will receive **object, created** arguments.

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties attributes which will be used for object retrieving
  * @param {Object} defaults attributes which will be used for object creation
  * @returns {Promise}

  * @example {@lang javascript}
  * Instance
  *   .please()
  *   .getOrCreate({name: 'test-one'}, {description: 'test'})
  *   .then(function(instance, created) {});
  *
  * // above is equivalent to:
  *
  * Instance
  *   .please()
  *   .get({name: 'test-one'})
  *   .then(function(instance) {
  *     // Get
  *   })
  *   .catch(function() {
  *     // Create
  *     return Instance.please().create({name: 'test-one', description: 'test'});
  *   });

  */
  getOrCreate(properties = {}, defaults = {}) {
    return new Promise((resolve, reject) => {
      this.get(properties)
        .then((object) => resolve(object, false))
        .catch(() => {
          const attrs = _.assign({}, this.properties, properties, defaults);
          return this.create(attrs)
            .then((object) => resolve(object, true))
            .catch(reject);
        });
    });
  }
});

const List = stampit().methods({

  /**
  * Returns list of objects that match the given lookup properties.

  * @memberOf QuerySet
  * @instance

  * @param {Object} [properties = {}] lookup properties used for path resolving
  * @param {Object} [query = {}]
  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance.please().list().then(function(instances) {});
  * Class.please().list({instanceName: 'test-one'}).then(function(classes) {});

  */
  list(properties = {}, query = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.query = _.assign({}, this.query, query);

    this.method = 'GET';
    this.endpoint = 'list';
    return this;
  }
});

const Delete = stampit().methods({

  /**
  * Removes single object based on provided properties.

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance.please().delete({name: 'test-instance'}).then(function() {});
  * Class.please().delete({name: 'test', instanceName: 'test-one'}).then(function() {});

  */
  delete(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'DELETE';
    this.endpoint = 'detail';
    return this;
  }
});

const Update = stampit().methods({

  /**
  * Updates single object based on provided arguments

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} object attributes to update
  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance
    .please()
    .update({name: 'test-instance'}, {description: 'new one'})
    .then(function(instance) {});

  * Class
    .please()
    .update({name: 'test', instanceName: 'test-one'}, {description: 'new one'})
    .then(function(cls) {});

  */
  update(properties = {}, object = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = object;

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  }
});

const UpdateOrCreate = stampit().methods({

  /**
  * A convenience method for updating an object with the given properties, creating a new one if necessary.
  * Successful callback will receive **object, updated** arguments.

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} [object = {}] object with (field, value) pairs used in case of update
  * @param {Object} [defaults = {}] object with (field, value) pairs used in case of create
  * @returns {Promise}

  * @example {@lang javascript}
  * Instance
  *   .please()
  *   .updateOrCreate({name: 'test-one'}, {description: 'new-test'}, {description: 'create-test'})
  *   .then(function(instance, updated) {});
  *
  * // above is equivalent to:
  *
  * Instance
  *   .please()
  *   .update({name: 'test-one'}, {description: 'new-test'})
  *   .then(function(instance) {
  *     // Update
  *   })
  *   .catch(function() {
  *     // Create
  *     return Instance.please().create({name: 'test-one', description: 'create-test'});
  *   });

  */
  updateOrCreate(properties = {}, object = {}, defaults = {}) {
    return new Promise((resolve, reject) => {
      this.update(properties, object)
        .then((_object) => resolve(_object, true))
        .catch(() => {
          const attrs = _.assign({}, this.properties, properties, defaults);
          return this.create(attrs)
            .then((_object) => resolve(_object, false))
            .catch(reject);
        })
    });
  }
});

const First = stampit().methods({

  /**
  * Returns the first object matched by the lookup properties or undefined, if there is no matching object.

  * @memberOf QuerySet
  * @instance

  * @param {Object} [properties = {}]
  * @param {Object} [query = {}]
  * @returns {Promise}

  * @example {@lang javascript}
  * Instance.please().first().then(function(instance) {});
  * Class.please().first({instanceName: 'test-one'}).then(function(cls) {});

  */
  first(properties = {}, query = {}) {
    return new Promise((resolve, reject) => {
      this.pageSize(1)
        .list(properties, query)
        .then((objects) => {
          if (objects.length > 0) {
            resolve(objects[0]);
          } else {
            resolve();
          }
        })
        .catch(reject)
    });
  }
});

const PageSize = stampit().methods({

  /**
  * Sets page size.

  * @memberOf QuerySet
  * @instance

  * @param {Number} value
  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance.please().pageSize(2).then(function(instances) {});
  * Class.please({instanceName: 'test-one'}).pageSize(2).then(function(classes) {});

  */
  pageSize(value) {
    this.query['page_size'] = value;
    return this;
  }
});

const Filter = stampit().methods({

  /**
  * Filters DataObjects.

  * @memberOf QuerySet
  * @instance

  * @param {Object} query
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject.list({ instanceName: 'test-instace', className: 'test-class' }).filter({ field_name: { _contains: 'Lord Of The Rings' }}).then(function(dataobjects) {});

  */
  filter(query = {}) {
    this.query = _.assign({}, this.query, query);
    return this;
  }
});

const Ordering = stampit().methods({

  /**
  * Sets order of returned objects.

  * @memberOf QuerySet
  * @instance

  * @param {String} [value = 'asc'] allowed choices are "asc" and "desc"
  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance.please().ordering('desc').then(function(instances) {});
  * Class.please({instanceName: 'test-one'}).ordering('desc').then(function(classes) {});

  */
  ordering(value = 'asc') {
    const allowed = ['asc', 'desc'];
    const ordering = value.toLowerCase();

    if (!_.includes(allowed, ordering)) {
      throw Error(`Invalid order value: "${value}", allowed choices are ${allowed.join()}.`);
    }

    this.query['ordering'] = ordering;
    return this;
  }
});

const Raw = stampit().methods({

  /**
  * Disables serialization. Callback will will recive raw JavaScript objects.

  * @memberOf QuerySet
  * @instance

  * @returns {QuerySet}

  * @example {@lang javascript}
  * Instance.please().raw().then(function(response) {});
  * Class.please({instanceName: 'test-one'}).raw().then(function(response) {});

  */
  raw() {
    this._serialize = false;
    return this;
  }
});

/**
 * Base class responsible for all ORM (``please``) actions.
 * @constructor
 * @type {QuerySet}

 * @property {Object}  model
 * @property {String}  [endpoint = 'list']
 * @property {String}  [method = 'GET']
 * @property {Object}  [headers = {}]
 * @property {Object}  [properties = {}]
 * @property {Object}  [query = {}]
 * @property {Object}  [payload = {}]
 * @property {Object}  [attachments = {}]
 * @property {Boolean}  [_serialize = true]
 */
const QuerySet = stampit.compose(
  QuerySetRequest,
  Create,
  Get,
  GetOrCreate,
  List,
  Delete,
  Update,
  UpdateOrCreate,
  First,
  PageSize,
  Ordering,
  Filter,
  Raw
);

export default QuerySet;
