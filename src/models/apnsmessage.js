import stampit from 'stampit';
import {Meta, Model} from './base';

const APNSMessageMeta = Meta({
  name: 'apnsmessage',
  pluralName: 'apnsmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instance}/push_notifications/apns/messages/{id}'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instance}/push_notifications/apns/messages/'
    }
  }
});

const APNSMessage = stampit()
  .compose(Model)
  .setMeta(APNSMessageMeta);

export default APNSMessage;
