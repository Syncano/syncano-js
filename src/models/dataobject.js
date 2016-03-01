import stampit from 'stampit';
import {Meta, Model} from './base';
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
  * Updates single object based on provided arguments

  * @memberOf QuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} field to increment.
  * @returns {QuerySet}

  * @example {@lang javascript}
  * DataObject.please().increment({instanceName: 'my-instance', className: 'my-class'', id: 1}, {views: 1})

  */
  increment(properties = {}, object = {}) {
    const payload = {};
    payload[_.keys(object)[0]] = { _increment: object[_.keys(object)[0]] };
    this.properties = _.assign({}, this.properties, properties);
    this.payload = JSON.stringify(payload);

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  }

});

const DataObjectMeta = Meta({
  name: 'dataobject',
  pluralName: 'dataobjects',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{className}/objects/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{className}/objects/'
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
    presence: true
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
    increment(field, by) {
      if(!_.isNumber(this[field])) throw new Error(`The ${field} is not numeric.`);
      if(!_.isNumber(by)) throw new Error('The provided value is not numeric.');

      this[field] += _.add(this[field], by);

      return this.save();
    }
  })
  .setQuerySet(DataObjectQuerySet)
  .setConstraints(DataobjectConstraints);

export default DataObject;
