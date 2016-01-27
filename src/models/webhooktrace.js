import stampit from 'stampit';
import {Meta, Model} from './base';

const WebhookTraceMeta = Meta({
  name: 'triggertrace',
  pluralName: 'triggertraces',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/webhooks/{webhookName}/traces/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/webhooks/{webhookName}/traces/'
    }
  }
});

const WebhookTraceConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  webhookName: {
    presence: true
  }
};

const WebhookTrace = stampit()
  .compose(Model)
  .setMeta(WebhookTraceMeta)
  .setConstraints(WebhookTraceConstraints);

export default WebhookTrace;
