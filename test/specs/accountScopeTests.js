'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano (Account Scope)', function() {
  var requestMock, Syncano, accountScope;
  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('request', config.requestMock);
    Syncano = require('../../src/syncano.js');

    accountScope = new Syncano({
      accountKey: config.accountKey
    });

  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.disable();
  });

  it('should return account scope', function() {
    (accountScope).should.be.type('object');
    (accountScope.type).should.equal('account');
    (accountScope.config).should.have.properties(['accountKey']);
    (accountScope.config).should.not.have.properties(['apiKey', 'userKey', 'instance']);
    (accountScope).should.have.property('detail').which.is.a.Function();
    (accountScope).should.have.property('update').which.is.a.Function();
    (accountScope).should.have.property('resetKey').which.is.a.Function();
    (accountScope).should.have.property('changePw').which.is.a.Function();
    (accountScope).should.have.property('setPw').which.is.a.Function();
    (accountScope).should.have.property('invitation').which.is.an.Object();
    (accountScope.invitation.type).should.equal('invitation');
    (accountScope.invitation).should.have.properties(['list', 'detail', 'accept', 'delete']);
    (accountScope).should.have.property('Instance').which.is.a.Function();
    (accountScope).should.have.property('instance').which.is.an.Object();
    (accountScope.instance.type).should.equal('instance');
    (accountScope.instance).should.have.properties(['list', 'detail', 'update', 'add', 'delete']);
  });
  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = accountScope.detail();
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
    func = accountScope.update({});
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
    func = accountScope.resetKey({});
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
    func = accountScope.changePw({});
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
    func = accountScope.setPw({});
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
