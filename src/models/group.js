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
  /**
  * Deletes user from group.
  * @memberOf GroupQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} user object with user to be added
  * @returns {GroupQuerySet}

  * @example {@lang javascript}
  * Grop.please().deleteUser({ id: 1, instanceName: 'test-one'}, { user: 1 }).then(function(response) {});
  */
  deleteUser(properties = {}, user = {}) {
    const {User} = this.getConfig();
    this.properties = _.assign({}, this.properties, properties);
    return User.please().deleteUserFromGroup(this.properties, user);
  },
  /**
  * Fetches details of a user belonging to a group.
  * @memberOf Group
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} user object with user to be fetched

  * @example {@lang javascript}
  * Group.please().getUserDetails({ user: 1}).then(function(response) {});
  */
  getUserDetails(properties = {}, user = {}) {
    const {User} = this.getConfig();
    this.properties = _.assign({}, this.properties, properties);
    return User.please().getDetails(this.properties, user);
  },

  getUserGroups(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'userGroups';

    return this.then((response) => {
      return this.model.please().asResultSet(response, 'group');
    });
  },

  getUserGroup(properties = {}, group = {}) {
    this.properties = _.assign({}, this.properties, properties, group);

    this.method = 'GET';
    this.endpoint = 'userGroup';

    return this.then((response) => {
      return this.model.fromJSON(response.group, this.properties);
    });
  },

  addUserGroup(properties = {}, group = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = group;
    this.method = 'POST';
    this.endpoint = 'userGroups';

    return this.then((response) => {
      return this.model.fromJSON(response.group, this.properties);
    });
  },

  deleteUserGroup(properties = {}, group = {}) {
    this.properties = _.assign({}, this.properties, properties, group);

    this.method = 'DELETE';
    this.endpoint = 'userGroup';

    return this.then((response) => {
      return this.model.fromJSON(response.group, this.properties);
    });
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
    'userGroups': {
      'methods': ['get', 'post'],
      'path': '/v1.1/instances/{instanceName}/users/{user}/groups/'
    },
    'userGroup': {
      'methods': ['get', 'delete'],
      'path': '/v1.1/instances/{instanceName}/users/{user}/groups/{group}/'
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
    * Add user to group.
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
    /**
    * Delete user from group.
    * @memberOf Group
    * @instance

    * @returns {Promise}

    * @example {@lang javascript}
    * Group.deleteUser({ user: 1}).then(function(response) {});
    */
    deleteUser(user = {}) {
      const {User} = this.getConfig();
      return User.please().deleteUserFromGroup({ id: this.id, instanceName: this.instanceName}, user);
    },
    /**
    * Fetches details of a user belonging to a group.
    * @memberOf Group
    * @instance

    * @returns {Promise}

    * @example {@lang javascript}
    * Group.getUserDetails({ user: 1}).then(function(response) {});
    */
    getUserDetails(user = {}) {
      const {User} = this.getConfig();
      return User.please().getDetails({ id: this.id, instanceName: this.instanceName}, user);
    }
  });

export default Group;
