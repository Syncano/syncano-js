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
  }

})

const EndpointMeta = Meta({
  name: 'endpoint',
  pluralName: 'endpoint',
  endpoints: {
    'run': {
      'methods': ['post', 'get', 'delete', 'patch', 'put'],
      'path': '/v1.1/instances/{instanceName}/endpoints/sockets/{socket_name}/{name}/'
    }
  }
});

const EndpointConstraints = {
  name: {
    string: true,
    presence: true
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
