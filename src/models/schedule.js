import stampit from 'stampit';
import {Meta, Model} from './base';

const ScheduleMeta = Meta({
  name: 'schedule',
  pluralName: 'schedules',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/schedules/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/schedules/'
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
    presence: true,
    string: true
  },
  description: {
    string: true
  },
  interval_sec: {
    numericality: true
  },
  crontab: {
    format: {
      pattern: /([0-59]|\*)\s([0-23]|\*)\s([1-31]|\*)\s([1-12]|\*)\s([0-7]|\*)/
    }
  },
  timezone: {
    string: true
  },
  script: {
    presence: true,
    numericality: true
  }
};

/**
 * OO wrapper around instance groups {@link http://docs.syncano.com/v4.0/docs/codebox-schedules-list endpoint}.
 * @constructor
 * @type {Schedule}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} label
 * @property {Number} interval_sec
 * @property {String} crontab
 * @property {Object} payload
 * @property {String} scheduled_next
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Schedule = stampit()
  .compose(Model)
  .setMeta(ScheduleMeta)
  .setConstraints(ScheduleConstraints);

export default Schedule;
