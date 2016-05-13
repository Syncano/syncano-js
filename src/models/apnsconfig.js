import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Update, Get} from '../querySet';

const APNSConfigQuerySet = stampit().compose(
  BaseQuerySet,
  Update,
  Get
);

const APNSConfigMeta = Meta({
  name: 'apnsconfig',
  pluralName: 'apnsconfig',
  endpoints: {
    'detail': {
      'methods': ['post', 'get', 'patch', 'put'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/config/'
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

/**
 * OO wrapper around instance APNS config {@link # endpoint}.
 * @constructor
 * @type {APNSConfig}

 * @property {String} instanceName
 * @property {File} production_certificate
 * @property {String} [production_certificate_name = null]
 * @property {String} production_bundle_identifier
 * @property {String} [production_expiration_date = null]
 * @property {String} development_certificate_name
 * @property {File} development_certificate
 * @property {String} development_bundle_identifier
 * @property {String} [development_expiration_date = null]
 * @property {Object} [links = {}]
 */
const APNSConfig = stampit()
  .compose(Model)
  .setMeta(APNSConfigMeta)
  .setQuerySet(APNSConfigQuerySet)
  .setConstraints(APNSConfigConstraints);

export default APNSConfig;
