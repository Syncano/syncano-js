import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Create, BulkCreate, List} from '../querySet';

const UserQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Create,
  BulkCreate,
  List
).methods({

  groupUsers(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'GET';
    this.endpoint = 'groupUsers';

    return this.then((response) => {
      return this.model.please().asResultSet(response, 'user');
    })
  },

  addUserToGroup(properties = {}, user = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = user;
    this.method = 'POST';
    this.endpoint = 'groupUsers';

    return this;
  },

  deleteUserFromGroup(properties = {}, user = {}) {
    this.properties = _.assign({}, this.properties, properties, user);
    this.payload = user;
    this.method = 'DELETE';
    this.endpoint = 'groupUser';

    return this;
  },

  get(properties = {}) {
    const config = this.getConfig();

    this.properties = _.assign({}, this.properties, properties);
    this.method = 'GET';
    this.endpoint = 'detail';

    if (_.isEmpty(config.getAccountKey()) && !_.isEmpty(config.getUserKey()) && !_.isEmpty(config.getApiKey())) {
      this.endpoint = 'user';
    }

    return this;
  },

  update(properties = {}, object = {}) {
    const config = this.getConfig();

    this.properties = _.assign({}, this.properties, properties);
    this.payload = object;
    this.method = 'PATCH';
    this.endpoint = 'detail';

    if (_.isEmpty(config.getAccountKey()) && !_.isEmpty(config.getUserKey()) && !_.isEmpty(config.getApiKey())) {
      this.endpoint = 'user';
    }

    return this;
  },

  /**
  * Restes user key.
  * @memberOf UserQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {Promise}

  * @example {@lang javascript}
  * User.please().resetKey({id: 1, instanceName: 'test-one'}).then(function(user) {});

  */
  resetKey(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'reset_key';

    return this;
  },

  /**
  * A convenience method for authenticating instance user with email and password.

  * @memberOf UserQuerySet
  * @instance

  * @param {Object} properties
  * @param {String} properties.instanceName
  * @param {Object} credentials
  * @param {String} credentials.email
  * @param {String} credentials.password
  * @returns {Promise}

  */
  login(properties = {}, credentials = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'login';
    this.payload = credentials;

    return this;
  },

  /**
  * A convenience method for authenticating instance user with email and password.

  * @memberOf UserQuerySet
  * @instance

  * @param {Object} properties
  * @param {String} properties.instanceName
  * @param {String} properties.backend
  * @param {Object} credentials
  * @param {String} credentials.access_token
  * @returns {Promise}

  */
  socialLogin(properties = {}, credentials = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'socialLogin';
    this.payload = credentials;

    return this;
  }

});

const UserMeta = Meta({
  name: 'user',
  pluralName: 'users',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/users/{id}/'
    },
    'reset_key': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/users/{id}/reset_key/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/users/'
    },
    'groups': {
      'methods': ['get', 'post'],
      'path': '/v1.1/instances/{instanceName}/users/{id}/groups/'
    },
    'login': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/user/auth/'
    },
    'socialLogin': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/user/auth/{backend}/'
    },
    'user': {
      'methods': ['get', 'post', 'patch'],
      'path': '/v1.1/instances/{instanceName}/user/'
    },
    'groupUsers': {
      'methods': ['get', 'post'],
      'path': '/v1.1/instances/{instanceName}/groups/{id}/users/'
    },
    'groupUser': {
      'methods': ['get', 'delete'],
      'path': '/v1.1/instances/{instanceName}/groups/{id}/users/{user}/'
    }
  }
});

const UserConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  username: {
    presence: true,
    string: true
  },
  password: {
    presence: true,
    string: true
  },
  profile: {
    object: true
  },
  'profile.owner_permissions': {
    inclusion: ['none', 'read', 'write', 'full']
  },
  'profile.group': {
    numericality: {
      noStrings: true
    }
  },
  'profile.group_permissions': {
    inclusion: ['none', 'read', 'write', 'full']
  },
  'profile.other_permissions': {
    inclusion: ['none', 'read', 'write', 'full']
  },
  'profile.channel': {
    string: true
  },
  'profile.channel_room': {
    string: true
  }
};

/**
 * OO wrapper around instance users {@link http://docs.syncano.com/v4.0/docs/user-management endpoint}.
 * @constructor
 * @type {User}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} username
 * @property {String} password
 * @property {String} user_key
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const User = stampit()
  .compose(Model)
  .setMeta(UserMeta)
  .setQuerySet(UserQuerySet)
  .setConstraints(UserConstraints)
  .methods({
    /**
    * Restes user key.
    * @memberOf User
    * @instance
    * @returns {Promise}

    * @example {@lang javascript}
    * User.please().get({instanceName: 'test-one', id: 1}).then(function(user) {
    *   user.resetKey().then(function(user) {});
    * });
    */
    resetKey() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('reset_key', this);

      return this.makeRequest('POST', path, {}).then((body) => this.serialize(body));
    }

  });

export default User;
