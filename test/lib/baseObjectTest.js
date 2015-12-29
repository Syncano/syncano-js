import should from 'should/as-function';
import Syncano from '../../src/syncano';


describe('Base Object', () => {
  let baseObject = null;

  beforeEach(function() {
    baseObject = Syncano();
  });

  describe('#init()', () => {

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
      should(baseObject).have.property('CodeBox').which.is.Function();
      should(baseObject).have.property('Schedule').which.is.Function();
      should(baseObject).have.property('Trigger').which.is.Function();
      should(baseObject).have.property('Webhook').which.is.Function();
      should(baseObject).have.property('Profile').which.is.Function();
      should(baseObject).have.property('DataView').which.is.Function();
      should(baseObject).have.property('CodeBoxTrace').which.is.Function();
      should(baseObject).have.property('ScheduleTrace').which.is.Function();
      should(baseObject).have.property('TriggerTrace').which.is.Function();
      should(baseObject).have.property('WebhookTrace').which.is.Function();
      should(baseObject).have.property('GCMDevice').which.is.Function();
      should(baseObject).have.property('APNSDevice').which.is.Function();
    });

    it('shoud have baseUrl and accountKey properties', function() {
      should(baseObject).have.property('baseUrl').which.is.String();
      should(baseObject).have.property('accountKey').which.is.String();
    })

  });

  describe('#setKey()', () => {

    it('should allow to set accountKey', function() {
      should(baseObject).have.property('setKey').which.is.Function();

      should(() => {
        baseObject.setKey();
      }).throw(Error('Key is required'))

      let testKey = '123';
      baseObject.setKey(testKey);

      should(baseObject.accountKey).is.equal(testKey);
    });

  });

  describe('#setBaseUrl()', () => {

    it('should allow to set base url', function() {
      should(baseObject).have.property('setBaseUrl').which.is.Function();

      should(() => {
        baseObject.setBaseUrl();
      }).throw(Error('Url is required'))

      let testUrl = 'http://api.syncano.rocks';
      baseObject.setBaseUrl(testUrl);

      should(baseObject.baseUrl).is.equal(testUrl);
    });

  });

});
