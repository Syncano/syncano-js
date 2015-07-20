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

var functions = {
  list: function list() {return 'something';},
  add: function add() {return 'something';},
  detail: function detail() {return 'something';},
  update: function update() {return 'something';},
  delete: function _delete() {return 'something';},
  runtimes: function runtimes() {return 'something';},
  resetKey: function resetKey() {return 'something';},
  traces: function traces() {return 'something';},
  trace: function trace() {return 'something';},
  run: function run() {return 'something';},
  poll: function poll() {return 'something';},
  history: function history() {return 'something';},
  publish: function publish() {return 'something';},
  sendEmail: function sendEmail() {return 'something';},
  accept: function accept() {return 'something';},
  register: function register() {return 'something';},
  resendEmail: function resendEmail() {return 'something';},
  changePw: function changePw() {return 'something';},
  setPw: function setPw() {return 'something';},
  resetPw: function resetPw() {return 'something';},
  confirmResetPw: function confirmResetPw() {return 'something';},
  activate: function activate() {return 'something';},
  login: function login() {return 'something';}
};


var SingleObj = function(config, funcArr) {

  var self = this;

  self.config = config;

  funcArr = funcArr || ['detail', 'update', 'delete'];

  _.forEach(funcArr, function(func) {
    self[func] = functions[func];
  });

  return this;

};

var PluralObj = function(config, funcArr) {

  var self = this;

  funcArr = funcArr || ['list', 'detail', 'add', 'update', 'delete'];

  _.forEach(funcArr, function(func) {
    self[func] = functions[func];
  });

  return this;


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

  options = _.merge({}, defaultOptions, options);

  return new Promise(function(resolve, reject) {

    request(options.url, options, function(err, res) {

      var localError;

      if (err || res.statusCode === 404) {
        localError = err ? new Error(err) : new Error(JSON.stringify(res.body));
        reject(localError);
        return;
      }

      var response = (typeof res.body !== 'object') ? JSON.parse(res.body) : res.body;
      resolve(response);

    });
  }).nodeify(cb);
};

module.exports.SingleObj  = SingleObj;
module.exports.PluralObj  = PluralObj;
