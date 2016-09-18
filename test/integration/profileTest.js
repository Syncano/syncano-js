import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';

describe('Profile', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('Profile');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Profile;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  describe('#please()', function() {

    it('should be able to get Model', function() {
      return Model.please().get().then((Model) => {
        should(Model).be.an.Object();
        should(Model).have.property('balance').which.is.Object();
        should(Model).have.property('subscription').which.is.Object();
        should(Model).have.property('first_name').which.is.String();
        should(Model).have.property('last_name').which.is.String();
        should(Model).have.property('address_line1').which.is.String();
        should(Model).have.property('address_line2').which.is.String();
        should(Model).have.property('address_zip').which.is.String();
        should(Model).have.property('address_country').which.is.String();
        should(Model).have.property('address_city').which.is.String();
        should(Model).have.property('address_state').which.is.String();
        should(Model).have.property('company_name').which.is.String();
        should(Model).have.property('tax_number').which.is.String();
        should(Model).have.property('soft_limit').which.is.String();
        should(Model).have.property('hard_limit').which.is.String();
        should(Model).have.property('failed_invoice').which.is.Null();
      });
    });

    it('should be able to update Model', function() {
      return Model.please().update({}, { first_name: 'John Doe' }).then((Model) => {
        should(Model).be.an.Object();
        should(Model).have.property('first_name').which.is.String().equal('John Doe');
      });
    });
  });
});
