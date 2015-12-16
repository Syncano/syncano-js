'use strict';

var should = require('should'); // eslint-disable-line
var config = require('../../config.js');
var helper = require('../../helpers/browser/helper.js');

describe('Instance', function() {
  describe('(Account scope)', function() {

    before(helper.beforeAccountScopeFunc);
    after(helper.afterFunc);

    it('should be an instance object', function() {
      (scope.instance().type).should.equal('instance');
      (scope.instance()).should.have.keys(['list','detail', 'add', 'update', 'delete']);
      (scope.instance().list).should.be.an.Function();
      (scope.instance().add).should.be.an.Function();
      (scope.instance().detail).should.be.a.Function();
      (scope.instance().delete).should.be.a.Function();
      (scope.instance().update).should.be.a.Function();
    });

    it('list() should recieve correct options', function(done) {
      var func;
      func = scope.instance().list();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('detail() should recieve correct options', function(done) {
      var func;
      func = scope.instance().detail(config.instance);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('add() should recieve correct options', function(done) {
      var func;
      func = scope.instance().add({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('POST');
        (res.url).should.equal('/v1/instances/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func;
      func = scope.instance().update(config.instance, {});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func;
      func = scope.instance().delete(config.instance);
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should create new instance object', function() {
      scope = new scope.instance(config.instance);
      (scope.type).should.equal('instance');
      (scope).should.have.keys([
        'config',
        'admin',
        'detail',
        'update',
        'delete',
        'apikey',
        'channel',
        'class',
        'codebox',
        'invitation',
        'group',
        'schedule',
        'trigger',
        'webhook',
        'user'
      ]);
      (scope.detail).should.be.a.Function();
      (scope.update).should.be.a.Function();
      (scope.delete).should.be.a.Function();
      (scope.admin).should.be.a.Function();
      (scope.apikey).should.be.a.Function();
      (scope.channel).should.be.a.Function();
      (scope.class).should.be.a.Function();
      (scope.codebox).should.be.a.Function();
      (scope.invitation).should.be.a.Function();
      (scope.group).should.be.a.Function();
      (scope.schedule).should.be.a.Function();
      (scope.trigger).should.be.a.Function();
      (scope.webhook).should.be.a.Function();
      (scope.user).should.be.a.Function();
    });

    it('detail() should recieve correct options', function(done) {
      var func;
      func = scope.detail();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('GET');
        (res.url).should.equal('/v1/instances/' + config.instance + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('update() should recieve correct options', function(done) {
      var func;
      func = scope.update({});
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('PATCH');
        (res.url).should.equal('/v1/instances/' + config.instance + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('delete() should recieve correct options', function(done) {
      var func;
      func = scope.delete();
      func.then(function(res) {
        (res).should.have.properties(['method', 'url', 'headers']);
        (res.method).should.equal('DELETE');
        (res.url).should.equal('/v1/instances/' + config.instance + '/');
        (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
        (res.headers['X-API-KEY']).should.equal(config.accountKey);
        done();
      }).catch(function(err) {
        done(err);
      });
    });


  });
});
