'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano (Account Scope)', function() {
  var requestMock, Syncano, scope;
  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('request', config.requestMock);
    Syncano = require('../../src/syncano.js');

    scope = new Syncano({
      accountKey: config.accountKey
    });

  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.disable();
  });

  it('should return account scope', function() {
    (scope).should.be.type('object');
    (scope.type).should.equal('account');
    (scope.config).should.have.properties(['accountKey']);
    (scope.config).should.not.have.properties(['apiKey', 'userKey', 'instance']);
    (scope).should.have.property('detail').which.is.a.Function();
    (scope).should.have.property('update').which.is.a.Function();
    (scope).should.have.property('resetKey').which.is.a.Function();
    (scope).should.have.property('changePw').which.is.a.Function();
    (scope).should.have.property('setPw').which.is.a.Function();
    (scope).should.have.property('invitation').which.is.an.Object();
    (scope.invitation.type).should.equal('invitation');
    (scope.invitation).should.have.properties(['list', 'detail', 'accept', 'delete']);
    (scope).should.have.property('Instance').which.is.a.Function();
    (scope).should.have.property('instance').which.is.an.Object();
    (scope.instance.type).should.equal('instance');
    (scope.instance).should.have.properties(['list', 'detail', 'update', 'add', 'delete']);
  });
  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = scope.detail();
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('GET');
      (res.url).should.equal('account/');
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
      (res.url).should.equal('account/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.accountKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
  it('resetKey() should recieve correct options', function(done) {
    var func, res;
    func = scope.resetKey({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/reset_key/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.accountKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
  it('changePw() should recieve correct options', function(done) {
    var func, res;
    func = scope.changePw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/password/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.accountKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
  it('setPw() should recieve correct options', function(done) {
    var func, res;
    func = scope.setPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/password/set/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.accountKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

});
