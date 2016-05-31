import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Get, Delete, Create} from '../querySet';

const FullBackupQuerySet = stampit().compose(
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
})

const FullBackupMeta = Meta({
  name: 'fullBackup',
  pluralName: 'fullBackups',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1.1/instances/{instanceName}/backups/full/{id}/'
    },
    'list': {
      'methods': ['get', 'post'],
      'path': '/v1.1/instances/{instanceName}/backups/full/'
    },
    'all': {
      'methods': ['get'],
      'path': '/v1.1/backups/full/'
    }
  }
});

const FullBackupConstraints = {
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
 * @property {Number} size
 * @property {String} status
 * @property {String} status_info
 * @property {String} description
 * @property {String} label
 * @property {Object} [links = {}]
 */
const FullBackup = stampit()
  .compose(Model)
  .setQuerySet(FullBackupQuerySet)
  .setMeta(FullBackupMeta)
  .setConstraints(FullBackupConstraints);

export default FullBackup;
