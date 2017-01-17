import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const EndpointTraceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

const EndpointTraceMeta = Meta({
  name: 'endpointtrace',
  pluralName: 'endpointtraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v2/instances/{instanceName}/endpoints/sockets/{socketName}/{endpointName}/traces/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v2/instances/{instanceName}/endpoints/sockets/{socketName}/{endpointName}/traces/'
    }
  }
});

const EndpointTraceConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  endpointName: {
    presence: true
  },
  socketName: {
    presence: true
  }
};


/**
 * OO wrapper around trigger trace {@link # endpoint}.
 * This model is *read only*.
 * @constructor
 * @type {EndpointTrace}

 * @property {Number} id
 * @property {String} instanceName
 * @property {Number} endpointName
 * @property {String} status
 * @property {Date} executed_at
 * @property {Number} duration
 * @property {Object} [result = {}]
 * @property {String} result.stderr
 * @property {String} result.stdout
 * @property {String} [links = {}]
 */
const EndpointTrace = stampit()
  .compose(Model)
  .setQuerySet(EndpointTraceQuerySet)
  .setConstraints(EndpointTraceConstraints)
  .setMeta(EndpointTraceMeta);

export default EndpointTrace;
