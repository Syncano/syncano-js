'use strict';

var should = require('should'); // eslint-disable-line
var helper = require('../../helpers/browser/helper.js');

describe('Syncano (Empty Scope)', function() {

  before(helper.beforeEmptyScopeFunc);
  after(helper.afterFunc);

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
    var func;
    func = scope.login({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/auth/');
      (res.headers).should.have.properties(['Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('register()', function(done) {
    var func;
    func = scope.register({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/register/');
      (res.headers).should.have.properties(['Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resendEmail()', function(done) {
    var func;
    func = scope.resendEmail({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/resend_email/');
      (res.headers).should.have.properties(['Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('resetPw() should recieve correct options', function(done) {
    var func;
    func = scope.resetPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/password/reset/');
      (res.headers).should.have.properties(['Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('confirmResetPw() should recieve correct options', function(done) {
    var func;
    func = scope.confirmResetPw({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/password/reset/confirm/');
      (res.headers).should.have.properties(['Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('activate() should recieve correct options', function(done) {
    var func;
    func = scope.activate({});
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('POST');
      (res.url).should.equal('/v1/account/activate/');
      (res.headers).should.have.properties(['Content-Type']);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
