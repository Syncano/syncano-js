/*
 * Syncano JS Library
 * Copyright 2015 Syncano Inc.
 */

 'use strict';

var checkParams = function(p) {
  if (typeof p !== 'object') {
    throw new Error('Invalid parameters object.');
  }
  return p;
};

var checkId = function(id) {
  if (typeof id !== 'string' && typeof id !== 'number') {
    throw new Error('Valid ID must be provided.');
  }
  return id;
};

var parseFilter = function(options) {
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
    if (typeof parsedOptions.query !== 'object') {
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
};

var sortArgs = function(o, f) {
  var result = {};
  result.cb = (isFunction(o)) ? o : null;
  result.filter = (isPlainObject(o)) ? o : {};
  return result;
};

var addAuth = function(options) {
  var response = {headers: {}, json: {}};

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


//lodash replacements
var objToString = Object.prototype.toString;
var objectTag = '[object Object]';
var MAX_SAFE_INTEGER = 9007199254740991;
var funcTag = '[object Function]';

var isObject = function(value) {
  var type = typeof value;
  return !!value && (type === 'object' || type === 'function');
};

var isObjectLike = function(value) {
  return !!value && typeof value === 'object';
};

var isHostObject = (function() {
  try {
    Object({ toString: 0 } + '');
  } catch (e) {
    return function() { return false; };
  }
  return function(value) {
    return typeof value.toString !== 'function' && typeof (value + '') === 'string';
  };
}());

var isLength = function(value) {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
};

var isArrayLike = function(value) {
  return value !== null && isLength(value.length);
};

var isArguments = function(value) {
  return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee');
};

var isPlainObject = function(value) {
  var Ctor;

  if (!(isObjectLike(value) && objToString.call(value) === objectTag && !isHostObject(value) && !isArguments(value)) ||
    (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor === 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }

  var result;

  for (var key in value) {
    result = key;
  }
  return hasOwnProperty.call(value, result);
};

var isFunction = function(value) {
  return isObject(value) && objToString(value) === funcTag;
};

var extend = function extend(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

var merge = function(obj) {
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < args.length; i++) {
    obj = extend(obj, args[i]);
  }
  return obj;
};

var template = function(tmpl, data) {
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
