import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const CodeBoxTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const CodeBoxTraceMeta = Meta({
  name: 'codeboxtrace',
  pluralName: 'codeboxtraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{codeboxId}/traces/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{codeboxId}/traces/'
    }
  }
});

const CodeBoxConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  codeboxId: {
    presence: true
  }
};

/**
 * OO wrapper around codebox trace {@link # endpoint}.
 * This model is *read only*.
 * @constructor
 * @type {CodeBoxTrace}

 * @property {Number} id
 * @property {String} instanceName
 * @property {Number} codeboxId
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const CodeBoxTrace = stampit()
  .compose(Model)
  .setQuerySet(CodeBoxTraceQuerySet)
  .setConstraints(CodeBoxConstraints)
  .setMeta(CodeBoxTraceMeta);

export default CodeBoxTrace;
