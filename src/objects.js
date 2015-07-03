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

var Admins = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Admins.prototype = Object.create(BaseClass.prototype);
Admins.prototype.type = 'admin';

var ApiKeys = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

ApiKeys.prototype = Object.create(BaseClass.prototype);
ApiKeys.prototype.type = 'apiKey';

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

var Classes = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/classes/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

Classes.prototype = Object.create(BaseClass.prototype);
Classes.prototype.type = 'class';

var CodeBoxes = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/codeboxes/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.runtimes = this.filterReq('GET', {url: 'runtimes'});
  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

CodeBoxes.prototype = Object.create(BaseClass.prototype);
CodeBoxes.prototype.type = 'codeBox';

var CodeBox = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/codeboxes/' + options.codeboxId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'trace'});
  this.trace = this.filterIdReq('GET', {url: 'trace'});
  this.run = this.paramReq('POST', {url: 'run'});

  return objectCleanup(this);

};

CodeBoxes.prototype = Object.create(BaseClass.prototype);
CodeBoxes.prototype.type = 'codeBox';

var DataObjects = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/objects/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

DataObjects.prototype = Object.create(BaseClass.prototype);
DataObjects.prototype.type = 'dataObjects';

var Groups = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/groups/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.details = this.filterIdReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

Groups.prototype = Object.create(BaseClass.prototype);
Groups.prototype.type = 'group';

var Group = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/groups/' + options.groupId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.listUsers = this.filterReq('GET', {url: 'users'});
  this.addUser = this.paramReq('POST', {url: 'users', type: 'groupUser'});
  this.removeUser = this.idReq('DELETE', {url: 'users'});
  this.userDetails = this.paramIdReq('POST', {url: 'users'});

  return objectCleanup(this);

};

Group.prototype = Object.create(BaseClass.prototype);
Group.prototype.type = 'group';

var Instances = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/v1/instances/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

Instances.prototype = Object.create(BaseClass.prototype);
Instances.prototype.type = 'instance';

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

var Schedules = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/schedules/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

Schedules.prototype = Object.create(BaseClass.prototype);
Schedules.prototype.type = 'schedule';

var Schedule = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/schedules/' + options.scheduleId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'trace'});
  this.trace = this.filterIdReq('GET', {url: 'trace'});

  return objectCleanup(this);
};

Schedule.prototype = Object.create(BaseClass.prototype);
Schedule.prototype.type = 'schedule';

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

var Triggers = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/triggers/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

Triggers.prototype = Object.create(BaseClass.prototype);
Triggers.prototype.type = 'triggers';

var Trigger = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/triggers/' + options.triggerId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'trace'});
  this.trace = this.filterIdReq('GET', {url: 'trace'});

  return objectCleanup(this);

};

Trigger.prototype = Object.create(BaseClass.prototype);
Trigger.prototype.type = 'triggers';

var User = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/user/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.login = this.paramReq('POST', 'auth');

  opt.baseUrl = options.baseUrl + '/users/' + options.userId + '/';
  BaseClass.call(this, opt);

  this.listGroups = this.filterReq('GET', {url: 'groups'});
  this.addGroup = this.paramReq('POST', {url: 'groups', type: 'userGroup'});
  this.removeGroup = this.idReq('DELETE', {url: 'groups'});
  this.groupDetails = this.paramIdReq('POST', {url: 'groups'});
  this.resetKey = this.filterReq('POST', {url: 'reset_key'});

  return objectCleanup(this);

};

User.prototype = Object.create(BaseClass.prototype);
User.prototype.type = 'user';

var Users = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/users/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.details = this.filterIdReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);

};

Users.prototype = Object.create(BaseClass.prototype);
Users.prototype.type = 'user';

var WebHooks = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/webhooks/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.filterReq('GET');
  this.detail = this.idReq('GET');
  this.add = this.paramReq('POST');
  this.update = this.paramIdReq('PATCH');
  this.delete = this.idReq('DELETE');

  return objectCleanup(this);
};

WebHooks.prototype = Object.create(BaseClass.prototype);
WebHooks.prototype.type = 'webHooks';

var WebHook = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/webhooks/' + options.webhookName + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'trace'});
  this.trace = this.filterIdReq('GET', {url: 'trace'});

  return objectCleanup(this);

};

WebHook.prototype = Object.create(BaseClass.prototype);
WebHook.prototype.type = 'webHooks';

var objectCleanup = function(obj) {
  delete obj.filterReq;
  delete obj.idReq;
  delete obj.filterIdReq;
  delete obj.paramReq;
  delete obj.paramIdReq;

  return obj;
};


module.exports.Accounts = Accounts;
module.exports.Admins = Admins;
module.exports.ApiKeys = ApiKeys;
//module.exports.Billing = Billing;
module.exports.Channels = Channels;
module.exports.Classes = Classes;
module.exports.CodeBoxes = CodeBoxes;
module.exports.CodeBox = CodeBox;
module.exports.DataObjects = DataObjects;
module.exports.Groups = Groups;
module.exports.Group = Group;
module.exports.Instances = Instances;
module.exports.InvitesRec = InvitesRec;
module.exports.InvitesSent = InvitesSent;
module.exports.Schedules = Schedules;
module.exports.Schedule = Schedule;
//module.exports.Solutions = Solutions;
module.exports.Triggers = Triggers;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.Users = Users;
module.exports.WebHooks = WebHooks;
module.exports.WebHook = WebHook;
