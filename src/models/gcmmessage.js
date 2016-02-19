import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, Get, GetOrCreate, List} from '../querySet';

const GCMMessageQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  Get,
  List,
  GetOrCreate
);

const GCMMessageMeta = Meta({
  name: 'gcmmessage',
  pluralName: 'gcmmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/messages/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/messages/'
    }
  }
});

const GCMMessageConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  content: {
    presence: true
  }
};

/**
 * OO wrapper around instance GCM messages {@link # endpoint}.
 * @constructor
 * @type {GCMMessage}

 * @property {Number} id
 * @property {String} [status = null]
 * @property {Object} [content = {}]
 * @property {Object} [result = {}]
 * @property {String} [links = {}]
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const GCMMessage = stampit()
  .compose(Model)
  .setMeta(GCMMessageMeta)
  .setQuerySet(GCMMessageQuerySet)
  .setConstraints(GCMMessageConstraints);

export default GCMMessage;
