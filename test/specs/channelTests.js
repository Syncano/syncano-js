'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Channel', function() {
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

    it('instance.channel is an channel object', function() {
      (scope.channel.type).should.equal('channel');
      (scope.channel).should.have.properties(['list', 'add', 'detail', 'update', 'delete']);
      (scope.channel.list).should.be.a.Function();
      (scope.channel.add).should.be.a.Function();
      (scope.channel.detail).should.be.a.Function();
      (scope.channel.delete).should.be.a.Function();
      (scope.channel.update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel.list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/channels/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel.detail(config.channelId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('instances/' + config.instance + '/channels/' + config.channelId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel.update(config.channelId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('instances/' + config.instance + '/channels/' + config.channelId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.channel.delete(config.channelId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('instances/' + config.instance + '/channels/' + config.channelId + '/');
        (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new channel object', function() {
      scope = new scope.Channel(config.channelId);
      (scope.type).should.equal('channel');
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
        (res.url).should.equal('instances/' + config.instance + '/channels/' + config.channelId + '/');
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
        (res.url).should.equal('instances/' + config.instance + '/channels/' + config.channelId + '/');
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
        (res.url).should.equal('instances/' + config.instance + '/channels/' + config.channelId + '/');
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