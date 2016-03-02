import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const WebhookTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const WebhookTraceMeta = Meta({
  name: 'triggertrace',
  pluralName: 'triggertraces',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{webhookName}/traces/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{webhookName}/traces/'
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

/**
 * OO wrapper around webhook traces {@link # endpoint}.
 * This model is *read only*.
 * @constructor
 * @type {WebhookTrace}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} webhookName
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const WebhookTrace = stampit()
  .compose(Model)
  .setMeta(WebhookTraceMeta)
  .setQuerySet(WebhookTraceQuerySet)
  .setConstraints(WebhookTraceConstraints);

export default WebhookTrace;
