import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Delete, Update, Create, Get} from '../querySet';
import _ from 'lodash';

const CustomSocketQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Create,
  Update,
  Delete,
  Get
)
.methods({

  recheck(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'recheck';
    this.raw();

    return this;
  },

  getEndpointDetails(properties) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'endpointDetail';
    this.raw();

    return this;
  },

  getRequest(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'endpoint';
    this.query = payload;
    this.raw();

    return this;
  },

  postRequest(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'endpoint';
    this.payload = payload;
    this.raw();

    return this;
  }

})

const CustomSocketMeta = Meta({
  name: 'customsocket',
  pluralName: 'customsockets',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/sockets/{name}/'
    },
    'recheck': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/sockets/{name}/recheck/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/sockets/'
    },
    'endpointDetail': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/sockets/{name}/endpoints/{endpoint_name}/'
    },
    'endpoint': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/sockets/{endpoint_name}/'
    }
  }
});

const CostomSocketConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    presence: true
  },
  endpoints: {
    object: true
  },
  dependencies: {
    array: true
  }
};

/**
 * OO wrapper around CustomSocket.
 * @constructor
 * @type {CustomSocket}

 */
const CustomSocket = stampit()
  .compose(Model)
  .setQuerySet(CustomSocketQuerySet)
  .setMeta(CustomSocketMeta)
  .props({
    endpoints: {}
  })
  .methods({

    recheck() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('recheck', this);

      return this.makeRequest('POST', path);
    },

    addEndpoint(endpoint = {}) {
      this.endpoints = _.assign({}, this.endpoints, { [endpoint.name]: { calls: endpoint.calls }});

      return this;
    },

    getEndpointDetails(endpoint_name) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('endpointDetail', _.assign({}, this, {endpoint_name}));

      return this.makeRequest('GET', path);
    },

    getRequest(endpoint_name, payload) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('endpoint', _.assign({}, this, {endpoint_name}));

      return this.makeRequest('GET', path, {query: payload});
    },

    postRequest(endpoint_name, payload) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('endpoint', _.assign({}, this, {endpoint_name}));

      return this.makeRequest('POST', path, {payload});
    }

  })
  .setConstraints(CostomSocketConstraints)

export default CustomSocket;
