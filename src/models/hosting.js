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
  .setMeta(HostingMeta)
  .methods({

    setDefault() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('setDefault', this);

      return this.makeRequest('POST', path).then((body) => this.serialize(body));
    },

    listFiles() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('fileList', this);

      return this.makeRequest('GET', path)
        .then((response) => this.getConfig().HostingFile.please().asResultSet(response));
    },

    uploadFile(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('fileList', this);

      return this.makeRequest('POST', path, {payload})
        .then((response) => this.getConfig().HostingFile.fromJSON(response, this));
    },

    deleteFile(file_id) {
      const {HostingFile} = this.getConfig();

      return HostingFile.please().delete({ instanceName: this.instanceName, hostingId: this.id, id: file_id});
    },

    getFileDetails(file_id) {
      const {HostingFile} = this.getConfig();

      return HostingFile.please().get({ instanceName: this.instanceName, hostingId: this.id, id: file_id});
    }

  });

export default Hosting;
