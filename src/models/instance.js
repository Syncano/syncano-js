import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model, Rename} from './base';
import QuerySet, {Rename as QsRename} from '../querySet';

const InstanceQuerySet = stampit().compose(QuerySet, QsRename).methods({
  setGlobalConfig(properties = {}, config = {}){
    this.properties = _.assign({}, this.properties, properties);
    this.payload = {config};

    this.method = 'PUT';
    this.endpoint = 'config';
    return this;
  },

  getGlobalConfig(properties = {}){
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'config';
    return this;
  }

});

const InstanceMeta = Meta({
  name: 'instance',
  pluralName: 'instances',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/'
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1.1/instances/{name}/rename/'
    },
    'config': {
      'methods': ['get', 'put', 'patch'],
      'path': '/v1.1/instances/{name}/snippets/config/'
    }
  },
  relatedModels: [
    'Admin', 'Class', 'Script', 'Schedule', 'InstanceInvitation', 'ApiKey'
    , 'Trigger', 'ScriptEndpoint', 'User', 'Group', 'GCMDevice', 'Channel'
    , 'APNSDevice', 'Template'
  ],
  mapDefaults: {
    instanceName: 'name'
  }
});

const InstanceConstraints = {
  name: {
    presence: true,
    string: true,
    length: {
      minimum: 5
    }
  },
  description: {
    string: true
  },
  metadata: {
    object: true
  }
};

/**
 * OO wrapper around instances {@link http://docs.syncano.io/v0.1/docs/instances-list endpoint}.
 * @constructor
 * @type {Instance}

 * @property {String} name
 * @property {Object} owner
 * @property {Number} owner.id
 * @property {String} owner.email
 * @property {String} owner.first_name
 * @property {String} owner.last_name
 * @property {Boolean} owner.is_active
 * @property {Boolean} owner.has_password
 * @property {String} role
 * @property {Object} [metadata = {}]
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Instance = stampit()
  .compose(Model)
  .setMeta(InstanceMeta)
  .compose(Rename)
  .methods({

    setGlobalConfig(config = {}) {
      const payload = {config};
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('config', this);

      return this.makeRequest('PUT', path, {payload});
    },

    getGlobalConfig() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('config', this);

      return this.makeRequest('GET', path);
    }

  })
  .setQuerySet(InstanceQuerySet)
  .setConstraints(InstanceConstraints)

export default Instance;
