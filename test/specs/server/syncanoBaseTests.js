'use strict';

var should = require('should');
var mockery = require('mockery');
var config = require('../../config.js');

describe('Syncano', function() {
  var requestMock, Syncano, scope;

  before(function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('./request.js', config.requestMock);

    Syncano = require('../../../lib/syncano.js');
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

  it('should accept debug parameter', function() {
    var test = new Syncano({debug:true});
    (test).should.be.an.Object();
  });

  it('should check for required parameters', function() {
    (function() {scope.register();}).should.throw('Invalid parameters object.');
  });

  it('should check for required id', function() {
    scope = new Syncano({accountKey: config.accountKey});
    (function() {scope.instance().detail();}).should.throw('Valid ID must be provided.');
  });

  it('should allow filters', function(done) {
    var func, res;
    var filterOpts = {filter: {some: 'filter'}, fields: {include: ['included'], exclude: ['excluded'] }, orderBy: {field: 'desc'}, pageSize: 10 };
    func = scope.instance().list(filterOpts);
    func.then(function(res) {
      (res.qs).should.have.keys(['fields', 'excluded_fields', 'query', 'order_by', 'page_size']);
      (res.qs.fields).should.equal('included');
      (res.qs.excluded_fields).should.equal('excluded');
      (res.qs.query).should.be.an.String().which.is.equal('{"some":"filter"}');
      (res.qs.order_by).should.equal('-field');
      (res.qs.page_size).should.equal(10);
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('should accept a base url', function() {
    scope = new Syncano({baseUrl: 'http://www.google.com'});
    (scope.config).should.have.property('baseUrl').which.is.equal('http://www.google.com');
  });

});
