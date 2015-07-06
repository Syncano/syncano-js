/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var _        = require('lodash');

module.exports = {
  objectCleanup: function(obj) {
    if (obj.opt) {
      delete obj.opt;
    }

    delete obj.filterReq;
    delete obj.idReq;
    delete obj.filterIdReq;
    delete obj.paramReq;
    delete obj.paramIdReq;

    return obj;
  },
  validateOptions: function(options, req) {
    _.forEach(req, function(r) {
      if (!options || typeof options !== 'object' || !options[r]) {
        throw new Error('"' + r + '" is missing or invalid.');
      }
    });
  },
  checkParams: function(p) {
    if (typeof p !== 'object') {
      throw new Error('Invalid parameters object.');
    }
    return p;
  },
  checkId: function(id) {
    if (typeof id !== 'string' && typeof id !== 'number') {
      throw new Error('Valid ID must be provided');
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

    if (options.filter) {
      parsedOptions.query = options.filter;
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
  }
};
