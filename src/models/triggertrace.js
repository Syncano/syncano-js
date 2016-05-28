import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const TriggerTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const TriggerTraceMeta = Meta({
  name: 'triggertrace',
  pluralName: 'triggertraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/triggers/{triggerId}/traces/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/triggers/{triggerId}/traces/'
    }
  }
});

const TriggerTraceConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  triggerId: {
    presence: true,
    numericality: true
  }
};


/**
 * OO wrapper around trigger trace {@link # endpoint}.
 * This model is *read only*.
 * @constructor
 * @type {TriggerTrace}

 * @property {Number} id
 * @property {String} instanceName
 * @property {Number} triggerId
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const TriggerTrace = stampit()
  .compose(Model)
  .setQuerySet(TriggerTraceQuerySet)
  .setConstraints(TriggerTraceConstraints)
  .setMeta(TriggerTraceMeta);

export default TriggerTrace;
