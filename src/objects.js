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
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Classes.prototype = Object.create(BaseClass.prototype);
Classes.prototype.type = 'class';

var CodeBoxes = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

CodeBoxes.prototype = Object.create(BaseClass.prototype);
CodeBoxes.prototype.type = 'codeBox';

var DataObjects = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

DataObjects.prototype = Object.create(BaseClass.prototype);
DataObjects.prototype.type = 'dataObjects';

var Groups = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Groups.prototype = Object.create(BaseClass.prototype);
Groups.prototype.type = 'group';

var Instances = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/v1/instances/'
  };

  var opt = _.merge({}, options, defaults);
  BaseClass.call(this, opt);

  this.list = this.getAllRequest;
  this.detail = this.getOneRequest;
  this.add = this.postRequest;
  this.update = this.patchRequest;
  this.delete = this.deleteRequest;

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
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Schedules.prototype = Object.create(BaseClass.prototype);
Schedules.prototype.type = 'schedule';

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
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Triggers.prototype = Object.create(BaseClass.prototype);
Triggers.prototype.type = 'triggers';

var User = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

User.prototype = Object.create(BaseClass.prototype);
User.prototype.type = 'user';

var Users = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Users.prototype = Object.create(BaseClass.prototype);
Users.prototype.type = 'user';

var WebHooks = function(options) {
  var defaults = {
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

WebHooks.prototype = Object.create(BaseClass.prototype);
WebHooks.prototype.type = 'webHooks';

var objectCleanup = function(obj) {
  delete obj.getAllRequest;
  delete obj.getOneRequest;
  delete obj.postRequest;
  delete obj.patchRequest;
  delete obj.deleteRequest;

  return obj;
};


module.exports.Accounts = Accounts;
module.exports.Admins = Admins;
module.exports.ApiKeys = ApiKeys;
//module.exports.Billing = Billing;
module.exports.Channels = Channels;
module.exports.Classes = Classes;
module.exports.CodeBoxes = CodeBoxes;
module.exports.DataObjects = DataObjects;
module.exports.Groups = Groups;
module.exports.Instances = Instances;
module.exports.Accounts = InvitesRec;
module.exports.InvitesRec = InvitesSent;
module.exports.Schedules = Schedules;
//module.exports.Solutions = Solutions;
module.exports.Triggers = Triggers;
module.exports.User = User;
module.exports.Users = Users;
module.exports.WebHooks = WebHooks;
