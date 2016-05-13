import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, hex} from './utils';

describe.only('APNSConfig', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.get('APNSConfig');
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

  describe('#please()', function() {

    it('should be able to get a Model', function() {
      return Model.please().get(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('production_certificate').which.is.false();
          should(object).have.property('production_expiration_date').which.is.null();
          should(object).have.property('production_bundle_identifier').which.is.null();
          should(object).have.property('production_certificate_name').which.is.null();
          should(object).have.property('development_certificate').which.is.false();
          should(object).have.property('development_expiration_date').which.is.null();
          should(object).have.property('development_bundle_identifier').which.is.null();
          should(object).have.property('development_certificate_name').which.is.null();
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

  });

});
