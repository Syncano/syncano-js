import stampit from 'stampit';
import {Meta, Model} from './base';

const AdminMeta = Meta({
  name: 'admin',
  pluralName: 'admins',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/admins/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/admins/'
    }
  }
});

/**
 * OO wrapper around instance admins {@link http://docs.syncano.com/v4.0/docs/v1instancesinstanceadmins endpoint}.
 * @constructor
 * @type {Admin}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} first_name
 * @property {String} last_name
 * @property {String} email
 * @property {String} role One of full, write and read.
 * @property {Object} [links = {}]
 */
const Admin = stampit()
  .compose(Model)
  .setMeta(AdminMeta);

export default Admin;
