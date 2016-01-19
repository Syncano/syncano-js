/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var Objects = require('./shared/objects.js');
var helpers = require('./shared/helpers.js');

var Syncano = function Syncano(opt) {
  if (!(this instanceof Syncano)) {
    return new Syncano(opt);
  }

  if (opt) {
    this.config = {};
    var apiKey = opt.apiKey || opt.api_key;
    var instance = opt.instance;
    var userKey = opt.userKey || opt.user_key;
    var accountKey = opt.accountKey || opt.account_key;
    var debug = opt.debug;

    if (opt.baseUrl) {
      this.config.baseUrl = opt.baseUrl;
    }

    if(opt.monitorConnection) {
      this.config.monitorConnection = opt.monitorConnection || false;
    }

    if (opt.debug) {
      this.config.debug = opt.debug;
    }

  }

  if (accountKey) {
    this.config.accountKey = accountKey;
    return new AccountScope(this.config);
  }


  if (apiKey) {
    this.config.apiKey = apiKey;
    this.config.instance = instance;
    if (userKey) {
      this.config.userKey = userKey;
    }
    return new InstanceScope(this.config);
  }

  if (!accountKey && !apiKey) {
    return new EmptyScope(this.config);
  }
};

Syncano.prototype.constructor = Syncano;

var EmptyScope = function(config) {
  if (config !== undefined) {
    this.config = config;
  }

  Objects.Account.call(this, config);
  return this;
};

EmptyScope.prototype = Object.create(Objects.Account.prototype);
EmptyScope.prototype.constructor = EmptyScope;

var AccountScope = function(config) {
  Objects.Account.call(this, config);
  return this;
};

AccountScope.prototype = Object.create(Objects.Account.prototype);
AccountScope.prototype.constructor = AccountScope;


var InstanceScope = function(config) {
  Objects.Instance.call(this, config);
  return this;
};

InstanceScope.prototype = Object.create(Objects.Instance.prototype);
InstanceScope.prototype.constructor = InstanceScope;


module.exports = Syncano;
