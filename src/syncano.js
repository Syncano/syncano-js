/*
 * @license
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

var Objects = require('./objects.js');

function Syncano(opt) {
 if (!(this instanceof Syncano)) {
   return new Syncano(opt);
 }

 if (opt) {
   var apiKey = opt.apiKey || opt.api_key;
   var instance = opt.instance;
   var userKey = opt.userKey || opt.user_key;
   var accountKey = opt.accountKey || opt.account_key;
 }

 if (accountKey) {
   AccountScope.call(this, accountKey);
 }

 if (apiKey) {
   UserScope.call(this, instance, apiKey, userKey);
 }

 if (!accountKey && !apiKey) {
   EmptyScope.call(this);
 }

 return Object.freeze(this);

};

Syncano.prototype.constructor = Syncano;

var EmptyScope = function(opt) {
  var self = this;

  Objects.Account.call(this, opt);

  return this;
};

var AccountScope = function(accountKey) {
  var self = this;

  this.config = {};
  this.config.accountKey = accountKey;

  Objects.Account.call(this, self.config);

  this.invitations = new Objects.Invitation(self.config);

  this.instances = new Objects.Instance(self.config);

  this.Instance = Objects.classBuilder(Objects.Instance, self.config);

  return this;
};

var UserScope = function(instance, apiKey, userKey) {
  var self = this;

  this.config = {};
  this.config.apiKey = apiKey;
  this.config.instance = instance;

  if (userKey) {
    this.config.userKey = userKey;
  }

  if (!userKey) {
    this.login = function() { return 'new user scoped syncano object' };
  }

  Objects.Instance.call(this, self.config);

  return this;

};

module.exports = Syncano;
