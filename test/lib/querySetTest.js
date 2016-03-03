import should from 'should/as-function';
import sinon from 'sinon';
import Promise from 'bluebird';
import _ from 'lodash';

import QuerySet from '../../src/querySet';
import {Model, Meta} from '../../src/models/base';


describe('QuerySet', function() {
  let meta = null;
  let model = null;
  let qs = null;
  let makeRequestStub = null;

  beforeEach(function() {
    meta = Meta({
      name: 'dummy',
      pluralName: 'dummyyyy',
      endpoints: {
        'detail': {
          'methods': ['delete', 'patch', 'put', 'get'],
          'path': '/v1.1/dummyyyy/{name}/'
        },
        'list': {
          'methods': ['post', 'get'],
          'path': '/v1.1/dummyyyy/'
        }
      }
    });

    model = Model.setMeta(meta);
    qs = QuerySet({model: model});

    makeRequestStub = sinon
      .stub(qs, 'makeRequest')
      .returns(Promise.resolve({
        objects: []
      }));
  });

  describe('#serialize()', function() {

    it('should serialize list', function() {
      should(qs).have.property('endpoint').which.is.equal('list');
      should(qs).have.property('method').which.is.equal('GET');
      should(qs).have.property('model').which.is.Function();

      let response = {objects: [{x: 1}, {x: 2}]};
      const serialized = qs.serialize(response);

      should(serialized).which.is.an.Array();
      should(serialized).have.length(response.objects.length);

      _.forEach(serialized, (object, index) => {
        should(object).have.property('x').which.is.equal(response.objects[index].x);
      });

    });

    it('should serialize object', function() {
      should(qs).have.property('endpoint').which.is.equal('list');
      should(qs).have.property('method').which.is.equal('GET');
      should(qs).have.property('model').which.is.Function();

      qs.endpoint = 'detail';
      let response = {a: 1, b: 2};
      const serialized = qs.serialize(response);

      should(serialized).which.is.an.Object();

      _.forEach(response, (value, key) => {
        should(serialized).have.property(key).which.is.equal(value);
      });
    });

    it('should not serialize', function() {
      let response = {objects: [[{x: 1}, {x: 2}]]};

      should(qs).have.property('endpoint').which.is.equal('list');
      should(qs).have.property('method').which.is.equal('GET');
      should(qs).have.property('model').which.is.Function();
      should(qs).have.property('_serialize').which.is.Boolean().equal(true);

      qs.endpoint = 'list';
      qs._serialize = false;
      let serialized = qs.serialize(response);

      should(serialized).is.an.Object();
      should(serialized).have.property('objects').which.is.an.Array();

      qs.endpoint = null;
      qs._serialize = true;
      serialized = qs.serialize(response);

      should(serialized).which.is.an.Object();
      should(serialized).have.property('objects').which.is.an.Array();
    });

  });

  describe('#request()', function() {

    it('should call makeRequest method', function() {
      return qs.request().then(() => {
        should(makeRequestStub.calledOnce).be.true();
      });
    });

    it('should pass QuerySet props', function() {
      qs.headers = {A: 1, B: 2};
      qs.query = {C: 3, D: 4};
      qs.payload = {E: 5, F: 6};
      qs.attachments = {G: 7, H: 8};

      return qs.request().then(() => {
        should(makeRequestStub.calledOnce).be.true();
        return makeRequestStub.getCall(0).args[2];
      })
      .then((requestOptions) => {
        should(requestOptions).is.an.Object();
        should(requestOptions).have.property('headers').which.is.an.Object();
        should(requestOptions).have.property('query').which.is.an.Object();
        should(requestOptions).have.property('payload').which.is.an.Object();
        should(requestOptions).have.property('attachments').which.is.an.Object();

        should(requestOptions.headers).have.properties(qs.headers);
        should(requestOptions.query).have.properties(qs.query);
        should(requestOptions.payload).have.properties(qs.payload);
        should(requestOptions.attachments).have.properties(qs.attachments);
      });
    });

    it('should return a promise', function() {
      should(qs.request()).be.Promise();
    });

    it('should validate request method', function() {
      qs.method = 'dummy';
      should(qs.request()).be.rejectedWith(/Invalid request method/);
    });

    it('should reject request error', function() {
      makeRequestStub.returns(Promise.reject(new Error('Dummy')))
      should(qs.request()).be.rejectedWith('Dummy');
    });

  });

  describe('#then()', function() {

    it('should call request method', function() {
      let spy = sinon.spy(qs, 'request');

      should(qs.then(() => {})).be.Promise();
      should(spy.calledOnce).be.true();

      spy.restore();
    });

    it('should return Promise with then callback configured', function() {
      should(qs.then(() => {})).be.Promise();
    });

  });

  describe('#create()', function() {

    it('should return model instance', function() {
      let stub = sinon.stub().returns({
        save() {
          return 1
        }
      });

      qs.model = stub;
      qs.properties = {c: 3, d: 4};

      const attrs = {a: 1, b: 2};
      const instance = qs.create(attrs);
      const stubCall = stub.getCall(0).args[0];
      const expected = _.assign({}, qs.properties, attrs);

      should(stub.calledOnce).be.true();
      should(instance).be.equal(1);
      should(stubCall).have.properties(expected);
    });

  });

  describe('#get()', function() {

    it('should return "this"', function() {
      qs.properties = {c: 3, d: 4};

      const attrs = {a: 1, b: 2};
      const outcome = qs.get(attrs);
      const expected = _.assign({}, qs.properties, attrs);

      should(outcome).be.an.Object();
      should(outcome).have.property('properties').which.is.an.Object().with.properties(expected);
      should(outcome).have.property('method').which.is.an.String().equal('GET');
      should(outcome).have.property('endpoint').which.is.an.String().equal('detail');
    });

    it('has defaults', function() {
      const outcome = qs.get();

      should(outcome).be.an.Object();
      should(outcome).have.property('properties').which.is.an.Object();
    });

  });

  describe('#getOrCreate()', function() {

    it('should return a Promise', function() {
      sinon.stub(qs, 'get').returns(new Promise((resolve) => {
        resolve();
      }));

      should(qs.getOrCreate()).be.a.Promise();
      should(qs.get.calledOnce).be.true();
    });

    it('should call create if get fails', function() {
      sinon.stub(qs, 'get').returns(new Promise((resolve, reject) => {
        reject(new Error('dummy'));
      }));

      sinon.stub(qs, 'create').returns(new Promise((resolve) => {
        resolve('createResolve');
      }));

      should(qs.getOrCreate()).be.Promise().fulfilledWith ('createResolve');
    });

    it('should reject if create fails', function() {
      sinon.stub(qs, 'get').returns(new Promise((resolve, reject) => {
        reject(new Error('getReject'));
      }));

      sinon.stub(qs, 'create').returns(new Promise((resolve, reject) => {
        reject(new Error('createReject'));
      }));

      should(qs.getOrCreate()).be.Promise().rejectedWith('createReject');
    });

  });

  describe('#list()', function() {

    it('should return "this" and set properties and query', function() {
      qs.properties = {pa: 1, pb: 2};
      qs.query = {qa: 1, qb: 2};

      const properties = {a: 1, b: 2};
      const query = {c: 3, d: 4};
      const outcome = qs.list(properties, query);

      const expectedProperties = _.assign({}, qs.properties, properties);
      const expectedQuery = _.assign({}, qs.query, query);

      should(outcome).be.an.Object();
      should(outcome).have.property('method').which.is.an.String().equal('GET');
      should(outcome).have.property('endpoint').which.is.an.String().equal('list');
      should(outcome).have.property('properties').which.is.an.Object().with.properties(expectedProperties);
      should(outcome).have.property('query').which.is.an.Object().with.properties(expectedQuery);
    });

  });

  describe('#delete()', function() {

    it('should return "this" and set properties', function() {
      qs.properties = {pa: 1, pb: 2};

      const properties = {a: 1, b: 2};
      const outcome = qs.delete(properties);

      const expectedProperties = _.assign({}, qs.properties, properties);

      should(outcome).be.an.Object();
      should(outcome).have.property('method').which.is.an.String().equal('DELETE');
      should(outcome).have.property('endpoint').which.is.an.String().equal('detail');
      should(outcome).have.property('properties').which.is.an.Object().with.properties(expectedProperties);
    });

  });

  describe('#update()', function() {

    it('should return "this" and set properties', function() {
      qs.properties = {pa: 1, pb: 2};
      qs.object = {qa: 1, qb: 2};

      const properties = {a: 1, b: 2};
      const object = {c: 3, d: 4};
      const outcome = qs.update(properties, object);
      const expectedProperties = _.assign({}, qs.properties, properties);

      should(outcome).be.an.Object();
      should(outcome).have.property('method').which.is.an.String().equal('PATCH');
      should(outcome).have.property('endpoint').which.is.an.String().equal('detail');
      should(outcome).have.property('properties').which.is.an.Object().with.properties(expectedProperties);
      should(outcome).have.property('payload').which.is.an.Object().with.properties(object);
    });

  });

  describe('#updateOrCreate()', function() {

    it('should return a Promise', function() {
      sinon.stub(qs, 'update').returns(new Promise((resolve) => {
        resolve();
      }));

      should(qs.updateOrCreate()).be.a.Promise();
      should(qs.update.calledOnce).be.true();
    });

    it('should call create if update fails', function() {
      sinon.stub(qs, 'update').returns(new Promise((resolve, reject) => {
        reject(new Error('dummy'));
      }));

      sinon.stub(qs, 'create').returns(new Promise((resolve) => {
        resolve('createResolve');
      }));

      should(qs.updateOrCreate()).be.Promise().fulfilledWith('createResolve');
    });

    it('should reject if create fails', function() {
      sinon.stub(qs, 'update').returns(new Promise((resolve, reject) => {
        reject(new Error('updateReject'));
      }));

      sinon.stub(qs, 'create').returns(new Promise((resolve, reject) => {
        reject(new Error('createReject'));
      }));

      should(qs.updateOrCreate()).be.Promise().rejectedWith('createReject');
    });

  });

  describe('#first()', function() {

    it('should return a Promise', function() {
      sinon.stub(qs, 'list').returns(new Promise((resolve) => {
        resolve([{x: 1}]);
      }));

      should(qs.first()).be.a.Promise();
      should(qs.list.calledOnce).be.true();
    });

    it('should return the first object', function() {
      sinon.stub(qs, 'list').returns(new Promise((resolve) => {
        resolve(['a', 'b']);
      }));

      should(qs.first()).be.a.Promise().fulfilledWith('a');
      should(qs.list.calledOnce).be.true();
    });

    it('should return null', function() {
      sinon.stub(qs, 'list').returns(new Promise((resolve) => {
        resolve([]);
      }));

      should(qs.first()).be.a.Promise().fulfilledWith(undefined);
      should(qs.list.calledOnce).be.true();
    });

    it('should reject if list fails', function() {
      sinon.stub(qs, 'list').returns(new Promise((resolve, reject) => {
        reject(new Error('listReject'));
      }));

      should(qs.first()).be.a.Promise().rejectedWith('listReject');
      should(qs.list.calledOnce).be.true();
    });

  });

  describe('#pageSize()', function() {

    it('should return "this" and set pageSize', function() {
      const outcome = qs.pageSize(1);
      should(outcome).be.an.Object();
      should(outcome).have.property('query').which.is.an.Object().properties({page_size: 1});
    });

  });

  describe('#ordering()', function() {

    it('should return "this" and set ordering', function() {
      const outcome = qs.ordering('desc');
      should(outcome).be.an.Object();
      should(outcome).have.property('query').which.is.an.Object().properties({ordering: 'desc'});
    });

    it('should have default value', function() {
      const outcome = qs.ordering();
      should(outcome).be.an.Object();
      should(outcome).have.property('query').which.is.an.Object().properties({ordering: 'asc'});
    });

    it('should validate value', function() {
      should(() => {
        qs.ordering('dummy');
      }).throw(new Error('dummy'));
    });

  });

  describe('#raw()', function() {

    it('should disable serialization and return "this"', function() {
      const outcome = qs.raw();

      should(outcome).be.an.Object();
      should(outcome).have.property('_serialize').which.is.false();
    });

  });

});
