'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Instance', function() {
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

    it('instance.admin is an admin object', function() {
      (scope.admin.type).should.equal('admin');
      (scope.admin).should.have.properties(['list', 'detail', 'update', 'delete']);
      (scope.admin.list).should.be.a.Function();
      (scope.admin.detail).should.be.a.Function();
      (scope.admin.delete).should.be.a.Function();
      (scope.admin.update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.admin.list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/admins/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.admin.detail(config.adminId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/admins/' + config.adminId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.admin.update(config.adminId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('instances/' + config.instance + '/admins/' + config.adminId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.admin.delete(config.adminId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('instances/' + config.instance + '/admins/' + config.adminId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new admin object', function() {
      scope = new scope.Admin(config.adminId);
      (scope.type).should.equal('admin');
      (scope).should.have.properties(['detail', 'update', 'delete']);
      (scope.detail).should.be.a.Function();
      (scope.delete).should.be.a.Function();
      (scope.update).should.be.a.Function();
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/admins/' + config.adminId + '/');
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
        (res.url).should.equal('instances/' + config.instance + '/admins/' + config.adminId + '/');
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
        (res.url).should.equal('instances/' + config.instance + '/admins/' + config.adminId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });
});
