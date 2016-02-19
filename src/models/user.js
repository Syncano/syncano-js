import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Create, List} from '../querySet';

const UserQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Create,
  List
);

const UserMeta = Meta({
  name: 'user',
  pluralName: 'users',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/users/{id}/'
    },
    'reset_key': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/users/{id}/reset_key/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/users/'
    },
    'groups': {
      'methods': ['get', 'post'],
      'path': '/v1/instances/{instanceName}/users/{id}/groups/'
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
    presence: true
  },
  password: {
    presence: true
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
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const User = stampit()
  .compose(Model)
  .setMeta(UserMeta)
  .setQuerySet(UserQuerySet)
  .setConstraints(UserConstraints);

export default User;
