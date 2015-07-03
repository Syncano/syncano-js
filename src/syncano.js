/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var sObj = require('./objects.js');
var _    = require('lodash');

var Syncano = function(options) {

  if (!(this instanceof Syncano)) {
    return new Syncano(options);
  }

  var self = this;

  validateOptions(options, ['apiKey']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  this.apiKey = options.apiKey;
  this.baseUrl = options.baseUrl;
  this.instances = new sObj.baseObj('instances', options);
  this.account = new sObj.Accounts(options);

  this.instance = function(instance) {
    options.instance = instance;
    return new Instance(options);
  };

  return this;

};

var Instance = function(options) {
  if (!(this instanceof Instance)) {
    return new Instance(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);

  opt.baseUrl = opt.baseUrl + '/instances/' + options.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  this.admins = new sObj.baseObj('admins', opt, ['add']);
  this.apiKeys = new sObj.baseObj('api_keys', opt);
  this.classes = new sObj.baseObj('classes', opt);
  this.codeboxes = new sObj.baseObj('codeboxes', opt);
  this.groups = new sObj.baseObj('groups', opt);
  this.schedules = new sObj.baseObj('schedules', opt);
  this.triggers = new sObj.baseObj('triggers', opt);
  this.users = new sObj.baseObj('users', opt);
  this.webhooks = new sObj.baseObj('webhooks', opt);

  this.class = function(id) {
    options.className = id;
    return new Class(options);
  };

  this.codebox = function(id) {
    options.codeboxId = id;
    return new CodeBox(options);
  };

  this.group = function(id) {
    options.groupId = id;
    return new Group(options);
  };

  this.schedule = function(id) {
    options.scheduleId = id;
    return new Schedule(options);
  };

  this.trigger = function(id) {
    options.triggerId = id;
    return new Trigger(options);
  };

  this.user = function(id) {
    options.userId = id;
    return new User(options);
  };

  this.webhook = function(id) {
    options.webhookName = id;
    return new WebHook(options);
  };

};

var User = function(options) {
  if (!(this instanceof User)) {
    return new User(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'userId']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.User(opt);

};

var Group = function(options) {
  if (!(this instanceof Group)) {
    return new Group(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'groupId']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.Group(opt);

};

var Class = function(options) {
  if (!(this instanceof Class)) {
    return new Class(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'className']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance + '/classes/' + opt.className + '/';

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.baseObj('objects', opt);

};

var CodeBox = function(options) {
  if (!(this instanceof CodeBox)) {
    return new CodeBox(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'codeboxId']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.CodeBox(opt);

};

var Schedule = function(options) {
  if (!(this instanceof Schedule)) {
    return new Schedule(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'scheduleId']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.Schedule(opt);

};

var Trigger = function(options) {
  if (!(this instanceof Trigger)) {
    return new Trigger(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'triggereId']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.Trigger(opt);

};

var WebHook = function(options) {
  if (!(this instanceof WebHook)) {
    return new WebHook(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'webhookName']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io/v1';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.WebHook(opt);

};

var validateOptions = function(options, req) {
  _.forEach(req, function(r) {
    if (!options || typeof options !== 'object' || !options[r]) {
      throw new Error('"' + r + '" is missing or invalid.');
    }
  });
};

module.exports = Syncano;
module.exports.Instance = Instance;
module.exports.Class = Class;
module.exports.CodeBox = CodeBox;
module.exports.Group = Group;
module.exports.Schedule = Schedule;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.WebHook = WebHook;
