/*
 * @license
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

var Objects = require('./objects.js');

var Syncano = function Syncano(opt) {
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
    return new AccountScope(accountKey);
  }

  if (apiKey) {
    return new InstanceScope(instance, apiKey, userKey);
  }

  if (!accountKey && !apiKey) {
    return new EmptyScope(this);
  }

};

Syncano.prototype.constructor = Syncano;


var EmptyScope = function(opt) {
  Objects.Account.call(this, opt);
  return this;
};

EmptyScope.prototype = Object.create(Objects.Account.prototype);
EmptyScope.prototype.constructor = EmptyScope;

var AccountScope = function(accountKey) {

  this.config = {};
  this.config.accountKey = accountKey;

  Objects.Account.call(this, this.config);
  this.instance = new Objects.Instance(this.config);
  this.invitation = new Objects.Invitation(this.config);

  this.Instance = Objects.classBuilder(Objects.Instance, this.config);

  return this;
};

AccountScope.prototype = Object.create(Objects.Account.prototype);
AccountScope.prototype.constructor = AccountScope;


var InstanceScope = function(instance, apiKey, userKey) {

  this.config = {};
  this.config.apiKey = apiKey;
  this.config.instance = instance;

  if (userKey) {
    this.config.userKey = userKey;
  }

  Objects.Instance.call(this, this.config);

  return this;

};

InstanceScope.prototype = Object.create(Objects.Instance.prototype);
InstanceScope.prototype.constructor = InstanceScope;


module.exports = Syncano;
