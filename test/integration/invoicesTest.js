import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';

describe('Invoice', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('Invoice');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Invoice;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list().then((Models) => {
        should(Models).be.an.Array();
      });
    });
  });
});
