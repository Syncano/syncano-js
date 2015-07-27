'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');
// TODO Finish testing specs
describe('Group', function() {
  describe('(Account Scope)', function() {
    var requestMock, Syncano, scope;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('request', config.requestMock);
      Syncano = require('../../src/syncano.js');
      scope = new Syncano({
        accountKey: config.accountKey
      });
      scope = new scope.Instance(config.instance);
    });

    after(function() {
      mockery.deregisterMock('request');
      mockery.disable();
    });

    it('instance.group should be group object', function() {
      (scope.group.type).should.equal('group');
      (scope.group).should.have.properties(['list', 'add', 'detail', 'update', 'delete']);
      (scope.group.list).should.be.a.Function();
      (scope.group.add).should.be.a.Function();
      (scope.group.detail).should.be.a.Function();
      (scope.group.delete).should.be.a.Function();
      (scope.group.update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.group.list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/groups/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('add() should recieve correct options', function(done) {
      var func, res;
      func = scope.group.add({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('instances/' + config.instance + '/groups/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.group.detail(config.groupId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.group.update(config.groupId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.group.delete(config.groupId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should return new Group', function() {
      scope = new scope.Group(config.groupId);
      (scope.type).should.equal('group');
      (scope).should.have.properties(['detail', 'update', 'delete', 'user']);
      (scope.detail).should.be.a.Function();
      (scope.delete).should.be.a.Function();
      (scope.update).should.be.a.Function();
      (scope.user).should.be.an.Object().which.has.keys('list','add','detail', 'delete');
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.update({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.delete();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('user.list() should recieve correct options', function(done) {
      var func, res;
      func = scope.user.list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/users/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('user.add() should recieve correct options', function(done) {
      var func, res;
      func = scope.user.add({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/users/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('user.detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.user.detail(config.userId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/users/' + config.userId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('user.delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.user.delete(config.userId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('instances/' + config.instance + '/groups/' + config.groupId + '/users/' + config.userId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
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
      scope = new scope.Group(config.groupId);
      (scope.type).should.equal('group');
      (scope).should.have.properties(['detail']);
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
      scope = new scope.Group(config.groupId);
      (scope.type).should.equal('group');
      (scope).should.have.properties(['detail']);
    });
  });
});
