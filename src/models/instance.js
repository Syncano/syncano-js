import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';

const InstanceQuerySet = stampit().compose(QuerySet).methods({

  rename(properties = {}, object = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = object;

    this.method = 'POST';
    this.endpoint = 'rename';
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
    }
  },
  relatedModels: [
    'Admin', 'Class', 'Script', 'Schedule', 'InstanceInvitation', 'ApiKey'
    , 'Trigger', 'ScriptEndpoint', 'User', 'Group', 'GCMDevice', 'Channel'
    , 'APNSDevice', 'Template'
  ]
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
  .methods({

    rename(payload = { new_name: this.name }) {
      const options = {payload};
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('rename', this);

      return this.makeRequest('POST', path, options);
    }

  })
  .setQuerySet(InstanceQuerySet)
  .setConstraints(InstanceConstraints)

export default Instance;
