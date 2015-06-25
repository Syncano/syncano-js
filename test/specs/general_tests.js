'use strict';

var should = require('should');
var Syncano = require('../../src/syncano');
var config = require('../config.json');
var options = {apiKey: config.API_KEY};
var client = new Syncano(options);

describe('General Tests', function() {

  describe('Syncano Class:', function() {

    it('should be a constructor', function() {
      should(Syncano).be.type('function');
      should(client).be.type('object');
    });

    it('should require an options object with API key', function() {
      var clientNoKey;

      try {
        clientNoKey = new Syncano();
      } catch (err) {
        should(err.message).equal('"Options.apiKey" is missing or invalid.');
      }
    });

    it('should allow baseUrl to change', function() {
      options.baseUrl = 'http://api.syncano.rocks';
      var clientBaseUrl = new Syncano(options);
      should(clientBaseUrl.baseUrl).equal('http://api.syncano.rocks');
    });

    describe('Syncano.instances', function() {
      var instances_class = client.instances;
      it('should be an object', function() {
        should(instances_class).be.type('object');
      });
      it('should have a list function', function() {
        should(instances_class.list).be.type('function');
      });
      it('should have an add function', function() {
        should(instances_class.add).be.type('function');
      });
      it('should have a detail function', function() {
        should(instances_class.detail).be.type('function');
      });
      it('should have an update function', function() {
        should(instances_class.update).be.type('function');
      });
      it('should have a delete function', function() {
        should(instances_class.delete).be.type('function');
      });
    });

  });

});
