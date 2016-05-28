import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';


const DataEndpointQerySet = stampit().compose(QuerySet).methods({

  /**
  * Fetches Data Objects matching the Data View properties.
  * @memberOf DataEndpointQerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {DataEndpointQerySet}

  * @example {@lang javascript}
  * DataEndpoint.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});

  */
  fetchData(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'get';
    this._serialize = false;

    return this;
  }

});

const DataEndpointMeta = Meta({
  name: 'dataview',
  pluralName: 'dataviews',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/data/'
    },
    'get': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/get/'
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/rename/'
    },
    'clear_cache': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/clear_cache/'
    }
  }
});

const DataEndpointConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    presence: true,
    string: true,
    length: {
      maximum: 64
    }
  },
  description: {
    string: true
  },
  class: {
    presence: true,
    string: true
  },
  query: {
    object: true
  },
  excluded_fields: {
    string: true
  },
  order_by: {
    string: true
  },
  page_size: {
    numericality: true
  },
  expand: {
    string: true
  }
};

/**
 * OO wrapper around data views {@link # endpoint}.
 * @constructor
 * @type {DataEndpoint}

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
const DataEndpoint = stampit()
  .compose(Model)
  .setMeta(DataEndpointMeta)
  .setQuerySet(DataEndpointQerySet)
  .setConstraints(DataEndpointConstraints)
  .methods({

    /**
    * Fetches Data Objects matching the Data View properties.
    * @memberOf DataEndpoint
    * @instance

    * @param {Object}
    * @returns {Promise}

    * @example {@lang javascript}
    * DataEndpoint.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});
    */
    fetchData() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('get', this);

      return this.makeRequest('GET', path);
    }

  });

export default DataEndpoint;
