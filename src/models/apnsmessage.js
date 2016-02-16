import stampit from 'stampit';
import {Meta, Model} from './base';

const APNSMessageMeta = Meta({
  name: 'apnsmessage',
  pluralName: 'apnsmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/messages/{id}'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/messages/'
    }
  }
});

/**
 * OO wrapper around instance APNS messages {@link # endpoint}.
 * @constructor
 * @type {APNSMessage}

 * @property {Number} id
 * @property {String} [status = null]
 * @property {Object} [content = {}]
 * @property {Object} [result = {}]
 * @property {String} [links = {}]
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const APNSMessage = stampit()
  .compose(Model)
  .setMeta(APNSMessageMeta);

export default APNSMessage;
