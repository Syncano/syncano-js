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

  var opt = _.merge({}, options);

  opt.baseUrl = opt.baseUrl + '/v1/instances/' + options.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;
  this.users = new sObj.Users(opt);
  this.groups = new sObj.Groups(opt);

  this.user = function(id) {
    options.id = id;
    return new User(options);
  };

  this.group = function(id) {
    options.id = id;
    return new Group(options);
  };

};

var User = function(options) {
  if (!(this instanceof User)) {
    return new User(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'id']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/v1/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.User(opt);

};

var Group = function(options) {
  if (!(this instanceof User)) {
    return new Group(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance', 'id']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  var opt = _.merge({}, options);
  opt.baseUrl = opt.baseUrl + '/v1/instances/' + opt.instance;

  this.apiKey = opt.apiKey;
  this.baseUrl = opt.baseUrl;

  return new sObj.Group(opt);

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
