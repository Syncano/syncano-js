import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';
import {BaseQuerySet, Create, BulkCreate, Get, Delete, GetOrCreate, List} from '../querySet';

const InstanceInvitationQuerySet = stampit().compose(
  BaseQuerySet,
  Create,
  BulkCreate,
  Get,
  GetOrCreate,
  Delete,
  List,
  Delete
).methods({

  resend(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'resend';
    return this;
  }

});

const InstanceInvitationMeta = Meta({
  name: 'instanceInvitation',
  pluralName: 'instanceInvitations',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1.1/instances/{instanceName}/invitations/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/invitations/'
    },
    'resend': {
      'methods': ['post'],
      'path':  '/v1.1/instances/{instanceName}/invitations/{id}/resend/'
    }
  }
});

const InstanceInvitationConstraints = {
  email: {
    presence: true,
    email: true
  },
  role: {
    presence: true,
    inclusion: ['full', 'write', 'read']
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
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const InstanceInvitation = stampit()
  .compose(Model)
  .setMeta(InstanceInvitationMeta)
  .methods({

    resend() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('resend', this);

      return this.makeRequest('POST', path);
    }

  })
  .setQuerySet(InstanceInvitationQuerySet)
  .setConstraints(InstanceInvitationConstraints);


export default InstanceInvitation;
