import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';


const DataViewQerySet = stampit().compose(QuerySet).methods({

  /**
  * Fetches Data Objects matching the Data View properties.
  * @memberOf DataViewQerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {DataViewQerySet}

  * @example {@lang javascript}
  * DataView.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});

  */
  fetchData(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'get';
    this._serialize = false;

    return this;
  }

});

const DataViewMeta = Meta({
  name: 'dataview',
  pluralName: 'dataviews',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/api/objects/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/api/objects/'
    },
    'get': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/api/objects/{name}/get/'
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/api/objects/{name}/rename/'
    },
    'clear_cache': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/api/objects/{name}/clear_cache/'
    }
  }
});

const DataViewConstraints = {
  name: {
    presence: true,
    length: {
      maximum: 64
    }
  },
  class: {
    presence: true
  },
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

/**
 * OO wrapper around data views {@link # endpoint}.
 * @constructor
 * @type {DataView}

 * @property {String} name
 * @property {String} instanceName
 * @property {Object} query
 * @property {String} excluded_fields
 * @property {String} order_by
 * @property {Number} page_size
 * @property {String} expand
 * @property {String} class
 * @property {String} [description = null]
 * @property {String} [links = {}]
 */
const DataView = stampit()
  .compose(Model)
  .setMeta(DataViewMeta)
  .setQuerySet(DataViewQerySet)
  .setConstraints(DataViewConstraints)
  .methods({

    /**
    * Fetches Data Objects matching the Data View properties.
    * @memberOf DataView
    * @instance

    * @param {Object}
    * @returns {Promise}

    * @example {@lang javascript}
    * DataView.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});
    */
    fetchData() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('get', this);

      return this.makeRequest('GET', path);
    }

  });

export default DataView;
