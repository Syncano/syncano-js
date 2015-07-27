'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../config.js');

describe('Syncano', function() {
  var requestMock, Syncano, scope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('request', config.requestMock);
    Syncano = require('../../src/syncano.js');
    scope = new Syncano();
  });

  after(function() {
    mockery.deregisterMock('request');
    mockery.disable();
  });

  it('should be a constructor', function() {
    (Syncano).should.be.a.Function();
    (scope.constructor).should.be.a.Function();
    (scope).should.be.an.Object();
  });
});
