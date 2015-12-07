'use strict';
var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('Class', function() {
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

    it('is a class object', function() {
      (scope.instance(config.instance).class().type).should.equal('class');
      (scope.instance(config.instance).class()).should.have.keys(['list', 'add', 'detail', 'update', 'delete']);
      (scope.instance(config.instance).class().list).should.be.a.Function();
      (scope.instance(config.instance).class().add).should.be.a.Function();
      (scope.instance(config.instance).class().detail).should.be.a.Function();
      (scope.instance(config.instance).class().delete).should.be.a.Function();
      (scope.instance(config.instance).class().update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class().detail(config.className);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class().update(config.className, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).class().delete(config.className);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new class object', function() {
      scope = new scope.instance(config.instance).class(config.className);
      (scope.type).should.equal('class');
      (scope).should.have.keys(['config', 'detail', 'update', 'delete', 'dataobject']);
      (scope.detail).should.be.a.Function();
      (scope.delete).should.be.a.Function();
      (scope.update).should.be.a.Function();
      (scope.dataobject).should.be.an.Function();
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
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
      mockery.registerMock('./request.js', config.requestMock);

      Syncano = require('../../../lib/syncano.js');
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
      (scope.class().type).should.equal('class');
      (scope.class()).should.have.keys(['list', 'detail']);
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.class().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.class().detail(config.className);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should return new Class', function() {
      scope = new scope.class(config.className);
      (scope.type).should.equal('class');
      (scope).should.have.keys(['config', 'detail', 'dataobject']);
    });

  });

  describe('(Logged User Scope)', function() {
    var requestMock, Syncano, scope;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('./request.js', config.requestMock);

      Syncano = require('../../../lib/syncano.js');
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

    it('is a class object', function() {
      (scope.class().type).should.equal('class');
      (scope.class()).should.have.keys(['list', 'detail']);
    });


    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.class().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        (res.headers['X-USER-KEY']).should.equal(config.userKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.class().detail(config.className);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/classes/' + config.className + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        (res.headers['X-USER-KEY']).should.equal(config.userKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should return new Class', function() {
      scope = new scope.class(config.className);
      (scope.type).should.equal('class');
      (scope).should.have.keys(['config', 'detail', 'dataobject']);
    });

  });




});
