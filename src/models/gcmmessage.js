import stampit from 'stampit';
import {Meta, Model} from './base';

const GCMMessageMeta = Meta({
  name: 'gcmmessage',
  pluralName: 'gcmmessages',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instance}/push_notifications/gcm/messages/{id}'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instance}/push_notifications/gcm/messages/'
    }
  }
});

const GCMMessage = stampit()
  .compose(Model)
  .setMeta(GCMMessageMeta);

export default GCMMessage;
