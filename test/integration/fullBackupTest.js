import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';

describe('FullBackup', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let FullBackup = null;
  const instanceName = suffix.get('FullBackup');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    FullBackup = connection.FullBackup;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  describe('#please()', function() {

    it('should be able to list full backups', function() {
      return FullBackup.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });
  });

  });
