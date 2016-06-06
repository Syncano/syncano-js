import stampit from 'stampit';
import {Meta, Model} from './base';
import Promise from 'bluebird';
import _ from 'lodash';
import QuerySet from '../querySet';

const DataObjectQuerySet = stampit().compose(QuerySet).methods({
  /**
    * Filters DataObjects.

    * @memberOf QuerySet
    * @instance

    * @param {Object} filters
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).filter({ field_name: { _contains: 'Lord Of The Rings' }}).then(function(dataobjects) {});

    */
  filter(filters = {}) {
    this.query['query'] = JSON.stringify(filters);
    return this;
  },
  /**
    * Orders DataObject by field.

    * @memberOf QuerySet
    * @instance

    * @param {String} field
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).orderBy('author').then(function(dataobjects) {});
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).orderBy('-author').then(function(dataobjects) {});

    */
  orderBy(field) {
    this.query['order_by'] = field;
    return this;
  },
  /**
  * Adds an array to an array field.

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} field to add to.
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject.please().add({instanceName: 'my-instance', className: 'my-class', id: 1}, {array_field: [1,2]})

  */
  add(properties = {}, object = {}) {
    const payload = {};
    payload[_.keys(object)[0]] = { _add: object[_.keys(object)[0]] };
    this.properties = _.assign({}, this.properties, properties);
    this.payload = JSON.stringify(payload);

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  },
  /**
  * Adds an array to an array field without duplicate values.

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} field to add to.
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject.please().add({instanceName: 'my-instance', className: 'my-class', id: 1}, {array_field: [1,2]})

  */
  addUnique(properties = {}, object = {}) {
    const payload = {};
    payload[_.keys(object)[0]] = { _addunique: object[_.keys(object)[0]] };
    this.properties = _.assign({}, this.properties, properties);
    this.payload = JSON.stringify(payload);

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  },
  /**
    * Filters DataObjects using _is.

    * @memberOf QuerySet
    * @instance

    * @param {String} field name
    * @param {Object} filters
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({instanceName: 'my-instance', className: 'books'}).is('authors', { name: { _eq: 'Stephen King'}})

    */
  is(field, object = {}) {
    const query = {};
    query[field] = { _is: object};
    return this.filter(query);
  },
  /**
    * Filters DataObjects using _contains.

    * @memberOf QuerySet
    * @instance

    * @param {String} field name
    * @param {Array} array of ids
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({instanceName: 'my-instance', className: 'books'}).contains('authors', [1, 2, 3])

    */
  contains(field, array = []) {
    const query = {};
    query[field] = { _contains: array};
    return this.filter(query);
  },
  /**
  * Subtracts an array from an array field.

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} field to subtract from.
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject.please().remove({instanceName: 'my-instance', className: 'my-class', id: 1}, {array_field: [1,2]})

  */
  remove(properties = {}, object = {}) {
    const payload = {};
    payload[_.keys(object)[0]] = { _remove: object[_.keys(object)[0]] };
    this.properties = _.assign({}, this.properties, properties);
    this.payload = JSON.stringify(payload);

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  },
  /**
  * Increments single object based on provided arguments

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} field to increment.
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject.please().increment({instanceName: 'my-instance', className: 'my-class', id: 1}, {views: 1})

  */
  increment(properties = {}, object = {}) {
    const payload = {};
    payload[_.keys(object)[0]] = { _increment: object[_.keys(object)[0]] };
    this.properties = _.assign({}, this.properties, properties);
    this.payload = JSON.stringify(payload);

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  },
  /**
    * Filters dataobjects by a geopoint field.

    * @memberOf QuerySet
    * @instance

    * @param {Object} coordinates
    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).near({ geopoint_field_name: { latitude: POINT_LATITUDE, longitude: POINT_LONGITUDE }}).then(function(dataobjects) {});

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).near({ geopoint_field_name: { latitude: POINT_LATITUDE, longitude: POINT_LONGITUDE, distance_in_kilometers: DISTANCE_IN_KILOMETERS }}).then(function(dataobjects) {});

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).near({ geopoint_field_name: { latitude: POINT_LATITUDE, longitude: POINT_LONGITUDE, distance_in_miles: DISTANCE_IN_MILES }}).then(function(dataobjects) {});

    */
  near(object = {}) {
    const query = {};
    query[_.keys(object)[0]] = { _near: object[_.keys(object)[0]]};
    return this.filter(query);
  },
  /**
    * Returns DataObject count.

    * @memberOf QuerySet
    * @instance

    * @returns {QuerySet}

    * @example {@lang javascript}
    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).count().then(function(response) {});

    */
  count() {
    this.query['include_count'] = true;
    this.raw();
    return this;
  }

});

