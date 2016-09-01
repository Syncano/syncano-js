import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Update, Create, Delete} from '../querySet';

const HostingQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Update,
  Create,
  Delete
);

const HostingMeta = Meta({
  name: 'hosting',
  pluralName: 'hostings',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/hosting/{id}/'
    },
    'setDefault': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/hosting/{id}/set_default/'
    },
    'list': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/hosting/'
    },
    'fileList': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/hosting/{id}/files/'
    },
    'fileDetail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/hosting/{id}/files/{fileId}/'
    }
  }
});

/**
 * OO wrapper around Hosting.
 * @constructor
 * @type {Hosting}

 */
const Hosting = stampit()
  .compose(Model)
  .setQuerySet(HostingQuerySet)
  .setMeta(HostingMeta);

export default Hosting;
