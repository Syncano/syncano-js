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

const ScheduleConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  label: {
    presence: true
  },
  codebox: {
    presence: true
  }
};

const Schedule = stampit()
  .compose(Model)
  .setMeta(ScheduleMeta)
  .setConstraints(ScheduleConstraints);

export default Schedule;
