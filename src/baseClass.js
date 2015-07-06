/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var version  = require('../package.json').version;
var request  = require('request');
var _        = require('lodash');
var Promise  = require('bluebird');

var BaseClass = function(options) {

  if (!(this instanceof BaseClass)) {
    return new BaseClass(options);
  }

  var self = this;

  var defaultOptions = {
    qsStringifyOptions: {sep: ';', eq: ':', options: {}, arrayFormat: 'repeat'},
    baseUrl: options.baseUrl,
    headers: {
      'User-Agent': 'syncano/version:' + version,
      'Content-Type': 'application/json',
      'X-API-KEY': options.apiKey
    }
  };

  var defaultRequest = request.defaults(defaultOptions);

  this.filterReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';

    return (function(filter, cb) {

      if (arguments.length <= 1) {
        var args = sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);
      opt.qs = parseFilter(filter);
      opt.url = (url !== '') ? url + '/' : '';
      opt.method = method;

      return apiRequest(opt, cb);
    });

  };

  this.idReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';

    return (function(id, cb) {
      id = checkId(id);

      var opt = {};
      opt.url = (url !== '') ? url + '/' + id + '/' : id + '/';
      opt.method = method;

      return apiRequest(opt, cb);
    });

  };

  this.filterIdReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';

    return (function(id, filter, cb) {
      id = checkId(id);

      if (arguments.length <= 2) {
        var args = sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);

      opt.qs = parseFilter(filter);
      opt.url = (url !== '') ?  url + '/' + id + '/': id + '/';
      opt.method = method;

      return apiRequest(opt, cb);
    });

  };

  this.paramReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';
    var type = (options && options.type) ? options.type : self.type;

    return (function(params, filter, cb) {

      params = checkParams(params, type);

      if (arguments.length <= 2) {
        var args = sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);
      opt.qs = parseFilter(filter);
      opt.json = params;
      opt.url = (url !== '') ? url + '/' : '';
      opt.method = method;

      return apiRequest(opt, cb);

    });

  };

  this.paramIdReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';
    var type = (options && options.type) ? options.type : self.type;

    return (function(id, params, filter, cb) {
      id = checkId(id);

      params = checkParams(params, type, false);

      if (arguments.length <= 3) {
        var args = sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);
      opt.qs = parseFilter(filter);
      opt.json = params;
      opt.url = (url !== '') ? url + '/' + id + '/' : id + '/';
      opt.method = method;

      return apiRequest(opt, cb);

    });

  };

  var apiRequest = function(options, cb) {
    return new Promise(function(resolve, reject) {
      defaultRequest(options.url, options, function(err, res) {
        var localError, restResponse;

        if (err || res.statusCode === 404) {
          localError = err ? new Error(err) : new Error(JSON.stringify(res.body));
          reject(localError);
          return;
        }

        resolve(res.body);

      });
    }).nodeify(cb);
  };

  return this;

};

//CHECK PARAMS NEEDS FIXING :)
var checkParams = function(p) {
  if (typeof p !== 'object') {
    throw new Error('Invalid parameters object.');
  }

  return p;
};

var checkId = function(id) {
  if (typeof id !== 'string' && typeof id !== 'number') {
    throw new Error('Valid ID must be provided');
  }

  return id;
};

var parseFilter = function(options) {
  var parsedOptions = {};

  if (options.fields) {
    if (options.fields.include) {
      parsedOptions.fields = options.fields.include.join();
    }

    if (options.fields.exclude) {
      parsedOptions.excluded_fields = options.fields.exclude.join();
    }

  }

  if (options.filter) {
    parsedOptions.query = options.filter;
  }

  if (options.orderBy) {
    var key = Object.keys(options.orderBy)[0];
    var prefix = (options.orderBy[key].toLowerCase() === 'desc') ? '-' : '';
    parsedOptions.order_by = prefix + key;

  }
  if (options.pageSize) {
    parsedOptions.page_size = options.pageSize;
  }

  return parsedOptions;
};

var sortArgs = function(o, f) {
  var result = {};
  result.cb = (_.isFunction(o)) ? o : null;
  result.filter = (_.isPlainObject(o)) ? o : {};
  return result;
};

module.exports = BaseClass;
