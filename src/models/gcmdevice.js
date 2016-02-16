import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, Delete, Get, Update, UpdateOrCreate, GetOrCreate, List, First, PageSize, Ordering} from '../querySet';

const GCMDeviceQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Create,
  Delete,
  Get,
  Update,
  UpdateOrCreate,
  GetOrCreate,
  First,
  PageSize,
  Ordering
);

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
  .setQuerySet(GCMDeviceQuerySet)
  .setConstraints(GCMDevicConstraints);

export default GCMDevice;
