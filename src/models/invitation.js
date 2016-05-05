import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Create, BulkCreate, Get, Delete, GetOrCreate, List} from '../querySet';

const InvitationQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  BulkCreate,
  Get,
  GetOrCreate,
  Delete,
  List,
  Delete
).methods({

  accept(invitation_key) {
    this.method = 'POST';
    this.endpoint = 'accept';
    this.payload = {invitation_key};
    this._serialize = false;

    return this;
  }

});

const InvitationMeta = Meta({
  name: 'invitation',
  pluralName: 'invitations',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1.1/account/invitations/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/account/invitations/'
    },
    'accept': {
      'methods': ['post'],
      'path': '/v1.1/account/invitations/accept/'
    }
  }
});

/**
 * OO wrapper around invitations {@link # endpoint}.
 * @constructor
 * @type {Invitation}

 * @property {String} email
 * @property {String} role
 * @property {String} [key = null]
 * @property {String} [inviter = null]
 * @property {String} [status = null]
 * @property {Number} [id = null]
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Invitation = stampit()
  .compose(Model)
  .setMeta(InvitationMeta)
  .setQuerySet(InvitationQuerySet)
  .methods({

    accept(invitation_key) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('accept', this);

      return this.makeRequest('POST', path, {invitation_key});
    }

  });

export default Invitation;
