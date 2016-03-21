import stampit from 'stampit';
import {Meta, Model} from './base';

const GroupMeta = Meta({
  name: 'group',
  pluralName: 'groups',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/groups/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/groups/'
    },
    'users': {
      'methods': ['get', 'post', 'delete'],
      'path': '/v1.1/instances/{instanceName}/groups/{id}/users/'
    }
  }
});

const GroupConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  label: {
    presence: true,
    string: true
  },
  description: {
    string: true
  }
};


/**
 * OO wrapper around instance groups {@link http://docs.syncano.com/v4.0/docs/groups endpoint}.
 * @constructor
 * @type {Group}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} label
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Group = stampit()
  .compose(Model)
  .setMeta(GroupMeta)
  .setConstraints(GroupConstraints);

export default Group;
