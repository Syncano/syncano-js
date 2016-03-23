import should from 'should/as-function';
import Syncano from '../../src/syncano';

describe('Syncano', function() {
  let baseObject = null;
  let testKey = '123';
  let testUrl = 'http://api.syncano.rocks'

  beforeEach(function() {
    baseObject = Syncano();
  });

  describe('#init()', function() {

    it('should have model factories automatically injected as properties', function() {
      should(baseObject).have.property('Instance').which.is.Function();
      should(baseObject).have.property('Class').which.is.Function();
      should(baseObject).have.property('Channel').which.is.Function();
      should(baseObject).have.property('DataObject').which.is.Function();
      should(baseObject).have.property('User').which.is.Function();
      should(baseObject).have.property('Group').which.is.Function();
      should(baseObject).have.property('Admin').which.is.Function();
      should(baseObject).have.property('ApiKey').which.is.Function();
      should(baseObject).have.property('InstanceInvitation').which.is.Function();
      should(baseObject).have.property('Invitation').which.is.Function();
      should(baseObject).have.property('Script').which.is.Function();
      should(baseObject).have.property('Schedule').which.is.Function();
      should(baseObject).have.property('Trigger').which.is.Function();
      should(baseObject).have.property('ScriptEndpoint').which.is.Function();
      should(baseObject).have.property('DataEndpoint').which.is.Function();
      should(baseObject).have.property('ScriptTrace').which.is.Function();
      should(baseObject).have.property('ScheduleTrace').which.is.Function();
      should(baseObject).have.property('TriggerTrace').which.is.Function();
      should(baseObject).have.property('ScriptEndpointTrace').which.is.Function();
      should(baseObject).have.property('GCMDevice').which.is.Function();
      should(baseObject).have.property('APNSDevice').which.is.Function();
      should(baseObject).have.property('GCMMessage').which.is.Function();
      should(baseObject).have.property('APNSMessage').which.is.Function();
    });

    it('shoud have baseUrl and accountKey properties', function() {
      should(baseObject).have.property('baseUrl').which.is.String();
      should(baseObject).have.property('accountKey').which.is.Null();
      should(baseObject).have.property('userKey').which.is.Null();
      should(baseObject).have.property('socialToken').which.is.Null();
    })

  });

  describe('#setAccountKey()', function() {

    it('should allow to set accountKey', function() {
      should(baseObject).have.property('setAccountKey').which.is.Function();

      should(function() {
        baseObject.setAccountKey();
      }).throw(Error('Account key is required.'))

      baseObject.setAccountKey(testKey);

      should(baseObject.accountKey).is.equal(testKey);
    });

  });

  describe('#getAccountKey()', function() {

    it('should allow to get account key', function() {
      should(baseObject).have.property('getAccountKey').which.is.Function();

      baseObject.setAccountKey(testKey);

      should(baseObject.getAccountKey()).is.equal(testKey);

    });

  });

  describe('#setBaseUrl()', function() {

    it('should allow to set base url', function() {
      should(baseObject).have.property('setBaseUrl').which.is.Function();

      should(function() {
        baseObject.setBaseUrl();
      }).throw(Error('Base Url is required.'))

      baseObject.setBaseUrl(testUrl);

      should(baseObject.baseUrl).is.equal(testUrl);
    });

  });

  describe('#getBaseUrl()', function() {

    it('should allow to get base url', function() {
      should(baseObject).have.property('getBaseUrl').which.is.Function();

      baseObject.setBaseUrl(testUrl);

      should(baseObject.getBaseUrl()).is.equal(testUrl);

    });

  });

  describe('#setUserKey()', function() {

    it('should allow to set userKey', function() {
      should(baseObject).have.property('setUserKey').which.is.Function();

      should(function() {
        baseObject.setUserKey();
      }).throw(Error('Account key is required.'))

      baseObject.setUserKey(testKey);

      should(baseObject.userKey).is.equal(testKey);
    });

  });

  describe('#getUserKey()', function() {

    it('should allow to get user key', function() {
      should(baseObject).have.property('getUserKey').which.is.Function();

      baseObject.setUserKey(testKey);

      should(baseObject.getUserKey()).is.equal(testKey);

    });

  });

  describe('#setApiKey()', function() {

    it('should allow to set apiKey', function() {
      should(baseObject).have.property('setApiKey').which.is.Function();

      should(function() {
        baseObject.setApiKey();
      }).throw(Error('Api key is required.'))

      baseObject.setApiKey(testKey);

      should(baseObject.apiKey).is.equal(testKey);
    });

  });

  describe('#getApiKey()', function() {

    it('should allow to get user key', function() {
      should(baseObject).have.property('getApiKey').which.is.Function();

      baseObject.setApiKey(testKey);

      should(baseObject.getApiKey()).is.equal(testKey);

    });

  });

  describe('#setSocialToken()', function() {

    it('should allow to set socialToken', function() {
      should(baseObject).have.property('setSocialToken').which.is.Function();

      should(function() {
        baseObject.setSocialToken();
      }).throw(Error('Account key is required.'))

      baseObject.setSocialToken(testKey);

      should(baseObject.socialToken).is.equal(testKey);
    });

  });

  describe('#getSocialToken()', function() {

    it('should allow to get social token', function() {
      should(baseObject).have.property('getSocialToken').which.is.Function();

      baseObject.setSocialToken(testKey);

      should(baseObject.getSocialToken()).is.equal(testKey);

    });

  });

});
