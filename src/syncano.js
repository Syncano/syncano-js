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

  var self = this;

  validateOptions(options, ['apiKey']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  this.apiKey = options.apiKey;
  this.baseUrl = options.baseUrl;
  this.instances = new sObj.Instances(options);
  this.account = new sObj.Accounts(options);

  this.instance = function(instance) {
    options.instance = instance;
    return new Instance(options);
  };

  return this;

};

var Instance = function(options) {
  if (!(this instanceof Instance)) {
    return new Instance(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  options.baseUrl = options.baseUrl + '/v1/instances/' + options.instance;

  this.users = new sObj.Users(options);
  this.groups = new sObj.Groups(options);

  // this.user = function(id, userKey) {
  //   options.id = id;
  //   options.userKey = userKey;
  //   return new User(options);
  // };

};

var User = function(options) {
  if (!(this instanceof User)) {
    return new User(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'id', 'userKey']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  options.baseUrl = options.baseUrl + '/v1/instances/' + options.instance;

  this.user = new sObj.User(options);

};

var Class = function(options) {
  if (!(this instanceof Class)) {
    return new Class(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'class']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  //create new class or look up current instance.

  //set up all internal classes.
};

var validateOptions = function(options, req) {
  _.forEach(req, function(r) {
    if (!options || typeof options !== 'object' || !options[r]) {
      throw new Error('"' + r + '" is missing or invalid.');
    }
  });
};

module.exports = Syncano;
module.exports.Instance = Instance;
module.exports.Class = Class;
