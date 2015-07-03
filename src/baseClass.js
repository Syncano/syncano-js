/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var version  = require('../package.json').version;
var request  = require('request');
var _        = require('lodash');
var Promise  = require('bluebird');
var addReqs  = require('./addReqs.json');

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
    //console.log(defaultOptions);
    //console.log(options);
    return new Promise(function(resolve, reject) {
      defaultRequest(options.url, options, function(err, res) {
        //console.log(res);
        var localError, restResponse;

        if (err || res.statusCode === 404) {
          localError = err ? new Error(err) : new Error(JSON.stringify(res.body));
          reject(localError);
          return;
        }

        resolve(res);

      });
    }).nodeify(cb);
  };

  return this;

};

var checkParams = function(p, t, r) {

  var params, reqs, test;

  r = (r !== 'undefined') ? r : true;

  if (typeof p !== 'object') {
    throw new Error('Invalid parameters object.');
  }

  params = Object.keys(p);

  if (t) {

    if (r) {
      reqs = addReqs.required[t];
      if (!reqs) {
        throw new Error('Unknown requirements for this object.');
      } else {

        test = reqs.every(function(val) {
          return (params.indexOf(val) !== -1);
        });

        if (!test) {
          throw new Error('Missing required parameters.');
        }
      }
    } else {
      reqs = addReqs.optional[t];
      test = reqs.some(function(val) {
        return (params.indexOf(val) !== -1);
      });

      if (!test) {
        throw new Error('Inalid parameters passed and would result in no change.');
      }
    }
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
