'use strict';

var should = require('should');
var Syncano = require('../../src/syncano');
var config = require('../config.json');
var options = {apiKey: config.API_KEY};
var client = new Syncano(options);

describe('Instances Tests', function() {

  describe('Instances Functions', function() {

    it('should create new instances', function() {
      // client.instances.add({name: config.INSTANCE_NAME}, function(err, res) {
      //   if (err) {throw new Error(err);}
      //   should(err).equal(null);
      //   should(res.statusCode).equal(201);
      //   should(res.body).be.type('object');
      //   should(res.body).be.type('object');
      //   should(res.body.name).equal(config.INSTANCE_NAME);
      // });
    });

    it('should list instances', function() {

    });

    it('should get instance details', function() {

    });

    it('should update instances', function() {

    });

    it('should delete instances', function() {
      // client.instances.delete(config.INSTANCE_NAME, function(err, res) {
      //   should(res.statusCode).equal(203);
      // });
    });

  });

});
