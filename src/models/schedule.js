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
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const Schedule = stampit()
  .compose(Model)
  .setMeta(ScheduleMeta);

export default Schedule;
