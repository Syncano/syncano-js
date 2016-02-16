import stampit from 'stampit';
import {Meta, Model} from './base';

const ApiKeyMeta = Meta({
  name: 'apiKey',
  pluralName: 'apiKeys',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/api_keys/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/api_keys/'
    }
  }
});

const ApiKeyConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};


/**
 * OO wrapper around instance api keys {@link http://docs.syncano.io/docs/authentication endpoint}.
 * @constructor
 * @type {ApiKey}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} [api_key = null]
 * @property {Boolean} [allow_user_create = null]
 * @property {Boolean} [ignore_acl = null]
 * @property {String} [links = {}]
 */
const ApiKey = stampit()
  .compose(Model)
  .setMeta(ApiKeyMeta)
  .setConstraints(ApiKeyConstraints);

export default ApiKey;
