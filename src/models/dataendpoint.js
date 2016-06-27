import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet, {Filter} from '../querySet';


const DataEndpointQerySet = stampit().compose(QuerySet, Filter).methods({

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
  },
  /**
  * Renames DataEndpoint.
  * @memberOf DataEndpointQerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} payload object containing the payload to be sent
  * @returns {DataEndpointQerySet}

  * @example {@lang javascript}
  * DataEndpoint.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}, { new_name: 'new_name'}).then(function(dateendpoint) {});

  */
  rename(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'rename';
    this.payload = payload;

    return this;
  },
  /**
  * Clears cache of DataEndpoint.
  * @memberOf DataEndpointQerySet
  * @instance

  * @returns {DataEndpointQerySet}

  * @example {@lang javascript}
  * DataEndpoint.please().clearCache({name: 'dataViewName', instanceName: 'test-one'});

  */
  clearCache(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'clear_cache';

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

    * @param {String} cache_key the cache key for the result
    * @param {Object} filters object containing the filters for the query.
    * @returns {Promise}

    * @example {@lang javascript}
    * DataEndpoint.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});
    */
    fetchData(cache_key, filters = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('get', this);

      const query = {};
      if(!_.isEmpty(cache_key)) query.cache_key = cache_key;
      if(!_.isEmpty(filters)) query.query = JSON.stringify(filters)

      return this.makeRequest('GET', path, {query});
    },
    /**
    * Renames DataEndpoint.
    * @memberOf DataEndpoint
    * @instance

    * @param {Object} payload object containing the payload to be sent
    * @returns {Promise}

    * @example {@lang javascript}
    * DataEndpoint.rename({ new_name: 'new_name'}).then(function(dataendpoint) {});
    */
    rename(payload = { new_name: this.name }) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('rename', this);

      return this.makeRequest('POST', path, {payload})
        .then((response) => {
          this.name = response.name;
          return this.serialize(response);
        })
    },
    /**
    * Clears cache of DataEndpoint.
    * @memberOf DataEndpointQerySet
    * @instance

    * @returns {DataEndpointQerySet}

    * @example {@lang javascript}
    * DataEndpoint.clearCache();

    */
    clearCache() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('clear_cache', this);

      return this.makeRequest('POST', path);
    }

  });

export default DataEndpoint;
