import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List} from '../querySet';

const FullBackupQuerySet = stampit().compose(
  BaseQuerySet,
  List
);

const FullBackupMeta = Meta({
  name: 'fullBackup',
  pluralName: 'fullBackups',
  endpoints: {
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/backups/full/'
    }
  }
});

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
  .setMeta(FullBackupMeta);

export default FullBackup;
