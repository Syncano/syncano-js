import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';
import QuerySet from '../querySet';

const GroupQuerySet = stampit().compose(QuerySet).methods({
  /**
  * Fetches Users belonging to a group.
  * @memberOf GroupQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {GroupQuerySet}

  * @example {@lang javascript}
  * Grop.please().users({ id: 1, instanceName: 'test-one'}).then(function(users) {});
  */
  users(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'users';

    return this;
  }

});

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
  .setConstraints(GroupConstraints)
  .setQuerySet(GroupQuerySet)
  .methods({
    /**
    * Fetches Users belonging to a group.
    * @memberOf Group
    * @instance

    * @returns {Promise}

    * @example {@lang javascript}
    * Grop.users().then(function(users) {});
    */
    users() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('users', this);

      return this.makeRequest('GET', path);
    },

    addUser() {

    },

    deleteUser() {

    }
  });

export default Group;
