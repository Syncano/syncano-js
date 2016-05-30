import stampit from 'stampit';
import Promise from 'bluebird';
import _ from 'lodash';
import Request from './request';
import PaginationError from './errors';
import moment from 'moment';

/**
 * Wrapper around plain JavaScript Array which provides two additional methods for pagination.
 * @constructor
 * @type {ResultSet}

 * @param {QuerySet}  querySet
 * @param {String}  response
 * @param {Array}  objects
 * @returns {ResultSet}

 * @property {Function}  next
 * @property {Function}  prev

 * @example {@lang javascript}
 * Instance.please().list()
 *   // get next page
 *   .then((instances) => instances.next())
 *
 *   // get prev page
 *   .then((instances) => instances.prev())
 *
 *   .then((instances) => console.log('instances', instances));
 */
const ResultSet = function(querySet, response, objects) {
  let results = [];
  results.push.apply(results, objects);


  /**
  * Helper method which will fetch next page or throws `PaginationError`.

  * @memberOf ResultSet
  * @instance

  * @throws {PaginationError}
  * @returns {Promise}
  */
  results.next = () => {
    if (!response.next) {
      return Promise.reject(new PaginationError('There is no next page'));
    }

    return new Promise((resolve, reject) => {
      return querySet
        .request(response.next, {query: {}})
        .spread(resolve)
        .catch(reject);
    });
  };

  /**
  * Helper method which will check if next page is available.

  * @memberOf ResultSet
  * @instance

  * @returns {Boolean}
  */
  results.hasNext = () => response.next !== null;

  /**
  * Helper method which will fetch previous page or throws `PaginationError`.

  * @memberOf ResultSet
  * @instance

  * @throws {PaginationError}
  * @returns {Promise}
  */
  results.prev = () => {
    if (!response.prev) {
      return Promise.reject(new PaginationError('There is no previous page'));
    }

    return new Promise((resolve, reject) => {
      return querySet
        .request(response.prev, {query: {}})
        .spread(resolve)
        .catch(reject);
    });
  };

  /**
  * Helper method which will check if prev page is available.

  * @memberOf ResultSet
  * @instance

  * @returns {Boolean}
  */
  results.hasPrev = () => response.prev !== null;

  return results;
}

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
    _serialize: true,
    resultSetEndpoints: ['list']
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

      if (_.includes(this.resultSetEndpoints, this.endpoint)) {
        return this.asResultSet(response);
      }

      return this.model.fromJSON(response, this.properties);
    },

    /**
    * Converts API response into {ResultSet}

    * @memberOf QuerySet
    * @instance
    * @private

    * @param {Object} response raw JavaScript objects
    * @param {String} lookupField additional field to search for data
    * @returns {ResultSet}
    */
    asResultSet(response, lookupField) {
      const objects = _.map(response.objects, (object) => {
        const obj = lookupField ? object[lookupField] : object;
        return this.model.fromJSON(obj, this.properties)
      });
      return ResultSet(this, response, objects);
    },

    /**
    * Executes current state of QuerySet

    * @memberOf QuerySet
    * @instance

    * @param {String} [requestPath = null]
    * @param {Object} [requestOptions = {}]
    * @returns {Promise}

    * @example {@lang javascript}
    * Instance.please().list().request().then(function(instance) {});

    */
    request(requestPath = null, requestOptions = {}) {
      const meta = this.model.getMeta();
      const endpoint = meta.endpoints[this.endpoint] || {};
      const allowedMethods = endpoint.methods || [];
      const path = requestPath || meta.resolveEndpointPath(this.endpoint, this.properties);
      const method = this.method.toLowerCase();
      const options = _.defaults(requestOptions, {
        headers: this.headers,
        query: this.query,
        payload: this.payload,
        attachments: this.attachments,
        responseAttr: this.responseAttr
      });

      if (!_.includes(allowedMethods, method)) {
        return Promise.reject(new Error(`Invalid request method: "${this.method}".`));
      }

      return this.makeRequest(method, path, options).then((body) => [this.serialize(body), body]);
    },

    /**
    * Wrapper around {@link Queryset.request} method

    * @memberOf QuerySet
    * @instance

    * @param {function} callback
    * @returns {Promise}
    */
    then(callback) {
      return this.request().spread(callback);
    }
  });


