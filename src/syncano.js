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

  sObj.BuildOpts.call(this, options, ['apiKey']);

  this.instances = new sObj.BaseObj('instances', options);
  this.account = new sObj.Accounts(options);

  delete this.opt;
  return this;

};

var Instance = function(options) {
  if (!(this instanceof Instance)) {
    return new Instance(options);
  }

  sObj.BuildOpts.call(this, options, ['apiKey', 'instance']);

  this.opt.baseUrl = this.opt.baseUrl + '/instances/' + options.instance;

  this.admins = new sObj.BaseObj('admins', this.opt, ['add']);
  this.apiKeys = new sObj.BaseObj('api_keys', this.opt);
  this.classes = new sObj.BaseObj('classes', this.opt);
  this.codeboxes = new sObj.BaseObj('codeboxes', this.opt);
  this.groups = new sObj.BaseObj('groups', this.opt);
  this.schedules = new sObj.BaseObj('schedules', this.opt);
  this.triggers = new sObj.BaseObj('triggers', this.opt);
  this.users = new sObj.BaseObj('users', this.opt);
  this.webhooks = new sObj.BaseObj('webhooks', this.opt);

  delete this.opt;

  return this;

};

module.exports = Syncano;
module.exports.Instance = Instance;
module.exports.Class = sObj.Class;
module.exports.CodeBox = sObj.CodeBox;
module.exports.Group = sObj.Group;
module.exports.Schedule = sObj.Schedule;
module.exports.Trigger = sObj.Trigger;
module.exports.User = sObj.User;
module.exports.WebHook = sObj.WebHook;
