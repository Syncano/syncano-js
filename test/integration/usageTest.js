import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';

describe('Usage', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('Usage');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Usage;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  describe('#please()', function() {

    it('should be able to get a Model', function() {
      return Model.please().get().then((Model) => {
        should(Model).have.property('links').which.is.Object();
        should(Model.links).have.property('hourly').which.is.String().equal('/v1.1/usage/hourly/');
        should(Model.links).have.property('daily').which.is.String().equal('/v1.1/usage/daily/');
      });
    });

  });


});
