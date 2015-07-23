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


// TODO Complete buildURL functionality
// TODO resolve the "user/users" url issues
// TODO resolve account vs instance invites
var url = function(config) {

  var urlTmpl = {
    account: 'account/',
    admin: 'instances/<%= instance %>/admins/',
    apikey: 'instances/<%= instance %>/api_keys/',
    channel: 'instances/<%= instance %>/channels/',
    class: 'instances/<%= instance %>/classes/',
    codebox: 'instances/<%= instance %>/codeboxes/',
    dataobject: 'instances/<%= instance %>/classes/<%= className %>/objects/',
    group: 'instances/<%= instance %>/groups/',
    instance: 'instances/',
    invitation: 'edge case',
    schedule: 'instances/<%= instance %>/schedules/',
    trigger: 'instances/<%= instance %>/triggers/',
    webhook: 'instances/<%= instance %>/webhooks/',
    user: 'edge case'
  };

  var buildUrl = function urlAddOns(config) {
    var tmpl;
    tmpl = urlTmpl[config.type];

    if (config.type === 'instance' && config.instance) {
      tmpl += '<%= instance %>/';
    }
    if (config.type === 'class' && config.className) {
      tmpl += '<%= className %>/';
    }
    if (config.id) {
      tmpl += '<%= id %>/';
    }
    if (config.path) {
      tmpl += config.path + '/';
    }

    var url = _.template(tmpl);

    return url(config);
  };

  return buildUrl(config);
};

var filterReq = function(config) {
  var opt = _.merge({}, config);
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

var idReq = function(config) {

  var opt = _.merge({}, config);
  delete opt.func;

  return (function(id, cb) {

    opt.type = this.type;
    opt.id = helpers.checkId(id);
    return apiRequest(opt, cb);
  });

};

var filterIdReq = function(config) {

  var opt = _.merge({}, config);
  delete opt.func;

  return (function(id, filter, cb) {

    opt.type = this.type;
    opt.id = helpers.checkId(id);

    if (arguments.length <= 2) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);

    return apiRequest(opt, cb);
  });

};

var paramReq = function(config) {

  var opt = _.merge({}, config);
  delete opt.func;

  return (function(params, filter, cb) {
    opt.type = this.type;
    params = helpers.checkParams(params);

    if (arguments.length <= 2) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);
    opt.json = params;

    return apiRequest(opt, cb);

  });

};

var paramIdReq = function(config) {
  var opt = _.merge({}, config);
  delete opt.func;

  return (function(id, params, filter, cb) {

    opt.type = this.type;
    opt.id = helpers.checkId(id);

    params = helpers.checkParams(params, false);

    if (arguments.length <= 3) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);
    opt.json = params;


    return apiRequest(opt, cb);

  });

};

var apiRequest = function apiRequest(config, cb) {
  var opt = _.merge({}, defaultOptions, config, helpers.addAuth(config));
  opt.url = url(opt);
  // TODO get correct base url
  opt.baseUrl = 'http://localhost:3000/v1/';

  return new Promise(function(resolve, reject) {
    request(opt.url, opt, function(err, res) {
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

// TODO Finish function calls and solve for single/plural issues
// TODO solve for double id requirements - e.g. codeboxes/:id:/traces/:id:
// TODO complete user/group and group/user functions

var functions = {
  list: {
    method: 'GET',
    func: {plural: filterReq}
  },
  add: {
    method: 'POST',
    func: {plural: paramReq}
  },
  detail: {
    method: 'GET',
    func: {single: filterReq, plural: filterIdReq}
  },
  update: {
    method: 'PATCH',
    func: {single: paramReq, plural: paramIdReq}
  },
  delete: {
    method: 'DELETE',
    func: {single: filterReq, plural: idReq}
  },
  runtimes: {
    method: 'GET',
    path: 'runtimes',
    func: {single: filterReq, plural: filterReq}
  },
  resetKey: {
    method: 'POST',
    path: 'reset_key',
    func: {single: paramReq, plural: paramIdReq}
  },
  traces: {
    method: 'GET',
    path: 'traces',
    func: {single: filterReq, plural: filterIdReq}
  },
  trace: {
    method: 'GET',
    path: 'traces',
    func: {single: filterIdReq, plural: filterIdReq}
  },
  run: {
    method: 'POST',
    path: 'run',
    func: {single: paramReq, plural: paramIdReq}
  },
  poll: {
    method: 'GET',
    path: 'poll',
    func: {single: filterReq, plural: filterIdReq}
  },
  history: {
    method: 'GET',
    path: 'history',
    func: {single: filterReq, plural: filterIdReq}
  },
  publish: {
    method: 'POST',
    path: 'publish',
    func: {single: filterReq, plural: filterIdReq}
  },
  sendEmail: {
    method: 'POST',
    func: {plural: paramReq}
  },
  accept: {
    method: 'POST',
    path: 'accept',
    func: {plural: paramReq}
  },
  register: {
    method: 'POST',
    path: 'register',
    func: {plural: paramReq}
  },
  resendEmail: {
    method: 'POST',
    path: 'resend_email',
    func: {plural: paramReq}
  },
  changePw: {
    method: 'POST',
    path: 'password',
    func: {single: paramReq}
  },
  setPw: {
    method: 'POST',
    path: 'password/set',
    func: {single: paramReq}
  },
  resetPw: {
    method: 'POST',
    path: 'password/reset',
    func: {plural: paramReq}
  },
  confirmResetPw: {
    method: 'POST',
    path: 'password/reset/confirm',
    func: {plural: paramReq}
  },
  activate: {
    method: 'POST',
    path: 'activate',
    func: {plural: paramReq}
  },
  login: {
    method: 'POST',
    path: 'auth',
    func: {plural: paramReq}
  }
};


//TODO Write Login functions

var SingleObj = function(config, funcArr) {

  var self = this;

  var opt = _.merge({}, config);

  self.config = config;

  funcArr = funcArr || ['detail', 'update', 'delete'];

  _.forEach(funcArr, function(f) {
    var options = _.merge({}, functions[f], opt);
    self[f] = functions[f].func.single(options);
  });

  return self;

};

var PluralObj = function(config, funcArr) {

  var self = this;
  var opt = _.merge({}, config);

  funcArr = funcArr || ['list', 'detail', 'add', 'update', 'delete'];

  _.forEach(funcArr, function(f) {
    var options = _.merge({}, functions[f], opt);
    self[f] = functions[f].func.plural(options);
  });

  return self;


};

module.exports.SingleObj  = SingleObj;
module.exports.PluralObj  = PluralObj;
