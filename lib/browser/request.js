/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var url = require('url');
var Querystring = require('querystring');
var FormData = require('./formdata.js');
var helpers = require('../shared/helpers.js');
var axios = require('axios');

var request = function request(opts, cb) {
  var req = new Request(opts);
  if (opts.qs) {
    req._qs(opts.qs);
  }

  if (opts.json) {
    req._jsonData(opts.json);
  }

  if (opts.formData) {
    req._formData(opts.formData);
  }

  return req._performRequest();
};

var Request = function Request(opts) {
  var u = url.parse(opts.baseUrl + opts.url);
  this.sendOptions = {
    url: u.href,
    headers: opts.headers,
    method: opts.method || 'GET',
    withCredentials: false
  };
  return this;
};

Request.prototype._qs = function (qs) {
  this.sendOptions.url += '?' + Querystring.stringify(qs);
};

Request.prototype._formData = function (formData) {
  var form = new FormData();

  Object.keys(formData).forEach(function (key) {
    if (formData[key].filename) {
      form.append(key, formData[key].data, formData[key].filename);
    } else {
      form.append(key, formData[key]);
    }
  });

  this.sendOptions.data = form.fake === true ? form.toString() : form;
  this.sendOptions.headers = helpers.merge(this.sendOptions.headers, {
    'Content-Type': 'multipart/form-data; boundary=' + form.boundary
  });
};

Request.prototype._jsonData = function (json) {
  this.sendOptions.data = JSON.stringify(json);
};

Request.prototype._performRequest = function () {
  return axios(this.sendOptions);
};

module.exports = request;