/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var BaseClass  = require('./baseClass.js');
var _        = require('lodash');

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

var Accounts = function(options) {
  var defaults = {
    baseUrl: options.baseUrl + '/v1/account/'
  };

  var opt = _.merge({}, options, defaults);

  BaseClass.call(this, opt);

};

Accounts.prototype = Object.create(BaseClass.prototype);
Accounts.prototype.type = 'account';

var objectCleanup = function(obj) {
  delete obj.getAllRequest;
  delete obj.getOneRequest;
  delete obj.postRequest;
  delete obj.patchRequest;
  delete obj.deleteRequest;

  return obj;
};

module.exports.Instances = Instances;
module.exports.Accounts = Accounts;
