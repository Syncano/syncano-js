import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List} from '../querySet';
import _ from 'lodash';

const CustomSocketQuerySet = stampit().compose(
  BaseQuerySet,
  List
);

const CustomSocketMeta = Meta({
  name: 'customsocket',
  pluralName: 'customsockets',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/sockets/{name}/'
    },
    'recheck': {
      'methods': ['get'],
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
    presence: true,
    object: true
  },
  dependencies: {
    presence: true,
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
  .methods({

    recheck() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('recheck', this);

      return this.makeRequest('POST', path);
    },

    getEndponintDetails(endpoint_name) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('endpointDetail', _.assign({}, this, {endpoint_name}));

      return this.makeRequest('GET', path);
    },

    get(endpoint_name, payload) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('endpoint', _.assign({}, this, {endpoint_name}));

      return this.makeRequest('GET', path, {query: payload});
    },

    post(endpoint_name, payload) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('endpoint', _.assign({}, this, {endpoint_name}));

      return this.makeRequest('POST', path, {payload});
    }

  })
  .setConstraints(CostomSocketConstraints)

export default CustomSocket;
