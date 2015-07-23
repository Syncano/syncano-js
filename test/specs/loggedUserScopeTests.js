'use strict';

var core = require('../../src/core.js');
var mockery = require('mockery');
var should = require('should');
var config = require('../config.js');

var cb = function() {
  return 'stubbed';
};


describe('Syncano (Logged User Scope)', function() {
  var requestMock, Syncano, loggedUserScope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('request', config.requestMock);
    Syncano = require('../../src/syncano.js');

    loggedUserScope = new Syncano({
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
    (loggedUserScope).should.be.type('object');
    (loggedUserScope.type).should.equal('instance');
    (loggedUserScope.config).should.have.properties(['apiKey', 'userKey', 'instance']);
    (loggedUserScope.config).should.not.have.properties(['accountKey']);
    (loggedUserScope).should.have.property('detail').which.is.a.Function();
    (loggedUserScope).should.have.property('Channel').which.is.a.Function();
    (loggedUserScope).should.have.property('channel').which.is.an.Object();
    (loggedUserScope.channel.type).should.equal('channel');
    (loggedUserScope).should.have.property('Class').which.is.a.Function();
    (loggedUserScope).should.have.property('class').which.is.an.Object();
    (loggedUserScope.class.type).should.equal('class');
    (loggedUserScope).should.have.property('Group').which.is.a.Function();
    (loggedUserScope).should.have.property('group').which.is.an.Object();
    (loggedUserScope.group.type).should.equal('group');
    (loggedUserScope).should.have.property('User').which.is.a.Function();
    (loggedUserScope).should.have.property('user').which.is.an.Object();
    (loggedUserScope.user.type).should.equal('user');
  });

  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = loggedUserScope.detail();
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
