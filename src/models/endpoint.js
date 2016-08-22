import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';

const EndpointMeta = Meta({
  name: 'endpoint',
  pluralName: 'endpoint',
  endpoints: {
    'call': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/sockets/{name}/'
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
  .props({
    scriptCalls: []
  })
  .methods({

    addScriptCall({ name, calls }) {
      this.scriptCalls = _.concat(this.scriptCalls, { name, calls, type: 'script'});
    }

  })

export default Endpoint;
