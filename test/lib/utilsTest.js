import should from 'should/as-function';
import { ConfigMixin, MetaMixin, ConstraintsMixin } from '../../src/utils';

describe('ConfigMixin', function() {
  let configmixin = null;
  let testConfig = { key: 'value' };

  beforeEach(function() {
    configmixin = ConfigMixin();
  });

  describe('#setConfig()', function() {

    it('should be a method of the ConfigMixin object', function() {
      should(configmixin).have.property('setConfig').which.is.Function();
    });

    it('should allow to set config', function() {
      configmixin.setConfig(testConfig);
      should(configmixin._config).is.equal(testConfig);
    });

  });

  describe('#getConfig()', function() {

    it('should be a method of the ConfigMixin object', function() {
      should(configmixin).have.property('getConfig').which.is.Function();
    });

    it('should allow to get config', function() {
      configmixin.setConfig(testConfig);
      should(configmixin.getConfig()).is.equal(testConfig);
    });

  });
});

describe('MetaMixin', function() {
  let metamixin = null;
  let testMeta = { key: 'value' };

  beforeEach(function() {
    metamixin = MetaMixin();
  });

  describe('#setMeta()', function() {

    it('should be a method of the MetaMixin object', function() {
      should(metamixin).have.property('setMeta').which.is.Function();
    });

    it('should allow to set config', function() {
      metamixin.setMeta(testMeta);
      should(metamixin._meta).is.equal(testMeta);
    });

  });

  describe('#getMeta()', function() {

    it('should be a method of the MetaMixin object', function() {
      should(metamixin).have.property('getMeta').which.is.Function();
    });

    it('should allow to get config', function() {
      metamixin.setMeta(testMeta);
      should(metamixin.getMeta()).is.equal(testMeta);
    });

  });
});

describe('ConstraintsMixin', function() {
  let constraintsmixin = null;
  let testConstraints = { key: 'value' };

  beforeEach(function() {
    constraintsmixin = ConstraintsMixin();
  });

  describe('#setConstraints()', function() {

    it('should be a method of the ConstraintsMixin object', function() {
      should(constraintsmixin).have.property('setConstraints').which.is.Function();
    });

    it('should allow to set config', function() {
      constraintsmixin.setConstraints(testConstraints);
      should(constraintsmixin._constraints).is.equal(testConstraints);
    });

  });

  describe('#getConstraints()', function() {

    it('should be a method of the ConstraintsMixin object', function() {
      should(constraintsmixin).have.property('getConstraints').which.is.Function();
    });

    it('should allow to get config', function() {
      constraintsmixin.setConstraints(testConstraints);
      should(constraintsmixin.getConstraints()).is.equal(testConstraints);
    });

  });
});
