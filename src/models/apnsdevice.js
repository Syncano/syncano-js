import stampit from 'stampit';
import {Meta, Model} from './base';

const APNSDeviceMeta = Meta({
  name: 'apnsdevice',
  pluralName: 'apnsdevices',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/devices/{id}'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/devices/'
    }
  }
});

const APNSDevice = stampit()
  .compose(Model)
  .setMeta(APNSDeviceMeta);

export default APNSDevice;
