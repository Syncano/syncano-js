'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('DataObject', function() {
  describe('(Account Scope)', function() {
    var requestMock, Syncano, scope;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('./request.js', config.browserRequestMock);
      mockery.registerSubstitute('../server/core.js', '../browser/core.js');

      Syncano = require('../../../lib/syncano.js');
      scope = new Syncano({
        accountKey: config.accountKey
      });
    });

    after(function() {
      mockery.deregisterMock('request');
      mockery.deregisterSubstitute('../server/core.js');
      mockery.disable();
    });

    it('instance.dataobject is an dataobject object', function() {
      (scope.instance(config.instance).class(config.className).dataobject().type).should.equal('dataobject');
      (scope.instance(config.instance).class(config.className).dataobject()).should.have.keys(['list', 'add', 'detail', 'update', 'delete']);
      (scope.instance(config.instance).class(config.className).dataobject().list).should.be.a.Function();
      (scope.instance(config.instance).class(config.className).dataobject().add).should.be.a.Function();
      (scope.instance(config.instance).class(config.className).dataobject().detail).should.be.a.Function();
      (scope.instance(config.instance).class(config.className).dataobject().delete).should.be.a.Function();
      (scope.instance(config.instance).class(config.className).dataobject().update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class(config.className).dataobject().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class(config.className).dataobject().detail(config.dataobjectId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/' + config.dataobjectId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class(config.className).dataobject().update(config.dataobjectId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/' + config.dataobjectId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class(config.className).dataobject().delete(config.dataobjectId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/' + config.dataobjectId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new dataobject object', function() {
      scope = new scope.instance(config.instance).class(config.className).dataobject(config.dataobjectId);
      (scope.type).should.equal('dataobject');
      (scope).should.have.keys(['config', 'detail', 'update', 'delete']);
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/' + config.dataobjectId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/' + config.dataobjectId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/objects/' + config.dataobjectId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });
});
