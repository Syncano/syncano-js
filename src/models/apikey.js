import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Create, BulkCreate, Delete, Update, List} from '../querySet';

const ApiKeyQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Create,
  BulkCreate,
  Delete,
  Update,
  List
).methods({

  reset(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'reset';
    return this;
  }

});

const ApiKeyMeta = Meta({
  name: 'apiKey',
  pluralName: 'apiKeys',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/api_keys/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/api_keys/'
    },
    'reset': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/api_keys/{id}/reset_key/'
    }
  }
});

const ApiKeyConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  description: {
    string: true
  },
  ignore_acl: {
    boolean: true
  },
  allow_user_create: {
    boolean: true
  },
  allow_anonymous_read: {
    boolean: true
  }
};

/**
 * OO wrapper around instance api keys {@link http://docs.syncano.io/docs/authentication endpoint}.
 * @constructor
 * @type {ApiKey}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} [api_key = null]
 * @property {Boolean} [allow_user_create = null]
 * @property {Boolean} [ignore_acl = null]
 * @property {String} [links = {}]
 */
const ApiKey = stampit()
  .compose(Model)
  .setMeta(ApiKeyMeta)
  .methods({

    reset() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('reset', this);

      return this.makeRequest('POST', path);
    }

  })
  .setQuerySet(ApiKeyQuerySet)
  .setConstraints(ApiKeyConstraints);

export default ApiKey;
