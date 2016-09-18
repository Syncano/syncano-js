import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';

describe('APNSConfig', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('APNSConfig');
  const data = {instanceName};

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.APNSConfig;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model().save()).be.rejectedWith(/instanceName/);
  });

  it('should be able to remove certificate via model instance', function() {
    return Model.please()
        .update(data, {
          production_certificate_name: instanceName,
          development_certificate: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12'),
          development_bundle_identifier: 'com.syncano.testAPNS'
        }).then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('production_certificate_name').which.is.String().equal(instanceName);
          should(object).have.property('development_certificate').which.is.true();
          should(object).have.property('development_bundle_identifier').which.is.String().equal('com.syncano.testAPNS');

          return object.removeCertificate({development_certificate: true});
        }).then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('production_certificate_name').which.is.String().equal(instanceName);
          should(object).have.property('development_certificate').which.is.false();
          should(object).have.property('development_bundle_identifier').which.is.String().equal('com.syncano.testAPNS');
        });
  });

  describe('#please()', function() {

    it('should be able to get a Model', function() {
      return Model.please().get(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('production_certificate');
          should(object).have.property('production_expiration_date');
          should(object).have.property('production_bundle_identifier');
          should(object).have.property('production_certificate_name');
          should(object).have.property('development_certificate');
          should(object).have.property('development_expiration_date');
          should(object).have.property('development_bundle_identifier');
          should(object).have.property('development_certificate_name');
        });
    });

    it('should be able to update a Model', function() {
      return Model.please()
        .update(data, {
          production_certificate_name: instanceName,
          development_certificate: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12'),
          development_bundle_identifier: 'com.syncano.testAPNS'
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('production_certificate_name').which.is.String().equal(instanceName);
          should(object).have.property('development_certificate').which.is.true();
          should(object).have.property('development_bundle_identifier').which.is.String().equal('com.syncano.testAPNS');
        });
    });

    it('should be able to remove certificate', function() {
      return Model.please()
        .update(data, {
          development_certificate: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12'),
          development_bundle_identifier: 'com.syncano.testAPNS'
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('development_certificate').which.is.true();
          should(object).have.property('development_bundle_identifier').which.is.String().equal('com.syncano.testAPNS');

          return Model.please().removeCertificate(data, {development_certificate: true});
        }).then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('production_certificate_name').which.is.String().equal(instanceName);
          should(object).have.property('development_certificate').which.is.false();
          should(object).have.property('development_bundle_identifier').which.is.String().equal('com.syncano.testAPNS');
        });
    });
  });
});
