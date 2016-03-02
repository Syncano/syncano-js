import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Update, Get} from '../querySet';

const GCMConfigQuerySet = stampit().compose(
  BaseQuerySet,
  Update,
  Get
);

const GCMConfigMeta = Meta({
  name: 'gcmconfig',
  pluralName: 'gcmconfig',
  endpoints: {
    'detail': {
      'methods': ['post', 'get', 'patch', 'put'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/config/'
    }
  }
});

const GCMConfigConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

/**
 * OO wrapper around instance GCM config {@link # endpoint}.
 * @constructor
 * @type {GCMConfig}

 * @property {String} instanceName
 * @property {String} production_api_key
 * @property {String} development_api_key
 * @property {Object} [links = {}]
 */
const GCMConfig = stampit()
  .compose(Model)
  .setMeta(GCMConfigMeta)
  .setQuerySet(GCMConfigQuerySet)
  .setConstraints(GCMConfigConstraints);

export default GCMConfig;
