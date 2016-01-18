'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('Channel', function() {
  describe('(Account Scope)', function() {
    var requestMock, Syncano, scope;
    before(function() {
      mockery.enable(config.mockSettings);
      mockery.registerMock('./request.js', config.requestMock);

      Syncano = require('../../../lib/syncano.js');
      scope = new Syncano({
        accountKey: config.accountKey
      });

    });

    after(function() {
      mockery.deregisterMock('request');
      mockery.disable();
    });

    it('instance.channel is an channel object', function() {
      (scope.instance(config.instance).channel().type).should.equal('channel');
      (scope.instance(config.instance).channel()).should.have.keys(['list', 'add', 'detail', 'update', 'delete']);
      (scope.instance(config.instance).channel().list).should.be.a.Function();
      (scope.instance(config.instance).channel().add).should.be.a.Function();
      (scope.instance(config.instance).channel().detail).should.be.a.Function();
      (scope.instance(config.instance).channel().delete).should.be.a.Function();
      (scope.instance(config.instance).channel().update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).channel().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).channel().detail(config.channelId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).channel().update(config.channelId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).channel().delete(config.channelId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new channel object', function() {
      scope = new scope.instance(config.instance).channel(config.channelId);
      (scope.type).should.equal('channel');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/');
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

    it('should be channel object', function() {
      (scope.channel().type).should.equal('channel');
      (scope.channel()).should.have.keys(['list', 'detail', 'detail', 'history', 'publish', 'poll', 'watch']);
    });

    it('poll() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel(config.channelId).poll();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/poll/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('poll() accepts lastId in filter', function(done) {
      var func, res;
      func = scope.channel(config.channelId).poll({lastId: 1});
      func.then(function(res) {
        (res.qs).should.have.property('last_id').which.is.equal(1);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('poll() accepts room name in filter', function(done) {
      var func, res;
      func = scope.channel(config.channelId).poll({room: 'room name'});
      func.then(function(res) {
        (res.qs).should.have.property('room').which.is.equal('room name');
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('history() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel(config.channelId).history();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/history/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('history() accepts room name in filter', function(done) {
      var func, res;
      func = scope.channel(config.channelId).history({room: 'room name'});
      func.then(function(res) {
        (res.qs).should.have.property('room').which.is.equal('room name');
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('publish() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel(config.channelId).publish({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/channels/' + config.channelId + '/publish/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should return new Channel', function() {
      scope = new scope.channel(config.channelId);
      (scope.type).should.equal('channel');
      (scope).should.have.keys(['config', 'detail', 'history', 'publish', 'poll', 'watch']);
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
    it('should be channel object', function() {
      (scope.channel().type).should.equal('channel');
      (scope.channel()).should.have.keys(['list', 'detail', 'detail', 'history', 'publish', 'poll', 'watch']);
    });
    it('should return new Channel', function() {
      scope = new scope.channel(config.channelId);
      (scope.type).should.equal('channel');
      (scope).should.have.keys(['config', 'detail', 'history', 'publish', 'poll', 'watch']);
    });

  });

});
