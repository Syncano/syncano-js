/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var BaseClass  = require('./baseClass.js');
var _        = require('lodash');

var Accounts = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/v1/account/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  //this.login = this.postRequest();
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
Accounts.prototype.type = 'account';

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

var Channels = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Channels.prototype = Object.create(BaseClass.prototype);
Channels.prototype.type = 'channels';

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
InvitesRec.prototype.type = 'invitesRec';

var InvitesSent = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

InvitesSent.prototype = Object.create(BaseClass.prototype);
InvitesSent.prototype.type = 'invitesSent';


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

var ExpObj = function(url, options, includes, excludes) {

  BaseObj.call(this, url, options, excludes);

  // TODO
  // this.runtimes = this.filterReq('GET', {url: 'runtimes'});
  // this.reset = this.paramIdReq('POST', {url: 'reset_key'});
  // this.send = this.paramIdReq('POST', {url: 'reset_key'});
  // this.resend = this.paramIdReq('POST', {url: 'reset_key'});
  // this.accept = this.paramIdReq('POST', {url: 'reset_key'});

  return objectCleanup(this, excludes);

};

var BaseObj = function(url, options, excludes) {
  var defaults = {
    baseUrl: options.baseUrl + '/' + url + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');


  return objectCleanup(this, excludes);

};

BaseObj.prototype = Object.create(BaseClass.prototype);

// this.runtimes = this.filterReq('GET', {url: 'runtimes'});
// TODO
// this.reset = this.paramIdReq('POST', {url: 'reset_key'});

var objectCleanup = function(obj, excludes) {
  if (excludes) {
    excludes.map(function(exclude) {
      delete obj[exclude];
    });
  }

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


module.exports.BaseObj = BaseObj;
module.exports.BuildOpts = BuildOpts;

module.exports.Accounts = Accounts;
//module.exports.Billing = Billing;
module.exports.Channels = Channels;
module.exports.Class = Class;
module.exports.CodeBox = CodeBox;
module.exports.Group = Group;
module.exports.InvitesRec = InvitesRec;
module.exports.InvitesSent = InvitesSent;
module.exports.Schedule = Schedule;
//module.exports.Solutions = Solutions;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.WebHook = WebHook;
