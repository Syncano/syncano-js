'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('User', function() {
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
    it('instance.user should be user object', function() {
      (testInstance.user.type).should.equal('user');
      (testInstance.user).should.have.properties(['list', 'add', 'detail', 'update', 'delete']);
    });
    it('should return new User', function() {
      var test = new testInstance.User(config.userId);
      (test.type).should.equal('user');
      (test).should.have.properties(['config', 'detail', 'update', 'resetKey', 'delete']);
    });
  });

  describe('(Instance Scope)', function() {
    var requestMock, Syncano, scope;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('request', config.requestMock);
      Syncano = require('../../src/syncano.js');
      scope = new Syncano({
        apiKey: config.apiKey,
        instance: config.instance
      });
    });

    after(function() {
      mockery.deregisterMock('request');
      mockery.disable();
    });
    it('this.user should be user object', function() {
      (scope.user.type).should.equal('user');
      (scope.user).should.have.properties(['add', 'login']);
    });
  });

  describe('(Logged User Scope)', function() {
    var requestMock, Syncano, scope;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('request', config.requestMock);
      Syncano = require('../../src/syncano.js');
      scope = new Syncano({
        apiKey: config.apiKey,
        instance: config.instance,
        userKey: config.userKey
      });
    });

    after(function() {
      mockery.deregisterMock('request');
      mockery.disable();
    });
    it('this.user should be user object', function() {
      (scope.user.type).should.equal('user');
      (scope.user).should.have.properties(['add', 'detail', 'update', 'resetKey']);
    });
  });




});
