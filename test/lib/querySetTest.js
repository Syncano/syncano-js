import should from 'should/as-function';
import _ from 'lodash';

import QuerySet from '../../src/querySet';


describe('QuerySet', function() {
  let qs = null;

  beforeEach(function() {
    qs = QuerySet({
      model: (o) => o
    });
  });

  describe('#init()', function() {

    it('should require "model" variable', function() {

    });

  });

  describe('#serialize()', function() {

    it('should serialize list', function() {
      should(qs).have.property('endpoint').which.is.null();
      should(qs).have.property('model').which.is.Function();

      qs.endpoint = 'list';
      let response = {objects: [1, 2]};
      const serialized = qs.serialize(response);

      should(serialized).which.is.an.Array();
      should(serialized).have.length(response.objects.length);
      should(serialized[0]).is.equal(1);
      should(serialized[1]).is.equal(2);
    });

    it('should serialize object', function() {
      should(qs).have.property('endpoint').which.is.null();
      should(qs).have.property('model').which.is.Function();

      qs.endpoint = 'detail';
      let response = {a: 1, b: 2};
      const serialized = qs.serialize(response);

      should(serialized).which.is.an.Object();
      should(serialized).have.keys(_.keys(response)).and.properties(response);
    });

    it('should not serialize', function() {
      should(qs).have.property('endpoint').which.is.null();
      should(qs).have.property('model').which.is.Function();
      should(qs).have.property('_serialize').which.is.Boolean().equal(true);

      qs.endpoint = 'list';
      qs._serialize = false;

      let response = {objects: [1, 2]};
      const serialized = qs.serialize(response);

      should(serialized).which.is.an.Object();
      should(serialized).have.keys(_.keys(response)).and.properties(response);
    });

  });

  describe('#request()', function() {

    it('should require "model" variable', function() {

    });

    it('should require "endpoint" variable', function() {

    });

    it('should require "endpoint" variable', function() {

    });

    it('should check allowed request methods', function() {

    });

    it('should check "endpoint" variable', function() {

    });

    it('should build a superagent object', function() {

    });

    it('should return Promise', function() {

    });

    it('should return serialized data', function() {

    });

  });

  describe('#then()', function() {

    it('should call request method', function() {

    });

    it('should return Promise with then callback configured', function() {

    });

  });

  describe('#create()', function() {

    it('should return object', function() {

    });

  });

  describe('#get()', function() {

    it('should return object', function() {

    });

  });

  describe('#getOrCreate()', function() {

    it('should return object', function() {

    });

  });

  describe('#list()', function() {

    it('should return list of objects', function() {

    });

  });

  describe('#delete()', function() {

    it('should return undefined', function() {

    });

  });

  describe('#update()', function() {

    it('should return object', function() {

    });

  });

  describe('#updateOrCreate()', function() {

    it('should return object', function() {

    });

  });

  describe('#first()', function() {

    it('should return object or undefined', function() {

    });

  });

  describe('#pageSize()', function() {

    it('should return "this"', function() {

    });

  });

  describe('#ordering()', function() {

    it('should return "this"', function() {

    });

  });

  describe('#raw()', function() {

    it('should disable serialization', function() {

    });

    it('should return "this"', function() {

    });

  });

});
