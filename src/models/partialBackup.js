import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List} from '../querySet';

const PartialBackupQuerySet = stampit().compose(
  BaseQuerySet,
  List
);

const PartialBackupMeta = Meta({
  name: 'partialBackup',
  pluralName: 'partialBackups',
  endpoints: {
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/backups/partial/'
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
  .setMeta(PartialBackupMeta);

export default PartialBackup;
