import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Update, Create, Delete} from '../querySet';

const HostingFileQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Update,
  Create,
  Delete
);

const HostingFileMeta = Meta({
  name: 'hostingfile',
  pluralName: 'hostingfiles',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/hosting/{hostingId}/files/{id}/'
    }
  }
});

const HostingFileConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  hostingId: {
    presence: true,
    numericality: true
  },
  path: {
    presence: true,
    string: true
  },
  file_object: {
    presence: true
  }
}

/**
 * OO wrapper around HostingFile.
 * @constructor
 * @type {Hosting}

 * @property {Number} hostingId
 * @property {String} path
 * @property {Object} file_object
 */
const HostingFile = stampit()
  .compose(Model)
  .setQuerySet(HostingFileQuerySet)
  .setMeta(HostingFileMeta)
  .setConstraints(HostingFileConstraints);

export default HostingFile;
