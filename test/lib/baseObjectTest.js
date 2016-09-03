import should from 'should/as-function';
import Syncano from '../../src/syncano';

describe('Syncano', function() {
  let baseObject = null;
  const testKey = '123';
  const testUrl = 'http://api.syncano.rocks'
  const testInstance = 'my-instance';

  beforeEach(function() {
    baseObject = Syncano();
  });

  describe('#init()', function() {

    it('should have model factories automatically injected as properties', function() {
      should(baseObject).have.property('Instance').which.is.Function();
      should(baseObject).have.property('Class').which.is.Function();
      should(baseObject).have.property('Channel').which.is.Function();
      should(baseObject).have.property('CustomSocket').which.is.Function();
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
      should(baseObject).have.property('Template').which.is.Function();
      should(baseObject).have.property('Subscription').which.is.Function();
      should(baseObject).have.property('FullBackup').which.is.Function();
      should(baseObject).have.property('PartialBackup').which.is.Function();
      should(baseObject).have.property('Restore').which.is.Function();
      should(baseObject).have.property('Usage').which.is.Function();
      should(baseObject).have.property('DailyUsage').which.is.Function();
      should(baseObject).have.property('HourlyUsage').which.is.Function();
      should(baseObject).have.property('Plan').which.is.Function();
      should(baseObject).have.property('Profile').which.is.Function();
      should(baseObject).have.property('Card').which.is.Function();
      should(baseObject).have.property('Solution').which.is.Function();
      should(baseObject).have.property('Account').which.is.Object();
      should(baseObject).have.property('Monitor').which.is.Object();
      should(baseObject).have.property('BatchManager').which.is.Function();
      should(baseObject).have.property('Tag').which.is.Function();
      should(baseObject).have.property('Endpoint').which.is.Function();
      should(baseObject).have.property('Hosting').which.is.Function();
      should(baseObject).have.property('HostingFile').which.is.Function();
    });

    it('shoud have baseUrl and accountKey properties', function() {
      should(baseObject).have.property('baseUrl').which.is.String();
      should(baseObject).have.property('accountKey').which.is.Null();
      should(baseObject).have.property('userKey').which.is.Null();
      should(baseObject).have.property('socialToken').which.is.Null();
      should(baseObject).have.property('defaults').which.is.Object();
    })
  });

  describe('#Account', function() {
    it('should have correct methods', function() {
      should(baseObject.Account).have.property('activate').which.is.Function();
      should(baseObject.Account).have.property('register').which.is.Function();
      should(baseObject.Account).have.property('login').which.is.Function();
      should(baseObject.Account).have.property('update').which.is.Function();
      should(baseObject.Account).have.property('socialLogin').which.is.Function();
      should(baseObject.Account).have.property('resendEmail').which.is.Function();
      should(baseObject.Account).have.property('resetKey').which.is.Function();
      should(baseObject.Account).have.property('setPassword').which.is.Function();
      should(baseObject.Account).have.property('changePassword').which.is.Function();
      should(baseObject.Account).have.property('resetPassword').which.is.Function();
      should(baseObject.Account).have.property('confirmPasswordReset').which.is.Function();
    });
  });

  describe('#Monitor', function() {
    it('should have correct methods', function() {
      should(baseObject.Monitor).have.property('startMonitoring').which.is.Function();
      should(baseObject.Monitor).have.property('stopMonitoring').which.is.Function();
    });
  });

  describe('#BatchManager', function() {
    it('should have correct methods', function() {
      const instanceName = testInstance;
      should(baseObject.BatchManager({instanceName})).have.property('addObjects').which.is.Function();
      should(baseObject.BatchManager({instanceName})).have.property('addSingleObject').which.is.Function();
      should(baseObject.BatchManager({instanceName})).have.property('batch').which.is.Function();
      should(baseObject.BatchManager({instanceName})).have.property('removeObjects').which.is.Function();
      should(baseObject.BatchManager({instanceName})).have.property('getObjects').which.is.Function();
    });
  });

  describe('#setAccountKey()', function() {

    it('should allow to set accountKey', function() {
      should(baseObject).have.property('setAccountKey').which.is.Function();

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

  describe('#setInstanceName()', function() {

    it('should allow to set instance name', function() {
      should(baseObject).have.property('setInstanceName').which.is.Function();

      baseObject.setInstanceName(testInstance);

      should(baseObject.defaults.instanceName).is.equal(testInstance);
    });

  });

  describe('#getInstanceName()', function() {

    it('should allow to get instance name', function() {
      should(baseObject).have.property('getInstanceName').which.is.Function();

      baseObject.setInstanceName(testInstance);

      should(baseObject.getInstanceName()).is.equal(testInstance);
    });

  });

  describe('#setUserKey()', function() {

    it('should allow to set userKey', function() {
      should(baseObject).have.property('setUserKey').which.is.Function();

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
