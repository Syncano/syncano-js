import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, Delete, Get, Update, UpdateOrCreate, GetOrCreate, List} from '../querySet';

const APNSDeviceQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Create,
  Delete,
  Get,
  Update,
  UpdateOrCreate,
  GetOrCreate
);

const APNSDeviceMeta = Meta({
  name: 'apnsdevice',
  pluralName: 'apnsdevices',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/devices/{registration_id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/devices/'
    }
  }
});

const APNSDeviceConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  user_id: {
    presence: true
  },
  registration_id: {
    presence: true
  },
  device_id: {
    presence: true
  }
};

const APNSDevice = stampit()
  .compose(Model)
  .setMeta(APNSDeviceMeta)
  .setQuerySet(APNSDeviceQuerySet)
  .setConstraints(APNSDeviceConstraints);

export default APNSDevice;
