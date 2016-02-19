import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Update, Get} from '../querySet';

const APNSConfigQuerySet = stampit().compose(
  BaseQuerySet,
  Update,
  Get
);

const APNSConfigMeta = Meta({
  name: 'gcmconfig',
  pluralName: 'gcmconfig',
  endpoints: {
    'detail': {
      'methods': ['post', 'get', 'patch', 'put'],
      'path': '/v1/instances/{instanceName}/push_notifications/apns/config/'
    }
  }
});

const APNSConfigConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const APNSConfig = stampit()
  .compose(Model)
  .setMeta(APNSConfigMeta)
  .setQuerySet(APNSConfigQuerySet)
  .setConstraints(APNSConfigConstraints);

export default APNSConfig;