const DataObjectMeta = Meta({
  name: 'dataobject',
  pluralName: 'dataobjects',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'post', 'get'],
      'path': '/v1.1/instances/{instanceName}/classes/{className}/objects/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/classes/{className}/objects/'
    }
  }
});

const DataobjectConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  className: {
    presence: true,
    string: true
  },
  owner: {
    numericality: true
  },
  owner_permissions: {
    inclusion: ['none', 'read', 'write', 'full']
  },
  group: {
    numericality: true
  },
  group_permissions: {
    inclusion: ['none', 'read', 'write', 'full']
  },
  other_permissions: {
    inclusion: ['none', 'read', 'write', 'full']
  },
  channel: {
    string: true
  },
  channel_room: {
    string: true
  }
};

/**
 * OO wrapper around instance data objects {@link http://docs.syncano.com/v4.0/docs/view-data-objects endpoint}.
 * This model is special because each instance will be **dynamically populated** with fields defined in related {@link Class} schema attribute.
 * @constructor
 * @type {DataObject}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} className
 * @property {Number} revision
 * @property {Number} [owner = null]
 * @property {String} [owner_permissions = null]
 * @property {Number} [group = null]
 * @property {String} [group_permissions = null]
 * @property {String} [other_permissions = null]
 * @property {String} [channel = null]
 * @property {String} [channel_room = null]

 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const DataObject = stampit()
  .compose(Model)
  .setMeta(DataObjectMeta)
  .methods({
    /**
    * Increments single object field based on provided arguments

    * @memberOf QuerySet
    * @instance

    * @param {String} field name.
    * @param {Number} value to increment the field by,
    * @returns {QuerySet}

    * @example {@lang javascript}
    * Object.increment('views', 1);

    */
    increment(field, by) {
      if(!_.isNumber(this[field])) return Promise.reject(new Error(`The ${field} is not numeric.`));
      if(!_.isNumber(by)) return Promise.reject(new Error('The provided value is not numeric.'));

      this[field] += _.add(this[field], by);

      return this.save();
    },
    /**
    * Adds an array to an array field.

    * @memberOf QuerySet
    * @instance

    * @param {String} field name.
    * @param {Array} array to add to the field.
    * @returns {QuerySet}

    * @example {@lang javascript}
    * Object.add('authors', [1,2,3]);

    */
    add(field, array) {
      if(!_.isArray(this[field].value)) return Promise.reject(new Error(`The ${field} is not an array.`));
      if(!_.isArray(array)) return Promise.reject(new Error('The provided value is not an array.'));

      this[field] = _.concat(this[field].value, array);

      return this.save();
    },
    /**
    * Adds an array to an array field without duplicate values.

    * @memberOf QuerySet
    * @instance

    * @param {String} field name.
    * @param {Array} array to add to the field.
    * @returns {QuerySet}

    * @example {@lang javascript}
    * Object.add('authors', [1,2,3]);

    */
    addUnique(field, array) {
      if(!_.isArray(this[field].value)) return Promise.reject(new Error(`The ${field} is not an array.`));
      if(!_.isArray(array)) return Promise.reject(new Error('The provided value is not an array.'));

      this[field] = _.union(this[field].value, array);

      return this.save();
    },
    /**
    * Subtracts an array from an array field.

    * @memberOf QuerySet
    * @instance

    * @param {String} field name.
    * @param {Array} array to subtract from the field.
    * @returns {QuerySet}

    * @example {@lang javascript}
    * Object.remove('authors', [1]);

    */
    remove(field, array) {
      if(!_.isArray(this[field].value)) return Promise.reject(new Error(`The ${field} is not an array.`));
      if(!_.isArray(array)) return Promise.reject(new Error('The provided value is not an array.'));

      this[field] = _.difference(this[field].value, array);

      return this.save();
    }
  })
  .setQuerySet(DataObjectQuerySet)
  .setConstraints(DataobjectConstraints);

export default DataObject;
