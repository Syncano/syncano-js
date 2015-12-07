'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('Syncano (Account Scope)', function() {
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

  it('should return account object', function() {
    (scope).should.be.an.Object();
    (scope.type).should.equal('account');
    (scope).should.have.keys(['config', 'detail', 'update', 'resetKey', 'changePw', 'setPw', 'invitation', 'instance']);
    (scope.config).should.have.keys(['accountKey']);
    (scope.detail).should.be.a.Function();
    (scope.update).should.be.a.Function();
    (scope.resetKey).should.be.a.Function();
    (scope.changePw).should.be.a.Function();
    (scope.setPw).should.be.a.Function();
    (scope.invitation).should.be.a.Function();
    (scope.instance).should.be.an.Function();
  });

  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = scope.detail();
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('GET');
      (res.url).should.equal('/v1/account/');
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
      (res.url).should.equal('/v1/account/');
      (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.accountKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resetKey() should recieve correct options', function(done) {
    var func, res;
    func = scope.resetKey();
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/reset_key/');
      (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
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
      (res.url).should.equal('/v1/account/password/');
      (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
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
      (res.url).should.equal('/v1/account/password/set/');
      (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.accountKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

});
