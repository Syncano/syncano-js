'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Group', function() {
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
    it('instance.group should be group object', function() {
      (testInstance.group.type).should.equal('group');
      (testInstance.group).should.have.properties(['list', 'add', 'detail', 'update', 'delete']);
    });
    it('should return new Group', function() {
      var test = new testInstance.Group(config.groupId);
      (test.type).should.equal('group');
      (test).should.have.properties(['detail', 'update', 'delete']);
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
    it('this.group should be group object', function() {
      (scope.group.type).should.equal('group');
      (scope.group).should.have.properties(['list', 'detail']);
    });
    it('should return new Group', function() {
      var test = new scope.Group(config.groupId);
      (test.type).should.equal('group');
      (test).should.have.properties(['detail']);
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
    it('this.group should be group object', function() {
      (scope.group.type).should.equal('group');
      (scope.group).should.have.properties(['list', 'detail']);
    });
    it('should return new Group', function() {
      var test = new scope.Group(config.groupId);
      (test.type).should.equal('group');
      (test).should.have.properties(['detail']);
    });
  });
});
