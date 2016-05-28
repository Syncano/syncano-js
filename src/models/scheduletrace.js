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
      'path': '/v1.1/instances/{instanceName}/schedules/{scheduleId}/traces/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/schedules/{scheduleId}/traces/'
    }
  }
});

const ScheduleTraceConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  scheduleId: {
    presence: true,
    numericality: true
  }
};

/**
 * OO wrapper around shedule traces {@link # endpoint}.
 * @constructor
 * @type {ScheduleTrace}

 * @property {Number} id
 * @property {Number} scheduleId
 * @property {String} instanceName
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const ScheduleTrace = stampit()
  .compose(Model)
  .setQuerySet(ScheduleTraceQuerySet)
  .setMeta(ScheduleTraceMeta)
  .setConstraints(ScheduleTraceConstraints);

export default ScheduleTrace;
