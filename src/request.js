import stampit from 'stampit';
import Promise from 'bluebird';
import superagent from 'superagent';
import _ from 'lodash';
import {ConfigMixin, Logger} from './utils';
import {RequestError} from './errors';
import SyncanoFile from './file';

const IS_NODE = typeof module !== 'undefined' && module.exports && typeof __webpack_require__ === 'undefined';

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

    * @param {String} path path part of URL e.g: /v1.1/instances/
    * @returns {String}

    */
    buildUrl(path) {
      const config = this.getConfig();

      if (!_.isString(path)) {
        return Promise.reject(new Error('"path" needs to be a string.'));
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
    * @param {String} path e.g /v1.1/instances/
    * @param {Object} requestOptions All options required to build request
    * @param {String} [requestOptions.type = 'json'] request type e.g form, json, png
    * @param {String} [requestOptions.accept = 'json'] request accept e.g form, json, png
    * @param {Number} [requestOptions.timeout = 15000] request timeout
    * @param {Object} [requestOptions.headers = {}] request headers
    * @param {Object} [requestOptions.query = {}] request query
    * @param {Object} [requestOptions.payload = {}] request payload
    * @returns {Promise}

    */
    makeRequest(methodName, path, requestOptions) {
      const config = this.getConfig();
      let method = (methodName || '').toUpperCase();
      let options = _.defaults({}, requestOptions, {
        type: 'text/plain',
        accept: 'json',
        timeout: 15000,
        headers: {},
        query: {},
        payload: {},
        responseAttr: 'body'
      });

      if (_.isEmpty(methodName) || !_.includes(this._request.allowedMethods, method)) {
        return Promise.reject(new Error(`Invalid request method: "${methodName}".`));
      }

      if (_.isEmpty(path)) {
        return Promise.reject(new Error('"path" is required.'));
      }

      // Grab files
      const files = _.reduce(options.payload, (result, value, key) => {
        if (value instanceof SyncanoFile) {
          result[key] = value;
        }
        return result;
      }, {});

      if (!_.isUndefined(config)) {
        if (!_.isEmpty(config.getAccountKey())) {
          if(_.isEmpty(files)) {
            options.payload = _.assign({}, options.payload, { '_api_key': config.getAccountKey() });
          } else {
            options.headers['X-API-KEY'] = config.getAccountKey();
          }
        }

        // Yes, we will replace account key
        if (!_.isEmpty(config.getApiKey())) {
          if(_.isEmpty(files)) {
            options.payload = _.assign({}, options.payload, { '_api_key': config.getApiKey() });
          } else {
            options.headers['X-API-KEY'] = config.getApiKey();
          }
        }

        if (!_.isEmpty(config.getUserKey())) {
          if(_.isEmpty(files)) {
            options.payload = _.assign({}, options.payload, { '_user_key': config.getUserKey() });
          } else {
            options.headers['X-USER-KEY'] = config.getUserKey();
          }
        }
      }

      // Pass method with payload
      if(_.isEmpty(files)) {
        options.payload = _.assign({}, options.payload, { '_method': method });
      }

      let handler = this.getRequestHandler();
      let request = handler((_.isEmpty(files) ? 'POST' : method), this.buildUrl(path))
        .timeout(options.timeout)
        .query(options.query);

        // If there's a social token, we need the header
        if (!_.isEmpty(config.getSocialToken())) {
          request = request.set('Authorization', `Token ${config.getSocialToken()}`)
        }

      if (_.isEmpty(files)) {
        request = request
          .set('Content-Type', 'text/plain')
          .send(JSON.stringify(options.payload));
      } else if (IS_NODE === false && typeof FormData !== 'undefined' && typeof File !== 'undefined') {
        options.type = null;
        options.payload = _.reduce(options.payload, (formData, value, key) => {
          formData.append(key, (files[key]) ? value.content: value);
          return formData;
        }, new FormData());

        request = request
          .type('form')
          .set(options.headers)
          .send(options.payload);

      } else if (IS_NODE === true) {
        request = _.reduce(options.payload, (result, value, key) => {
          if(!_.isFunction(value)) {
            return (files[key]) ? result.attach(key, value.content): result.field(key, value);
          }
          return result;
        }, request.type('form'));
        request = request.set(options.headers);
      }

      request.on('progress', (e) => {
        if(_.isFunction(this.getConfig().progressCallback)) {
          this.getConfig().progressCallback(e);
        }
      });

      return Promise.promisify(request.end, {context: request})()
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(new RequestError({
              response: response,
              status: response.status,
              message: 'Bad request'
            }));
          }
          return response[options.responseAttr];
        })
        .catch((err) => {
          if (err.status && err.response) {

            if(err.status === 429) {
              const delay = _.toNumber(err.response.headers['retry-after']) * 1000;
              return Promise.delay(delay)
                .then(() => this.makeRequest(methodName, path, requestOptions));
            }

            this.log(`\n${method} ${path}\n${JSON.stringify(options, null, 2)}\n`);
            this.log(`Response ${err.status}:`, err.errors);

            if (err.name !== 'RequestError') {
              return Promise.reject(new RequestError(err, err.response));
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
