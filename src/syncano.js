/*
 * @license
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */
//TODO Tighten all tests to ensure proper objects are created

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
    var debug = opt.debug;
  }

  if (accountKey) {
    return new AccountScope(accountKey, debug);
  }

  if (apiKey) {
    return new InstanceScope(instance, apiKey, userKey, debug);
  }

  if (!accountKey && !apiKey) {
    return new EmptyScope(this, debug);
  }

};

Syncano.prototype.constructor = Syncano;


var EmptyScope = function(opt, debug) {
  if (debug) {
    this.config = {};
    this.config.debug = debug;
  }
  Objects.Account.call(this, opt);
  return this;
};

EmptyScope.prototype = Object.create(Objects.Account.prototype);
EmptyScope.prototype.constructor = EmptyScope;

var AccountScope = function(accountKey, debug) {

  this.config = {};
  this.config.accountKey = accountKey;

  if (debug) {
    this.config.debug = debug;
  }

  Objects.Account.call(this, this.config);

  return this;
};

AccountScope.prototype = Object.create(Objects.Account.prototype);
AccountScope.prototype.constructor = AccountScope;


var InstanceScope = function(instance, apiKey, userKey, debug) {

  this.config = {};
  this.config.apiKey = apiKey;
  this.config.instance = instance;

  if (userKey) {
    this.config.userKey = userKey;
  }

  if (debug) {
    this.config.debug = debug;
  }

  Objects.Instance.call(this, this.config);

  return this;

};

InstanceScope.prototype = Object.create(Objects.Instance.prototype);
InstanceScope.prototype.constructor = InstanceScope;


module.exports = Syncano;
