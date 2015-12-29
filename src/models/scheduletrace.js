import stampit from 'stampit';
import {Meta, Model} from './base';

const ScheduleTraceMeta = Meta({
  name: 'scheduletrace',
  pluralName: 'scheduletraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/schedules/{scheduleId}/traces/{traceId}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/schedules/{scheduleId}/traces/'
    }
  }
});

const ScheduleTrace = stampit()
  .compose(Model)
  .setMeta(ScheduleTraceMeta);

export default ScheduleTrace;
