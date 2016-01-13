import stampit from 'stampit';
import {Meta, Model} from './base';

const ApiKeyMeta = Meta({
  name: 'apiKey',
  pluralName: 'apiKeys',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instanceName}/api_keys/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/api_keys/'
    }
  }
});

const ApiKey = stampit()
  .compose(Model)
  .setMeta(ApiKeyMeta);

export default ApiKey;
