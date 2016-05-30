import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Get, Delete, Create} from '../querySet';

const PartialBackupQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Get,
  Delete,
  Create
).methods({

  listAll() {
    this.resultSetEndpoints = ['list', 'all'];
    this.method = 'GET';
    this.endpoint = 'all';
    return this;
  }

});

const PartialBackupMeta = Meta({
  name: 'partialBackup',
  pluralName: 'partialBackups',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1.1/instances/{instanceName}/backups/partial/{id}/'
    },
    'list': {
      'methods': ['get', 'post'],
      'path': '/v1.1/instances/{instanceName}/backups/partial/'
    },
    'all': {
      'methods': ['get'],
      'path': '/v1.1/backups/partial/'
    }
  }
});

const PartialBackupConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  description: {
    string: true
  },
  label: {
    string: true
  },
  query_args: {
    presence: true,
    object: true
  }
};

/**
 * OO wrapper around instance backups {@link # endpoint}.
 * @constructor
 * @type {Backup}

 * @property {Number} id
 * @property {String} instance
 * @property {String} created_at
 * @property {String} updated_at
 * @property {String} archive - link with zipped backup file
 * @property {Number} size
 * @property {String} status
 * @property {String} status_info
 * @property {String} description
 * @property {String} label
 * @property {Object} [links = {}]
 */
const PartialBackup = stampit()
  .compose(Model)
  .setQuerySet(PartialBackupQuerySet)
  .setMeta(PartialBackupMeta)
  .setConstraints(PartialBackupConstraints);

export default PartialBackup;
