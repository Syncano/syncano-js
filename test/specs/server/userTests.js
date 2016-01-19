'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('User', function() {
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

    it('instance.user is an user object', function() {
      (scope.instance(config.instance).user().type).should.equal('user');
      (scope.instance(config.instance).user()).should.have.keys(['list', 'add', 'detail', 'update', 'delete', 'resetKey']);
      (scope.instance(config.instance).user().list).should.be.a.Function();
      (scope.instance(config.instance).user().add).should.be.a.Function();
      (scope.instance(config.instance).user().detail).should.be.a.Function();
      (scope.instance(config.instance).user().delete).should.be.a.Function();
      (scope.instance(config.instance).user().update).should.be.a.Function();
      (scope.instance(config.instance).user().resetKey).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).user().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).user().detail(config.userId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).user().update(config.userId, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).user().delete(config.userId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('resetKey() should recieve correct options', function(done) {
      var func, res;
      func = scope.instance(config.instance).user().resetKey(config.userId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/reset_key/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


    it('should create a new user object', function() {
      scope = new scope.instance(config.instance).user(config.userId);
      (scope.type).should.equal('user');
      (scope).should.have.keys(['config', 'detail', 'update', 'delete', 'resetKey', 'group']);
      (scope.detail).should.be.a.Function();
      (scope.delete).should.be.a.Function();
      (scope.update).should.be.a.Function();
      (scope.resetKey).should.be.a.Function();
      (scope.group).should.be.an.Function();
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/');
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
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/reset_key/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('group().list() should recieve correct options', function(done) {
      var func, res;
      func = scope.group().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/groups/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('group().add() should recieve correct options', function(done) {
      var func, res;
      func = scope.group().add({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/groups/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('group().detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.group().detail(config.groupId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('group().delete() should recieve correct options', function(done) {
      var func, res;
      func = scope.group().delete(config.groupId);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/' + config.userId + '/groups/' + config.groupId + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
    it('user().group() should return a group object', function() {
      scope = scope.group(config.groupId);
      (scope.type).should.equal('group');
      (scope).should.have.keys(['config', 'detail', 'delete']);
      (scope.detail).should.be.a.Function();
      (scope.delete).should.be.a.Function();
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

    it('this.user should be user object', function() {
      (scope.user().type).should.equal('user');
      (scope.user()).should.have.keys(['add', 'login']);
      (scope.user().add).should.be.a.Function();
      (scope.user().login).should.be.a.Function();
    });

    it('add() should recieve correct options', function(done) {
      var func, res;
      func = scope.user().add({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('login() should recieve correct options', function(done) {
      var func, res;
      func = scope.user().login({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/user/auth/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('login() (social login) should recieve correct options', function(done) {
      var func, res;
      func = scope.user().login({socialToken: config.socialToken, backend: config.backend});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/user/auth/' + config.backend + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
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

    it('this.user should be user object', function() {
      (scope.user().type).should.equal('user');
      (scope.user()).should.have.keys(['add', 'detail', 'update']);
      (scope.user().add).should.be.a.Function();
      (scope.user().detail).should.be.a.Function();
      (scope.user().update).should.be.a.Function();
    });

    it('add() should recieve correct options', function(done) {
      var func, res;
      func = scope.user().add({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/' + config.instance + '/users/');
        (res.headers).should.have.properties(['Content-Type', , 'X-API-KEY', 'X-USER-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        (res.headers['X-USER-KEY']).should.equal(config.userKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func, res;
      func = scope.user().detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/user/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func, res;
      func = scope.user().update({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/user/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.apiKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

  });
});
