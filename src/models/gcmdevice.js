import stampit from 'stampit';
import {Meta, Model} from './base';

const GCMDeviceMeta = Meta({
  name: 'gcmdevice',
  pluralName: 'gcmdevices',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/devices/{id}'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/devices/'
    }
  }
});

const GCMDevice = stampit()
  .compose(Model)
  .setMeta(GCMDeviceMeta);

export default GCMDevice;
