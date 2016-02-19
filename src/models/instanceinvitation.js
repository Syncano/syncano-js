import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, Get, Delete, GetOrCreate, List} from '../querySet';

const InstanceInvitationQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  Get,
  GetOrCreate,
  Delete,
  List,
  Delete
);

const InstanceInvitationMeta = Meta({
  name: 'invitation',
  pluralName: 'invitations',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instanceName}/invitations/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/invitations/'
    }
  }
});

const InstanceInvitationConstraints = {
  email: {
    presence: true
  },
  role: {
    presence: true
  },
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

/**
 * OO wrapper around instance invitations {@link # endpoint}.
 * @constructor
 * @type {InstanceInvitation}

 * @property {String} email
 * @property {String} role
 * @property {String} [key = null]
 * @property {String} [inviter = null]
 * @property {String} [status = null]
 * @property {Number} [id = null]
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const InstanceInvitation = stampit()
  .compose(Model)
  .setMeta(InstanceInvitationMeta)
  .setQuerySet(InstanceInvitationQuerySet)
  .setConstraints(InstanceInvitationConstraints);


export default InstanceInvitation;
