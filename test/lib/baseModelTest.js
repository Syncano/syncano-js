import should from 'should/as-function';
import Syncano from '../../src/syncano';
import Instance from '../../src/models/instance';

describe('Base model meta', function() {
  let model = null;
  let meta = null;

  beforeEach(function() {
    model = Syncano().Instance({ name: 'testInstance' });
    meta = model.getMeta();
  });

  describe('#resolveEndpointPath()', function() {

    it('is a function of the "meta" property', function() {
      should(meta).have.property('resolveEndpointPath').which.is.Function();
    });

    it('should throw error when endpoint is not found', function() {
      should(function() {
        meta.resolveEndpointPath('test_endpoint', model);
      }).throw(Error('Invalid endpoit name: test_endpoint.'));
    });

    it('should throw error when path properties are missing', function() {
      should(function() {
        meta.resolveEndpointPath('detail', null);
      }).throw(Error('Missing "detail" path properties "name"'))
    });

    it('shoud return path', function() {
      let path = meta.resolveEndpointPath('detail', model);
      should(path).equal('/v1/instances/testInstance/');
    });

  });

  describe('#findAllowedMethod()', function() {

    it('is a function of the "meta" property', function() {
      should(meta).have.property('findAllowedMethod').which.is.Function();
    });

    it('should throw error when unsupported methods are passed', function() {
      should(function() {
        meta.findAllowedMethod('list', 'UPDATE');
      }).throw(Error('Unsupported request methods: UPDATE.'))
    });

    it('should return supported method', function() {
      let method = meta.findAllowedMethod('list', 'GET');
      should(method).equal('get');
    });

  });

});

describe('Base model methods', function() {
  let model = null;
  let model_single = null;

  beforeEach(function() {
    model = Syncano({ name: 'testInstance' }).Instance;
    model_single = Instance;
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
      should(model_single()).have.property('isNew').which.is.Function();
    });

    it('should return correct value', function() {
      should(model_single().isNew()).equal(true);
    });

  });

  describe('#validate()', function() {

    it('should be a method of the model', function() {
      should(model_single()).have.property('validate').which.is.Function();
    });

    it('should enable validation', function() {
      should(model_single.setConstraints({})().validate()).not.be.ok;
      should(model_single().validate()).have.property('name').which.is.Array();
      should(model_single({ name: 'test_name'}).validate()).not.be.ok;
    });

  });

});
