/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

'use strict';

var checkParams = function checkParams(p) {
  if (typeof p !== 'object') {
    throw new Error('Invalid parameters object.');
  }
  return p;
};

var checkId = function checkId(id) {
  if (typeof id !== 'string' && typeof id !== 'number') {
    throw new Error('Valid ID must be provided.');
  }
  return id;
};

var parseFilter = function parseFilter(options) {
  var parsedOptions = {};

  if (options.fields) {
    if (options.fields.include) {
      parsedOptions.fields = options.fields.include.join();
    }

    if (options.fields.exclude) {
      parsedOptions.excluded_fields = options.fields.exclude.join();
    }
  }

  if (options.include_count && options.include_count === true) {
    parsedOptions.include_count = true;
  }

  if (options.lastId) {
    parsedOptions.last_id = options.lastId;
  }

  if (options.room) {
    parsedOptions.room = options.room;
  }

  if (options.filter || options.query) {
    parsedOptions.query = options.filter || options.query;
    if (typeof parsedOptions.query !== 'object') {
      throw new Error('Filter must be an object');
    }
    parsedOptions.query = JSON.stringify(parsedOptions.query);
  }

  if (options.orderBy) {
    var key = Object.keys(options.orderBy)[0];
    var prefix = options.orderBy[key].toLowerCase() === 'desc' ? '-' : '';
    parsedOptions.order_by = prefix + key;
  }
  if (options.pageSize) {
    parsedOptions.page_size = options.pageSize;
  }

  return parsedOptions;
};

var sortArgs = function sortArgs(o, f) {
  var result = {};
  result.cb = typeof o === 'function' ? o : f;
  result.filter = typeof o === 'object' ? o : {};
  return result;
};

var addAuth = function addAuth(options) {
  var response = { headers: {}, json: {} };

  if (options.accountKey || options.apiKey) {
    response.headers['X-API-KEY'] = options.accountKey || options.apiKey;
  }

  if (options.userKey) {
    response.headers['X-USER-KEY'] = options.userKey;
  }

  if (options.json && options.json.socialToken) {
    response.json.access_token = options.json.socialToken;
  }

  return response;
};

var extend = function extend(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

var merge = function merge(obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < args.length; i++) {
    obj = extend(obj, args[i]);
  }
  return obj;
};

var template = function template(tmpl, data) {
  var re = /(?:<%=)([\s\S]+?)(?:%>)/g;
  tmpl = tmpl.replace(re, function replacer(match, value) {
    var key = value.trim();
    if (key.indexOf('.') !== -1) {
      var deepProp = key.split('.');
      var tmp = merge({}, data);
      for (var i = 0; i < deepProp.length; i++) {
        tmp = tmp[deepProp[i]];
      }
      return tmp;
    }
    return data[key];
  });

  return tmpl;
};

var helpers = {
  checkParams: checkParams,
  checkId: checkId,
  parseFilter: parseFilter,
  sortArgs: sortArgs,
  addAuth: addAuth,
  merge: merge,
  template: template
};

module.exports = helpers;