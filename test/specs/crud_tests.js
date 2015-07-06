'use strict';

var should = require('should');
var Syncano = require('../../src/syncano');
var config = require('../config.json');
var instance = new Syncano.Instance({apiKey: 'APIKEY', instance: 'INSTANCE'});

describe('Instance Tests', function() {
  describe('Instance', function() {
    it('should be a constructor', function() {
      should(Syncano.Instance).be.type('function');
      should(instance).be.type('object');
      var test = Syncano.Instance({apiKey: 'APIKEY', instance: 'INSTANCE'});
      should(test).be.an.instanceOf(Syncano.Instance);
    });
    it('should include instance specific objects', function() {
      should(instance.admins).be.type('object');
      should(instance.apiKeys).be.type('object');
      should(instance.classes).be.type('object');
      should(instance.codeboxes).be.type('object');
      should(instance.groups).be.type('object');
      should(instance.schedules).be.type('object');
      should(instance.triggers).be.type('object');
      should(instance.users).be.type('object');
      should(instance.webhooks).be.type('object');
    });

    describe('Instance.admins', function() {
      it('should include RUD functions', function() {
        should(instance.admins.list).be.type('function');
        should(instance.admins.detail).be.type('function');
        should(instance.admins.update).be.type('function');
        should(instance.admins.delete).be.type('function');
      });
      it('should not include CREATE functionality', function() {
        should(instance.admins.add).not.be.type('function');
      });
    });

    describe('Instance.apiKeys', function() {
      it('should include CRD functions', function() {
        should(instance.apiKeys.list).be.type('function');
        should(instance.apiKeys.detail).be.type('function');
        should(instance.apiKeys.add).be.type('function');
        should(instance.apiKeys.delete).be.type('function');
      });
      it('should include RESET KEY function', function() {
        should(instance.apiKeys.resetKey).be.type('function');
      });
      it('should not include UPDATE functionality', function() {
        should(instance.apiKeys.update).not.be.type('function');
      });
    });

    describe('Instance.classes', function() {
      it('should include CRUD functions', function() {
        should(instance.classes.list).be.type('function');
        should(instance.classes.detail).be.type('function');
        should(instance.classes.add).be.type('function');
        should(instance.classes.update).be.type('function');
        should(instance.classes.delete).be.type('function');
      });
    });

    describe('Instance.codeboxes', function() {
      it('should include CRUD functions', function() {
        should(instance.codeboxes.list).be.type('function');
        should(instance.codeboxes.detail).be.type('function');
        should(instance.codeboxes.add).be.type('function');
        should(instance.codeboxes.update).be.type('function');
        should(instance.codeboxes.delete).be.type('function');
      });
      it('should include LIST RUNTIMES function', function() {
        should(instance.codeboxes.runtimes).be.type('function');
      });
    });

    describe('Instance.groups', function() {
      it('should include CRUD functions', function() {
        should(instance.groups.list).be.type('function');
        should(instance.groups.detail).be.type('function');
        should(instance.groups.add).be.type('function');
        should(instance.groups.update).be.type('function');
        should(instance.groups.delete).be.type('function');
      });
    });

    describe('Instance.schedules', function() {
      it('should include CRUD functions', function() {
        should(instance.schedules.list).be.type('function');
        should(instance.schedules.detail).be.type('function');
        should(instance.schedules.add).be.type('function');
        should(instance.schedules.update).be.type('function');
        should(instance.schedules.delete).be.type('function');
      });
    });

    describe('Instance.triggers', function() {
      it('should include CRUD functions', function() {
        should(instance.triggers.list).be.type('function');
        should(instance.triggers.detail).be.type('function');
        should(instance.triggers.add).be.type('function');
        should(instance.triggers.update).be.type('function');
        should(instance.triggers.delete).be.type('function');
      });
    });

    describe('Instance.users', function() {
      it('should include CRUD functions', function() {
        should(instance.users.list).be.type('function');
        should(instance.users.detail).be.type('function');
        should(instance.users.add).be.type('function');
        should(instance.users.update).be.type('function');
        should(instance.users.delete).be.type('function');
      });
      it('should include RESET KEY function', function() {
        should(instance.users.resetKey).be.type('function');
      });
    });

    describe('Instance.webhooks', function() {
      it('should include CRUD functions', function() {
        should(instance.webhooks.list).be.type('function');
        should(instance.webhooks.detail).be.type('function');
        should(instance.webhooks.add).be.type('function');
        should(instance.webhooks.update).be.type('function');
        should(instance.webhooks.delete).be.type('function');
      });
    });
  });



  //   var myclass;
  //   it('should be a constructor', function() {
  //     should(Syncano.Class).be.type('function');
  //     myclass = new Syncano.Class({apiKey: 'APIKEY', instance: 'INSTANCE', className: 'CLASS'});
  //     should(myclass).be.type('object');
  //   });
  //   it('should have CRUD functions', function() {
  //     should(myclass.list).be.type('function');
  //     should(myclass.detail).be.type('function');
  //     should(myclass.add).be.type('function');
  //     should(myclass.update).be.type('function');
  //     should(myclass.delete).be.type('function');
  //   });

});
