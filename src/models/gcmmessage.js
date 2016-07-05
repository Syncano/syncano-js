import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, BulkCreate, Get, GetOrCreate, List, SendToDevice, SendToDevices} from '../querySet';

const GCMMessageQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  BulkCreate,
  Get,
  List,
  GetOrCreate,
  SendToDevice,
  SendToDevices
);

const GCMMessageMeta = Meta({
  name: 'gcmmessage',
  pluralName: 'gcmmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/messages/{id}/'
    },
    'list': {
      'methods': ['get', 'post'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/messages/'
    },
    'deviceMessage': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/devices/{registration_id}/send_message/'
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
    presence: true,
    object: true
  },
  'content.registration_ids': {
    presence: true,
    array: true
  },
  'content.environment': {
    presence: true,
    inclusion: ['development', 'production']
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
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const GCMMessage = stampit()
  .compose(Model)
  .setMeta(GCMMessageMeta)
  .setQuerySet(GCMMessageQuerySet)
  .setConstraints(GCMMessageConstraints);

export default GCMMessage;
