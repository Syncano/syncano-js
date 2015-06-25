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

};

var Instance = function(options) {
  if (!(this instanceof Syncano)) {
    return new Syncano(options);
  }

  var self = this;

  validateOptions(options, ['apiKey', 'instance']);

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  //create new instance or look up current instance.

  //set up all internal classes here.

};


Syncano.prototype.Class = function(options) {
  if (!(this instanceof Syncano)) {
    return new Syncano(options);
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
      throw new Error('"Options.' + r + '" is missing or invalid.');
    }
  });
};

module.exports = Syncano;
