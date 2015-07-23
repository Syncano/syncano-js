'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Channel', function() {
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
    it('instance.channel should be channel object', function() {
      (testInstance.channel.type).should.equal('channel');
      (testInstance.channel).should.have.properties(['list', 'add', 'detail', 'update', 'delete']);
    });
    it('should return new Channel', function() {
      var test = new testInstance.Channel(config.channel);
      (test.type).should.equal('channel');
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
    it('this.channel should be channel object', function() {
      (scope.channel.type).should.equal('channel');
      (scope.channel).should.have.properties(['list', 'detail', 'detail', 'history', 'publish', 'poll']);
    });
    it('should return new Channel', function() {
      var test = new scope.Channel(config.channel);
      (test.type).should.equal('channel');
      (test).should.have.properties(['detail', 'history', 'publish', 'poll']);
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
    it('this.channel should be channel object', function() {
      (scope.channel.type).should.equal('channel');
      (scope.channel).should.have.properties(['list', 'detail', 'detail', 'history', 'publish', 'poll']);
    });
    it('should return new Channel', function() {
      var test = new scope.Channel(config.channel);
      (test.type).should.equal('channel');
      (test).should.have.properties(['detail', 'history', 'publish', 'poll']);
    });

  });




});
