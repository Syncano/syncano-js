import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, BulkCreate, Delete, Get, Update, UpdateOrCreate, GetOrCreate, List} from '../querySet';

const GCMDeviceQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Create,
  BulkCreate,
  Delete,
  Get,
  Update,
  UpdateOrCreate,
  GetOrCreate
).methods({

  sendMessage(properties = {}, content = {}) {
    const {GCMMessage} = this.getConfig();
    return GCMMessage.please().sendToDevice(_.assign({}, this.properties, properties), content);
  }

});

const GCMDeviceMeta = Meta({
  name: 'gcmdevice',
  pluralName: 'gcmdevices',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/devices/{registration_id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/devices/'
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
  user: {
    numericality: true
  },
  registration_id: {
    presence: true,
    string: true
  },
  device_id: {
    string: true
  },
  metadata: {
    object: true
  },
  is_active: {
    boolean: true
  }
};

/**
 * OO wrapper around instance GCM devices {@link # endpoint}.
 * @constructor
 * @type {GCMDevice}

 * @property {String} registration_id
 * @property {String} device_id
 * @property {String} instanceName
 * @property {String} [label = null]
 * @property {Number} [user = null]
 * @property {Boolean} [is_active = true]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const GCMDevice = stampit()
  .compose(Model)
  .setMeta(GCMDeviceMeta)
  .setQuerySet(GCMDeviceQuerySet)
  .setConstraints(GCMDevicConstraints);

export default GCMDevice;
