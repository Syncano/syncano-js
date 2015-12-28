import stampit from 'stampit';
import {Meta, Model} from './base';

const ApiKeyMeta = Meta({
  name: 'instance',
  pluralName: 'instances',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instance}/api_keys/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/api_keys/'
    }
  }
});

const ApiKey = stampit()
  .compose(Model)
  .setMeta(ApiKeyMeta);

export default ApiKey;
