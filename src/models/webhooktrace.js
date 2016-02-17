import stampit from 'stampit';
import {Meta, Model} from './base';
import {Get, List} from '../querySet';

const WebhookTraceQuerySet = stampit().compose(
  Get,
  List
);

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
  .setQuerySet(WebhookTraceQuerySet)
  .setConstraints(WebhookTraceConstraints);

export default WebhookTrace;
