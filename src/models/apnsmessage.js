import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, BulkCreate, Get, GetOrCreate, List} from '../querySet';

const APNSMessageQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  BulkCreate,
  Get,
  List,
  GetOrCreate
);

const APNSMessageMeta = Meta({
  name: 'apnsmessage',
  pluralName: 'apnsmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/messages/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/messages/'
    }
  }
});

const APNSMessageConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
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
