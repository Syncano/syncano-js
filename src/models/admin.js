import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List, Delete, Update} from '../querySet';

const AdminQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List,
  Delete,
  Update
);

const AdminMeta = Meta({
  name: 'admin',
  pluralName: 'admins',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/admins/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/admins/'
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
  .setQuerySet(AdminQuerySet)
  .setMeta(AdminMeta);

export default Admin;
