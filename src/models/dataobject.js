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
    presence: true,
    length: {
      minimum: 5
    }
  }
};

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
