import stampit from 'stampit';
import {Meta, Model} from './base';

const ScheduleMeta = Meta({
  name: 'schedule',
  pluralName: 'schedules',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/schedules/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/schedules/'
    }
  },
  relatedModels: [ 'ScheduleTrace' ]
});

const Schedule = stampit()
  .compose(Model)
  .setMeta(ScheduleMeta);

export default Schedule;
