'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Class', function() {
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
    it('instance.class should be class object', function() {
      (testInstance.class.type).should.equal('class');
      (testInstance.class).should.have.properties(['list', 'add', 'detail', 'update', 'delete']);
    });
    it('should return new Class', function() {
      var test = new testInstance.Class(config.className);
      (test.type).should.equal('class');
      (test).should.have.properties(['detail', 'update', 'delete', 'dataobject', 'DataObject']);
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

    it('this.class should be class object', function() {
      (scope.class.type).should.equal('class');
      (scope.class).should.have.properties(['list', 'detail']);
    });
    it('should return new Class', function() {
      var test = new scope.Class(config.className);
      (test.type).should.equal('class');
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

    it('this.class should be class object', function() {
      (scope.class.type).should.equal('class');
      (scope.class).should.have.properties(['list', 'detail']);
    });

    it('should return new Class', function() {
      var test = new scope.Class(config.className);
      (test.type).should.equal('class');
      (test).should.have.properties(['detail']);
    });

  });




});
