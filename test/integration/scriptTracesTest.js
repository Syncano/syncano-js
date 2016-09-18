import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('ScriptTrace', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;

  const instanceName = suffix.getHyphened('ScriptTrace');
  const data = {instanceName};

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.ScriptTrace;

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.Script.please().create({
        instanceName: instanceName,
        label: instanceName,
        runtime_name: 'python_library_v4.2',
        source: 'print "x"'
      });
    }).then((script) => {
      data.scriptId = script.id;
      return script.run();
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
    should(Model().save()).be.rejectedWith(/instanceName/);
  });

  it('should require "scriptId"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/scriptId/);
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
        should(object).have.property('scriptId').which.is.Number().equal(data.scriptId);
        should(object).have.property('executed_at');
        should(object).have.property('duration');
        should(object).have.property('links').which.is.Object();
        should(object).have.property('result').which.is.Object();
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
