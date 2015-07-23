'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Instance', function() {
  describe('(Account Scope)', function() {
    var requestMock, Syncano, scope, testInstance;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('request', config.requestMock);
      Syncano = require('../../src/syncano.js');
      scope = new Syncano({
        accountKey: config.accountKey
      });
      testInstance = new scope.Instance(config.instance);
    });

    after(function() {
      mockery.deregisterMock('request');
      mockery.disable();
    });
    it('this.instance should be instance object', function() {
      (testInstance.type).should.equal('instance');
      (testInstance).should.have.properties(['detail', 'update', 'delete']);
      (testInstance.detail).should.be.a.Function();
      (testInstance.delete).should.be.a.Function();
      (testInstance.update).should.be.a.Function();
      (testInstance).should.have.properties(['apikey', 'channel', 'class', 'codebox', 'invitation', 'group', 'schedule', 'trigger', 'webhook', 'user']);
      (testInstance.apikey).should.be.an.Object();
      (testInstance.channel).should.be.an.Object();
      (testInstance.class).should.be.an.Object();
      (testInstance.codebox).should.be.an.Object();
      (testInstance.invitation).should.be.an.Object();
      (testInstance.group).should.be.an.Object();
      (testInstance.schedule).should.be.an.Object();
      (testInstance.trigger).should.be.an.Object();
      (testInstance.webhook).should.be.an.Object();
      (testInstance.user).should.be.an.Object();
    });
  });
});
