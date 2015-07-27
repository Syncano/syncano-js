'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano (Instance Scope)', function() {
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
  it('should return instance scope', function() {
    (scope).should.be.type('object');
    (scope.type).should.equal('instance');
    (scope.config).should.have.properties(['apiKey', 'instance']);
    (scope.config).should.not.have.properties(['accountKey', 'userKey']);
    (scope).should.have.property('detail').which.is.a.Function();
    (scope).should.have.property('Channel').which.is.a.Function();
    (scope).should.have.property('channel').which.is.an.Object();
    (scope.channel).should.have.properties(['list', 'detail', 'detail', 'history', 'publish', 'poll']);
    (scope.channel.type).should.equal('channel');
    (scope).should.have.property('Class').which.is.a.Function();
    (scope).should.have.property('class').which.is.an.Object();
    (scope.class).should.have.properties(['list', 'detail']);
    (scope.class.type).should.equal('class');
    (scope).should.have.property('Group').which.is.a.Function();
    (scope).should.have.property('group').which.is.an.Object();
    (scope.group).should.have.properties(['list', 'detail']);
    (scope.group.type).should.equal('group');
    (scope).should.have.property('User').which.is.a.Function();
    (scope).should.have.property('user').which.is.an.Object();
    (scope.user).should.have.properties(['add', 'login']);
    (scope.user.type).should.equal('user');
  });
  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = scope.detail();
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('GET');
      (res.url).should.equal('instances/' + config.instance + '/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.apiKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
