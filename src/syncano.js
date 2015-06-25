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

  if (!options || typeof options !== 'object' || !options.apiKey) {
    throw new Error('"Options.apiKey" is missing or invalid.');
  }

  if (options && !options.baseUrl) {
    options.baseUrl = 'https://api.syncano.io';
  }

  this.apiKey = options.apiKey;
  this.baseUrl = options.baseUrl;
  this.instances = new sObj.Instances(options);


};

Syncano.prototype.Instance = function() {

};

Syncano.prototype.Class = function() {

};

module.exports = Syncano;
