/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var helpers  = require('./helpers.js');
var _        = require('lodash');
var core     = require('./core.js');

var methods = {
  list: function list(config) {
      var opts = {
        method: 'GET',
        func: {plural: core.filterReq}
      };

      if (config.groupId && config.type === "user") {
        opts.tmpl = '/instances/<%= instance %>/groups/<%= groupId %>/users/';
      }

      if (config.userId && config.type === "group") {
        opts.tmpl = '/instances/<%= instance %>/users/<%= userId %>/groups/';
      }

      return opts;
  },
  add: function add(config) {
      var opts = {
        method: 'POST',
        func: {plural: core.paramReq}
      };

      if (config.groupId && config.type === "user") {
        opts.tmpl = '/instances/<%= instance %>/groups/<%= groupId %>/users/';
      }

      if (config.userId && config.type === "group") {
        opts.tmpl = '/instances/<%= instance %>/users/<%= userId %>/groups/';
      }

      return opts;
  },
  detail: function detail(config) {
      var opts = {
        method: 'GET',
        func: {single: core.filterReq, plural: core.filterIdReq}
      };

      if (config.userKey && config.type === "user") {
        opts.func.plural = core.filterReq;
        opts.tmpl = '/instances/<%= instance %>/user/';
      }

      if (config.groupId && config.type === "user") {
        opts.tmpl = '/instances/<%= instance %>/groups/<%= groupId %>/users/';
      }

      if (config.userId && config.type === "group") {
        opts.tmpl = '/instances/<%= instance %>/users/<%= userId %>/groups/';
      }

      return opts;
  },
  update: function update(config) {
      var opts = {
        method: 'PATCH',
        func: {single: core.paramReq, plural: core.paramIdReq}
      };

      if (config.userKey && config.type === "user") {
        opts.func.plural = core.filterReq;
        opts.tmpl = '/instances/<%= instance %>/user/';
      }

      return opts;
  },
  delete: function _delete(config) {
      var opts = {
        method: 'DELETE',
        func: {single: core.filterReq, plural: core.idReq}
      };

      if (config.groupId && config.type === "user") {
        opts.tmpl = '/instances/<%= instance %>/groups/<%= groupId %>/users/';
      }

      if (config.userId && config.type === "group") {
        opts.tmpl = '/instances/<%= instance %>/users/<%= userId %>/groups/';
      }

      return opts;
  },
  runtimes: function runtimes(config) {
      var opts = {
        method: 'GET',
        path: 'runtimes',
        func: {single: core.filterReq, plural: core.filterReq}
      };

      opts.tmpl = '/instances/<%= instance %>/codeboxes/';

      return opts;
  },
  resetKey: function resetKey(config) {
      var opts = {
        method: 'POST',
        path: 'reset_key',
        func: {single: core.filterReq, plural: core.filterIdReq}
      };
      return opts;
  },
  traces: function traces(config) {
      var opts = {
        method: 'GET',
        path: 'traces',
        func: {single: core.filterReq, plural: core.filterIdReq}
      };
      return opts;
  },
  trace: function trace(config) {
      var opts = {
        method: 'GET',
        pathFirst: true,
        path: 'traces',
        func: {single: core.filterIdReq, plural: core.filterIdReq}
      };
      return opts;
  },
  run: function run(config) {
      var opts = {
        method: 'POST',
        path: 'run',
        func: {single: core.paramReq, plural: core.paramIdReq}
      };
      return opts;
  },
  poll: function poll(config) {
      var opts = {
        method: 'GET',
        path: 'poll',
        func: {single: core.filterReq, plural: core.filterIdReq}
      };
      return opts;
  },
  history: function history(config) {
      var opts = {
        method: 'GET',
        path: 'history',
        func: {single: core.filterReq, plural: core.filterIdReq}
      };
      return opts;
  },
  publish: function publish(config) {
      var opts = {
        method: 'POST',
        path: 'publish',
        func: {single: core.paramReq, plural: core.paramIdReq}
      };
      return opts;
  },
  sendEmail: function sendEmail(config) {
      var opts = {
        method: 'POST',
        func: {plural: core.paramReq}
      };
      return opts;
  },
  accept: function accept(config) {
      var opts = {
        method: 'POST',
        path: 'accept',
        func: {plural: core.paramReq}
      };
      return opts;
  },
  register: function register(config) {
      var opts = {
        method: 'POST',
        path: 'register',
        func: {plural: core.paramReq}
      };
      return opts;
  },
  resendEmail: function resendEmail(config) {
      var opts = {
        method: 'POST',
        path: 'resend_email',
        func: {plural: core.paramReq}
      };
      if (config.type === 'invitation') {
        opts.path = 'resend';
      }
      return opts;
  },
  changePw: function changePw(config) {
      var opts = {
        method: 'POST',
        path: 'password',
        func: {single: core.paramReq}
      };
      return opts;
  },
  setPw: function setPw(config) {
      var opts = {
        method: 'POST',
        path: 'password/set',
        func: {single: core.paramReq}
      };
      return opts;
  },
  resetPw: function resetPw(config) {
      var opts = {
        method: 'POST',
        path: 'password/reset',
        func: {plural: core.paramReq}
      };
      return opts;
  },
  confirmResetPw: function confirmResetPw(config) {
      var opts = {
        method: 'POST',
        path: 'password/reset/confirm',
        func: {plural: core.paramReq}
      };
      return opts;
  },
  activate: function activate(config) {
      var opts = {
        method: 'POST',
        path: 'activate',
        func: {plural: core.paramReq}
      };
      return opts;
  },
  login: function login(config) {
      var opts = {
        method: 'POST',
        path: 'auth',
        func: {plural: core.paramReq}
      };

      if (config.apiKey && config.type === "user") {
        opts.tmpl = '/instances/<%= instance %>/user/';
      }

      return opts;
  }
};


var SingleObj = function(config, funcArr) {
  var self = this;
  var opt = _.merge({}, config);

  opt.type = this.type;

  self.config = config;
  funcArr = funcArr || ['detail', 'update', 'delete'];

  _.forEach(funcArr, function(f) {
    var method = methods[f].call(null, opt);
    var options = _.merge({}, method, opt);
    self[f] = method.func.single(options);
  });

  return self;
};

var PluralObj = function(config, funcArr) {
  var self = this;
  var opt = _.merge({}, config);

  opt.type = this.type;

  funcArr = funcArr || ['list', 'detail', 'add', 'update', 'delete'];

  _.forEach(funcArr, function(f) {
    var method = methods[f].call(null, opt);
    var options = _.merge({}, method, opt);
    self[f] = method.func.plural(options);
  });

  return self;
};


module.exports.SingleObj  = SingleObj;
module.exports.PluralObj  = PluralObj;
