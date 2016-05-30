import should from 'should/as-function';
import mlog from 'mocha-logger';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';
import {ValidationError} from '../../src/errors';

describe('PartialBackup', function() {
  this.timeout(35000);

  let connection = null;
  let backupId = null;
  let Instance = null;
  let PartialBackup = null;
  const instanceName = suffix.get('partialbackup');
  const description = suffix.get('description');
  const label = suffix.get('label');
  const data = {
    instanceName: instanceName,
    description: description,
    label: label,
    query_args: {"user": []}
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    PartialBackup = connection.PartialBackup;

    return Instance.please()
      .create({name: instanceName})
      .then(() => PartialBackup.please().create(data))
      .then((backup) => {
        backupId = backup.id;
        mlog.pending('Waiting 20 sec for backup to finish...');
        return new Promise((resolve) => {
          setInterval(() => resolve(), 20000);
        });
      });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(PartialBackup().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(PartialBackup({}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "description"', function() {
    should(PartialBackup({instanceName, description: 123}).save()).be.rejectedWith(/description/);
  });

  it('should validate "label"', function() {
    should(PartialBackup({instanceName, label: 123}).save()).be.rejectedWith(/label/);
  });

  it('should validate "query_args"', function() {
    should(PartialBackup({instanceName, query_args: 123}).save()).be.rejectedWith(/query_args/);
  });

  // Sometimes this test causes fail because we can have only one active backup running at once.

  // it('should be able to save via model instance', function() {
  //   return PartialBackup(data).save()
  //     .then((backup) => {
  //       should(backup).be.an.Object();
  //       should(backup).have.property('id').which.is.Number();
  //       should(backup).have.property('instance').which.is.String().equal(data.instanceName);
  //       should(backup).have.property('created_at').which.is.Date();
  //       should(backup).have.property('updated_at').which.is.Date();
  //       should(backup).have.property('archive').which.is.null();
  //       should(backup).have.property('size').which.is.null();
  //       should(backup).have.property('status').which.is.String().equal('scheduled');
  //       should(backup).have.property('status_info').which.is.String();
  //       should(backup).have.property('description').which.is.String().equal(data.description);
  //       should(backup).have.property('label').which.is.String().equal(data.label);
  //       should(backup).have.property('links').which.is.Object();
  //     });
  // });

  describe('#please()', function() {

    it('should be able to list instance partial backups', function() {
      return PartialBackup.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to list all partial backups', function() {
      return PartialBackup.please().listAll().then((response) => {
        should(response).be.an.Array();
      });
    });

    it('should be able to get partial instance backup details', function() {
      return PartialBackup.please().get({instanceName, id: backupId})
        .then((backup) => {
          should(backup).be.an.Object();
          should(backup).have.property('id').which.is.Number().equal(backupId);
          should(backup).have.property('instance').which.is.String().equal(data.instanceName);
          should(backup).have.property('created_at').which.is.Date();
          should(backup).have.property('updated_at').which.is.Date();
          should(backup).have.property('status').which.is.String().equalOneOf('scheduled', 'running', 'success');
          should(backup).have.property('status_info').which.is.String();
          should(backup).have.property('description').which.is.String().equal(data.description);
          should(backup).have.property('label').which.is.String().equal(data.label);
          should(backup).have.property('links').which.is.Object();
          should(backup).have.property('author').which.is.Object();
      });
    });

    it('should be able to create partial instance backup', function() {
      return PartialBackup.please().create(data)
        .then((backup) => {
          should(backup).be.an.Object();
          should(backup).have.property('id').which.is.Number();
          should(backup).have.property('instance').which.is.String().equal(data.instanceName);
          should(backup).have.property('created_at').which.is.Date();
          should(backup).have.property('updated_at').which.is.Date();
          should(backup).have.property('archive').which.is.null();
          should(backup).have.property('size').which.is.null();
          should(backup).have.property('status').which.is.String().equal('scheduled');
          should(backup).have.property('status_info').which.is.String();
          should(backup).have.property('description').which.is.String().equal(data.description);
          should(backup).have.property('label').which.is.String().equal(data.label);
          should(backup).have.property('links').which.is.Object();
          should(backup).have.property('author').which.is.Object();
          return backup;
        });
    });
  });

});
