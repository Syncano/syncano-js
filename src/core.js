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

var defaultOptions = {
  qsStringifyOptions: {sep: ';', eq: ':', options: {}, arrayFormat: 'repeat'},
  withCredentials: false,
  headers: {
    'User-Agent': 'syncano/version:' + version,
    'Content-Type': 'application/json'
  }
};

var testReq = function(options) {
  return (function (id, cb) {
    options.type = this.type;
    options.id = id;
    return apiRequest(options);
  });
};

var filterReq = function(options) {

  var opt = _.merge({}, options);

  delete opt.func;

  return (function(filter, cb) {

    opt.type = this.type;

    if (arguments.length <= 1) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);

    return apiRequest(opt, cb);
  });

};

var idReq = function(method, options) {

  var url = (options && options.url) ? options.url : '';

  return (function(id, cb) {
    id = helpers.checkId(id);

    var opt = _.merge({}, options);
    opt.url = (url !== '') ? url + '/' + id + '/' : id + '/';
    opt.method = method;

    return apiRequest(opt, cb);
  });

};

var apiRequest = function(options, cb) {

  //options = _.merge({}, defaultOptions, options);
  return options;
  // return new Promise(function(resolve, reject) {
  //
  //   request(options.url, options, function(err, res) {
  //
  //     var localError;
  //
  //     if (err || res.statusCode === 404) {
  //       localError = err ? new Error(err) : new Error(JSON.stringify(res.body));
  //       reject(localError);
  //       return;
  //     }
  //
  //     var response = (typeof res.body !== 'object') ? JSON.parse(res.body) : res.body;
  //     resolve(response);
  //
  //   });
  // }).nodeify(cb);
};

var functions = {
  list: {func: filterReq, method: 'GET', path: 'list'},
  add: {func: filterReq, method: 'POST', path: 'add'},
  detail: {func: filterReq, method: 'GET', path: 'detail'},
  update: {func: filterReq, method: 'PATCH', path: 'update'},
  delete: {func: filterReq, method: 'DELETE', path: 'delete'},
  runtimes: {func: testReq, method: 'GET', path: 'something'},
  resetKey: {func: testReq, method: 'GET', path: 'something'},
  traces: {func: testReq, method: 'GET', path: 'something'},
  trace: {func: testReq, method: 'GET', path: 'something'},
  run: {func: testReq, method: 'GET', path: 'something'},
  poll: {func: testReq, method: 'GET', path: 'something'},
  history: {func: testReq, method: 'GET', path: 'something'},
  publish: {func: testReq, method: 'GET', path: 'something'},
  sendEmail: {func: testReq, method: 'GET', path: 'something'},
  accept: {func: testReq, method: 'GET', path: 'something'},
  register: {func: testReq, method: 'GET', path: 'something'},
  resendEmail: {func: testReq, method: 'GET', path: 'something'},
  changePw: {func: testReq, method: 'GET', path: 'something'},
  setPw: {func: testReq, method: 'GET', path: 'something'},
  resetPw: {func: testReq, method: 'GET', path: 'something'},
  confirmResetPw: {func: testReq, method: 'GET', path: 'something'},
  activate: {func: testReq, method: 'GET', path: 'something'},
  login: {func: testReq, method: 'GET', path: 'something'}
};

var SingleObj = function(config, funcArr) {

  var self = this;

  self.config = config;

  funcArr = funcArr || ['detail', 'update', 'delete'];

  _.forEach(funcArr, function(f) {
    self[f] = functions[f].func(config);
  });

  return this;

};

var PluralObj = function(config, funcArr) {

  var self = this;

  funcArr = funcArr || ['list', 'detail', 'add', 'update', 'delete'];

  _.forEach(funcArr, function(f) {
    var options = _.merge(functions[f], config);
    self[f] = functions[f].func(options);
  });

  return this;


};

module.exports.SingleObj  = SingleObj;
module.exports.PluralObj  = PluralObj;
