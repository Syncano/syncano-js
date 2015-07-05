/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var BaseClass  = require('./baseClass.js');
var _    = require('lodash');

var Syncano = function(options) {

  if (!(this instanceof Syncano)) {
    return new Syncano(options);
  }

  BuildOpts.call(this, options, ['apiKey']);

  this.instances = new BaseObj('instances', options);
  this.account = new BaseObj('accounts', options);

  delete this.opt;
  return this;

};

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
  this.users = new BaseObj('users', this.opt);
  this.webhooks = new BaseObj('webhooks', this.opt);

  delete this.opt;

  return this;

};

var Accounts = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/v1/account/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  // this.login = this.postRequest();
  // this.register = this.postRequest();
  // this.resendEmail = this.postRequest();
  // this.details = this.getAllRequest();
  // this.update = this.patchRequest();
  // this.resetAccountKey = this.postRequest();
  // this.changePwd = this.postRequest();
  // this.setPwd = this.postRequest();
  // this.resetPwd = this.postRequest();
  // this.confirmResetPwd = this.postRequest();
  // this.activate = this.postRequest();

  return objectCleanup(this);

};

Accounts.prototype = Object.create(BaseClass.prototype);

// var Billing = function(options) {
//   var defaults = {
//   };
//
//   var opt = _.merge({}, options, defaults);
//
//   BaseClass.call(this, opt);
//
// };
//
// Billing.prototype = Object.create(BaseClass.prototype);
// Billing.prototype.type = 'billing';

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

  var output = _.merge({}, this, new BaseObj('objects', this.opt));

  return objectCleanup(output);

};

var CodeBox = function(options) {
  if (!(this instanceof CodeBox)) {
    return new CodeBox(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'codeboxId']);
  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + this.opt.instance + '/codeboxes/' + this.opt.codeboxId + '/';

  BaseClass.call(this, this.opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});
  this.run = this.paramReq('POST', {url: 'run'});

  return objectCleanup(this);

};

CodeBox.prototype = Object.create(BaseClass.prototype);

var Group = function(options) {
  if (!(this instanceof Group)) {
    return new Group(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'groupId']);
  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + this.opt.instance + '/groups/' + this.opt.groupId + '/';

  BaseClass.call(this, this.opt);

  this.listUsers = this.filterReq('GET', {url: 'users'});
  this.addUser = this.paramReq('POST', {url: 'users', type: 'groupUser'});
  this.removeUser = this.idReq('DELETE', {url: 'users'});
  this.userDetails = this.filterIdReq('GET', {url: 'users'});

  return objectCleanup(this);

};

Group.prototype = Object.create(BaseClass.prototype);

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
  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + this.opt.instance + '/schedules/' + this.opt.scheduleId + '/';

  BaseClass.call(this, this.opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});

  return objectCleanup(this);
};

Schedule.prototype = Object.create(BaseClass.prototype);

// var Solutions = function(options) {
//   var defaults = {
//   };
//
//   var opt = _.merge({}, options, defaults);
//
//   BaseClass.call(this, opt);
//
// };
//
// Solutions.prototype = Object.create(BaseClass.prototype);
// Solutions.prototype.type = 'solutions';

var Trigger = function(options) {
  if (!(this instanceof Trigger)) {
    return new Trigger(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'triggerId']);
  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + this.opt.instance + '/triggers/' + this.opt.triggerId + '/';

  BaseClass.call(this, this.opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});

  return objectCleanup(this);

};

Trigger.prototype = Object.create(BaseClass.prototype);

var User = function(options) {
  if (!(this instanceof User)) {
    return new User(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'userId']);
  this.opt.instanceUrl = this.opt.baseUrl + '/instances/' + this.opt.instance;
  this.opt.baseUrl = this.opt.instanceUrl + '/user/';

  BaseClass.call(this, this.opt);
  this.login = this.paramReq('POST', 'auth');

  this.opt.baseUrl = this.opt.instanceUrl + '/users/' + options.userId + '/';

  BaseClass.call(this, this.opt);
  this.listGroups = this.filterReq('GET', {url: 'groups'});
  this.addGroup = this.paramReq('POST', {url: 'groups', type: 'userGroup'});
  this.removeGroup = this.idReq('DELETE', {url: 'groups'});
  this.groupDetails = this.filterIdReq('GET', {url: 'groups'});
  this.resetKey = this.filterReq('POST', {url: 'reset_key'});

  return objectCleanup(this);

};

User.prototype = Object.create(BaseClass.prototype);

var WebHook = function(options) {
  if (!(this instanceof WebHook)) {
    return new WebHook(options);
  }

  BuildOpts.call(this, options, ['apiKey', 'instance', 'webhookName']);
  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + this.opt.instance + '/webhooks/' + this.opt.webhookName + '/';

  BaseClass.call(this, this.opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});
  this.run = this.paramReq('POST', {url: 'run'});

  return objectCleanup(this);

};

WebHook.prototype = Object.create(BaseClass.prototype);

var BaseObj = function(url, options, funcArr) {
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
    traces: this.filterReq('GET', {url: 'traces'}),
    trace: this.filterIdReq('GET', {url: 'traces'}),
    run: this.paramReq('POST', {url: 'run'})
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

module.exports = Syncano;
module.exports.Accounts = Accounts;
//module.exports.Billing = Billing;
module.exports.Channel = Channel;
module.exports.Class = Class;
module.exports.CodeBox = CodeBox;
module.exports.Group = Group;
module.exports.Instance = Instance;
module.exports.InvitesRec = InvitesRec;
module.exports.InvitesSent = InvitesSent;
module.exports.Schedule = Schedule;
//module.exports.Solutions = Solutions;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.WebHook = WebHook;
