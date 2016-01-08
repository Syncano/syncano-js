import stampit from 'stampit';
import superagent from 'superagent';
import _ from 'lodash';
import {ConfigMixin, Logger} from './utils';


const Request = stampit().compose(ConfigMixin, Logger)
  .refs({
    _request: {
      handler: superagent,
      allowedMethods: [
        'GET',
        'POST',
        'DELETE',
        'HEAD',
        'PUT',
        'PATCH'
      ]
    }
  })
  .methods({
    setRequestHandler(handler) {
      this._request.handler = handler;
      return this;
    },

    getRequestHandler() {
      return this._request.handler;
    },

    buildUrl(path) {
      const config = this.getConfig();

      if (!_.isString(path)) {
        throw new Error('"path" needs to be a string.');
      }

      if (_.startsWith(path, config.getBaseUrl())) {
        return path;
      }

      return `${config.getBaseUrl()}${path}`;
    },

    makeRequest(methodName, path, requestOptions, callback) {
      const config = this.getConfig();
      let method = (methodName || '').toUpperCase();
      let options = _.defaults({}, requestOptions, {
        type: 'json',
        accept: 'json',
        timeout: 15000,
        headers: {},
        query: {},
        payload: {},
        attachments: {}
      });

      if (!_.isFunction(callback)) {
        throw new Error('"callback" needs to be a function.');
      }

      if (_.isEmpty(methodName) || !_.includes(this._request.allowedMethods, method)) {
        return callback(new Error(`Invalid request method: "${methodName}".`));
      }

      if (_.isEmpty(path)) {
        return callback(new Error('"path" is required.'));
      }

      if (!_.isEmpty(options.attachments)) {
        options.type = 'form';
      }

      // wtf ?
      if (!_.isUndefined(config)) {
        if (!_.isEmpty(config.getAccountKey()) && !_.isEmpty(config.getUserKey())) {
          options.headers['X-API-KEY'] = config.getAccountKey();
          options.headers['X-USER-KEY'] = config.getUserKey();
        } else if (_.isEmpty(options.headers['Authorization'])) {
          const token = config.getSocialToken() || config.getAccountKey();

          if (!_.isUndefined(token) && !_.isEmpty(token)) {
            options.headers['Authorization'] = `Token ${token}`;
          }
        }
      }

      let handler = this.getRequestHandler();
      let request = handler(method, this.buildUrl(path))
        .type(options.type)
        .accept(options.accept)
        .timeout(options.timeout)
        .set(options.headers)
        .query(options.query)
        .send(options.payload);

      _.forEach(options.attachments, (value, key) => {
        request = request.attach(key, value);
      });

      request.end(_.wrap(callback, (_callback, err, res) => {
        this.log(`makeRequest\n${method} ${path}\n${JSON.stringify(options, null, 2)}\n---`);
        return _callback(err, res);
      }));

      return request;
    }

  }).static({
    setRequestHandler(handler) {
      let _request = this.fixed.refs._request || {};
      _request.handler = handler;
      return this.refs({_request});
    },

    getRequestHandler() {
      return this.fixed.refs._request.handler;
    }
  });

export default Request;