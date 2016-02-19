import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const ScheduleTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const ScheduleTraceMeta = Meta({
  name: 'scheduletrace',
  pluralName: 'scheduletraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/schedules/{scheduleId}/traces/{traceId}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/schedules/{scheduleId}/traces/'
    }
  }
});

const ScheduleTrace = stampit()
  .compose(Model)
  .setQuerySet(ScheduleTraceQuerySet)
  .setMeta(ScheduleTraceMeta);

export default ScheduleTrace;
