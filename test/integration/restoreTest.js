import should from 'should/as-function';
import Syncano from '../../src/syncano';
import mlog from 'mocha-logger';
import {suffix, credentials} from './utils';

describe.skip('Restore', function() {
  this.timeout(65000);

  let connection = null;
  let Instance = null;
  let Model = null;
  let FullBackup = null;
  let backupId = null;
  let restoreId = null;
  const instanceName = suffix.getHyphened('restore');
  const description = suffix.get('description');
  const label = suffix.get('label');
  const backupData = {
    instanceName: instanceName,
    description: description,
    label: label
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Restore;
    FullBackup = connection.FullBackup;

    return Instance.please()
      .create({name: instanceName})
      .then(() => FullBackup.please().create(backupData))
      .then((backup) => {
        backupId = backup.id;
        mlog.pending('Waiting 50 sec for backup to finish...');
        return new Promise((resolve) => {
          setInterval(() => resolve(), 50000);
        });
      });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  describe('#please()', function() {

    it('should be able to list restores', function() {
      return Model.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it("should be able to restore instance from backup", function() {
      return Model.please().restore({instanceName}, {backup: backupId})
        .then((restore) => {
          restoreId = restore.id;
          should(restore).be.an.Object();
          should(restore).have.property('id').which.is.Number();
          should(restore).have.property('backup').which.is.Number().equal(backupId);
          should(restore).have.property('created_at').which.is.Date();
          should(restore).have.property('updated_at').which.is.Date();
          should(restore).have.property('status').which.is.String().equal('scheduled');
          should(restore).have.property('archive').which.is.null();
          should(restore).have.property('status_info').which.is.String();
          should(restore).have.property('author').which.is.Object();
        });
    });

    it('should be able to get restore details', function() {
      return Model.please().get({instanceName, id: restoreId})
        .then((restore) => {
          should(restore).be.an.Object();
          should(restore).have.property('id').which.is.Number();
          should(restore).have.property('backup').which.is.Number().equal(backupId);
          should(restore).have.property('created_at').which.is.Date();
          should(restore).have.property('updated_at').which.is.Date();
          should(restore).have.property('status').which.is.String();
          should(restore).have.property('archive').which.is.null();
          should(restore).have.property('status_info').which.is.String();
          should(restore).have.property('author').which.is.Object();
      });
    });
  });
});
