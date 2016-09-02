import Syncano from '../../src/syncano';
import should from 'should/as-function';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('Hosting', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.get('account');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Hosting;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "label"', function() {
    should(Model({ instanceName, label: [] }).save()).be.rejectedWith(/label/);
  });

  it('should validate "description"', function() {
    should(Model({ instanceName, label: 'sth', description: [] }).save()).be.rejectedWith(/description/);
  });

  it('should validate "domains"', function() {
    should(Model({ instanceName, label: 'sth', description: 'sth', domains: 'sth' }).save()).be.rejectedWith(/domains/);
  });

});
