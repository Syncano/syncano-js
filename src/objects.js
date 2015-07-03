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

var CodeBox = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/codeboxes/' + options.codeboxId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});
  this.run = this.paramReq('POST', {url: 'run'});

  return objectCleanup(this);

};

CodeBox.prototype = Object.create(BaseClass.prototype);
CodeBox.prototype.type = 'codeBox';

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
  var defaults = {
    baseUrl: options.baseUrl + '/schedules/' + options.scheduleId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});

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

var Trigger = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/triggers/' + options.triggerId + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});

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


var WebHook = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/webhooks/' + options.webhookName + '/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.traces = this.filterReq('GET', {url: 'traces'});
  this.trace = this.filterIdReq('GET', {url: 'traces'});
  this.run = this.paramReq('POST', {url: 'run'});

  return objectCleanup(this);

};

WebHook.prototype = Object.create(BaseClass.prototype);
WebHook.prototype.type = 'webHooks';


var baseObj = function(url, options, excludes) {
  var defaults = {
    baseUrl: options.baseUrl + '/' + options.url + '/'
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

baseObj.prototype = Object.create(BaseClass.prototype);

// this.runtimes = this.filterReq('GET', {url: 'runtimes'});
// TODO
//this.reset = this.paramIdReq('POST', {url: 'reset_key'});

var objectCleanup = function(obj, excludes) {
  if (excludes) {
    excludes.map(function(exclude){
      delete obj[exclude];
    });
  }
  delete obj.filterReq;
  delete obj.idReq;
  delete obj.filterIdReq;
  delete obj.paramReq;
  delete obj.paramIdReq;

  return obj;
};

module.exports.baseObj = baseObj;
module.exports.Accounts = Accounts;
//module.exports.Billing = Billing;
module.exports.Channels = Channels;
//module.exports.Classes = Classes;
module.exports.CodeBox = CodeBox;
module.exports.Group = Group;
module.exports.InvitesRec = InvitesRec;
module.exports.InvitesSent = InvitesSent;
module.exports.Schedule = Schedule;
//module.exports.Solutions = Solutions;
module.exports.Trigger = Trigger;
module.exports.User = User;
module.exports.WebHook = WebHook;
