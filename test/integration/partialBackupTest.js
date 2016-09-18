import should from 'should/as-function';
import mlog from 'mocha-logger';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';
import {ValidationError} from '../../src/errors';

describe.skip('PartialBackup', function() {
  this.timeout(65000);

  let connection = null;
  let backupId = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('partialbackup');
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
    Model = connection.PartialBackup;

    return Instance.please().create({name: instanceName})
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "description"', function() {
    should(Model({instanceName, description: 123}).save()).be.rejectedWith(/description/);
  });

  it('should validate "label"', function() {
    should(Model({instanceName, label: 123}).save()).be.rejectedWith(/label/);
  });

  it('should validate "query_args"', function() {
    should(Model({instanceName, query_args: 123}).save()).be.rejectedWith(/query_args/);
  });

  describe('#please()', function() {

    it('should be able to list instance partial backups', function() {
      return Model.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to list all partial backups', function() {
      return Model.please().listAll().then((response) => {
        should(response).be.an.Array();
      });
    });

    it('should be able to create partial instance backup', function() {
      return Model.please().create(data)
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

          backupId = backup.id;
        })
        .then(() => {
        mlog.pending('Waiting 50 sec for backup to finish...');
          return new Promise((resolve) => {
            setInterval(() => resolve(), 50000);
          });
        });
    });

    it('should be able to get partial instance backup details', function() {
      return Model.please().get({instanceName, id: backupId})
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
  });
});
