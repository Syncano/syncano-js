/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var helpers  = require('../shared/helpers.js');
var Promise  = require('bluebird');
var EventEmitter = require('events').EventEmitter;
var request = require('./request.js');

var defaultOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

var url = function(config) {

  var urlTmpl = {
    account: '/account/',
    admin: (config.adminId) ? '/instances/<%= instance %>/admins/<%= adminId %>/' : '/instances/<%= instance %>/admins/',
    apikey: (config.apikeyId) ? '/instances/<%= instance %>/api_keys/<%= apikeyId %>/' : '/instances/<%= instance %>/api_keys/',
    channel: (config.channelId) ? '/instances/<%= instance %>/channels/<%= channelId %>/' : '/instances/<%= instance %>/channels/',
    class: (config.className) ? '/instances/<%= instance %>/classes/<%= className %>/' : '/instances/<%= instance %>/classes/',
    codebox: (config.codeboxId) ? '/instances/<%= instance %>/codeboxes/<%= codeboxId %>/' : '/instances/<%= instance %>/codeboxes/',
    dataobject: (config.dataobjectId) ? '/instances/<%= instance %>/classes/<%= className %>/objects/<%= dataobjectId %>/' : '/instances/<%= instance %>/classes/<%= className %>/objects/',
    group: (config.groupId) ? '/instances/<%= instance %>/groups/<%= groupId %>/' : '/instances/<%= instance %>/groups/',
    instance: (config.instance) ? '/instances/<%= instance %>/' : '/instances/',
    invitation: (config.instance) ? '/instances/<%= instance %>/invitations/' : '/account/invitations/',
    schedule: (config.scheduleId) ? '/instances/<%= instance %>/schedules/<%= scheduleId %>/' : '/instances/<%= instance %>/schedules/',
    trigger: (config.triggerId) ? '/instances/<%= instance %>/triggers/<%= triggerId %>/' : '/instances/<%= instance %>/triggers/',
    webhook: (config.webhookId) ? '/instances/<%= instance %>/webhooks/<%= webhookId %>/' : '/instances/<%= instance %>/webhooks/',
    user: (config.userId) ? '/instances/<%= instance %>/users/<%= userId %>/' : '/instances/<%= instance %>/users/'
  };

  var buildUrl = function urlAddOns(config) {
    var tmpl = config.tmpl || urlTmpl[config.type];
    if (tmpl.substring(1) !== 'v') {
      tmpl = '/v1' + tmpl;
    }

    if (config.inviteId) {
      tmpl += '<%= inviteId %>/';
    }

    if (config.id && config.path) {
      tmpl += (config.pathFirst) ? '<%= path %>/<%= id %>/' : '<%= id %>/<%= path %>/';
    } else if (config.id && !config.path) {
      tmpl += '<%= id %>/';
    } else if (config.path) {
      tmpl += '<%= path %>/';
    }

    if (config.type === 'user' && config.json && config.json.backend) {
      tmpl += '<%= json.backend %>/';
    }

    return helpers.template(tmpl, config);
  };

  return buildUrl(config);
};

var watch = function(config) {
  var opt = helpers.merge({}, config);
  delete opt.func;
  var reqId = (opt.channelId) ? false : true;
  return (function(id, filter) {
    if (reqId) {
      opt.id = helpers.checkId(id);
    } else {
      filter = id;
    }
    filter = filter || {};
    opt.qs = helpers.parseFilter(filter);
    var events = new EventEmitter();
    watchRec(opt, apiRequest, events);
    return events;
  });

};

var watchRec = function(config, func, events) {
  var opt = helpers.merge({}, config);
  func(opt).then(function(res) {
    if (res !== undefined) {
      events.emit(res.action, res.payload);
      opt.qs.last_id = res.id;
    }
    watchRec(opt, func, events);
  }).catch(function(err) {
    events.emit('error', err);
    watchRec(opt, func, events);
  });

};


var filterReq = function filterReq(config) {
  var opt = helpers.merge({}, config);
  delete opt.func;
  return (function(filter, cb) {
    if (arguments.length <= 1) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);

    return apiRequest(opt, cb);
  });

};

var idReq = function idReq(config) {

  var opt = helpers.merge({}, config);
  delete opt.func;

  return (function(id, cb) {
    opt.id = helpers.checkId(id);
    return apiRequest(opt, cb);
  });

};

var filterIdReq = function filterIdReq(config) {

  var opt = helpers.merge({}, config);
  delete opt.func;

  return (function(id, filter, cb) {

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

var paramReq = function paramReq(config) {

  var opt = helpers.merge({}, config);
  delete opt.func;

  return (function(params, filter, cb) {
    params = helpers.checkParams(params);

    if (arguments.length <= 2) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);

    if (config.type === 'dataobject') {
      opt.formData = params;
    } else {
      opt.json = params;
    }

    return apiRequest(opt, cb);

  });

};

var paramIdReq = function paramIdReq(config) {
  var opt = helpers.merge({}, config);
  delete opt.func;

  return (function(id, params, filter, cb) {
    opt.id = helpers.checkId(id);

    params = helpers.checkParams(params, false);

    if (arguments.length <= 3) {
      var args = helpers.sortArgs(filter, cb);
      filter = args.filter;
      cb = args.cb;
    }

    opt.qs = helpers.parseFilter(filter);

    if (config.type === 'dataobject') {
      opt.formData = params;
    } else {
      opt.json = params;
    }


    return apiRequest(opt, cb);

  });

};

var apiRequest = function apiRequest(config, cb) {
  var opt = helpers.merge({}, defaultOptions, config, helpers.addAuth(config));
  if (!opt.url) {
    opt.url = url(opt);
  }

  opt.baseUrl = config.baseUrl || 'https://api.syncano.io';

  return new Promise(function(resolve, reject) {
    var response, localError;

    request(opt).then(function(res) {
      switch (res.status) {
        case 204:
          response = res.statusText; // NO CONTENT message
          break;
        case 201:
          response = (typeof res.data !== 'object') ? JSON.parse(res.data) : res.data; // convert to JSON
          break;
        case 200:
          response = (typeof res.data !== 'object') ? JSON.parse(res.data) : res.data; // convert to JSON
          if (response.next) { // if there's a next URL
            var resNext = response.next; // set to next URL so it's not overwritten
            response.next = function(cb) { // NEXT function call
              var nextConfig = helpers.merge({}, config); // create config obj
              nextConfig.url = resNext;
              return apiRequest(nextConfig, cb);
            };
          }
          if (response.prev) { // if there's a prev URL
            var resPrev = response.prev; // set to prev URL so it's not overwritten
            response.prev = function(cb) { // PREV function call
              var prevConfig = helpers.merge({}, config); // create config obj
              prevConfig.url = resPrev;
              return apiRequest(prevConfig, cb);
            };
          } else if (response.prev && response.objects.length < 1) {
            return; // returning nothing (otherwise would be 0 objects)
          }
          break;
      }
      if (opt.debug) {
        response.debug = res;
      }
      resolve(response);
    }).catch(function(res) {
      localError = new Error(JSON.stringify(res.data));
      reject(localError);
    });
  }).nodeify(cb);
};

var core = {
  filterReq: filterReq,
  filterIdReq: filterIdReq,
  idReq: idReq,
  paramReq: paramReq,
  paramIdReq: paramIdReq,
  watch: watch
};

module.exports = core;
