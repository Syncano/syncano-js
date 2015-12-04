'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('Syncano (Instance Scope)', function() {
  var requestMock, Syncano, scope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('./request.js', config.browserRequestMock);
    mockery.registerSubstitute('../server/core.js', '../browser/core.js');

    Syncano = require('../../../lib/syncano.js');

    scope = new Syncano({
      apiKey: config.apiKey,
      instance: config.instance
    });

  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.deregisterSubstitute('../server/core.js');
    mockery.disable();
  });

  it('should return instance object', function() {
    (scope).should.be.type('object');
    (scope.type).should.equal('instance');
    (scope).should.have.keys(['config', 'detail', 'channel', 'class', 'group', 'user']);
    (scope.config).should.have.keys(['apiKey', 'instance']);
    (scope.detail).should.be.a.Function();
    (scope.channel).should.be.a.Function();
    (scope.class).should.be.a.Function();
    (scope.group).should.be.a.Function();
    (scope.user).should.be.a.Function();

  });
  it('detail() should recieve correct options', function(done) {
    var func, res;
    func = scope.detail();
    func.then(function(res) {
      (res).should.have.properties(['method', 'url', 'headers']);
      (res.method).should.equal('GET');
      (res.url).should.equal('/v1/instances/' + config.instance + '/');
      (res.headers).should.have.properties(['Content-Type', 'X-API-KEY']);
      (res.headers['X-API-KEY']).should.equal(config.apiKey);
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
