import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe.only('ScheduleTrace', function() {
  this.timeout(15000);

  let Instance = null;
  let Model = null;
  const instanceName = suffix.get('ScheduleTrace');
  let data = {
    instanceName,
    scheduleId: null
  }

  before(function() {
    const connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.ScheduleTrace;

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.CodeBox.please().create({
        instanceName: instanceName,
        label: instanceName,
        runtime_name: 'python',
        source: 'print "x"'
      });
    }).then((codeBox) => {
      return connection.Schedule.please().create({
        instanceName,
        label: instanceName,
        codebox: codeBox.id,
        interval_sec: 30,
        description: instanceName,
        timezone: 'UTC'
      }).then((schedule) => {
        data.scheduleId = schedule.id;
      });
    });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({scheduleId: 1}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "scheduleId"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/scheduleId/);
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list(data).then((objects) => {
        should(objects).be.an.Array();
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
