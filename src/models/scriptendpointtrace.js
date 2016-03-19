import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const ScriptEndpointTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const ScriptEndpointTraceMeta = Meta({
  name: 'triggertrace',
  pluralName: 'triggertraces',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{scriptEndpointName}/traces/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{scriptEndpointName}/traces/'
    }
  }
});

const ScriptEndpointTraceConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  scriptEndpointName: {
    presence: true,
    string: true
  }
};

/**
 * OO wrapper around webhook traces {@link # endpoint}.
 * This model is *read only*.
 * @constructor
 * @type {ScriptEndpointTrace}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} scriptEndpointName
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const ScriptEndpointTrace = stampit()
  .compose(Model)
  .setMeta(ScriptEndpointTraceMeta)
  .setQuerySet(ScriptEndpointTraceQuerySet)
  .setConstraints(ScriptEndpointTraceConstraints);

export default ScriptEndpointTrace;
