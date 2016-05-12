import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const ScriptTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const ScriptTraceMeta = Meta({
  name: 'scripttrace',
  pluralName: 'scripttrace',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/scripts/{scriptId}/traces/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/scripts/{scriptId}/traces/'
    }
  }
});

const ScriptConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  scriptId: {
    presence: true
  }
};

/**
 * OO wrapper around script trace {@link # endpoint}.
 * This model is *read only*.
 * @constructor
 * @type {ScriptTrace}

 * @property {Number} id
 * @property {String} instanceName
 * @property {Number} scriptId
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const ScriptTrace = stampit()
  .compose(Model)
  .setQuerySet(ScriptTraceQuerySet)
  .setConstraints(ScriptConstraints)
  .setMeta(ScriptTraceMeta);

export default ScriptTrace;
