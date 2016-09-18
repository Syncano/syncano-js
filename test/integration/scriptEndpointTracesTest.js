import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('ScriptEndpointTrace', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;

  const instanceName = suffix.getHyphened('ScriptEndpointTrace');
  const scriptEndpointName = suffix.get('scriptendpointtrace');
  const data = {
    instanceName,
    scriptEndpointName
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.ScriptEndpointTrace;

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.Script.please().create({
        instanceName: instanceName,
        label: scriptEndpointName,
        runtime_name: 'python_library_v4.2',
        source: 'print "x"'
      });
    }).then((script) => {
      return connection.ScriptEndpoint.please().create({
        instanceName,
        name: scriptEndpointName,
        script: script.id
      });
    }).then((ScriptEndpoint) => {
      return ScriptEndpoint.run();
    }).then((trace) => {
      data.id = trace.id;
    });
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
    should(Model({scriptEndpointName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "scriptEndpointName"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/scriptEndpointName/);
  });

  it('should validate "scriptEndpointName"', function() {
    should(Model({instanceName, scriptEndpointName: 1}).save()).be.rejectedWith(/scriptEndpointName/);
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list(data).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to get an object', function() {
      return Model.please().get(data).then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('status').which.is.String();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('scriptEndpointName').which.is.String().equal(scriptEndpointName);
        should(object).have.property('executed_at').which.is.Date();
        should(object).have.property('duration').which.is.Number();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('result').which.is.Object();
        should(object).have.property('meta').which.is.Object();
        should(object).have.property('args').which.is.Object();
      });
    });

    it('should be able to get first object (SUCCESS)', function() {
      return Model.please().first(data).then((object) => {
        should(object).be.an.Object();
      });
    });

    it('should be able to change page size', function() {
      return Model.please(data).pageSize(1).then((objects) => {
        should(objects).be.an.Array().with.length(1);
      });
    });

    it('should be able to get raw data', function() {
      return Model.please().list(data).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });
  });
});
