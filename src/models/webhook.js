import stampit from 'stampit';
import {Meta, Model} from './base';

const WebhookMeta = Meta({
  name: 'webhook',
  pluralName: 'webhooks',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/webhooks/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/webhooks/'
    },
    'run': {
      'methods': ['post'],
      'path': '/v1/instances/{instance}/webhooks/{name}/run/'
    },
    'reset': {
      'methods': ['post'],
      'path': '/v1/instances/{instance}/webhooks/{name}/reset_link/'
    },
    'public': {
      'methods': ['get'],
      'path': '/v1/instances/{instance}/webhooks/p/{public_link}/{name}/'
    }
  }
});

const Webhook = stampit()
  .compose(Model)
  .setMeta(WebhookMeta);

export default Webhook;
