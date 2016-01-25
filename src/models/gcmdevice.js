import stampit from 'stampit';
import {Meta, Model} from './base';

const GCMDeviceMeta = Meta({
  name: 'gcmdevice',
  pluralName: 'gcmdevices',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/devices/{registration_id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/devices/'
    }
  }
});

const GCMDevicConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  registration_id: {
    presence: true
  }
};

const GCMDevice = stampit()
  .compose(Model)
  .setMeta(GCMDeviceMeta)
  .setConstraints(GCMDevicConstraints);

export default GCMDevice;
