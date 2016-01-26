import stampit from 'stampit';
import {Meta, Model} from './base';

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

const GCMMessage = stampit()
  .compose(Model)
  .setMeta(GCMMessageMeta)
  .setConstraints(GCMMessageConstraints);

export default GCMMessage;
