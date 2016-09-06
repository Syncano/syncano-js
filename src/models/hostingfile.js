import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';
import {BaseQuerySet, Get, Create, Update, Delete, List} from '../querySet';

const HostingFileQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Create,
  Delete,
  Update,
  List
)
.methods({

  upload(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'list';
    this.payload = payload;
    this.raw();

    return this.then((response) => {
      return this.model.fromJSON(response, this.properties);
    });
  }

})

const HostingFileMeta = Meta({
  name: 'hostingfile',
  pluralName: 'hostingfiles',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/hosting/{hostingId}/files/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/hosting/{hostingId}/files/'
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
  file: {
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
