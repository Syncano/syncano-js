/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var BaseClass  = require('./core.js').BaseClass;
var BuildOpts  = require('./core.js').BuildOpts;
var BaseObj  = require('./core.js').BaseObj;
var _    = require('lodash');

var Instance = function(options) {
  if (!(this instanceof Instance)) {
    return new Instance(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance']);

  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + options.instance;

  this.admins = new BaseObj('admins', this.opt, ['list', 'detail', 'update', 'delete']);
  this.apiKeys = new BaseObj('api_keys', this.opt, ['list', 'detail', 'add', 'resetKey', 'delete']);
  this.channels = new BaseObj('channels', this.opt);
  this.classes = new BaseObj('classes', this.opt);
  this.codeboxes = new BaseObj('codeboxes', this.opt, ['list', 'detail', 'add', 'update', 'delete', 'runtimes']);
  this.groups = new BaseObj('groups', this.opt);
  this.schedules = new BaseObj('schedules', this.opt);
  this.triggers = new BaseObj('triggers', this.opt);
  this.users = new BaseObj('users', this.opt, ['list', 'detail', 'add', 'update', 'delete', 'resetKey']);
  this.webhooks = new BaseObj('webhooks', this.opt);

  delete this.opt;

  return this;

};

var Class = function(options) {
  if (!(this instanceof Class)) {
    return new Class(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'className']);
  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + this.opt.instance + '/classes/' + this.opt.className + '/';

  return new BaseObj('objects', this.opt);

};

var CodeBox = function(options) {
  if (!(this instanceof CodeBox)) {
    return new CodeBox(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'codeboxId']);
  var url  = 'instances/' + this.opt.instance + '/codeboxes/' + this.opt.codeboxId;

  return new BaseObj(url, this.opt, ['traces', 'trace', 'run']);
};

var Group = function(options) {
  if (!(this instanceof Group)) {
    return new Group(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'groupId']);
  var url  = 'instances/' + this.opt.instance + '/groups/' + this.opt.groupId;

  return new BaseObj(url, this.opt, ['listUsers', 'addUser', 'removeUser', 'userDetails']);
};

var Schedule = function(options) {
  if (!(this instanceof Schedule)) {
    return new Schedule(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'scheduleId']);
  var url  = 'instances/' + this.opt.instance + '/schedules/' + this.opt.scheduleId;

  return new BaseObj(url, this.opt, ['traces', 'trace']);
};

var Trigger = function(options) {
  if (!(this instanceof Trigger)) {
    return new Trigger(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'triggerId']);
  var url  = 'instances/' + this.opt.instance + '/triggers/' + this.opt.triggerId;

  return new BaseObj(url, this.opt, ['traces', 'trace']);

};

var User = function(options) {
  if (!(this instanceof User)) {
    return new User(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'userId']);
  var url  = 'instances/' + this.opt.instance + '/users/' + this.opt.userId;

  return new BaseObj(url, this.opt, ['listGroups', 'addGroup', 'removeGroup', 'groupDetails']);
};

var WebHook = function(options) {
  if (!(this instanceof WebHook)) {
    return new WebHook(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'webhookName']);
  var url  = 'instances/' + this.opt.instance + '/webhooks/' + this.opt.webhookName;

  return new BaseObj(url, this.opt, ['traces', 'trace', 'run']);
};


module.exports.Class = Class;
module.exports.CodeBox = CodeBox;
module.exports.Group = Group;
module.exports.Instance = Instance;
module.exports.Schedule = Schedule;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.WebHook = WebHook;
