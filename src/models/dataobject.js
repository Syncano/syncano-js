import stampit from 'stampit';
import {Meta, Model} from './base';
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
    * Selects specified fields from DataObject.

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
  .setQuerySet(DataObjectQuerySet)
  .setConstraints(DataobjectConstraints);

export default DataObject;
