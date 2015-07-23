'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano (Empty Scope)', function() {
  var requestMock, Syncano, emptyScope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('request', config.requestMock);
    Syncano = require('../../src/syncano.js');
    emptyScope = new Syncano();
  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.disable();
  });

  it('should return account scope', function() {
    (emptyScope).should.be.type('object');
    (emptyScope.type).should.equal('account');
    (emptyScope).should.have.property('login').which.is.a.Function();
    (emptyScope).should.have.property('register').which.is.a.Function();
    (emptyScope).should.have.property('resendEmail').which.is.a.Function();
    (emptyScope).should.have.property('resetPw').which.is.a.Function();
    (emptyScope).should.have.property('confirmResetPw').which.is.a.Function();
    (emptyScope).should.have.property('activate').which.is.a.Function();
  });

  it('login()', function(done) {
    var func, res;
    func = emptyScope.login({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/auth/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('register()', function(done) {
    var func, res;
    func = emptyScope.register({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/register/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resendEmail()', function(done) {
    var func, res;
    func = emptyScope.resendEmail({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/resend_email/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resetPw() should recieve correct options', function(done) {
    var func, res;
    func = emptyScope.resetPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/password/reset/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('confirmResetPw() should recieve correct options', function(done) {
    var func, res;
    func = emptyScope.confirmResetPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/password/reset/confirm/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('activate() should recieve correct options', function(done) {
    var func, res;
    func = emptyScope.activate({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('account/activate/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
