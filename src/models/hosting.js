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

const HostingConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  label: {
    string: true
  },
  description: {
    string: true
  },
  domains: {
    array: true
  }
};

/**
 * OO wrapper around Hosting.
 * @constructor
 * @type {Hosting}

 * @property {String} label
 * @property {String} description
 * @property {Array} domains
 */
const Hosting = stampit()
  .compose(Model)
  .setQuerySet(HostingQuerySet)
  .setConstraints(HostingConstraints)
  .setMeta(HostingMeta);

export default Hosting;
