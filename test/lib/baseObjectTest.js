import should from 'should/as-function';
import _ from 'lodash';

import Syncano from '../../src/syncano';


describe('Base Object', function() {
  let baseObject = null;

  beforeEach(function() {
    baseObject = Syncano();
  });

  describe('#init()', function() {

    it('should have model factories automatically injected as properties', function() {
      should(baseObject).have.property('Instance').which.is.Function();
      should(baseObject).have.property('Class').which.is.Function();
    });

    it('shoud have baseUrl and accountKey properties', function() {
      should(baseObject).have.property('baseUrl').which.is.String();
      should(baseObject).have.property('accountKey').which.is.String();
    })

  });

  describe('#setKey()', function() {

    it('should allow to set accountKey', function() {
      should(baseObject).have.property('setKey').which.is.Function();

      should(function() {
        baseObject.setKey();
      }).throw(Error('Key is required'))

      let testKey = '123';
      baseObject.setKey(testKey);

      should(baseObject.accountKey).is.equal(testKey);
    });

  });

  describe('#setBaseUrl()', function() {

    it('should allow to set base url', function() {
      should(baseObject).have.property('setBaseUrl').which.is.Function();

      should(function() {
        baseObject.setBaseUrl();
      }).throw(Error('Url is required'))

      let testUrl = 'http://api.syncano.rocks';
      baseObject.setBaseUrl(testUrl);

      should(baseObject.baseUrl).is.equal(testUrl);
    });

  });

});
