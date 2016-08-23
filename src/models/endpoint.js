import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';
import {BaseQuerySet} from '../querySet';

const EndpointQuerySet = stampit().compose(BaseQuerySet)
.methods({

  run(properties = {}, method = 'GET', payload = {}) {
    this.properties = _.assign({}, this.properies, { socket_name: properties.socket_name, endpoint_name: properties.endpoint_name, instanceName: properties.instanceName});

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
      'path': '/v1.1/instances/{instanceName}/endpoints/sockets/{socket_name}/{endpoint_name}/'
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
 * @type {Backup}

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

    addScriptCall({ name, calls }) {
      this.scriptCalls = _.concat(this.scriptCalls, { name, calls, type: 'script'});
    }

  })

export default Endpoint;
