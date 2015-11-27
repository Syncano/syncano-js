'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano (Empty Scope)', function() {
  var requestMock, Syncano, scope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('./request.js', config.requestMock);

    Syncano = require('../../src/syncano.js');
    scope = new Syncano();
  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.disable();
  });

  it('should return account object', function() {
    (scope).should.be.an.Object();
    (scope.type).should.equal('account');
    (scope).should.have.keys(['login', 'register', 'resendEmail', 'resetPw', 'confirmResetPw', 'activate']);
    (scope.login).should.be.a.Function();
    (scope.register).should.be.a.Function();
    (scope.resendEmail).should.be.a.Function();
    (scope.resetPw).should.be.a.Function();
    (scope.confirmResetPw).should.be.a.Function();
    (scope.activate).should.be.a.Function();
  });

  it('login()', function(done) {
    var func, res;
    func = scope.login({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/auth/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('login() using facebook', function(done) {
    var func, res;
    func = scope.login({socialToken: '775b2b9981a2ec6b1e90ce62795bdbc0', backend: 'facebook'});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/auth/facebook/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('login() using google', function(done) {
    var func, res;
    func = scope.login({socialToken: '2fc5c9d91463f8e0ea1a04721bd7e929', backend: 'google-oauth2'});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/auth/google-oauth2/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('register()', function(done) {
    var func, res;
    func = scope.register({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/register/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resendEmail()', function(done) {
    var func, res;
    func = scope.resendEmail({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/resend_email/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resetPw() should recieve correct options', function(done) {
    var func, res;
    func = scope.resetPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/password/reset/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('confirmResetPw() should recieve correct options', function(done) {
    var func, res;
    func = scope.confirmResetPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/password/reset/confirm/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('activate() should recieve correct options', function(done) {
    var func, res;
    func = scope.activate({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/activate/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
