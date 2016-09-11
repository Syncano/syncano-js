import stampit from 'stampit';
import {Meta, Model} from './base';
import _ from 'lodash';
import Promise from 'bluebird';
import {BaseQuerySet, Get, Update, Create, Delete, List} from '../querySet';

const HostingQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Update,
  Create,
  Delete,
  List
)
.methods({

  setDefault(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'setDefault';

    return this;
  },

  listFiles(properties = {}) {
    const {HostingFile} = this.getConfig();

    return HostingFile.please().list({instanceName: properties.instanceName, hostingId: properties.id});
  },

  uploadFile(properties = {}, payload = {}) {
    const {HostingFile} = this.getConfig();

    return HostingFile.please().upload({instanceName: properties.instanceName, hostingId: properties.id}, payload);
  },

  uploadFiles(properties = {}, files = []) {
    const {HostingFile} = this.getConfig();

    return Promise.mapSeries(files, (f) => HostingFile.please().upload({instanceName: properties.instanceName, hostingId: properties.id}, f));
  },

  updateFile(properties = {}, payload = {}) {
    const {HostingFile} = this.getConfig();

    return HostingFile.please().update({instanceName: properties.instanceName, hostingId: properties.id, id: properties.fileId}, payload);
  },

  getFileDetails(properties = {}) {
    const {HostingFile} = this.getConfig();

    return HostingFile.please().get({ instanceName: properties.instanceName, hostingId: properties.id, id: properties.fileId});
  },

  deleteFile(properties = {}) {
    const {HostingFile} = this.getConfig();

    return HostingFile.please().delete({ instanceName: properties.instanceName, hostingId: properties.id, id: properties.fileId});
  }

});

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
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/hosting/'
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
      const {HostingFile} = this.getConfig();

      return HostingFile.please().list({instanceName: this.instanceName, hostingId: this.id});
    },

    uploadFile(payload = {}) {
      const {HostingFile} = this.getConfig();

      return HostingFile.please().upload({instanceName: this.instanceName, hostingId: this.id}, payload);
    },

    uploadFiles(files = []) {
      const {HostingFile} = this.getConfig();

      return Promise.mapSeries(files, (f) => HostingFile.please().upload({instanceName: this.instanceName, hostingId: this.id}, f));
    },

    updateFile(file_id, payload = {}) {
      const {HostingFile} = this.getConfig();

      return HostingFile.please().update({instanceName: this.instanceName, hostingId: this.id, id: file_id}, payload);
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
