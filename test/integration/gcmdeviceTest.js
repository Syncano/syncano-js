import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe.only('GCMDevice', function() {
  this.timeout(15000);

  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('instance');
  const registrationId = suffix.get('gcm');
  const data = {
    instanceName,
    registration_id: registrationId,
    label: 'test'
  }

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.GCMDevice;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function(done) {
    return Model.please()
      .delete(data)
      .then(() => done())
      .catch(() => done());
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({registration_id: registrationId}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "registration_id"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/registration_id/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.String();
        should(object).have.property('updated_at').which.is.String();
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.String();
        should(object).have.property('updated_at').which.is.String();

        return object.delete();
      });
  });

  describe('#please()', function() {

    afterEach(function() {
      return Model
        .please()
        .list(data)
        .then((objects) => {
          return Promise.all(_.map(objects, (object) => Model.please().delete({registration_id: object.registration_id, instanceName})));
        });
    });

    it('should be able to list objects', function() {
      return Model.please().list(data).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to create an object', function() {
      return Model.please().create(data).then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.String();
        should(object).have.property('updated_at').which.is.String();
      });
    });

    it('should be able to get an object', function() {
      return Model.please().create(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('metadata').which.is.Object();
          should(object).have.property('created_at').which.is.String();
          should(object).have.property('updated_at').which.is.String();

          return object;
        })
        .then(() => {
          return Class
            .please()
            .get(data)
            .request();
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('metadata').which.is.Object();
          should(object).have.property('created_at').which.is.String();
          should(object).have.property('updated_at').which.is.String();
        });
    });

  });

});
