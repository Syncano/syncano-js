/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var https = require('https');
var url = require('url');
var Querystring = require('querystring');
var FormData = require('form-data');
var helpers = require('../shared/helpers.js');

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

  req._performRequest(cb);
  req._end();
  return;
};

var Request = function Request(opts) {
  var u = url.parse(opts.baseUrl + opts.url);
  this.sendOptions = {
    protocol: u.protocol,
    host: u.host,
    port: u.port,
    path: u.path,
    headers: opts.headers,
    method: opts.method || 'GET',
    withCredentials: false
  };
  return this;
};

Request.prototype._qs = function (qs) {
  this.sendOptions.path += '?' + Querystring.stringify(qs);
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

  this.form = form;
  this.sendOptions.headers = helpers.merge({}, this.sendOptions.headers, form.getHeaders());
};

Request.prototype._jsonData = function (json) {
  this.json = JSON.stringify(json);
};

Request.prototype._performRequest = function (cb) {
  this.request = https.request(this.sendOptions, function (res) {
    var str = '';
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function () {
      res.body = str;
      cb(null, res, res.body);
    });

    res.on('error', function (err) {
      cb(err);
    });
  });
};

Request.prototype._end = function () {

  if (this.json) {
    this.request.write(this.json);
  }

  if (this.form) {
    this.form.pipe(this.request);
  }

  return this.request.end();
};

module.exports = request;