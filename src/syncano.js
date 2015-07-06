/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var BaseClass  = require('./baseClass.js');
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

var Channel = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Channel.prototype = Object.create(BaseClass.prototype);

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

var InvitesRec = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

InvitesRec.prototype = Object.create(BaseClass.prototype);

var InvitesSent = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

InvitesSent.prototype = Object.create(BaseClass.prototype);


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

  // this.send = this.paramIdReq('POST', {url: 'reset_key'});
  // this.resend = this.paramIdReq('POST', {url: 'reset_key'});
  // this.accept = this.paramIdReq('POST', {url: 'reset_key'});

  _.forEach(funcArr, function(func) {
    self[func] = functions[func];
  });

  return objectCleanup(this);

};

BaseObj.prototype = Object.create(BaseClass.prototype);

var objectCleanup = function(obj) {
  if (obj.opt) {
    delete obj.opt;
  }

  delete obj.filterReq;
  delete obj.idReq;
  delete obj.filterIdReq;
  delete obj.paramReq;
  delete obj.paramIdReq;

  return obj;
};

var BuildOpts  = function(options, reqs) {

  if (!reqs) {
    reqs = [];
  }

  var self = this;

  validateOptions(options, reqs);

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

var validateOptions = function(options, req) {
  _.forEach(req, function(r) {
    if (!options || typeof options !== 'object' || !options[r]) {
      throw new Error('"' + r + '" is missing or invalid.');
    }
  });
};

module.exports.Channel = Channel;
module.exports.Class = Class;
module.exports.CodeBox = CodeBox;
module.exports.Group = Group;
module.exports.Instance = Instance;
module.exports.InvitesRec = InvitesRec;
module.exports.InvitesSent = InvitesSent;
module.exports.Schedule = Schedule;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.WebHook = WebHook;
