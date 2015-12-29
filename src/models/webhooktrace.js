import stampit from 'stampit';
import {Meta, Model} from './base';

const WebhookTraceMeta = Meta({
  name: 'triggertrace',
  pluralName: 'triggertraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/webhooks/{name}/traces/{traceId}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/webhooks/{name}/traces/'
    }
  }
});

const WebhookTrace = stampit()
  .compose(Model)
  .setMeta(WebhookTraceMeta);

export default WebhookTrace;
