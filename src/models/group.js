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
    const {User} = this.getConfig();
    this.properties = _.assign({}, this.properties, properties);
    return User.please().groupUsers(this.properties);
  },
  /**
  * Adds user to group.
  * @memberOf GroupQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} user object with user to be added
  * @returns {GroupQuerySet}

  * @example {@lang javascript}
  * Grop.please().addUser({ id: 1, instanceName: 'test-one'}, { user: 1 }).then(function(response) {});
  */
  addUser(properties = {}, user = {}) {
    const {User} = this.getConfig();
    this.properties = _.assign({}, this.properties, properties);
    return User.please().addUserToGroup(this.properties, user);
  },

  deleteUser(properties = {}, user = {}) {
    const {User} = this.getConfig();
    this.properties = _.assign({}, this.properties, properties, user);
    return User.please().deleteUserFromGroup(this.properties, user);
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
    * Group.users().then(function(users) {});
    */
    users() {
      const {User} = this.getConfig();
      return User.please().groupUsers({ id: this.id, instanceName: this.instanceName});
    },
    /**
    * Add user ti group.
    * @memberOf Group
    * @instance

    * @returns {Promise}

    * @example {@lang javascript}
    * Group.addUser({ user: 1}).then(function(response) {});
    */
    addUser(user = {}) {
      const {User} = this.getConfig();
      return User.please().addUserToGroup({ id: this.id, instanceName: this.instanceName}, user);
    },

    deleteUser(user = {}) {
      const {User} = this.getConfig();
      return User.please().deleteUserFromGroup({ id: this.id, instanceName: this.instanceName}, user);
    }
  });

export default Group;