export const Create = stampit().methods({

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

export const Get = stampit().methods({

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

export const GetOrCreate = stampit().methods({

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

export const List = stampit().methods({

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

export const Delete = stampit().methods({

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

export const Update = stampit().methods({

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

const TemplateResponse = stampit().methods({

  /**
  * Renders the api response as a template.

  * @memberOf QuerySet
  * @instance

  * @param {template_name} name of template to be rendered
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject
    .please()
    .list({instanceName: 'my-instance', className: 'my-class'})
    .templateResponse('objects_html_table')
    .then(function(objects) {});
  */
  templateResponse(template_name) {
    this._serialize = false;
    this.responseAttr = 'text';
    this.query['template_response'] = template_name;
    return this;
  }

});

export const UpdateOrCreate = stampit().methods({

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

const ExcludedFields = stampit().methods({
  /**
    * Removes specified fields from object response.

    * @memberOf QuerySet
    * @instance

    * @param {Object} fields
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).excludedFields(['title', 'author']).then(function(dataobjects) {});

    */
  excludedFields(fields = []) {
    this.query['excluded_fields'] = fields.join();
    return this;
  }
});

const Fields = stampit().methods({
  /**
    * Selects specified fields from object.

    * @memberOf QuerySet
    * @instance

    * @param {Object} fields
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).fields(['title', 'author']).then(function(dataobjects) {});

    */
  fields(fields = []) {
    this.query['fields'] = fields.join();
    return this;
  }
});

export const First = stampit().methods({

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
    return this.pageSize(1)
      .list(properties, query)
      .then((objects) => {
        if (objects.length) {
          return objects[0];
        }
      });
  }
});

export const PageSize = stampit().methods({

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

export const CurrentMonth = stampit().methods({

  /**
  * Sets the range of Usage query to current month.

  * @memberOf QuerySet
  * @instance

  * @returns {QuerySet}

  * @example {@lang javascript}
  * DailyUsage.please().list().currentMonth().then(function(usage) {});

  */
  currentMonth() {
    this.query['start'] = moment().startOf('month').format('YYYY-MM-DD');
    this.query['end'] = moment().endOf('month').format('YYYY-MM-DD');
    return this;
  }

});

export const StartDate = stampit().methods({

  /**
  * Sets start date for Usage.

  * @memberOf QuerySet
  * @instance

  * @param {Date} date
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DailyUsage.please().list().startDate(new Date()).then(function(usage) {});

  */
  startDate(date) {
    this.query['start'] = moment(date).format('YYYY-MM-DD');
    return this;
  }

});

export const EndDate = stampit().methods({

  /**
  * Sets end date for Usage.

  * @memberOf QuerySet
  * @instance

  * @param {Date} date
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DailyUsage.please().list().endDate(new Date()).then(function(usage) {});

  */
  endDate(date) {
    this.query['end'] = moment(date).format('YYYY-MM-DD');
    return this;
  }

});

export const Total = stampit().methods({

  /**
  * Sets grouping for Usage.

  * @memberOf QuerySet
  * @instance

  * @returns {QuerySet}

  * @example {@lang javascript}
  * DailyUsage.please().list().total().then(function(usage) {});

  */
  total() {
    this.query['total'] = true;
    return this;
  }

});

export const Ordering = stampit().methods({

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

export const Raw = stampit().methods({

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

export const BulkCreate = stampit().methods({

  /**
  * Creates many objects based on provied Array of objects.

  * @memberOf QuerySet
  * @instance

  * @param {Array} objects
  * @returns {Promise}

  * @example {@lang javascript}
  * const objects = [Instance({name: 'test1'}), Instance({name: 'tes21'})];
  * Instance.please().bulkCreate(objects).then(function(instances) {
  *   console.log('instances', instances);
  * });

  */
  bulkCreate(objects) {
    return Promise.mapSeries(objects, (o) => o.save());
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
  BulkCreate,
  Get,
  GetOrCreate,
  List,
  Delete,
  Update,
  UpdateOrCreate,
  First,
  PageSize,
  Ordering,
  Fields,
  ExcludedFields,
  Raw,
  TemplateResponse
);

export const BaseQuerySet = stampit.compose(
  QuerySetRequest,
  Raw,
  Fields,
  ExcludedFields,
  Ordering,
  First,
  PageSize,
  TemplateResponse
);

export default QuerySet;
