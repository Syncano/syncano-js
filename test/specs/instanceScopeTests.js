'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano (Instance Scope)', function() {
  var requestMock, Syncano, instanceScope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('request', config.requestMock);
    Syncano = require('../../src/syncano.js');

    instanceScope = new Syncano({
      apiKey: config.apiKey,
      instance: config.instance
    });

  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.disable();
  });
  it('should return instance scope', function() {
    (instanceScope).should.be.type('object');
    (instanceScope.type).should.equal('instance');
    (instanceScope.config).should.have.properties(['apiKey', 'instance']);
    (instanceScope.config).should.not.have.properties(['accountKey', 'userKey']);
    (instanceScope).should.have.property('detail').which.is.a.Function();
    (instanceScope).should.have.property('Channel').which.is.a.Function();
    (instanceScope).should.have.property('channel').which.is.an.Object();
    (instanceScope.channel).should.have.properties(['list', 'detail', 'detail', 'history', 'publish', 'poll']);
    (instanceScope.channel.type).should.equal('channel');
    (instanceScope).should.have.property('Class').which.is.a.Function();
    (instanceScope).should.have.property('class').which.is.an.Object();
    (instanceScope.class).should.have.properties(['list', 'detail']);
    (instanceScope.class.type).should.equal('class');
    (instanceScope).should.have.property('Group').which.is.a.Function();
    (instanceScope).should.have.property('group').which.is.an.Object();
    (instanceScope.group).should.have.properties(['list', 'detail']);
    (instanceScope.group.type).should.equal('group');
    (instanceScope).should.have.property('User').which.is.a.Function();
    (instanceScope).should.have.property('user').which.is.an.Object();
    (instanceScope.user).should.have.properties(['add', 'login']);
    (instanceScope.user.type).should.equal('user');
  });
  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = instanceScope.detail();
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
