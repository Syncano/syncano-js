import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe.only('CustomSocket', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('CustomSocket');
  const name = suffix.get('socket');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.CustomSocket;

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

  it('should require "name"', function() {
    should(Model({ instanceName }).save()).be.rejectedWith(/name/);
  });

  it('should require "endpoints"', function() {
    should(Model({ instanceName, name }).save()).be.rejectedWith(/endpoints/);
  });

  it('should validate "endpoints"', function() {
    should(Model({ instanceName, name, endpoints: [] }).save()).be.rejectedWith(/endpoints/);
  });

  it('should require "dependencies"', function() {
    should(Model({ instanceName, name, endpoints: {} }).save()).be.rejectedWith(/dependencies/);
  });

  it('should validate "dependencies"', function() {
    should(Model({ instanceName, name, endpoints: {}, dependencies: 'dep' }).save()).be.rejectedWith(/dependencies/);
  });

})
