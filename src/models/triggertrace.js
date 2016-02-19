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
      'path': '/v1/instances/{instanceName}/triggers/{triggerId}/traces/{traceId}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/triggers/{triggerId}/traces/'
    }
  }
});

const TriggerTrace = stampit()
  .compose(Model)
  .setQuerySet(TriggerTraceQuerySet)
  .setMeta(TriggerTraceMeta);

export default TriggerTrace;
