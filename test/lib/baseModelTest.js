import should from 'should/as-function';
import Syncano from '../../src/syncano';
import Instance from '../../src/models/instance';
import {ValidationError} from '../../src/errors';
import nock from 'nock';
import {instanceName, testEndpoint, testBaseUrl, testName} from './utils';

describe('Meta', function() {
  let model = null;
  let meta = null;

  beforeEach(function() {
    model = Syncano().Instance({ name: instanceName });
    meta = model.getMeta();
  });

  describe('#resolveEndpointPath()', function() {

    it('is a function of the "meta" property', function() {
      should(meta).have.property('resolveEndpointPath').which.is.Function();
    });

    it('should throw error when endpoint is not found', function() {
      should(meta.resolveEndpointPath(testEndpoint, model)).be.rejectedWith(/endpoint/);
    });

    it('should throw error when path properties are missing', function() {
      should(meta.resolveEndpointPath('detail', null)).be.rejectedWith(/path properties/);
    });

    it('shoud return path', function() {
      let path = meta.resolveEndpointPath('detail', model);
      should(path).equal(`/v1.1/instances/${instanceName}/`);
    });

  });

  describe('#findAllowedMethod()', function() {

    it('is a function of the "meta" property', function() {
      should(meta).have.property('findAllowedMethod').which.is.Function();
    });

    it('should throw error when unsupported methods are passed', function() {
      should(meta.findAllowedMethod('list', 'UPDATE')).be.rejectedWith(/Unsupported/);
    });

    it('should return supported method', function() {
      let method = meta.findAllowedMethod('list', 'GET');
      should(method).equal('get');
    });

  });

});

describe('Model', function() {
  let model = null;
  let modelSingle = null;
  let api = null

  beforeEach(function() {
    model = Syncano({ name: instanceName, baseUrl: testBaseUrl }).Instance;
    modelSingle = Instance;
    api = nock(testBaseUrl)
            .filteringRequestBody(function() {
              return '*';
            });
  });

  describe('#please()', function() {

    it('should be a method of the model', function() {
      should(model).have.property('please').which.is.Function();
    })

    it('should return QuerySet object', function() {
      let qs = model.please();
      should(qs).be.type('object');
    });

  });

  describe('#isNew()', function() {

    it('should be a method of the model', function() {
      should(modelSingle()).have.property('isNew').which.is.Function();
    });

    it('should return true if no "links" property is fond on the model', function() {
      should(modelSingle().isNew()).equal(true);
    });

    it('should return false if "links" property is fond on the model', function() {
      should(modelSingle({ links: {} }).isNew()).equal(false);
    });

  });

  describe('#validate()', function() {

    it('should be a method of the model', function() {
      should(modelSingle()).have.property('validate').which.is.Function();
    });

    it('should enable validation', function() {
      should(modelSingle.setConstraints({})().validate()).not.be.ok;
      should(modelSingle().validate()).have.property('name').which.is.Array();
      should(modelSingle({ name: testName}).validate()).not.be.ok;
    });

  });

  describe('#save()', function() {

    it('should be a method of the model', function(){
      should(modelSingle()).have.property('save').which.is.Function();
    });

    it('should check if required data is present', function() {
      should(modelSingle().save()).rejectedWith(ValidationError);
    })

    it('should save model', function() {
      api.post('/v1.1/instances/', '*').reply(201, {
        name: instanceName,
        links: {}
      });

      model({name: instanceName}).save().then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
      });
    });

    it('should update model', function() {
      api.put(`/v1.1/instances/${instanceName}/`, '*').reply(201, {
        name: instanceName,
        links: {}
      });

      model({name: instanceName, links: {a: 1}}).save().then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
      });
    });

    it('should throw error when server response is error', function() {
      api.post('/v1.1/instances/', '*').reply(404);
      should(model({name: instanceName}).save()).rejectedWith(Error);
    });

  });

  describe('#delete()', function() {
    it('should be a method of the model', function(){
      should(modelSingle()).have.property('delete').which.is.Function();
    });

    it('should delete model record', function() {
      api.delete(`/v1.1/instances/${instanceName}/`, '*').reply(204);
      should(model({name: instanceName}).delete()).be.fulfilled();
    });

    it('should throw error when server response is error', function() {
      api.delete('/v1.1/instances/${instanceName}/', '*').reply(404);
      should(model({name: instanceName}).delete()).rejectedWith(Error);
    });
  })

});
