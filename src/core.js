/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var version  = require('../package.json').version;
var helpers  = require('./helpers.js');
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
        var args = helpers.sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);
      opt.qs = helpers.parseFilter(filter);
      opt.url = (url !== '') ? url + '/' : '';
      opt.method = method;

      return apiRequest(opt, cb);
    });

  };

  this.idReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';

    return (function(id, cb) {
      id = helpers.helpers.checkId(id);

      var opt = {};
      opt.url = (url !== '') ? url + '/' + id + '/' : id + '/';
      opt.method = method;

      return apiRequest(opt, cb);
    });

  };

  this.filterIdReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';

    return (function(id, filter, cb) {
      id = helpers.checkId(id);

      if (arguments.length <= 2) {
        var args = helpers.sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);

      opt.qs = helpers.parseFilter(filter);
      opt.url = (url !== '') ?  url + '/' + id + '/': id + '/';
      opt.method = method;

      return apiRequest(opt, cb);
    });

  };

  this.paramReq = function(method, options) {

    var url = (options && options.url) ? options.url : '';
    var type = (options && options.type) ? options.type : self.type;

    return (function(params, filter, cb) {

      params = helpers.checkParams(params, type);

      if (arguments.length <= 2) {
        var args = helpers.sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);
      opt.qs = helpers.parseFilter(filter);
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
      id = helpers.checkId(id);

      params = helpers.checkParams(params, type, false);

      if (arguments.length <= 3) {
        var args = helpers.sortArgs(filter, cb);
        filter = args.filter;
        cb = args.cb;
      }

      var opt = _.merge({}, filter);
      opt.qs = helpers.parseFilter(filter);
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

        resolve(JSON.parse(res.body));

      });
    }).nodeify(cb);
  };

  return this;

};

var BuildOpts = function(options, reqs) {
  if (!reqs) {
    reqs = [];
  }

  var self = this;

  helpers.validateOptions(options, reqs);

  if (options && options.baseUrl) {
    this.baseUrl = options.baseUrl;
  } else if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  } else {
    options = {baseUrl: 'https://api.syncano.io/v1'};
  }

  this.opt = _.merge({}, options);

  return this;
};

var BaseObj = function(url, options, funcArr) {
  if (!(this instanceof BaseObj)) {
    return new BaseObj(url, options, funcArr);
  }

  var defaults = {
    baseUrl: options.baseUrl + '/' + url + '/'
  };

  var self = this;

  funcArr = funcArr || ['list', 'detail', 'add', 'update', 'delete'];
  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  var functions = {
    list: self.filterReq('GET'),
    detail: self.idReq('GET'),
    add: self.paramReq('POST'),
    update: self.paramIdReq('PATCH'),
    delete: self.idReq('DELETE'),
    runtimes: self.filterReq('GET', {url: 'runtimes'}),
    resetKey: self.paramIdReq('POST', {url: 'reset_key'}),
    traces: self.filterReq('GET', {url: 'traces'}),
    trace: self.filterIdReq('GET', {url: 'traces'}),
    run: self.paramReq('POST', {url: 'run'}),
    listGroups: self.filterReq('GET', {url: 'groups'}),
    addGroup: self.paramReq('POST', {url: 'groups', type: 'userGroup'}),
    removeGroup: self.idReq('DELETE', {url: 'groups'}),
    groupDetails: self.filterIdReq('GET', {url: 'groups'}),
    listUsers: self.filterReq('GET', {url: 'users'}),
    addUser: self.paramReq('POST', {url: 'users', type: 'groupUser'}),
    removeUser: self.idReq('DELETE', {url: 'users'}),
    userDetails: self.filterIdReq('GET', {url: 'users'})
  };

  _.forEach(funcArr, function(func) {
    self[func] = functions[func];
  });

  return helpers.objectCleanup(this);

};

BaseObj.prototype = Object.create(BaseClass.prototype);

module.exports.BaseClass = BaseClass;
module.exports.BuildOpts = BuildOpts;
module.exports.BaseObj = BaseObj;
