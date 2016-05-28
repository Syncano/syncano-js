import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';
import {ValidationError} from '../../src/errors';

describe('Solution', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('Solution');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Solution;

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

  it('should require "label"', function() {
    should(Model({}).save()).be.rejectedWith(/label/);
  });

  it('should validate "label"', function() {
    should(Model({ label: []}).save()).be.rejectedWith(/label/);
  });

  it('should validate "description"', function() {
    should(Model({ label: 'label', description: []}).save()).be.rejectedWith(/description/);
  });

  it('should validate "metadata"', function() {
    should(Model({ label: 'label', description: 'my solution', metadata: 'meta'}).save()).be.rejectedWith(/metadata/);
  });

  it('should validate "public"', function() {
    should(Model({ label: 'label', description: 'my solution', metadata: {}, public: 'yes'}).save()).be.rejectedWith(/public/);
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list().then((Models) => {
        should(Models).be.an.Array();
      });
    });

  });


});
