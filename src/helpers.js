/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var _        = require('lodash');

module.exports = {
  checkParams: function(p) {
    if (typeof p !== 'object') {
      throw new Error('Invalid parameters object.');
    }
    return p;
  },
  checkId: function(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      throw new Error('Valid ID must be provided.');
    }
    return id;
  },
  parseFilter: function(options) {
    var parsedOptions = {};

    if (options.fields) {
      if (options.fields.include) {
        parsedOptions.fields = options.fields.include.join();
      }

      if (options.fields.exclude) {
        parsedOptions.excluded_fields = options.fields.exclude.join();
      }
    }

    if (options.lastId) {
      parsedOptions.last_id = options.lastId;
    }

    if (options.room) {
      parsedOptions.room = options.room;
    }

    if (options.filter || options.query) {
      parsedOptions.query = options.filter || options.query;
      if (typeof parsedOptions.query !== "object") {
        throw new Error('Filter must be an object');
      }
      parsedOptions.query = JSON.stringify(parsedOptions.query);
    }

    if (options.orderBy) {
      var key = Object.keys(options.orderBy)[0];
      var prefix = (options.orderBy[key].toLowerCase() === 'desc') ? '-' : '';
      parsedOptions.order_by = prefix + key;

    }
    if (options.pageSize) {
      parsedOptions.page_size = options.pageSize;
    }

    return parsedOptions;
  },
  sortArgs: function(o, f) {
    var result = {};
    result.cb = (_.isFunction(o)) ? o : null;
    result.filter = (_.isPlainObject(o)) ? o : {};
    return result;
  },
  addAuth: function(options) {
    var headers = {};

    if (options.accountKey || options.apiKey) {
      headers['X-API-KEY'] = options.accountKey || options.apiKey;
    }

    if (options.userKey) {
      headers['X-USER-KEY'] = options.userKey;
    }

    if (options.json && options.json.socialToken) {
      headers.Authorization = 'token ' + options.json.socialToken;
    }

    return (headers !== {}) ? {headers: headers} : headers;
  }
};
