import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Delete, Update, Create, Get} from '../querySet';
import _ from 'lodash';

const SocketQuerySet = stampit().compose(
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

  runEndpoint(properties = {}, method = 'GET', payload = {}) {
    const {Endpoint} = this.getConfig();
    this.properties = _.assign({}, this.properties, properties);
    return Endpoint.please().run(this.properties, method, payload);
  },

  installFromUrl(properties = {}, name, url) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'install';
    this.payload = { name: name, install_url: url };
    this.raw();

    return this;
  }

})

const SocketMeta = Meta({
  name: 'socket',
  pluralName: 'sockets',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v2/instances/{instanceName}/sockets/{name}/'
    },
    'recheck': {
      'methods': ['post'],
      'path': '/v2/instances/{instanceName}/sockets/{name}/recheck/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v2/instances/{instanceName}/sockets/'
    },
    'install': {
      'methods': ['post'],
      'path': '/v2/instances/{instanceName}/sockets/install/'
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
  install_url: {
    string: true
  }
};

/**
 * OO wrapper around Socket.
 * @constructor
 * @type {Socket}

 */
const Socket = stampit()
  .compose(Model)
  .setQuerySet(SocketQuerySet)
  .setMeta(SocketMeta)
  .methods({

    recheck() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('recheck', this);

      return this.makeRequest('POST', path);
    },

    runEndpoint(endpoint_name, method, payload) {
      const {Endpoint} = this.getConfig();
      return Endpoint.please().run({ socket_name: this.name, endpoint_name, instanceName: this.instanceName}, method, payload);
    },

    install() {
      _.each(this.endpointObjects, (endpoint) => {
        this.endpoints = _.assign({}, this.endpoints, { [endpoint.name]: { calls: endpoint.scriptCalls } })
      });
      this.dependencies = _.map(this.dependencyObjects, ({label, runtime_name, source}) => {
        return { name: label, runtime_name, source, type: 'script'}
      });
      return this.save()
        .then((result) => {
          _.each(this.endpointObjects, (endpoint) => {
            endpoint.socket_name = result.name;
          });
        })
    }
  })
  .setConstraints(CostomSocketConstraints)

export default Socket;
