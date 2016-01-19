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

const ApiKey = stampit()
  .compose(Model)
  .setMeta(ApiKeyMeta)
  .setConstraints(ApiKeyConstraints);

export default ApiKey;
