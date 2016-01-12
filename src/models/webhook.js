import stampit from 'stampit';
import {Meta, Model} from './base';

const WebhookMeta = Meta({
  name: 'webhook',
  pluralName: 'webhooks',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/webhooks/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/webhooks/'
    },
    'run': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/webhooks/{name}/run/'
    },
    'reset': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/webhooks/{name}/reset_link/'
    },
    'public': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/webhooks/p/{publicLink}/{name}/'
    }
  },
  relatedModels: [ 'WebhookTrace' ]
});

const Webhook = stampit()
  .compose(Model)
  .setMeta(WebhookMeta);

export default Webhook;
