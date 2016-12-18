import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';
import {BaseQuerySet} from '../querySet';

const EndpointQuerySet = stampit().compose(BaseQuerySet)
.methods({

  run(properties = {}, method = 'GET', payload = {}) {
    this.properties = _.assign({}, this.properies, { socket_name: properties.socket_name, name: properties.endpoint_name, instanceName: properties.instanceName});

    this.method = method;
    this.endpoint = 'run';
    if(method == 'POST') {
      this.payload = payload;
    } else {
      this.query = payload;
    }
    this.raw();

    return this;
  },

  /**
  * Fetches Endpoints of given Socket.
  * @memberOf EndpointQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {EndpointQerySet}

  * @example {@lang javascript}
  * Endpoint.please().list({socket_name: 'my_socket', instanceName: 'test-one'}).then(function(endpoints) {});

  */
  list(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'list';
    this._serialize = false;

    return this.then((response) => this.model.please().asResultSet(response));
  }

})

const EndpointMeta = Meta({
  name: 'endpoint',
  pluralName: 'endpoint',
  endpoints: {
    'run': {
      'methods': ['post', 'get', 'delete', 'patch', 'put'],
      'path': '/v2/instances/{instanceName}/endpoints/sockets/{socket_name}/{name}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v2/instances/{instanceName}/endpoints/sockets/{socket_name}/'
    }
  }
});

const EndpointConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    string: true,
    presence: true
  },
  metadata: {
    object: true
  },
  acl: {
    object: true
  }
};

/**
 * OO wrapper around Endpoint {@link # endpoint}.
 * @constructor
 * @type {Endpoint}

 * @property {String} name
 */
const Endpoint = stampit()
  .compose(Model)
  .setMeta(EndpointMeta)
  .setConstraints(EndpointConstraints)
  .setQuerySet(EndpointQuerySet)
  .props({
    scriptCalls: []
  })
  .methods({

    addScriptCall({ name, methods }) {
      this.scriptCalls = _.concat(this.scriptCalls, { name, methods, type: 'script'});
    },

    run(method = 'GET', payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('run', this);
      let data = null;

      if(method === 'POST') {
        data = {payload};
      } else {
        data = {query: payload};
      }

      return this.makeRequest(method, path, data);
    }

  })

export default Endpoint;
