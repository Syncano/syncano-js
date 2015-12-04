'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('Webhook', function() {
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

    it('instance.webhook is an webhook object', function() {
      (scope.instance(config.instance).webhook().type).should.equal('webhook');
      (scope.instance(config.instance).webhook()).should.have.keys(['list', 'add', 'detail', 'update', 'delete']);
      (scope.instance(config.instance).webhook().list).should.be.a.Function();
      (scope.instance(config.instance).webhook().add).should.be.a.Function();
      (scope.instance(config.instance).webhook().detail).should.be.a.Function();
      (scope.instance(config.instance).webhook().delete).should.be.a.Function();
      (scope.instance(config.instance).webhook().update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).webhook().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).webhook().detail(config.webhookId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).webhook().update(config.webhookId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).webhook().delete(config.webhookId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new webhook object', function() {
      scope = new scope.instance(config.instance).webhook(config.webhookId);
      (scope.type).should.equal('webhook');
      (scope).should.have.keys(['config', 'detail', 'update', 'delete', 'run', 'traces', 'trace']);
      (scope.detail).should.be.a.Function();
      (scope.delete).should.be.a.Function();
      (scope.update).should.be.a.Function();
      (scope.run).should.be.a.Function();
      (scope.traces).should.be.a.Function();
      (scope.trace).should.be.a.Function();
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/run/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/traces/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/webhooks/' + config.webhookId + '/traces/' + config.traceId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
