import stampit from 'stampit';
import {Meta, Model} from './base';

const ScheduleMeta = Meta({
  name: 'schedule',
  pluralName: 'schedules',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/schedules/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/schedules/'
    }
  }
});

const Schedule = stampit()
  .compose(Model)
  .setMeta(ScheduleMeta);

export default Schedule;
