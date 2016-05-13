import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';

describe('PartialBackup', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let PartialBackup = null;
  const instanceName = suffix.get('PartialBackup');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    PartialBackup = connection.PartialBackup;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  describe('#please()', function() {

    it('should be able to list partial backups', function() {
      return PartialBackup.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });
  });

  });
