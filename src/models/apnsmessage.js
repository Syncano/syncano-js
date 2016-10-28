import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, BulkCreate, Get, GetOrCreate, List, SendToDevice, SendToDevices} from '../querySet';

const APNSMessageQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  BulkCreate,
  Get,
  List,
  GetOrCreate,
  SendToDevice,
  SendToDevices
);

const APNSMessageMeta = Meta({
  name: 'apnsmessage',
  pluralName: 'apnsmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v2/instances/{instanceName}/push_notifications/apns/messages/{id}/'
    },
    'list': {
      'methods': ['get', 'post'],
      'path': '/v2/instances/{instanceName}/push_notifications/apns/messages/'
    },
    'deviceMessage': {
      'methods': ['post'],
      'path': '/v2/instances/{instanceName}/push_notifications/apns/devices/{registration_id}/send_message/'
    }
  }
});

const APNSMessageConstraints = {
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
  },
  'content.aps': {
    presence: true
  },
  'content.aps.alert': {
    presence: true
  }
};

/**
 * OO wrapper around instance APNS messages {@link # endpoint}.
 * @constructor
 * @type {APNSMessage}

 * @property {Number} id
 * @property {String} [status = null]
 * @property {Object} [content = {}]
 * @property {Object} [result = {}]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const APNSMessage = stampit()
  .compose(Model)
  .setQuerySet(APNSMessageQuerySet)
  .setConstraints(APNSMessageConstraints)
  .setMeta(APNSMessageMeta);

export default APNSMessage;
