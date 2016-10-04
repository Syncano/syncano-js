import should from 'should/as-function';
import sinon from 'sinon';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import Request from '../../src/request';


describe('Request', function() {
  let config = null;
  let request = null;
  let stubs = null;

  beforeEach(function() {
    const methods = [
      'type',
      'accept',
      'timeout',
      'set',
      'query',
      'send',
      'attach',
      'field',
      'end',
      'on'
    ];

    stubs = _.reduce(methods, (result, method) => {
      result[`_${method}`] = (method === 'end') ? sinon.stub().yields(null, {ok: true}) : sinon.spy();
      result[method] = (...args) => {
        result[`_${method}`](...args);
        return result;
      }
      return result;
    }, {_init: sinon.spy()})

    config = Syncano({
      accountKey: '123'
    });

    request = Request
      .setRequestHandler(function(...args) {
        stubs._init(...args);
        return stubs;
      })
      .setConfig(config)();
  });

  describe('#buildUrl()', function() {

    it('should check "path" type', function() {
      should(request.buildUrl(1)).be.rejectedWith(/path/);
    });

    it('should ignore already joined path', function() {
      const expected = `${config.getBaseUrl()}v1/api/`;
      const outcome = request.buildUrl(expected);

      should(outcome).be.equal(expected);
    });

    it('should joined path with base url', function() {
      const path = 'v1/api/';
      const expected = `${config.getBaseUrl()}${path}`;
      const outcome = request.buildUrl(path);

      should(outcome).be.equal(expected);
    });

  });

  describe('#makeRequest()', function() {

    it('should validate "methodName" attribute', function() {
      should(request.makeRequest(null, '')).be.rejectedWith('Invalid request method: "null".');
      should(request.makeRequest('DUMMY', '')).be.rejectedWith('Invalid request method: "DUMMY".');
    });

    it('should validate "path" attribute', function() {
      should(request.makeRequest('GET', '')).be.rejectedWith('"path" is required.');
    });

    it('should change request type if attachment is present', function() {
      request.makeRequest('GET', '/v1.1/', {payload: {
        a: Syncano.file(1),
        b: Syncano.file(2),
        c: 2,
        d: 3
      }}, () => {});

      should(stubs._init.calledOnce).be.true();
      should(stubs._type.withArgs('form').calledOnce).be.true();
      should(stubs._accept.calledOnce).be.true();
      should(stubs._timeout.calledOnce).be.true();
      should(stubs._set.calledOnce).be.true();
      should(stubs._query.calledOnce).be.true();
      should(stubs._send.calledOnce).be.false();
      should(stubs._end.calledOnce).be.true();
      should(stubs._attach.callCount).be.equal(2);
      should(stubs._field.callCount).be.equal(2);
    });

    it('should set proper headers if user key is present', function() {
      request.getConfig().setUserKey('321');
      request.makeRequest('GET', '/v1.1/', {}, () => {});

      should(stubs._init.calledOnce).be.true();
      should(stubs._type.calledOnce).be.true();
      should(stubs._accept.calledOnce).be.true();
      should(stubs._timeout.calledOnce).be.true();
      should(stubs._set.calledOnce).be.true();
      should(stubs._query.calledOnce).be.true();
      should(stubs._send.calledOnce).be.true();
      should(stubs._end.calledOnce).be.true();
      should(stubs._attach.callCount).be.equal(0);

      let spyCall = stubs._set.getCall(0).args[0];

      should(spyCall).be.an.Object();
      should(spyCall).have.property('X-API-KEY').which.is.String().equal('123');
      should(spyCall).have.property('X-USER-KEY').which.is.String().equal('321');
    });


    it('should set proper headers if api key is present', function() {
      request.getConfig().setApiKey('321');
      request.makeRequest('GET', '/v1.1/', {}, () => {});

      should(stubs._init.calledOnce).be.true();
      should(stubs._type.calledOnce).be.true();
      should(stubs._accept.calledOnce).be.true();
      should(stubs._timeout.calledOnce).be.true();
      should(stubs._set.calledOnce).be.true();
      should(stubs._query.calledOnce).be.true();
      should(stubs._send.calledOnce).be.true();
      should(stubs._end.calledOnce).be.true();
      should(stubs._attach.callCount).be.equal(0);

      let spyCall = stubs._set.getCall(0).args[0];

      should(spyCall).be.an.Object();
      should(spyCall).have.property('X-API-KEY').which.is.String().equal('321');
    });

    it('should set proper headers if social token is present', function() {
      request.getConfig().setSocialToken('456').setAccountKey('123');
      request.makeRequest('GET', '/v1.1/', {}, () => {});

      should(stubs._init.calledOnce).be.true();
      should(stubs._type.calledOnce).be.true();
      should(stubs._accept.calledOnce).be.true();
      should(stubs._timeout.calledOnce).be.true();
      should(stubs._set.calledOnce).be.true();
      should(stubs._query.calledOnce).be.true();
      should(stubs._send.calledOnce).be.true();
      should(stubs._end.calledOnce).be.true();
      should(stubs._attach.callCount).be.equal(0);

      let spyCall = stubs._set.getCall(0).args[0];
      should(spyCall).be.an.Object();
      should(spyCall).have.property('Authorization').which.is.String().equal('Token 456');
    });

    it('should set proper headers if accunt key is present', function() {
      request.getConfig().setAccountKey('111');
      request.makeRequest('GET', '/v1.1/', {}, () => {});

      should(stubs._init.calledOnce).be.true();
      should(stubs._type.calledOnce).be.true();
      should(stubs._accept.calledOnce).be.true();
      should(stubs._timeout.calledOnce).be.true();
      should(stubs._set.calledOnce).be.true();
      should(stubs._query.calledOnce).be.true();
      should(stubs._send.calledOnce).be.true();
      should(stubs._end.calledOnce).be.true();
      should(stubs._attach.callCount).be.equal(0);

      let spyCall = stubs._set.getCall(0).args[0];
      should(spyCall).be.an.Object();
      should(spyCall).have.property('X-API-KEY').which.is.String().equal('111');
    });

    it('should set defaults', function() {
      request.makeRequest('GET', '/v1.1/', {}, () => {});

      should(stubs._init.withArgs('GET', 'https://api.syncano.io/v1.1/').calledOnce).be.true();
      should(stubs._type.withArgs('json').calledOnce).be.true();
      should(stubs._accept.withArgs('json').calledOnce).be.true();
      should(stubs._timeout.withArgs(15000).calledOnce).be.true();
      should(stubs._set.calledOnce).be.true();
      should(stubs._query.calledOnce).be.true();
      should(stubs._send.calledOnce).be.true();
      should(stubs._end.calledOnce).be.true();
      should(stubs._attach.callCount).be.equal(0);
    });

  });

  describe('#setRequestHandler()', function() {

    it('should allow to set request handler', function() {
      const handler = 1;
      const request = Request();

      should(request.getRequestHandler()).be.a.Function();
      request.setRequestHandler(handler);
      should(request.getRequestHandler()).be.equal(handler);
    })

  });

  describe('#getRequestHandler()', function() {

    it('should allow to get request handler', function() {
      should(Request().getRequestHandler()).be.a.Function();
    });

  });

  describe('#setRequestHandler() (STATIC)', function() {

    it('should allow to set request handler', function() {
      const handler = 1;
      const request = Request.setRequestHandler(handler);

      should(request.getRequestHandler()).be.equal(handler);
    })

  });

  describe('#getRequestHandler() (STATIC)', function() {

    it('should allow to get request handler', function() {
      should(Request.getRequestHandler()).be.a.Function();
    });

  });

});
