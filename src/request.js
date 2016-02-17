import stampit from 'stampit';
import Promise from 'bluebird';
import superagent from 'superagent';
import _ from 'lodash';
import {ConfigMixin, Logger} from './utils';
import {RequestError} from './errors';

/**
 * Base request object **not** meant to be used directly more like mixin in other {@link https://github.com/stampit-org/stampit|stamps}.

 * @constructor
 * @type {Request}

 * @property {Object} _request
 * @property {Function} [_request.handler = superagent]
 * @property {Array} [_request.allowedMethods = ['GET', 'POST', 'DELETE', 'HEAD', 'PUT', 'PATCH']]

 * @example {@lang javascript}
 * var MyStamp = stampit().compose(Request);
 */
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

   /**
    * Sets request handler, used for mocking.
    * @memberOf Request
    * @instance
    * @param {Function} handler
    * @returns {Request}
    */
    setRequestHandler(handler) {
      this._request.handler = handler;
      return this;
    },

    /**
    * Gets request handler.
    * @memberOf Request
    * @instance
    * @returns {Function}
    */
    getRequestHandler() {
      return this._request.handler;
    },

    /**
    * Builds full URL based on path.

    * @memberOf Request
    * @instance

    * @param {String} path path part of URL e.g: /v1/instances/
    * @returns {String}

    */
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

    /**
    * Wrapper around {@link http://visionmedia.github.io/superagent/|superagent} which validates and calls requests.

    * @memberOf Request
    * @instance

    * @param {String} methodName e.g GET, POST
    * @param {String} path e.g /v1/instances/
    * @param {Object} requestOptions All options required to build request
    * @param {String} [requestOptions.type = 'json'] request type e.g form, json, png
    * @param {String} [requestOptions.accept = 'json'] request accept e.g form, json, png
    * @param {Number} [requestOptions.timeout = 15000] request timeout
    * @param {Object} [requestOptions.headers = {}] request headers
    * @param {Object} [requestOptions.query = {}] request query
    * @param {Object} [requestOptions.payload = {}] request payload
    * @param {Object} [requestOptions.attachments = {}] request attachments
    * @returns {Promise}

    */
    makeRequest(methodName, path, requestOptions) {
      const config = this.getConfig();
      let method = (methodName || '').toUpperCase();
      let options = _.defaults({}, requestOptions, {
        type: 'json',
        accept: 'json',
        timeout: 15000,
        headers: {},
        query: {},
        payload: {},
        attachments: {},
        responseAttr: 'body'
      });

      if (_.isEmpty(methodName) || !_.includes(this._request.allowedMethods, method)) {
        return Promise.reject(new Error(`Invalid request method: "${methodName}".`));
      }

      if (_.isEmpty(path)) {
        return Promise.reject(new Error('"path" is required.'));
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

      return Promise.promisify(request.end, {context: request})()
        .then((response) => {
          if (!response.ok) {
            throw new RequestError({
              response: response,
              status: response.status,
              message: 'Bad request'
            });
          }
          return response[options.responseAttr];
        })
        .catch((err) => {
          if (err.status && err.response) {
            this.log(`\n${method} ${path}\n${JSON.stringify(options, null, 2)}\n`);
            this.log(`Response ${err.status}:`, err.errors);

            if (err.name !== 'RequestError') {
              err = new RequestError(err, err.response);
            }
          }
          throw err;
        });
    }

  }).static({

    /**
    * Sets request handler and returns new {@link https://github.com/stampit-org/stampit|stampit} object, used for mocking.
    * @memberOf Request
    * @static
    * @returns {stampit}
    */
    setRequestHandler(handler) {
      let _request = this.fixed.refs._request || {};
      _request.handler = handler;
      return this.refs({_request});
    },

    /**
    * Sets request handler from {@link https://github.com/stampit-org/stampit|stampit} definition.
    * @memberOf Request
    * @static
    * @returns {Function}
    */
    getRequestHandler() {
      return this.fixed.refs._request.handler;
    }
  });

export default Request;
