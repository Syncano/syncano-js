import should from 'should/as-function';
import { ConfigMixin, MetaMixin, ConstraintsMixin } from '../../src/utils';

describe('ConfigMixin', function() {
  let configMixin = null;
  let testConfig = { key: 'value' };

  beforeEach(function() {
    configMixin = ConfigMixin();
  });

  describe('#setConfig()', function() {

    it('should be a method of the ConfigMixin object', function() {
      should(configMixin).have.property('setConfig').which.is.Function();
    });

    it('should allow to set config', function() {
      configMixin.setConfig(testConfig);
      should(configMixin._config).is.equal(testConfig);
    });

  });

  describe('#getConfig()', function() {

    it('should be a method of the ConfigMixin object', function() {
      should(configMixin).have.property('getConfig').which.is.Function();
    });

    it('should allow to get config', function() {
      configMixin.setConfig(testConfig);
      should(configMixin.getConfig()).is.equal(testConfig);
    });

  });

  describe('#getConfig() (static)', function() {

    it('should allow to get config', function() {
      let configMixinStatic = ConfigMixin.setConfig(testConfig);
      should(configMixinStatic.getConfig()).is.equal(testConfig);
    });

  });

});

describe('MetaMixin', function() {
  let metaMixin = null;
  let testMeta = { key: 'value' };

  beforeEach(function() {
    metaMixin = MetaMixin();
  });

  describe('#setMeta()', function() {

    it('should be a method of the MetaMixin object', function() {
      should(metaMixin).have.property('setMeta').which.is.Function();
    });

    it('should allow to set config', function() {
      metaMixin.setMeta(testMeta);
      should(metaMixin._meta).is.equal(testMeta);
    });

  });

  describe('#getMeta()', function() {

    it('should be a method of the MetaMixin object', function() {
      should(metaMixin).have.property('getMeta').which.is.Function();
    });

    it('should allow to get meta', function() {
      metaMixin.setMeta(testMeta);
      should(metaMixin.getMeta()).is.equal(testMeta);
    });

  });

  describe('#getMeta() (static)', function() {

    it('should allow to get meta', function() {
      let metaMixinStatic = MetaMixin.setMeta(testMeta);
      should(metaMixinStatic.getMeta()).is.equal(testMeta);
    });

  });
});

describe('ConstraintsMixin', function() {
  let constraintsMixin = null;
  let testConstraints = { key: 'value' };

  beforeEach(function() {
    constraintsMixin = ConstraintsMixin();
  });

  describe('#setConstraints()', function() {

    it('should be a method of the ConstraintsMixin object', function() {
      should(constraintsMixin).have.property('setConstraints').which.is.Function();
    });

    it('should allow to set config', function() {
      constraintsMixin.setConstraints(testConstraints);
      should(constraintsMixin._constraints).is.equal(testConstraints);
    });

  });

  describe('#getConstraints()', function() {

    it('should be a method of the ConstraintsMixin object', function() {
      should(constraintsMixin).have.property('getConstraints').which.is.Function();
    });

    it('should allow to get constraints', function() {
      constraintsMixin.setConstraints(testConstraints);
      should(constraintsMixin.getConstraints()).is.equal(testConstraints);
    });

  });

  describe('#getConstraints() (static)', function() {

    it('should allow to get constraints', function() {
      let constraintsMixinStatic = ConstraintsMixin.setConstraints(testConstraints);
      should(constraintsMixinStatic.getConstraints()).is.equal(testConstraints);
    });

  });
});
