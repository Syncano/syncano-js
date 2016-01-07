import should from 'should/as-function';
import Syncano from '../../src/syncano';

describe('Base model', function() {
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

    it('should throw error when no endpoint is found', function() {
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
