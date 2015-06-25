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

  var defaultRequest = request.defaults({
    qsStringifyOptions: {sep: ';', eq: ':', options: {}, arrayFormat: 'repeat'},
    baseUrl: options.baseUrl,
    headers: {
      'User-Agent': 'syncano/version:' + version,
      'Content-Type': 'application/json',
      'X-API-KEY': options.apiKey
    }
  });

  this.getAllRequest = function(filter, cb) {

    if (arguments.length <= 1) {
      var args = sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    var opt = _.merge({}, filter);
    opt.qs = parseFilter(filter);
    opt.url = '';

    return apiRequest(opt, cb);
  };

  this.getOneRequest = function(id, filter, cb) {
    id = checkId(id);

    if (arguments.length <= 2) {
      var args = sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    var opt = _.merge({}, filter);

    opt.qs = parseFilter(filter);
    opt.url = id + '/';

    return apiRequest(opt, cb);
  };

  this.postRequest = function(params, filter, cb) {
    params = checkParams(params, self.type);

    if (arguments.length <= 2) {
      var args = sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    var opt = _.merge({}, filter);
    opt.qs = parseFilter(filter);
    opt.json = params;
    opt.url = '';
    opt.method = 'POST';

    return apiRequest(opt, cb);

  };

  this.patchRequest = function(id, params, filter, cb) {
    id = checkId(id);
    params = checkParams(params, self.type);

    if (arguments.length <= 3) {
      var args = sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    var opt = _.merge({}, filter);
    opt.qs = parseFilter(filter);
    opt.json = params;
    opt.url = id + '/';
    opt.method = 'PATCH';

    return apiRequest(opt, cb);
  };

  this.deleteRequest = function(id, cb) {
    id = checkId(id);

    var opt = {};
    opt.url = id + '/';
    opt.method = 'DELETE';

    return apiRequest(opt, cb);
  };

  var apiRequest = function(options, cb) {
    return new Promise(function(resolve, reject) {
      defaultRequest(options.url, options, function(err, res) {
        var localError, restResponse;

        if (err || res.statusCode === 404) {
          localError = err ? new Error(err) : new Error(res.body);
          reject(localError);
          return;
        }

        resolve(res);

      });
    }).nodeify(cb);
  };


  return this;

};

var checkUrl = function(url) {
  if (typeof url !== 'string') {
    throw new Error ('Please provide valid url.');
  }

  return;
};

var checkParams = function(p, t) {

  var params, reqs, test;

  if (typeof p !== 'object') {
    throw new Error('Invalid parameters object.');
  }

  params = Object.keys(p);

  if (t) {
    reqs = addReqs[t];
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
    test = reqs.some(function(val) {
      return (params.indexOf(val) !== -1);
    });

    if (!test) {
      throw new Error('Inalid parameters passed and would result in no change.');
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
