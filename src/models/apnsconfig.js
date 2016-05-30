import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import {BaseQuerySet, Update, Get} from '../querySet';

const APNSConfigQuerySet = stampit().compose(
  BaseQuerySet,
  Update,
  Get
).methods({

  removeCertificate(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = payload;
    this.method = 'POST';
    this.endpoint = 'removeCertificate';
    return this;
  }

});

const APNSConfigMeta = Meta({
  name: 'apnsconfig',
  pluralName: 'apnsconfig',
  endpoints: {
    'detail': {
      'methods': ['post', 'get', 'patch', 'put'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/config/'
    },
    'removeCertificate': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/config/remove_certificate/'
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
  .setConstraints(APNSConfigConstraints)
  .methods({

    removeCertificate(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('removeCertificate', this);

      return this.makeRequest('POST', path, {payload}).then((body) => this.serialize(body));
    }

  });

export default APNSConfig;
