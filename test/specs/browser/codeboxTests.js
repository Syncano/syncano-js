'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('CodeBox', function() {
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

    it('instance.codebox is an codebox object', function() {
      (scope.instance(config.instance).codebox()).should.be.an.Object();
      (scope.instance(config.instance).codebox().type).should.equal('codebox');
      (scope.instance(config.instance).codebox()).should.have.keys(['list', 'add', 'detail', 'update', 'delete', 'runtimes']);
      (scope.instance(config.instance).codebox().list).should.be.a.Function();
      (scope.instance(config.instance).codebox().add).should.be.a.Function();
      (scope.instance(config.instance).codebox().detail).should.be.a.Function();
      (scope.instance(config.instance).codebox().delete).should.be.a.Function();
      (scope.instance(config.instance).codebox().update).should.be.a.Function();
      (scope.instance(config.instance).codebox().runtimes).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).codebox().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).codebox().detail(config.codeboxId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).codebox().update(config.codeboxId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).codebox().delete(config.codeboxId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('runtimes() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).codebox().runtimes();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/runtimes/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new codebox object', function() {
      scope = new scope.instance(config.instance).codebox(config.codeboxId);
      (scope.type).should.equal('codebox');
      (scope).should.have.properties(['detail', 'update', 'delete', 'run', 'trace', 'traces']);
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('run() should recieve correct options', function(done) {
      var func, res;
      func = scope.run({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/run/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('traces() should recieve correct options', function(done) {
      var func, res;
      func = scope.traces();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/traces/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('trace() should recieve correct options', function(done) {
      var func, res;
      func = scope.trace(config.traceId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/' + config.codeboxId + '/traces/' + config.traceId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('runtimes() should recieve correct options', function(done) {
      var func, res;
      func = scope.runtimes();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/codeboxes/runtimes/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });
});
