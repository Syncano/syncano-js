'use strict';

var core = require('../../src/core.js');
var mockery = require('mockery');
var should = require('should');
var config = require('../config.js');

var cb = function() {
  return 'stubbed';
};


describe('Syncano (Logged User Scope)', function() {
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

  it('should return instance scope', function() {
    (scope).should.be.type('object');
    (scope.type).should.equal('instance');
    (scope.config).should.have.properties(['apiKey', 'userKey', 'instance']);
    (scope.config).should.not.have.properties(['accountKey']);
    (scope).should.have.property('detail').which.is.a.Function();
    (scope).should.have.property('Channel').which.is.a.Function();
    (scope).should.have.property('channel').which.is.an.Object();
    (scope.channel.type).should.equal('channel');
    (scope).should.have.property('Class').which.is.a.Function();
    (scope).should.have.property('class').which.is.an.Object();
    (scope.class.type).should.equal('class');
    (scope).should.have.property('Group').which.is.a.Function();
    (scope).should.have.property('group').which.is.an.Object();
    (scope.group.type).should.equal('group');
    (scope).should.have.property('User').which.is.a.Function();
    (scope).should.have.property('user').which.is.an.Object();
    (scope.user.type).should.equal('user');
  });

  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = scope.detail();
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('GET');
      (res.url).should.equal('instances/' + config.instance + '/');
      (res.headers).should.have.properties(['User-Agent', 'Content-Type', 'X-API-KEY', 'X-USER-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.apiKey);
      (res.headers['X-USER-KEY']).should.equal(config.userKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
