module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isString2 = __webpack_require__(17);
	
	var _isString3 = _interopRequireDefault(_isString2);
	
	var _isEmpty2 = __webpack_require__(20);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _forEach2 = __webpack_require__(50);
	
	var _forEach3 = _interopRequireDefault(_forEach2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _bluebird = __webpack_require__(18);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _models = __webpack_require__(118);
	
	var _models2 = _interopRequireDefault(_models);
	
	var _account = __webpack_require__(103);
	
	var _account2 = _interopRequireDefault(_account);
	
	var _pinger = __webpack_require__(132);
	
	var _pinger2 = _interopRequireDefault(_pinger);
	
	var _file = __webpack_require__(62);
	
	var _file2 = _interopRequireDefault(_file);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main Syncano object.
	 * @constructor
	 * @type {Syncano}
	
	 * @param {Object} options All configuration options
	 * @param {Object} [options.baseUrl = 'https://api.syncano.io'] Base URL for all api calls.
	 * @param {Object} [options.accountKey = null] Your Syncano account key.
	 * @param {Object} [options.userKey = null] Instance user api key.
	 * @param {Object} [options.socialToken = null] Instance social authentication token.
	 * @param {Object} [options.defaults = {}] Object with default properties for api calls.
	 * @returns {Syncano}
	
	 * @example {@lang javascript}
	 * var connection = Syncano({accountKey: '123'});
	 * var connection = Syncano({userKey: '123'});
	 * var connection = Syncano({socialToken: '123'});
	 * var connection = Syncano({ defaults: { instanceName: 'my-instance' }});
	 */
	var Syncano = (0, _stampit2.default)()
	// We need function here, do not use arrow syntax!
	.init(function () {
	  var _this = this;
	
	  this.Account = _account2.default.setConfig(this)();
	  this.Monitor = _pinger2.default.setConfig(this)();
	
	  (0, _forEach3.default)(_models2.default, function (model, name) {
	    _this[name] = model.setConfig(_this);
	  });
	}).refs({
	  baseUrl: 'https://api.syncano.io',
	  accountKey: null,
	  userKey: null,
	  apiKey: null,
	  socialToken: null,
	  defaults: {}
	}).methods({
	  /**
	  * Sets *instanceName*.
	   * @memberOf Syncano
	  * @instance
	   * @param {String} instanceName Instance name for all api calls
	  * @returns {Syncano}
	  * @throws {Error} Instance name must be a string.
	   * @example {@lang javascript}
	  * var connection = Syncano({accountKey: '123'});
	  * connection.setInstanceName('my-instance');
	   */
	
	  setInstanceName: function setInstanceName(instanceName) {
	    if ((0, _isEmpty3.default)(instanceName)) this.defaults.instanceName = null;else {
	      if (!(0, _isString3.default)(instanceName)) return _bluebird2.default.reject(new Error('Instance name must be a string.'));
	      this.defaults.instanceName = instanceName;
	    }
	    return this;
	  },
	
	  /**
	  * Gets *instanceName*.
	   * @memberOf Syncano
	  * @instance
	  * @returns {String}
	   * @example {@lang javascript}
	  * var connection = Syncano({accountKey: '123'});
	  * var baseUrl = connection.getInstanceName();
	   */
	  getInstanceName: function getInstanceName() {
	    return this.defaults.instanceName;
	  },
	
	
	  /**
	  * Sets *baseUrl*.
	   * @memberOf Syncano
	  * @instance
	   * @param {String} baseUrl Base URL for all api calls
	  * @returns {Syncano}
	  * @throws {Error} Base URL is required.
	   * @example {@lang javascript}
	  * var connection = Syncano({accountKey: '123'});
	  * connection.setBaseUrl('https://dummy.com/');
	   */
	  setBaseUrl: function setBaseUrl(baseUrl) {
	    if ((0, _isEmpty3.default)(baseUrl)) return _bluebird2.default.reject(new Error('Base URL is required.'));
	    this.baseUrl = baseUrl;
	    return this;
	  },
	
	
	  /**
	  * Gets *baseUrl*.
	   * @memberOf Syncano
	  * @instance
	  * @returns {String}
	   * @example {@lang javascript}
	  * var connection = Syncano({accountKey: '123'});
	  * var baseUrl = connection.getBaseUrl();
	   */
	  getBaseUrl: function getBaseUrl() {
	    return this.baseUrl;
	  },
	
	
	  /**
	  * Sets *accountKey*.
	   * @memberOf Syncano
	  * @instance
	   * @param {String} accountKey Your {@link https://syncano.io|Syncano} account key
	  * @returns {Syncano}
	   * @example {@lang javascript}
	  * var connection = Syncano({accountKey: '123'});
	  * connection.setAccountKey('abcd');
	   */
	  setAccountKey: function setAccountKey(accountKey) {
	    this.accountKey = accountKey;
	    return this;
	  },
	
	
	  /**
	  * Gets *accountKey*.
	   * @memberOf Syncano
	  * @instance
	  * @returns {String}
	   * @example {@lang javascript}
	  * var connection = Syncano({accountKey: '123'});
	  * var accountKey = connection.getAccountKey();
	   */
	  getAccountKey: function getAccountKey() {
	    return this.accountKey;
	  },
	
	
	  /**
	  * Sets *userKey*.
	   * @memberOf Syncano
	  * @instance
	   * @param {String} userKey Instance user api key
	  * @returns {Syncano}
	   * @example {@lang javascript}
	  * var connection = Syncano({userKey: '123'});
	  * connection.setUserKey('abcd');
	   */
	  setUserKey: function setUserKey(userKey) {
	    this.userKey = userKey;
	    return this;
	  },
	
	
	  /**
	  * Gets *userKey*.
	   * @memberOf Syncano
	  * @instance
	  * @returns {String}
	   * @example {@lang javascript}
	  * var connection = Syncano({userKey: '123'});
	  * var userKey = connection.getUserKey();
	   */
	  getUserKey: function getUserKey() {
	    return this.userKey;
	  },
	
	
	  /**
	  * Sets *apiKey*.
	   * @memberOf Syncano
	  * @instance
	   * @param {String} apiKey Instance user api key
	  * @returns {Syncano}
	   * @example {@lang javascript}
	  * var connection = Syncano({apiKey: '123'});
	  * connection.setApiKey('abcd');
	   */
	  setApiKey: function setApiKey(apiKey) {
	    this.apiKey = apiKey;
	    return this;
	  },
	
	
	  /**
	  * Gets *apiKey*.
	   * @memberOf Syncano
	  * @instance
	  * @returns {String}
	   * @example {@lang javascript}
	  * var connection = Syncano({apiKey: '123'});
	  * var apiKey = connection.getApiKey();
	   */
	  getApiKey: function getApiKey() {
	    return this.apiKey;
	  },
	
	
	  /**
	  * Sets *socialToken*.
	   * @memberOf Syncano
	  * @instance
	   * @param {String} socialToken Instance social authentication token
	  * @returns {Syncano}
	   * @example {@lang javascript}
	  * var connection = Syncano({socialToken: '123'});
	  * connection.setSocialToken('abcd');
	   */
	  setSocialToken: function setSocialToken(socialToken) {
	    this.socialToken = socialToken;
	    return this;
	  },
	
	
	  /**
	  * Gets *socialToken*.
	   * @memberOf Syncano
	  * @instance
	  * @returns {String}
	   * @example {@lang javascript}
	  * var connection = Syncano({socialToken: '123'});
	  * var socialToken = connection.getSocialToken();
	   */
	  getSocialToken: function getSocialToken() {
	    return this.socialToken;
	  },
	  file: function file(content) {
	    return new _file2.default(content);
	  }
	}).static({
	  file: function file(content) {
	    return new _file2.default(content);
	  }
	});
	
	exports.default = Syncano;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Stampit
	 **
	 * Create objects from reusable, composable behaviors.
	 **
	 * Copyright (c) 2013 Eric Elliott
	 * http://opensource.org/licenses/MIT
	 **/
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodashCollectionForEach = __webpack_require__(233);
	
	var _lodashCollectionForEach2 = _interopRequireDefault(_lodashCollectionForEach);
	
	var _lodashLangIsFunction = __webpack_require__(57);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var _lodashLangIsObject = __webpack_require__(12);
	
	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);
	
	var _supermixer = __webpack_require__(256);
	
	var create = Object.create;
	function isThenable(value) {
	  return value && (0, _lodashLangIsFunction2['default'])(value.then);
	}
	
	function extractFunctions() {
	  var result = [];
	
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  if ((0, _lodashLangIsFunction2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (fn) {
	      // assuming all the arguments are functions
	      if ((0, _lodashLangIsFunction2['default'])(fn)) {
	        result.push(fn);
	      }
	    });
	  } else if ((0, _lodashLangIsObject2['default'])(args[0])) {
	    (0, _lodashCollectionForEach2['default'])(args, function (obj) {
	      (0, _lodashCollectionForEach2['default'])(obj, function (fn) {
	        if ((0, _lodashLangIsFunction2['default'])(fn)) {
	          result.push(fn);
	        }
	      });
	    });
	  }
	  return result;
	}
	
	function addMethods(fixed) {
	  for (var _len2 = arguments.length, methods = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    methods[_key2 - 1] = arguments[_key2];
	  }
	
	  return _supermixer.mixinFunctions.apply(undefined, [fixed.methods].concat(methods));
	}
	function addRefs(fixed) {
	  for (var _len3 = arguments.length, refs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    refs[_key3 - 1] = arguments[_key3];
	  }
	
	  fixed.refs = fixed.state = _supermixer.mixin.apply(undefined, [fixed.refs].concat(refs));
	  return fixed.refs;
	}
	function addInit(fixed) {
	  for (var _len4 = arguments.length, inits = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    inits[_key4 - 1] = arguments[_key4];
	  }
	
	  var extractedInits = extractFunctions.apply(undefined, inits);
	  fixed.init = fixed.enclose = fixed.init.concat(extractedInits);
	  return fixed.init;
	}
	function addProps(fixed) {
	  for (var _len5 = arguments.length, propses = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	    propses[_key5 - 1] = arguments[_key5];
	  }
	
	  return _supermixer.merge.apply(undefined, [fixed.props].concat(propses));
	}
	function addStatic(fixed) {
	  for (var _len6 = arguments.length, statics = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	    statics[_key6 - 1] = arguments[_key6];
	  }
	
	  return _supermixer.mixin.apply(undefined, [fixed['static']].concat(statics));
	}
	
	function cloneAndExtend(fixed, extensionFunction) {
	  var stamp = stampit(fixed);
	
	  for (var _len7 = arguments.length, args = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
	    args[_key7 - 2] = arguments[_key7];
	  }
	
	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));
	  return stamp;
	}
	
	function _compose() {
	  var result = stampit();
	
	  for (var _len8 = arguments.length, factories = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	    factories[_key8] = arguments[_key8];
	  }
	
	  (0, _lodashCollectionForEach2['default'])(factories, function (source) {
	    if (source && source.fixed) {
	      addMethods(result.fixed, source.fixed.methods);
	      // We might end up having two different stampit modules loaded and used in conjunction.
	      // These || operators ensure that old stamps could be combined with the current version stamps.
	      // 'state' is the old name for 'refs'
	      addRefs(result.fixed, source.fixed.refs || source.fixed.state);
	      // 'enclose' is the old name for 'init'
	      addInit(result.fixed, source.fixed.init || source.fixed.enclose);
	      addProps(result.fixed, source.fixed.props);
	      addStatic(result.fixed, source.fixed['static']);
	    }
	  });
	  return (0, _supermixer.mixin)(result, result.fixed['static']);
	}
	
	/**
	 * Return a factory function that will produce new objects using the
	 * components that are passed in or composed.
	 *
	 * @param  {Object} [options] Options to build stamp from: `{ methods, refs, init, props }`
	 * @param  {Object} [options.methods] A map of method names and bodies for delegation.
	 * @param  {Object} [options.refs] A map of property names and values to be mixed into each new object.
	 * @param  {Object} [options.init] A closure (function) used to create private data and privileged methods.
	 * @param  {Object} [options.props] An object to be deeply cloned into each newly stamped object.
	 * @param  {Object} [options.static] An object to be mixed into each `this` and derived stamps (not objects!).
	 * @return {Function(refs)} factory A factory to produce objects.
	 * @return {Function(refs)} factory.create Just like calling the factory function.
	 * @return {Object} factory.fixed An object map containing the stamp components.
	 * @return {Function(methods)} factory.methods Add methods to the stamp. Chainable.
	 * @return {Function(refs)} factory.refs Add references to the stamp. Chainable.
	 * @return {Function(Function(context))} factory.init Add a closure which called on object instantiation. Chainable.
	 * @return {Function(props)} factory.props Add deeply cloned properties to the produced objects. Chainable.
	 * @return {Function(stamps)} factory.compose Combine several stamps into single. Chainable.
	 * @return {Function(statics)} factory.static Add properties to the stamp (not objects!). Chainable.
	 */
	var stampit = function stampit(options) {
	  var fixed = { methods: {}, refs: {}, init: [], props: {}, 'static': {} };
	  fixed.state = fixed.refs; // Backward compatibility. 'state' is the old name for 'refs'.
	  fixed.enclose = fixed.init; // Backward compatibility. 'enclose' is the old name for 'init'.
	  if (options) {
	    addMethods(fixed, options.methods);
	    addRefs(fixed, options.refs);
	    addInit(fixed, options.init);
	    addProps(fixed, options.props);
	    addStatic(fixed, options['static']);
	  }
	
	  var factory = function Factory(refs) {
	    for (var _len9 = arguments.length, args = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
	      args[_key9 - 1] = arguments[_key9];
	    }
	
	    var instance = (0, _supermixer.mixin)(create(fixed.methods), fixed.refs, refs);
	    (0, _supermixer.mergeUnique)(instance, fixed.props); // props are safely merged into refs
	
	    var nextPromise = null;
	    if (fixed.init.length > 0) {
	      (0, _lodashCollectionForEach2['default'])(fixed.init, function (fn) {
	        if (!(0, _lodashLangIsFunction2['default'])(fn)) {
	          return; // not a function, do nothing.
	        }
	
	        // Check if we are in the async mode.
	        if (!nextPromise) {
	          // Call the init().
	          var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	          if (!callResult) {
	            return; // The init() returned nothing. Proceed to the next init().
	          }
	
	          // Returned value is meaningful.
	          // It will replace the stampit-created object.
	          if (!isThenable(callResult)) {
	            instance = callResult; // stamp is synchronous so far.
	            return;
	          }
	
	          // This is the sync->async conversion point.
	          // Since now our factory will return a promise, not an object.
	          nextPromise = callResult;
	        } else {
	          // As long as one of the init() functions returned a promise,
	          // now our factory will 100% return promise too.
	          // Linking the init() functions into the promise chain.
	          nextPromise = nextPromise.then(function (newInstance) {
	            // The previous promise might want to return a value,
	            // which we should take as a new object instance.
	            instance = newInstance || instance;
	
	            // Calling the following init().
	            // NOTE, than `fn` is wrapped to a closure within the forEach loop.
	            var callResult = fn.call(instance, { args: args, instance: instance, stamp: factory });
	            // Check if call result is truthy.
	            if (!callResult) {
	              // The init() returned nothing. Thus using the previous object instance.
	              return instance;
	            }
	
	            if (!isThenable(callResult)) {
	              // This init() was synchronous and returned a meaningful value.
	              instance = callResult;
	              // Resolve the instance for the next `then()`.
	              return instance;
	            }
	
	            // The init() returned another promise. It is becoming our nextPromise.
	            return callResult;
	          });
	        }
	      });
	    }
	
	    // At the end we should resolve the last promise and
	    // return the resolved value (as a promise too).
	    return nextPromise ? nextPromise.then(function (newInstance) {
	      return newInstance || instance;
	    }) : instance;
	  };
	
	  var refsMethod = cloneAndExtend.bind(null, fixed, addRefs);
	  var initMethod = cloneAndExtend.bind(null, fixed, addInit);
	  return (0, _supermixer.mixin)(factory, {
	    /**
	     * Creates a new object instance form the stamp.
	     */
	    create: factory,
	
	    /**
	     * The stamp components.
	     */
	    fixed: fixed,
	
	    /**
	     * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    methods: cloneAndExtend.bind(null, fixed, addMethods),
	
	    /**
	     * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    refs: refsMethod,
	
	    /**
	     * @deprecated since v2.0. Use refs() instead.
	     * Alias to refs().
	     * @return {Function} A new stamp (factory object).
	     */
	    state: refsMethod,
	
	    /**
	     * Take n functions, an array of functions, or n objects and add
	     * the functions to the initializers list of a new stamp. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    init: initMethod,
	
	    /**
	     * @deprecated since v2.0. User init() instead.
	     * Alias to init().
	     * @return {Function} A new stamp (factory object).
	     */
	    enclose: initMethod,
	
	    /**
	     * Take n objects and deep merge them to the properties. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    props: cloneAndExtend.bind(null, fixed, addProps),
	
	    /**
	     * Take n objects and add all props to the factory object. Creates new stamp.
	     * @return {Function} A new stamp (factory object).
	     */
	    'static': function _static() {
	      for (var _len10 = arguments.length, statics = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	        statics[_key10] = arguments[_key10];
	      }
	
	      var newStamp = cloneAndExtend.apply(undefined, [factory.fixed, addStatic].concat(statics));
	      return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	    },
	
	    /**
	     * Take one or more factories produced from stampit() and
	     * combine them with `this` to produce and return a new factory.
	     * Combining overrides properties with last-in priority.
	     * @param {[Function]|...Function} factories Stampit factories.
	     * @return {Function} A new stampit factory composed from arguments.
	     */
	    compose: function compose() {
	      for (var _len11 = arguments.length, factories = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
	        factories[_key11] = arguments[_key11];
	      }
	
	      return _compose.apply(undefined, [factory].concat(factories));
	    }
	  }, fixed['static']);
	};
	
	// Static methods
	
	function isStamp(obj) {
	  return (0, _lodashLangIsFunction2['default'])(obj) && (0, _lodashLangIsFunction2['default'])(obj.methods) && (
	  // isStamp can be called for old stampit factory object.
	  // We should check old names (state and enclose) too.
	  (0, _lodashLangIsFunction2['default'])(obj.refs) || (0, _lodashLangIsFunction2['default'])(obj.state)) && ((0, _lodashLangIsFunction2['default'])(obj.init) || (0, _lodashLangIsFunction2['default'])(obj.enclose)) && (0, _lodashLangIsFunction2['default'])(obj.props) && (0, _lodashLangIsFunction2['default'])(obj['static']) && (0, _lodashLangIsObject2['default'])(obj.fixed);
	}
	
	function convertConstructor(Constructor) {
	  var stamp = stampit();
	  stamp.fixed.refs = stamp.fixed.state = (0, _supermixer.mergeChainNonFunctions)(stamp.fixed.refs, Constructor.prototype);
	  (0, _supermixer.mixin)(stamp, (0, _supermixer.mixin)(stamp.fixed['static'], Constructor));
	
	  (0, _supermixer.mixinChainFunctions)(stamp.fixed.methods, Constructor.prototype);
	  addInit(stamp.fixed, function (_ref) {
	    var instance = _ref.instance;
	    var args = _ref.args;
	    return Constructor.apply(instance, args);
	  });
	
	  return stamp;
	}
	
	function shortcutMethod(extensionFunction) {
	  var stamp = stampit();
	
	  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	    args[_key12 - 1] = arguments[_key12];
	  }
	
	  extensionFunction.apply(undefined, [stamp.fixed].concat(args));
	
	  return stamp;
	}
	
	function mixinWithConsoleWarning() {
	  console.log('stampit.mixin(), .mixIn(), .extend(), and .assign() are deprecated.', 'Use Object.assign or _.assign instead');
	  return _supermixer.mixin.apply(this, arguments);
	}
	
	exports['default'] = (0, _supermixer.mixin)(stampit, {
	
	  /**
	   * Take n objects and add them to the methods list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  methods: shortcutMethod.bind(null, addMethods),
	
	  /**
	   * Take n objects and add them to the references list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  refs: shortcutMethod.bind(null, addRefs),
	
	  /**
	   * Take n functions, an array of functions, or n objects and add
	   * the functions to the initializers list of a new stamp. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  init: shortcutMethod.bind(null, addInit),
	
	  /**
	   * Take n objects and deep merge them to the properties. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  props: shortcutMethod.bind(null, addProps),
	
	  /**
	   * Take n objects and add all props to the factory object. Creates new stamp.
	   * @return {Function} A new stamp (factory object).
	   */
	  'static': function _static() {
	    for (var _len13 = arguments.length, statics = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
	      statics[_key13] = arguments[_key13];
	    }
	
	    var newStamp = shortcutMethod.apply(undefined, [addStatic].concat(statics));
	    return (0, _supermixer.mixin)(newStamp, newStamp.fixed['static']);
	  },
	
	  /**
	   * Take two or more factories produced from stampit() and
	   * combine them to produce a new factory.
	   * Combining overrides properties with last-in priority.
	   * @param {[Function]|...Function} factories Stamps produced by stampit().
	   * @return {Function} A new stampit factory composed from arguments.
	   */
	  compose: _compose,
	
	  /**
	   * @deprecated Since v2.2. Use Object.assign or _.assign instead.
	   * Alias to Object.assign.
	   */
	  mixin: mixinWithConsoleWarning,
	  extend: mixinWithConsoleWarning,
	  mixIn: mixinWithConsoleWarning,
	  assign: mixinWithConsoleWarning,
	
	  /**
	   * Check if an object is a stamp.
	   * @param {Object} obj An object to check.
	   * @returns {Boolean}
	   */
	  isStamp: isStamp,
	
	  /**
	   * Take an old-fashioned JS constructor and return a stampit stamp
	   * that you can freely compose with other stamps.
	   * @param  {Function} Constructor
	   * @return {Function} A composable stampit factory (aka stamp).
	   */
	  convertConstructor: convertConstructor
	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Model = exports.Meta = undefined;
	
	var _defaults2 = __webpack_require__(49);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _get2 = __webpack_require__(51);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _includes2 = __webpack_require__(52);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _camelCase2 = __webpack_require__(201);
	
	var _camelCase3 = _interopRequireDefault(_camelCase2);
	
	var _lastIndexOf2 = __webpack_require__(214);
	
	var _lastIndexOf3 = _interopRequireDefault(_lastIndexOf2);
	
	var _last2 = __webpack_require__(91);
	
	var _last3 = _interopRequireDefault(_last2);
	
	var _functions2 = __webpack_require__(205);
	
	var _functions3 = _interopRequireDefault(_functions2);
	
	var _omit2 = __webpack_require__(217);
	
	var _omit3 = _interopRequireDefault(_omit2);
	
	var _has2 = __webpack_require__(206);
	
	var _has3 = _interopRequireDefault(_has2);
	
	var _map2 = __webpack_require__(53);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _intersection2 = __webpack_require__(208);
	
	var _intersection3 = _interopRequireDefault(_intersection2);
	
	var _keys2 = __webpack_require__(8);
	
	var _keys3 = _interopRequireDefault(_keys2);
	
	var _difference2 = __webpack_require__(204);
	
	var _difference3 = _interopRequireDefault(_difference2);
	
	var _isEmpty2 = __webpack_require__(20);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _pick2 = __webpack_require__(218);
	
	var _pick3 = _interopRequireDefault(_pick2);
	
	var _mapValues2 = __webpack_require__(215);
	
	var _mapValues3 = _interopRequireDefault(_mapValues2);
	
	var _reduce2 = __webpack_require__(54);
	
	var _reduce3 = _interopRequireDefault(_reduce2);
	
	var _union2 = __webpack_require__(226);
	
	var _union3 = _interopRequireDefault(_union2);
	
	var _forEach2 = __webpack_require__(50);
	
	var _forEach3 = _interopRequireDefault(_forEach2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _bluebird = __webpack_require__(18);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _validate2 = __webpack_require__(264);
	
	var _validate3 = _interopRequireDefault(_validate2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	var _request = __webpack_require__(19);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _errors = __webpack_require__(36);
	
	var _utils = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_validate3.default.Promise = _bluebird2.default;
	
	_validate3.default.validators.object = function (value) {
	  if (value) {
	    if (!_validate3.default.isObject(value)) {
	      return "is not an object";
	    }
	  }
	  return null;
	};
	
	_validate3.default.validators.array = function (value) {
	  if (value) {
	    if (!_validate3.default.isArray(value)) {
	      return "is not an array";
	    }
	  }
	  return null;
	};
	
	_validate3.default.validators.boolean = function (value) {
	  if (value) {
	    if (typeof value !== 'boolean') {
	      return "is not a boolean";
	    }
	  }
	  return null;
	};
	
	_validate3.default.validators.string = function (value) {
	  if (value) {
	    if (!_validate3.default.isString(value)) {
	      return "is not a string";
	    }
	  }
	  return null;
	};
	
	/**
	 * Object which holds whole configuration for {@link Model}.
	
	 * @constructor
	 * @type {Meta}
	
	 * @property {String} [name = null]
	 * @property {String} [pluralName = null]
	 * @property {Array}  [properties = []]
	 * @property {Array}  [endpoints = {}]
	 * @property {Array}  [relatedModels = undefined]
	
	 * @example {@lang javascript}
	 * var MyMeta = Meta({name: 'test'});
	 * var MyModel = SomeModel.setMeta(MyMeta);
	 */
	var Meta = exports.Meta = (0, _stampit2.default)().props({
	  name: null,
	  pluralName: null,
	  properties: [],
	  endpoints: {}
	}).init(function (_ref) {
	  var _this = this;
	
	  var instance = _ref.instance;
	
	  (0, _forEach3.default)(instance.endpoints, function (value) {
	    value.properties = _this.getPathProperties(value.path);
	    instance.properties = (0, _union3.default)(instance.properties, value.properties);
	  });
	}).methods({
	
	  /**
	  * Gets required properties from object. Used mostly during serialization.
	  * @memberOf Meta
	  * @instance
	  * @param {Object} object
	  * @returns {Object}
	  */
	
	  getObjectProperties: function getObjectProperties(object) {
	    return (0, _reduce3.default)(this.properties, function (result, property) {
	      result[property] = object[property];
	      return result;
	    }, {});
	  },
	
	
	  /**
	  * Makes a copy of target and adds required properties from source.
	   * @memberOf Meta
	  * @instance
	   * @param {Object} source
	  * @param {Object} target
	   * @returns {Object}
	  */
	  assignProperties: function assignProperties(source, target) {
	    var dateFields = (0, _mapValues3.default)((0, _pick3.default)(target, ['created_at', 'updated_at', 'executed_at']), function (o) {
	      return new Date(o);
	    });
	    return (0, _assign3.default)({}, this.getObjectProperties(source), target, dateFields);
	  },
	  getPathProperties: function getPathProperties(path) {
	    var re = /{([^}]*)}/gi;
	    var match = null;
	    var result = [];
	
	    while ((match = re.exec(path)) !== null) {
	      result.push(match[1]);
	    }
	
	    return result;
	  },
	
	
	  /**
	  * Resolves endpoint path e.g: `/v1.1/instances/{name}/` will be converted to `/v1.1/instances/someName/`.
	   * @memberOf Meta
	  * @instance
	   * @param {String} endpointName
	  * @param {Object} properties
	   * @returns {String}
	  */
	  resolveEndpointPath: function resolveEndpointPath(endpointName, properties) {
	    if ((0, _isEmpty3.default)(this.endpoints[endpointName])) {
	      return _bluebird2.default.reject(new Error('Invalid endpoint name: "' + endpointName + '".'));
	    }
	
	    var endpoint = this.endpoints[endpointName];
	    var diff = (0, _difference3.default)(endpoint.properties, (0, _keys3.default)(properties));
	    var path = endpoint.path;
	
	    if (diff.length) {
	      return _bluebird2.default.reject(new Error('Missing path properties "' + diff.join() + '" for "' + endpointName + '" endpoint.'));
	    }
	
	    (0, _forEach3.default)(endpoint.properties, function (property) {
	      path = path.replace('{' + property + '}', properties[property]);
	    });
	
	    return path;
	  },
	
	
	  /**
	  * Looks for the first allowed method from `methodNames` for selected endpoint.
	   * @memberOf Meta
	  * @instance
	   * @param {String} endpointName
	  * @param {...String} methodNames
	   * @returns {String}
	  */
	  findAllowedMethod: function findAllowedMethod(endpointName) {
	    var endpoint = this.endpoints[endpointName];
	
	    for (var _len = arguments.length, methodNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      methodNames[_key - 1] = arguments[_key];
	    }
	
	    var methods = (0, _intersection3.default)((0, _map3.default)(methodNames, function (m) {
	      return m.toLowerCase();
	    }), endpoint.methods);
	
	    if ((0, _isEmpty3.default)(methods)) {
	      return _bluebird2.default.reject(new Error('Unsupported request methods: ' + methodNames.join() + '.'));
	    }
	
	    return methods[0];
	  }
	});
	
	/**
	 * Base {@link https://github.com/stampit-org/stampit|stamp} for all models which wraps all raw JavaScript objects.
	 * **Not** meant to be used directly more like mixin in other {@link https://github.com/stampit-org/stampit|stamps}.
	
	 * @constructor
	 * @type {Model}
	
	 * @property {Syncano} _config private attribute which holds {@link Syncano} object
	 * @property {Meta} _meta private attribute which holds {@link Meta} object
	 * @property {Object} _constraints private attribute which holds validation constraints
	 * @property {Request} _request private attribute which holds {@link Request} configuration
	 * @property {Request} _querySet private attribute which holds {@link QuerySet} stamp
	
	 * @example {@lang javascript}
	 * var MyModel = stampit()
	    .compose(Model)
	    .setMeta(MyMeta)
	    .setConstraints(MyConstraints);
	 */
	var Model = exports.Model = (0, _stampit2.default)({
	  refs: {
	    _querySet: _querySet2.default
	  },
	
	  static: {
	    /**
	    * Sets {@link QuerySet} and returns new {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf Model
	    * @static
	     * @param {QuerySet} querySet {@link QuerySet} definition
	    * @returns {Model}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(Model).setQuerySet({});
	     */
	
	    setQuerySet: function setQuerySet(querySet) {
	      return this.refs({ _querySet: querySet });
	    },
	
	
	    /**
	    * Gets {@link QuerySet} from {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf Model
	    * @static
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * var querySet = stampit().compose(Model).getQuerySet();
	     */
	    getQuerySet: function getQuerySet() {
	      return this.fixed.refs._querySet;
	    },
	
	
	    /**
	    * Returns {@link QuerySet} instance which allows to do ORM like operations on {@link https://syncano.io/|Syncano} API.
	     * @memberOf Model
	    * @static
	     * @param {Object} [properties = {}] some default properties for all ORM operations
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * MyModel.please().list();
	     */
	    please: function please() {
	      var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var querySet = this.getQuerySet();
	      var defaultProps = (0, _assign3.default)({}, this.getDefaultProperties(), properties);
	      return querySet({
	        model: this,
	        properties: defaultProps,
	        _config: this.getConfig()
	      });
	    },
	
	
	    /**
	    * Used only for serialization for raw object to {@link https://github.com/stampit-org/stampit|stamp}.
	     * @memberOf Model
	    * @static
	     * @param {Object} rawJSON
	    * @param {Object} [properties = {}] some default properties which will be assigned to model instance
	    * @returns {Model}
	     */
	    fromJSON: function fromJSON(rawJSON) {
	      var properties = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var meta = this.getMeta();
	      var attrs = meta.assignProperties(properties, rawJSON);
	      return this(attrs);
	    }
	  },
	  methods: {
	
	    /**
	    * Checks if model instance if already saved.
	    * @memberOf Model
	    * @instance
	    * @returns {Boolean}
	    */
	
	    isNew: function isNew() {
	      return !(0, _has3.default)(this, 'links');
	    },
	
	
	    /**
	    * Validates current model instance in context of defined constraints.
	    * @memberOf Model
	    * @instance
	    * @returns {Object|undefined}
	    */
	    validate: function validate() {
	      var constraints = this.getConstraints();
	      var attributes = this.toJSON();
	
	      if ((0, _isEmpty3.default)(constraints)) {
	        return;
	      }
	
	      return (0, _validate3.default)(attributes, constraints);
	    },
	
	
	    /**
	    * Serializes raw JavaScript object into {@link Model} instance.
	    * @memberOf Model
	    * @instance
	    * @returns {Model}
	    */
	    serialize: function serialize(object) {
	      var meta = this.getMeta();
	      return this.getStamp()(meta.assignProperties(this, object));
	    },
	
	
	    /**
	    * Creates or updates the current instance.
	    * @memberOf Model
	    * @instance
	    * @returns {Promise}
	    */
	    save: function save() {
	      var _this2 = this;
	
	      var meta = this.getMeta();
	      var errors = this.validate();
	      var path = null;
	      var endpoint = 'list';
	      var method = 'POST';
	      var payload = this.toJSON();
	
	      if (!(0, _isEmpty3.default)(errors)) {
	        return _bluebird2.default.reject(new _errors.ValidationError(errors));
	      }
	
	      try {
	        if (!this.isNew()) {
	          endpoint = 'detail';
	          method = meta.findAllowedMethod(endpoint, 'PUT', 'PATCH', 'POST');
	        }
	
	        path = meta.resolveEndpointPath(endpoint, this);
	      } catch (err) {
	        return _bluebird2.default.reject(err);
	      }
	
	      return this.makeRequest(method, path, { payload: payload }).then(function (body) {
	        return _this2.serialize(body);
	      });
	    },
	
	
	    /**
	    * Removes the current instance.
	    * @memberOf Model
	    * @instance
	    * @returns {Promise}
	    */
	    delete: function _delete() {
	      var meta = this.getMeta();
	      var path = meta.resolveEndpointPath('detail', this);
	
	      return this.makeRequest('DELETE', path);
	    },
	    toJSON: function toJSON() {
	      var attrs = [
	      // Private stuff
	      '_config', '_meta', '_request', '_constraints', '_querySet',
	
	      // Read only stuff
	      'links', 'created_at', 'updated_at'];
	
	      return (0, _omit3.default)(this, attrs.concat((0, _functions3.default)(this)));
	    }
	  }
	}).init(function (_ref2) {
	  var instance = _ref2.instance;
	  var stamp = _ref2.stamp;
	
	  if (!stamp.fixed.methods.getStamp) {
	    stamp.fixed.methods.getStamp = function () {
	      return stamp;
	    };
	  }
	  if ((0, _has3.default)(instance, '_meta.relatedModels')) {
	    (function () {
	      var relatedModels = instance._meta.relatedModels;
	      var properties = instance._meta.properties.slice();
	      var last = (0, _last3.default)(properties);
	      var lastIndex = (0, _lastIndexOf3.default)(properties, last);
	      properties[lastIndex] = (0, _camelCase3.default)(instance._meta.name + ' ' + last);
	      var map = {};
	      map[last] = properties[lastIndex];
	
	      map = (0, _reduce3.default)(properties, function (result, property) {
	        result[property] = property;
	        return result;
	      }, map);
	
	      (0, _forEach3.default)(instance.getConfig(), function (model, name) {
	        if ((0, _includes3.default)(relatedModels, name)) {
	
	          instance[model.getMeta().pluralName] = function () {
	            var _properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	            var parentProperties = (0, _reduce3.default)(map, function (result, target, source) {
	              var value = (0, _get3.default)(instance, source, null);
	
	              if (value !== null) {
	                result[target] = value;
	              }
	
	              return result;
	            }, {});
	
	            return (0, _stampit2.default)().compose(model).please((0, _assign3.default)(parentProperties, _properties));
	          };
	        }
	      });
	    })();
	  }
	  if ((0, _has3.default)(instance, '_config')) (0, _defaults3.default)(instance, instance.getDefaultProperties());
	}).compose(_utils.ConfigMixin, _utils.MetaMixin, _utils.ConstraintsMixin, _request2.default);
	
	exports.default = Model;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseQuerySet = exports.BulkCreate = exports.Raw = exports.Ordering = exports.PageSize = exports.First = exports.UpdateOrCreate = exports.Update = exports.Delete = exports.List = exports.GetOrCreate = exports.Get = exports.Create = undefined;
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _includes2 = __webpack_require__(52);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _defaults2 = __webpack_require__(49);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _map2 = __webpack_require__(53);
	
	var _map3 = _interopRequireDefault(_map2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _bluebird = __webpack_require__(18);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _request = __webpack_require__(19);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _errors = __webpack_require__(36);
	
	var _errors2 = _interopRequireDefault(_errors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Wrapper around plain JavaScript Array which provides two additional methods for pagination.
	 * @constructor
	 * @type {ResultSet}
	
	 * @param {QuerySet}  querySet
	 * @param {String}  response
	 * @param {Array}  objects
	 * @returns {ResultSet}
	
	 * @property {Function}  next
	 * @property {Function}  prev
	
	 * @example {@lang javascript}
	 * Instance.please().list()
	 *   // get next page
	 *   .then((instances) => instances.next())
	 *
	 *   // get prev page
	 *   .then((instances) => instances.prev())
	 *
	 *   .then((instances) => console.log('instances', instances));
	 */
	var ResultSet = function ResultSet(querySet, response, objects) {
	  var results = [];
	  results.push.apply(results, objects);
	
	  /**
	  * Helper method which will fetch next page or throws `PaginationError`.
	   * @memberOf ResultSet
	  * @instance
	   * @throws {PaginationError}
	  * @returns {Promise}
	  */
	  results.next = function () {
	    if (!response.next) {
	      return _bluebird2.default.reject(new _errors2.default('There is no next page'));
	    }
	
	    return new _bluebird2.default(function (resolve, reject) {
	      return querySet.request(response.next, { query: {} }).spread(resolve).catch(reject);
	    });
	  };
	
	  /**
	  * Helper method which will fetch previous page or throws `PaginationError`.
	   * @memberOf ResultSet
	  * @instance
	   * @throws {PaginationError}
	  * @returns {Promise}
	  */
	  results.prev = function () {
	    if (!response.prev) {
	      return _bluebird2.default.reject(new _errors2.default('There is no previous page'));
	    }
	
	    return new _bluebird2.default(function (resolve, reject) {
	      return querySet.request(response.prev, { query: {} }).spread(resolve).catch(reject);
	    });
	  };
	
	  return results;
	};
	
	var QuerySetRequest = (0, _stampit2.default)().compose(_request2.default).refs({
	  model: null
	}).props({
	  endpoint: 'list',
	  method: 'GET',
	  headers: {},
	
	  properties: {},
	  query: {},
	  payload: {},
	  attachments: {},
	  _serialize: true
	}).methods({
	
	  /**
	  * Converts raw objects to {@link https://github.com/stampit-org/stampit|stampit} instances
	   * @memberOf QuerySet
	  * @instance
	  * @private
	   * @param {Object} response raw JavaScript objects
	  * @returns {Object}
	  */
	
	  serialize: function serialize(response) {
	    if (this._serialize === false) {
	      return response;
	    }
	
	    if (this.endpoint === 'list') {
	      return this.asResultSet(response);
	    }
	
	    return this.model.fromJSON(response, this.properties);
	  },
	
	
	  /**
	  * Converts API response into {ResultSet}
	   * @memberOf QuerySet
	  * @instance
	  * @private
	   * @param {Object} response raw JavaScript objects
	  * @param {String} lookupField additional field to search for data
	  * @returns {ResultSet}
	  */
	  asResultSet: function asResultSet(response, lookupField) {
	    var _this = this;
	
	    var objects = (0, _map3.default)(response.objects, function (object) {
	      var obj = lookupField ? object[lookupField] : object;
	      return _this.model.fromJSON(obj, _this.properties);
	    });
	    return ResultSet(this, response, objects);
	  },
	
	
	  /**
	  * Executes current state of QuerySet
	   * @memberOf QuerySet
	  * @instance
	   * @param {String} [requestPath = null]
	  * @param {Object} [requestOptions = {}]
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * Instance.please().list().request().then(function(instance) {});
	   */
	  request: function request() {
	    var _this2 = this;
	
	    var requestPath = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	    var requestOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var meta = this.model.getMeta();
	    var endpoint = meta.endpoints[this.endpoint] || {};
	    var allowedMethods = endpoint.methods || [];
	    var path = requestPath || meta.resolveEndpointPath(this.endpoint, this.properties);
	    var method = this.method.toLowerCase();
	    var options = (0, _defaults3.default)(requestOptions, {
	      headers: this.headers,
	      query: this.query,
	      payload: this.payload,
	      attachments: this.attachments,
	      responseAttr: this.responseAttr
	    });
	
	    if (!(0, _includes3.default)(allowedMethods, method)) {
	      return _bluebird2.default.reject(new Error('Invalid request method: "' + this.method + '".'));
	    }
	
	    return this.makeRequest(method, path, options).then(function (body) {
	      return [_this2.serialize(body), body];
	    });
	  },
	
	
	  /**
	  * Wrapper around {@link Queryset.request} method
	   * @memberOf QuerySet
	  * @instance
	   * @param {function} callback
	  * @returns {Promise}
	  */
	  then: function then(callback) {
	    return this.request().spread(callback);
	  }
	});
	
	var Create = exports.Create = (0, _stampit2.default)().methods({
	
	  /**
	  * A convenience method for creating an object and saving it all in one step.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} object
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * // Thus:
	  *
	  * Instance
	  *  .please()
	  *  .create({name: 'test-one', description: 'description'})
	  *  .then(function(instance) {});
	  *
	  * // and:
	  *
	  * var instance = Instance({name: 'test-one', description: 'description'});
	  * instance.save().then(function(instance) {});
	  *
	  * // are equivalent.
	   */
	
	  create: function create(object) {
	    var attrs = (0, _assign3.default)({}, this.properties, object);
	    var instance = this.model(attrs);
	
	    return instance.save();
	  }
	});
	
	var Get = exports.Get = (0, _stampit2.default)().methods({
	
	  /**
	  * Returns the object matching the given lookup properties.
	  * @memberOf QuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance.please().get({name: 'test-one'}).then(function(instance) {});
	   */
	
	  get: function get() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'GET';
	    this.endpoint = 'detail';
	
	    return this;
	  }
	});
	
	var GetOrCreate = exports.GetOrCreate = (0, _stampit2.default)().methods({
	
	  /**
	  * A convenience method for looking up an object with the given lookup properties, creating one if necessary.
	  * Successful callback will receive **object, created** arguments.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} properties attributes which will be used for object retrieving
	  * @param {Object} defaults attributes which will be used for object creation
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * Instance
	  *   .please()
	  *   .getOrCreate({name: 'test-one'}, {description: 'test'})
	  *   .then(function(instance, created) {});
	  *
	  * // above is equivalent to:
	  *
	  * Instance
	  *   .please()
	  *   .get({name: 'test-one'})
	  *   .then(function(instance) {
	  *     // Get
	  *   })
	  *   .catch(function() {
	  *     // Create
	  *     return Instance.please().create({name: 'test-one', description: 'test'});
	  *   });
	   */
	
	  getOrCreate: function getOrCreate() {
	    var _this3 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var defaults = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return new _bluebird2.default(function (resolve, reject) {
	      _this3.get(properties).then(function (object) {
	        return resolve(object, false);
	      }).catch(function () {
	        var attrs = (0, _assign3.default)({}, _this3.properties, properties, defaults);
	        return _this3.create(attrs).then(function (object) {
	          return resolve(object, true);
	        }).catch(reject);
	      });
	    });
	  }
	});
	
	var List = exports.List = (0, _stampit2.default)().methods({
	
	  /**
	  * Returns list of objects that match the given lookup properties.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} [properties = {}] lookup properties used for path resolving
	  * @param {Object} [query = {}]
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance.please().list().then(function(instances) {});
	  * Class.please().list({instanceName: 'test-one'}).then(function(classes) {});
	   */
	
	  list: function list() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.query = (0, _assign3.default)({}, this.query, query);
	
	    this.method = 'GET';
	    this.endpoint = 'list';
	    return this;
	  }
	});
	
	var Delete = exports.Delete = (0, _stampit2.default)().methods({
	
	  /**
	  * Removes single object based on provided properties.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance.please().delete({name: 'test-instance'}).then(function() {});
	  * Class.please().delete({name: 'test', instanceName: 'test-one'}).then(function() {});
	   */
	
	  delete: function _delete() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'DELETE';
	    this.endpoint = 'detail';
	    return this;
	  }
	});
	
	var Update = exports.Update = (0, _stampit2.default)().methods({
	
	  /**
	  * Updates single object based on provided arguments
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} object attributes to update
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance
	    .please()
	    .update({name: 'test-instance'}, {description: 'new one'})
	    .then(function(instance) {});
	   * Class
	    .please()
	    .update({name: 'test', instanceName: 'test-one'}, {description: 'new one'})
	    .then(function(cls) {});
	   */
	
	  update: function update() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = object;
	
	    this.method = 'PATCH';
	    this.endpoint = 'detail';
	    return this;
	  }
	});
	
	var TemplateResponse = (0, _stampit2.default)().methods({
	
	  /**
	  * Renders the api response as a template.
	   * @memberOf QuerySet
	  * @instance
	   * @param {template_name} name of template to be rendered
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * DataObject
	    .please()
	    .list({instanceName: 'my-instance', className: 'my-class'})
	    .templateResponse('objects_html_table')
	    .then(function(objects) {});
	  */
	
	  templateResponse: function templateResponse(template_name) {
	    this._serialize = false;
	    this.responseAttr = 'text';
	    this.query['template_response'] = template_name;
	    return this;
	  }
	});
	
	var UpdateOrCreate = exports.UpdateOrCreate = (0, _stampit2.default)().methods({
	
	  /**
	  * A convenience method for updating an object with the given properties, creating a new one if necessary.
	  * Successful callback will receive **object, updated** arguments.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} [object = {}] object with (field, value) pairs used in case of update
	  * @param {Object} [defaults = {}] object with (field, value) pairs used in case of create
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * Instance
	  *   .please()
	  *   .updateOrCreate({name: 'test-one'}, {description: 'new-test'}, {description: 'create-test'})
	  *   .then(function(instance, updated) {});
	  *
	  * // above is equivalent to:
	  *
	  * Instance
	  *   .please()
	  *   .update({name: 'test-one'}, {description: 'new-test'})
	  *   .then(function(instance) {
	  *     // Update
	  *   })
	  *   .catch(function() {
	  *     // Create
	  *     return Instance.please().create({name: 'test-one', description: 'create-test'});
	  *   });
	   */
	
	  updateOrCreate: function updateOrCreate() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _this4 = this;
	
	    var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var defaults = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	    return new _bluebird2.default(function (resolve, reject) {
	      _this4.update(properties, object).then(function (_object) {
	        return resolve(_object, true);
	      }).catch(function () {
	        var attrs = (0, _assign3.default)({}, _this4.properties, properties, defaults);
	        return _this4.create(attrs).then(function (_object) {
	          return resolve(_object, false);
	        }).catch(reject);
	      });
	    });
	  }
	});
	
	var ExcludedFields = (0, _stampit2.default)().methods({
	  /**
	    * Removes specified fields from object response.
	     * @memberOf QuerySet
	    * @instance
	     * @param {Object} fields
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).excludedFields(['title', 'author']).then(function(dataobjects) {});
	     */
	
	  excludedFields: function excludedFields() {
	    var fields = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    this.query['excluded_fields'] = fields.join();
	    return this;
	  }
	});
	
	var Fields = (0, _stampit2.default)().methods({
	  /**
	    * Selects specified fields from object.
	     * @memberOf QuerySet
	    * @instance
	     * @param {Object} fields
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).fields(['title', 'author']).then(function(dataobjects) {});
	     */
	
	  fields: function fields() {
	    var _fields = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	    this.query['fields'] = _fields.join();
	    return this;
	  }
	});
	
	var First = exports.First = (0, _stampit2.default)().methods({
	
	  /**
	  * Returns the first object matched by the lookup properties or undefined, if there is no matching object.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} [properties = {}]
	  * @param {Object} [query = {}]
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * Instance.please().first().then(function(instance) {});
	  * Class.please().first({instanceName: 'test-one'}).then(function(cls) {});
	   */
	
	  first: function first() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return this.pageSize(1).list(properties, query).then(function (objects) {
	      if (objects.length) {
	        return objects[0];
	      }
	    });
	  }
	});
	
	var PageSize = exports.PageSize = (0, _stampit2.default)().methods({
	
	  /**
	  * Sets page size.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Number} value
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance.please().pageSize(2).then(function(instances) {});
	  * Class.please({instanceName: 'test-one'}).pageSize(2).then(function(classes) {});
	   */
	
	  pageSize: function pageSize(value) {
	    this.query['page_size'] = value;
	    return this;
	  }
	});
	
	var Ordering = exports.Ordering = (0, _stampit2.default)().methods({
	
	  /**
	  * Sets order of returned objects.
	   * @memberOf QuerySet
	  * @instance
	   * @param {String} [value = 'asc'] allowed choices are "asc" and "desc"
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance.please().ordering('desc').then(function(instances) {});
	  * Class.please({instanceName: 'test-one'}).ordering('desc').then(function(classes) {});
	   */
	
	  ordering: function ordering() {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? 'asc' : arguments[0];
	
	    var allowed = ['asc', 'desc'];
	    var ordering = value.toLowerCase();
	
	    if (!(0, _includes3.default)(allowed, ordering)) {
	      throw Error('Invalid order value: "' + value + '", allowed choices are ' + allowed.join() + '.');
	    }
	
	    this.query['ordering'] = ordering;
	    return this;
	  }
	});
	
	var Raw = exports.Raw = (0, _stampit2.default)().methods({
	
	  /**
	  * Disables serialization. Callback will will recive raw JavaScript objects.
	   * @memberOf QuerySet
	  * @instance
	   * @returns {QuerySet}
	   * @example {@lang javascript}
	  * Instance.please().raw().then(function(response) {});
	  * Class.please({instanceName: 'test-one'}).raw().then(function(response) {});
	   */
	
	  raw: function raw() {
	    this._serialize = false;
	    return this;
	  }
	});
	
	var BulkCreate = exports.BulkCreate = (0, _stampit2.default)().methods({
	
	  /**
	  * Creates many objects based on provied Array of objects.
	   * @memberOf QuerySet
	  * @instance
	   * @param {Array} objects
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * const objects = [Instance({name: 'test1'}), Instance({name: 'tes21'})];
	  * Instance.please().bulkCreate(objects).then(function(instances) {
	  *   console.log('instances', instances);
	  * });
	   */
	
	  bulkCreate: function bulkCreate(objects) {
	    return _bluebird2.default.mapSeries(objects, function (o) {
	      return o.save();
	    });
	  }
	});
	
	/**
	 * Base class responsible for all ORM (``please``) actions.
	 * @constructor
	 * @type {QuerySet}
	
	 * @property {Object}  model
	 * @property {String}  [endpoint = 'list']
	 * @property {String}  [method = 'GET']
	 * @property {Object}  [headers = {}]
	 * @property {Object}  [properties = {}]
	 * @property {Object}  [query = {}]
	 * @property {Object}  [payload = {}]
	 * @property {Object}  [attachments = {}]
	 * @property {Boolean}  [_serialize = true]
	 */
	var QuerySet = _stampit2.default.compose(QuerySetRequest, Create, BulkCreate, Get, GetOrCreate, List, Delete, Update, UpdateOrCreate, First, PageSize, Ordering, Fields, ExcludedFields, Raw, TemplateResponse);
	
	var BaseQuerySet = exports.BaseQuerySet = _stampit2.default.compose(QuerySetRequest, Raw, Fields, ExcludedFields, Ordering, First, PageSize, TemplateResponse);
	
	exports.default = QuerySet;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(68),
	    copyObject = __webpack_require__(167),
	    createAssigner = __webpack_require__(81),
	    isArrayLike = __webpack_require__(7),
	    isPrototype = __webpack_require__(48),
	    keys = __webpack_require__(8);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * Assigns own enumerable properties of source objects to the destination
	 * object. Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});
	
	module.exports = assign;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(176),
	    isFunction = __webpack_require__(21),
	    isLength = __webpack_require__(32);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(42),
	    baseKeys = __webpack_require__(152),
	    indexKeys = __webpack_require__(85),
	    isArrayLike = __webpack_require__(7),
	    isIndex = __webpack_require__(27),
	    isPrototype = __webpack_require__(48);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(67),
	    toInteger = __webpack_require__(33);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = rest;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(66),
	    isSymbol = __webpack_require__(211);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toString;


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(26),
	    root = __webpack_require__(15);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}
	
	module.exports = isKeyable;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(166);
	
	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};
	
	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;
	
	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);
	
	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);
	
	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module), (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5),
	    isObjectLike = __webpack_require__(10);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _tinyPromisify = __webpack_require__(263);
	
	var _tinyPromisify2 = _interopRequireDefault(_tinyPromisify);
	
	var _promiseMapSeries = __webpack_require__(230);
	
	var _promiseMapSeries2 = _interopRequireDefault(_promiseMapSeries);
	
	var _promiseSpread = __webpack_require__(232);
	
	var _promiseSpread2 = _interopRequireDefault(_promiseSpread);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	Promise.promisify = _tinyPromisify2.default;
	Promise.mapSeries = _promiseMapSeries2.default;
	Promise.spread = _promiseSpread2.default;
	
	exports.default = Promise;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _reduce2 = __webpack_require__(54);
	
	var _reduce3 = _interopRequireDefault(_reduce2);
	
	var _isUndefined2 = __webpack_require__(213);
	
	var _isUndefined3 = _interopRequireDefault(_isUndefined2);
	
	var _includes2 = __webpack_require__(52);
	
	var _includes3 = _interopRequireDefault(_includes2);
	
	var _isEmpty2 = __webpack_require__(20);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _defaults2 = __webpack_require__(49);
	
	var _defaults3 = _interopRequireDefault(_defaults2);
	
	var _startsWith2 = __webpack_require__(223);
	
	var _startsWith3 = _interopRequireDefault(_startsWith2);
	
	var _isString2 = __webpack_require__(17);
	
	var _isString3 = _interopRequireDefault(_isString2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _bluebird = __webpack_require__(18);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _superagent = __webpack_require__(258);
	
	var _superagent2 = _interopRequireDefault(_superagent);
	
	var _utils = __webpack_require__(23);
	
	var _errors = __webpack_require__(36);
	
	var _file = __webpack_require__(62);
	
	var _file2 = _interopRequireDefault(_file);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var IS_NODE = typeof module !== 'undefined' && module.exports && typeof __webpack_require__ === 'undefined';
	
	/**
	 * Base request object **not** meant to be used directly more like mixin in other {@link https://github.com/stampit-org/stampit|stamps}.
	
	 * @constructor
	 * @type {Request}
	
	 * @property {Object} _request
	 * @property {Function} [_request.handler = superagent]
	 * @property {Array} [_request.allowedMethods = ['GET', 'POST', 'DELETE', 'HEAD', 'PUT', 'PATCH']]
	
	 * @example {@lang javascript}
	 * var MyStamp = stampit().compose(Request);
	 */
	var Request = (0, _stampit2.default)().compose(_utils.ConfigMixin, _utils.Logger).refs({
	  _request: {
	    handler: _superagent2.default,
	    allowedMethods: ['GET', 'POST', 'DELETE', 'HEAD', 'PUT', 'PATCH']
	  }
	}).methods({
	
	  /**
	   * Sets request handler, used for mocking.
	   * @memberOf Request
	   * @instance
	   * @param {Function} handler
	   * @returns {Request}
	   */
	
	  setRequestHandler: function setRequestHandler(handler) {
	    this._request.handler = handler;
	    return this;
	  },
	
	
	  /**
	  * Gets request handler.
	  * @memberOf Request
	  * @instance
	  * @returns {Function}
	  */
	  getRequestHandler: function getRequestHandler() {
	    return this._request.handler;
	  },
	
	
	  /**
	  * Builds full URL based on path.
	   * @memberOf Request
	  * @instance
	   * @param {String} path path part of URL e.g: /v1.1/instances/
	  * @returns {String}
	   */
	  buildUrl: function buildUrl(path) {
	    var config = this.getConfig();
	
	    if (!(0, _isString3.default)(path)) {
	      return _bluebird2.default.reject(new Error('"path" needs to be a string.'));
	    }
	
	    if ((0, _startsWith3.default)(path, config.getBaseUrl())) {
	      return path;
	    }
	
	    return '' + config.getBaseUrl() + path;
	  },
	
	
	  /**
	  * Wrapper around {@link http://visionmedia.github.io/superagent/|superagent} which validates and calls requests.
	   * @memberOf Request
	  * @instance
	   * @param {String} methodName e.g GET, POST
	  * @param {String} path e.g /v1.1/instances/
	  * @param {Object} requestOptions All options required to build request
	  * @param {String} [requestOptions.type = 'json'] request type e.g form, json, png
	  * @param {String} [requestOptions.accept = 'json'] request accept e.g form, json, png
	  * @param {Number} [requestOptions.timeout = 15000] request timeout
	  * @param {Object} [requestOptions.headers = {}] request headers
	  * @param {Object} [requestOptions.query = {}] request query
	  * @param {Object} [requestOptions.payload = {}] request payload
	  * @returns {Promise}
	   */
	  makeRequest: function makeRequest(methodName, path, requestOptions) {
	    var _this = this;
	
	    var config = this.getConfig();
	    var method = (methodName || '').toUpperCase();
	    var options = (0, _defaults3.default)({}, requestOptions, {
	      type: 'json',
	      accept: 'json',
	      timeout: 15000,
	      headers: {},
	      query: {},
	      payload: {},
	      responseAttr: 'body'
	    });
	
	    if ((0, _isEmpty3.default)(methodName) || !(0, _includes3.default)(this._request.allowedMethods, method)) {
	      return _bluebird2.default.reject(new Error('Invalid request method: "' + methodName + '".'));
	    }
	
	    if ((0, _isEmpty3.default)(path)) {
	      return _bluebird2.default.reject(new Error('"path" is required.'));
	    }
	
	    if (!(0, _isUndefined3.default)(config)) {
	      if (!(0, _isEmpty3.default)(config.getAccountKey())) {
	        options.headers['X-API-KEY'] = config.getAccountKey();
	      }
	
	      // Yes, we will replace account key
	      if (!(0, _isEmpty3.default)(config.getApiKey())) {
	        options.headers['X-API-KEY'] = config.getApiKey();
	      }
	
	      if (!(0, _isEmpty3.default)(config.getUserKey())) {
	        options.headers['X-USER-KEY'] = config.getUserKey();
	      }
	
	      if (!(0, _isEmpty3.default)(config.getSocialToken())) {
	        options.headers['Authorization'] = 'Token ' + config.getSocialToken();
	      }
	    }
	
	    // Grab files
	    var files = (0, _reduce3.default)(options.payload, function (result, value, key) {
	      if (value instanceof _file2.default) {
	        result[key] = value;
	      }
	      return result;
	    }, {});
	
	    var handler = this.getRequestHandler();
	    var request = handler(method, this.buildUrl(path)).accept(options.accept).timeout(options.timeout).set(options.headers).query(options.query);
	
	    if ((0, _isEmpty3.default)(files)) {
	      request = request.type(options.type).send(options.payload);
	    } else if (IS_NODE === false && typeof FormData !== 'undefined' && typeof File !== 'undefined') {
	      options.type = null;
	      options.payload = (0, _reduce3.default)(options.payload, function (formData, value, key) {
	        formData.append(key, files[key] ? value.content : value);
	        return formData;
	      }, new FormData());
	
	      request = request.type(options.type).send(options.payload);
	    } else if (IS_NODE === true) {
	      request = (0, _reduce3.default)(options.payload, function (result, value, key) {
	        return files[key] ? result.attach(key, value.content) : result.field(key, value);
	      }, request.type('form'));
	    }
	
	    return _bluebird2.default.promisify(request.end, { context: request })().then(function (response) {
	      if (!response.ok) {
	        return _bluebird2.default.reject(new _errors.RequestError({
	          response: response,
	          status: response.status,
	          message: 'Bad request'
	        }));
	      }
	      return response[options.responseAttr];
	    }).catch(function (err) {
	      if (err.status && err.response) {
	        _this.log('\n' + method + ' ' + path + '\n' + JSON.stringify(options, null, 2) + '\n');
	        _this.log('Response ' + err.status + ':', err.errors);
	
	        if (err.name !== 'RequestError') {
	          return _bluebird2.default.reject(new _errors.RequestError(err, err.response));
	        }
	      }
	      throw err;
	    });
	  }
	}).static({
	
	  /**
	  * Sets request handler and returns new {@link https://github.com/stampit-org/stampit|stampit} object, used for mocking.
	  * @memberOf Request
	  * @static
	  * @returns {stampit}
	  */
	
	  setRequestHandler: function setRequestHandler(handler) {
	    var _request = this.fixed.refs._request || {};
	    _request.handler = handler;
	    return this.refs({ _request: _request });
	  },
	
	
	  /**
	  * Sets request handler from {@link https://github.com/stampit-org/stampit|stampit} definition.
	  * @memberOf Request
	  * @static
	  * @returns {Function}
	  */
	  getRequestHandler: function getRequestHandler() {
	    return this.fixed.refs._request.handler;
	  }
	});
	
	exports.default = Request;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(5),
	    isArrayLike = __webpack_require__(7),
	    isFunction = __webpack_require__(21),
	    isString = __webpack_require__(17);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if `value` is an empty collection or object. A value is considered
	 * empty if it's an `arguments` object, array, string, or jQuery-like collection
	 * with a length of `0` or has no own enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (isArrayLike(value) &&
	      (isArray(value) || isString(value) ||
	        isFunction(value.splice) || isArguments(value))) {
	    return !value.length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = isEmpty;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Logger = exports.ConstraintsMixin = exports.MetaMixin = exports.ConfigMixin = exports.EventEmittable = undefined;
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _eventemitter = __webpack_require__(104);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Simple wrapper around `EventEmitter`
	 * @constructor
	 * @type {EventEmittable}
	
	 * @example {@lang javascript}
	 * var EmittableModel = stampit().compose(EventEmittable);
	 */
	var EventEmittable = exports.EventEmittable = _stampit2.default.convertConstructor(_eventemitter2.default);
	
	/**
	 * Used as a manager for {@link Syncano} base object. **Not** meant to be used directly.
	 * @constructor
	 * @type {ConfigMixin}
	
	 * @property {Syncano} _config private attribute which holds {@link Syncano} object
	
	 * @example {@lang javascript}
	 * var MyStamp = stampit().compose(ConfigMixin);
	 */
	var ConfigMixin = exports.ConfigMixin = (0, _stampit2.default)({
	  methods: {
	    /**
	    * Gets default properties.
	     * @memberOf ConfigMixin
	    * @instance
	    * @returns {Object}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConfigMixin);
	    * var config = MyStamp().getDefaultProperties();
	     */
	
	    getDefaultProperties: function getDefaultProperties() {
	      return this._config.defaults;
	    },
	
	
	    /**
	    * Sets config.
	     * @memberOf ConfigMixin
	    * @instance
	     * @param {Syncano} config instance of {@link Syncano} object
	    * @returns {ConfigMixin}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConfigMixin);
	    * var newObject = MyStamp().setConfig({});
	     */
	    setConfig: function setConfig(config) {
	      this._config = config;
	      return this;
	    },
	
	
	    /**
	    * Gets config.
	     * @memberOf ConfigMixin
	    * @instance
	    * @returns {Syncano}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConfigMixin);
	    * var config = MyStamp().getConfig();
	     */
	    getConfig: function getConfig() {
	      return this._config;
	    }
	  },
	
	  static: {
	    getDefaultProperties: function getDefaultProperties() {
	      return this.fixed.refs._config.defaults;
	    },
	
	
	    /**
	    * Sets config and returns new {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf ConfigMixin
	    * @static
	     * @param {Syncano} config instance of {@link Syncano} object
	    * @returns {stampit}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConfigMixin).setConfig({});
	     */
	    setConfig: function setConfig(config) {
	      return this.refs({ _config: config });
	    },
	
	
	    /**
	    * Gets config from {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf ConfigMixin
	    * @static
	    * @returns {Syncano}
	     * @example {@lang javascript}
	    * var config = stampit().compose(ConfigMixin).getConfig();
	     */
	    getConfig: function getConfig() {
	      return this.fixed.refs._config;
	    }
	  }
	});
	
	/**
	 * Used as a manager for {@link Meta} object. **Not** meant to be used directly.
	 * @constructor
	 * @type {MetaMixin}
	
	 * @property {Object} _meta private attribute which holds {@link Meta} object
	
	 * @example {@lang javascript}
	 * var MyStamp = stampit().compose(MetaMixin);
	 */
	var MetaMixin = exports.MetaMixin = (0, _stampit2.default)({
	  methods: {
	
	    /**
	    * Sets meta.
	     * @memberOf MetaMixin
	    * @instance
	     * @param {Meta} meta instance of {@link Meta} object
	    * @returns {MetaMixin}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(MetaMixin);
	    * var newObject = MyStamp().setMeta({});
	     */
	
	    setMeta: function setMeta(meta) {
	      this._meta = meta;
	      return this;
	    },
	
	
	    /**
	    * Gets meta.
	     * @memberOf MetaMixin
	    * @instance
	    * @returns {Meta}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(MetaMixin);
	    * var meta = MyStamp().getMeta();
	     */
	    getMeta: function getMeta() {
	      return this._meta;
	    }
	  },
	
	  static: {
	
	    /**
	    * Sets meta and returns new {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf MetaMixin
	    * @static
	     * @param {Meta} meta instance of {@link Meta} object
	    * @returns {stampit}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(MetaMixin).setMeta({});
	     */
	
	    setMeta: function setMeta(meta) {
	      return this.refs({ _meta: meta });
	    },
	
	
	    /**
	    * Gets meta from {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf MetaMixin
	    * @static
	    * @returns {Meta}
	     * @example {@lang javascript}
	    * var meta = stampit().compose(MetaMixin).getMeta();
	     */
	    getMeta: function getMeta() {
	      return this.fixed.refs._meta;
	    }
	  }
	});
	
	/**
	 * Used as a manager for {@link http://validatejs.org/#constraints|Constraints} object (validation). **Not** meant to be used directly.
	 * @constructor
	 * @type {ConstraintsMixin}
	
	 * @property {Object} _constraints private attribute which holds constraints object
	
	 * @example {@lang javascript}
	 * var MyStamp = stampit().compose(ConstraintsMixin);
	 */
	var ConstraintsMixin = exports.ConstraintsMixin = (0, _stampit2.default)({
	  methods: {
	
	    /**
	    * Sets constraints used for validation.
	     * @memberOf ConstraintsMixin
	    * @instance
	     * @param {Object} constraints plain JavaScript object
	    * @returns {ConstraintsMixin}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConstraintsMixin);
	    * var newObject = MyStamp().setConstraints({});
	     */
	
	    setConstraints: function setConstraints(constraints) {
	      this._constraints = constraints;
	      return this;
	    },
	
	
	    /**
	    * Gets constraints from object instance.
	     * @memberOf ConstraintsMixin
	    * @instance
	    * @returns {Object}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConstraintsMixinn);
	    * var constraints = MyStamp().getConstraints();
	     */
	    getConstraints: function getConstraints() {
	      return this._constraints;
	    }
	  },
	
	  static: {
	
	    /**
	    * Sets constraints in {@link https://github.com/stampit-org/stampit|stampit} definition used for validation.
	     * @memberOf ConstraintsMixin
	    * @static
	     * @param {Object} constraints plain JavaScript object
	    * @returns {stampit}
	     * @example {@lang javascript}
	    * var MyStamp = stampit().compose(ConstraintsMixin).setConstraints({});
	     */
	
	    setConstraints: function setConstraints(constraints) {
	      return this.refs({ _constraints: constraints });
	    },
	
	
	    /**
	    * Gets constraints from {@link https://github.com/stampit-org/stampit|stampit} definition.
	     * @memberOf ConstraintsMixin
	    * @static
	    * @returns {Object}
	     * @example {@lang javascript}
	    * var constraints = stampit().compose(ConstraintsMixin).getConstraints();
	     */
	    getConstraints: function getConstraints() {
	      return this.fixed.refs._constraints;
	    }
	  }
	});
	
	/**
	 * Adds logging functionality.
	 * @constructor
	 * @type {Logger}
	
	 * @example {@lang javascript}
	 * var MyStamp = stampit().compose(Logger);
	 */
	var Logger = exports.Logger = (0, _stampit2.default)({
	  methods: {
	
	    /**
	    * Wrapper around *console.log*.
	    * @memberOf Logger
	    * @instance
	    */
	
	    log: function log() {
	      var env = undefined || 'test';
	      if (env === 'development') {
	        var _console;
	
	        /* eslint-disable no-console */
	        (_console = console).log.apply(_console, arguments);
	        /* eslint-enable no-console */
	      }
	    }
	  }
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(29);
	
	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(139),
	    isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(5),
	    isArrayLikeObject = __webpack_require__(31);
	
	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, isStrict, result) {
	  result || (result = []);
	
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && isArrayLikeObject(value) &&
	        (isStrict || isArray(value) || isArguments(value))) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = baseFlatten;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(209);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(26);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 29 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(31);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(7),
	    isObjectLike = __webpack_require__(10);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(224);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(255);
	
	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}
	
	module.exports = bindCallback;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(95),
	    isLength = __webpack_require__(22),
	    isObjectLike = __webpack_require__(56);
	
	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');
	
	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};
	
	module.exports = isArray;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty2 = __webpack_require__(20);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _isArray2 = __webpack_require__(5);
	
	var _isArray3 = _interopRequireDefault(_isArray2);
	
	var _reduce2 = __webpack_require__(54);
	
	var _reduce3 = _interopRequireDefault(_reduce2);
	
	var _isObject2 = __webpack_require__(16);
	
	var _isObject3 = _interopRequireDefault(_isObject2);
	
	var _map2 = __webpack_require__(53);
	
	var _map3 = _interopRequireDefault(_map2);
	
	exports.SyncanoError = SyncanoError;
	exports.PaginationError = PaginationError;
	exports.ValidationError = ValidationError;
	exports.RequestError = RequestError;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function SyncanoError(message) {
	  this.name = 'SyncanoError';
	  this.message = message || '';
	  this.stack = new Error().stack;
	} // something is wrong with babel6 in terms of error inheritance
	// so for now we will use almost plain js here
	
	
	SyncanoError.prototype = Object.create(Error.prototype);
	SyncanoError.prototype.constructor = SyncanoError;
	
	function PaginationError(message) {
	  this.name = 'PaginationError';
	  this.message = message || '';
	  this.stack = new Error().stack;
	}
	
	PaginationError.prototype = Object.create(SyncanoError.prototype);
	PaginationError.prototype.constructor = SyncanoError;
	
	function ValidationError() {
	  var errors = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  this.name = 'ValidationError';
	  this.stack = new Error().stack;
	  this.errors = errors;
	  this.message = (0, _map3.default)(errors, function (value, key) {
	    return '"' + key + '" ' + value.join(', ');
	  }).join('\n');
	}
	
	ValidationError.prototype = Object.create(SyncanoError.prototype);
	ValidationError.prototype.constructor = ValidationError;
	
	function RequestError(error) {
	  var _this = this;
	
	  this.name = 'RequestError';
	  this.status = error.status;
	  this.errors = error.response.body;
	  this.originalError = error;
	  this.response = error.response;
	  this.message = '';
	  this.stack = new Error().stack;
	
	  if ((0, _isObject3.default)(this.errors)) {
	    this.message = (0, _reduce3.default)(['detail', 'error', '__all__', 'non_field_errors'], function (result, value) {
	      var error = _this.errors[value];
	
	      if ((0, _isArray3.default)(error)) {
	        error = error.join(', ');
	      }
	
	      result += error || '';
	      return result;
	    }, this.message);
	
	    if ((0, _isEmpty3.default)(this.message)) {
	      this.message = (0, _map3.default)(this.errors, function (value, key) {
	        if ((0, _isArray3.default)(value)) {
	          value = value.join(', ');
	        }
	        return '"' + key + '" ' + value;
	      }).join('\n');
	    }
	  }
	
	  if ((0, _isEmpty3.default)(this.message)) {
	    this.message = error.message;
	  }
	}
	
	RequestError.prototype = Object.create(SyncanoError.prototype);
	RequestError.prototype.constructor = RequestError;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(63),
	    cachePush = __webpack_require__(165);
	
	/**
	 *
	 * Creates a set cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.push(values[index]);
	  }
	}
	
	// Add functions to the `SetCache`.
	SetCache.prototype.push = cachePush;
	
	module.exports = SetCache;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(43);
	
	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  return !!array.length && baseIndexOf(array, value, 0) > -1;
	}
	
	module.exports = arrayIncludes;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arrayIncludesWith;


/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	function arrayReduce(array, iteratee, accumulator, initAccum) {
	  var index = -1,
	      length = array.length;
	
	  if (initAccum && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}
	
	module.exports = arrayReduce;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(75),
	    createBaseEach = __webpack_require__(168);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	module.exports = baseHas;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(86);
	
	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOf;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(155),
	    baseMatchesProperty = __webpack_require__(156),
	    identity = __webpack_require__(89),
	    isArray = __webpack_require__(5),
	    property = __webpack_require__(219);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value;
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}
	
	module.exports = baseUnary;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(14);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Checks if `value` is in `cache`.
	 *
	 * @private
	 * @param {Object} cache The set cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function cacheHas(cache, value) {
	  var map = cache.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;
	
	    return hash[value] === HASH_UNDEFINED;
	  }
	  return map.has(value);
	}
	
	module.exports = cacheHas;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) &&
	    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}
	
	module.exports = isKey;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(67),
	    assignInDefaults = __webpack_require__(141),
	    assignInWith = __webpack_require__(200),
	    rest = __webpack_require__(9);
	
	/**
	 * Assigns own and inherited enumerable properties of source objects to the
	 * destination object for all destination properties that resolve to `undefined`.
	 * Source objects are applied from left to right. Once a property is set,
	 * additional values of the same property are ignored.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	 * // => { 'user': 'barney', 'age': 36 }
	 */
	var defaults = rest(function(args) {
	  args.push(undefined, assignInDefaults);
	  return apply(assignInWith, undefined, args);
	});
	
	module.exports = defaults;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(137),
	    baseCastFunction = __webpack_require__(143),
	    baseEach = __webpack_require__(41),
	    isArray = __webpack_require__(5);
	
	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	 * for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => logs `1` then `2`
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' then 'b' (iteration order is not guaranteed)
	 */
	function forEach(collection, iteratee) {
	  return (typeof iteratee == 'function' && isArray(collection))
	    ? arrayEach(collection, iteratee)
	    : baseEach(collection, baseCastFunction(iteratee));
	}
	
	module.exports = forEach;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(76);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(43),
	    isArrayLike = __webpack_require__(7),
	    isString = __webpack_require__(17),
	    toInteger = __webpack_require__(33),
	    values = __webpack_require__(228);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Checks if `value` is in `collection`. If `collection` is a string it's checked
	 * for a substring of `value`, otherwise [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * is used for equality comparisons. If `fromIndex` is negative, it's used as
	 * the offset from the end of `collection`.
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
	 * @returns {boolean} Returns `true` if `value` is found, else `false`.
	 * @example
	 *
	 * _.includes([1, 2, 3], 1);
	 * // => true
	 *
	 * _.includes([1, 2, 3], 1, 2);
	 * // => false
	 *
	 * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	 * // => true
	 *
	 * _.includes('pebbles', 'eb');
	 * // => true
	 */
	function includes(collection, value, fromIndex, guard) {
	  collection = isArrayLike(collection) ? collection : values(collection);
	  fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;
	
	  var length = collection.length;
	  if (fromIndex < 0) {
	    fromIndex = nativeMax(length + fromIndex, 0);
	  }
	  return isString(collection)
	    ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
	    : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
	}
	
	module.exports = includes;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(6),
	    baseIteratee = __webpack_require__(44),
	    baseMap = __webpack_require__(154),
	    isArray = __webpack_require__(5);
	
	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	 * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	 * and `words`
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = map;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(40),
	    baseEach = __webpack_require__(41),
	    baseIteratee = __webpack_require__(44),
	    baseReduce = __webpack_require__(159),
	    isArray = __webpack_require__(5);
	
	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` through `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not given the first element of `collection` is used as the initial
	 * value. The iteratee is invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	 * and `sortBy`
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.reduce([1, 2], function(sum, n) {
	 *   return sum + n;
	 * }, 0);
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	 *   (result[value] || (result[value] = [])).push(key);
	 *   return result;
	 * }, {});
	 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	 */
	function reduce(collection, iteratee, accumulator) {
	  var func = isArray(collection) ? arrayReduce : baseReduce,
	      initAccum = arguments.length < 3;
	
	  return func(collection, baseIteratee(iteratee, 4), accumulator, initAccum, baseEach);
	}
	
	module.exports = reduce;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(93),
	    keys = __webpack_require__(100);
	
	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]';
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 60 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(60).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61).setImmediate, __webpack_require__(61).clearImmediate))

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SyncanoFile = function SyncanoFile(content) {
	  _classCallCheck(this, SyncanoFile);
	
	  this.content = content;
	};
	
	exports.default = SyncanoFile;
	module.exports = exports["default"];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(185),
	    mapDelete = __webpack_require__(186),
	    mapGet = __webpack_require__(187),
	    mapHas = __webpack_require__(188),
	    mapSet = __webpack_require__(189);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;
	
	module.exports = MapCache;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(26),
	    root = __webpack_require__(15);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(192),
	    stackDelete = __webpack_require__(193),
	    stackGet = __webpack_require__(194),
	    stackHas = __webpack_require__(195),
	    stackSet = __webpack_require__(196);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(15);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(29);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}
	
	module.exports = assocDelete;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}
	
	module.exports = assocGet;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}
	
	module.exports = assocHas;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(24);
	
	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}
	
	module.exports = assocSet;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(5),
	    stringToPath = __webpack_require__(198);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = baseCastPath;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(37),
	    arrayIncludes = __webpack_require__(38),
	    arrayIncludesWith = __webpack_require__(39),
	    arrayMap = __webpack_require__(6),
	    baseUnary = __webpack_require__(45),
	    cacheHas = __webpack_require__(46);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of methods like `_.difference` without support for
	 * excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;
	
	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseDifference;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(145),
	    keys = __webpack_require__(8);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(73),
	    isKey = __webpack_require__(47);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(150),
	    isObject = __webpack_require__(16),
	    isObjectLike = __webpack_require__(10);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(40);
	
	/**
	 * The base implementation of `_.pick` without support for individual
	 * property names.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function basePick(object, props) {
	  object = Object(object);
	  return arrayReduce(props, function(result, key) {
	    if (key in object) {
	      result[key] = object[key];
	    }
	    return result;
	  }, {});
	}
	
	module.exports = basePick;


/***/ },
/* 79 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(68);
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.exports = copyObjectWith;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(182),
	    rest = __webpack_require__(9);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(140);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(73),
	    isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(5),
	    isIndex = __webpack_require__(27),
	    isKey = __webpack_require__(47),
	    isLength = __webpack_require__(32),
	    isString = __webpack_require__(17),
	    last = __webpack_require__(91),
	    parent = __webpack_require__(191);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseCastPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || (
	    !!length && isLength(length) && isIndex(path, length) &&
	    (isArray(object) || isString(object) || isArguments(object))
	  );
	}
	
	module.exports = hasPath;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(28);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(161),
	    isArguments = __webpack_require__(30),
	    isArray = __webpack_require__(5),
	    isLength = __webpack_require__(32),
	    isString = __webpack_require__(17);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);
	
	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = indexOfNaN;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(153),
	    indexKeys = __webpack_require__(85),
	    isIndex = __webpack_require__(27),
	    isPrototype = __webpack_require__(48);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 91 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}
	
	module.exports = last;


/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(242);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(239);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(251);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(94),
	    isLength = __webpack_require__(22);
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	
	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}
	
	module.exports = toObject;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(96),
	    isObjectLike = __webpack_require__(56);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}
	
	module.exports = isArguments;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(95),
	    isArrayLike = __webpack_require__(96),
	    isObject = __webpack_require__(12),
	    shimKeys = __webpack_require__(249);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};
	
	module.exports = keys;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(99),
	    isArray = __webpack_require__(35),
	    isIndex = __webpack_require__(97),
	    isLength = __webpack_require__(22),
	    isObject = __webpack_require__(12);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;
	
	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;
	
	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isObject(obj) {
	  return null != obj && 'object' == typeof obj;
	}
	
	module.exports = isObject;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _replace2 = __webpack_require__(222);
	
	var _replace3 = _interopRequireDefault(_replace2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _request = __webpack_require__(19);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Wrapper around account endpoint. Meant to be used directly form {@link Syncano} instance.
	
	 * @constructor
	 * @type {Account}
	
	 * @example {@lang javascript}
	 * const {Account} = Syncano();
	 * Account.login({email: '', password: ''}).then((user) => {
	 *
	 * });
	 */
	var Account = (0, _stampit2.default)().compose(_request2.default).props({
	  _account: {
	    registerPath: '/v1.1/account/register/',
	    loginPath: '/v1.1/account/auth/',
	    socialLoginPath: '/v1.1/account/auth/{backend}/',
	    updatePath: '/v1.1/account/',
	    activatePath: '/v1.1/account/activate/',
	    emailPath: '/v1.1/account/resend_email/',
	    resetKeyPath: '/v1.1/account/reset_key/',
	    changePasswordPath: '/v1.1/account/password/',
	    setPasswordPath: '/v1.1/account/password/set/',
	    resetPasswordPath: '/v1.1/account/password/reset/',
	    resetPasswordConfimPath: '/v1.1/account/password/reset/confirm/'
	  }
	}).methods({
	
	  /**
	  * A convenience method for activating an accoung.
	   * @memberOf Account
	  * @instance
	   * @param {Object} payload
	  * @param {String} payload.uid
	  * @param {String} payload.token
	  * @returns {Promise}
	   */
	
	  activate: function activate() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var path = this._account.activatePath;
	    return this.makeRequest('POST', path, { payload: payload });
	  },
	
	
	  /**
	  * A convenience method for changing an accoung.
	   * @memberOf Account
	  * @instance
	   * @param {Object} payload
	  * @param {String} payload.current_password
	  * @param {String} payload.new_password
	  * @returns {Promise}
	   */
	  changePassword: function changePassword() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var path = this._account.changePasswordPath;
	    return this.makeRequest('POST', path, { payload: payload });
	  },
	
	
	  /**
	  * A convenience method for resetting the password.
	   * @memberOf Account
	  * @instance
	   * @param {String} email
	  * @returns {Promise}
	   */
	  resetPassword: function resetPassword(email) {
	    var path = this._account.resetPasswordPath;
	    return this.makeRequest('POST', path, { payload: { email: email } });
	  },
	
	
	  /**
	  * A convenience method for confirming password reset.
	   * @memberOf Account
	  * @instance
	   * @param {Object} payload
	  * @param {String} payload.uid
	  * @param {String} payload.token
	  * @param {String} payload.new_password
	  * @returns {Promise}
	   */
	  confirmPasswordReset: function confirmPasswordReset() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var path = this._account.resetPasswordConfimPath;
	    return this.makeRequest('POST', path, { payload: payload });
	  },
	
	
	  /**
	  * A convenience method for setting the password.
	   * @memberOf Account
	  * @param {String} password
	  * @instance
	   * @returns {Promise}
	   */
	  setPassword: function setPassword(password) {
	    var path = this._account.setPasswordPath;
	    return this.makeRequest('POST', path, { payload: { password: password } });
	  },
	
	
	  /**
	  * A convenience method for resetting the account key.
	   * @memberOf Account
	  * @instance
	   * @returns {Promise}
	   */
	  resetKey: function resetKey() {
	    var path = this._account.resetKeyPath;
	    return this.makeRequest('POST', path);
	  },
	
	
	  /**
	  * A convenience method for creating a new account.
	   * @memberOf Account
	  * @instance
	   * @param {Object} payload
	  * @param {String} payload.email
	  * @param {String} payload.password
	  * @returns {Promise}
	   */
	  register: function register() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var path = this._account.registerPath;
	    return this.makeRequest('POST', path, { payload: payload });
	  },
	
	
	  /**
	  * A convenience method for authenticating with email and password.
	   * @memberOf Account
	  * @instance
	   * @param {Object} payload
	  * @param {String} payload.email
	  * @param {String} payload.password
	  * @param {Boolean} [setAccountKey = true]
	  * @returns {Promise}
	   */
	  login: function login() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var setAccountKey = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    var config = this.getConfig();
	    var path = this._account.loginPath;
	
	    return this.makeRequest('POST', path, { payload: payload }).then(function (user) {
	      if (setAccountKey === true) {
	        config.setAccountKey(user.account_key);
	      }
	      return user;
	    });
	  },
	
	
	  /**
	  * A convenience method for authenticating with a social media token.
	   * @memberOf Account
	  * @instance
	   * @param {String} backend
	  * @param {String} access_token
	  * @returns {Promise}
	   */
	  socialLogin: function socialLogin(backend, access_token) {
	    var path = (0, _replace3.default)(this._account.socialLoginPath, '{backend}', backend);
	    return this.makeRequest('POST', path, { payload: { access_token: access_token } });
	  },
	
	
	  /**
	  * A convenience method for resending email.
	   * @memberOf Account
	  * @instance
	   * @param {String} email
	  * @returns {Promise}
	   */
	  resendEmail: function resendEmail(email) {
	    var path = this._account.emailPath;
	    return this.makeRequest('POST', path, { payload: { email: email } });
	  },
	
	
	  /**
	  * A convenience method for updating your account details.
	   * @memberOf Account
	  * @instance
	   * @param {Object} payload
	  * @param {String} payload.first_name
	  * @param {String} payload.last_name
	  * @returns {Promise}
	   */
	  update: function update() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var path = this._account.updatePath;
	    return this.makeRequest('PUT', path, { payload: payload });
	  }
	});
	
	exports.default = Account;
	module.exports = exports['default'];

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _forEach2 = __webpack_require__(50);
	
	var _forEach3 = _interopRequireDefault(_forEach2);
	
	var _pull2 = __webpack_require__(220);
	
	var _pull3 = _interopRequireDefault(_pull2);
	
	var _isArray2 = __webpack_require__(5);
	
	var _isArray3 = _interopRequireDefault(_isArray2);
	
	exports.default = EventEmitter;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	* A simple implementation of an EventEmitter. Created for compatibility with environments that don't have access to native node modules (like React Native). Not meant to be used on it's own.
	*/
	
	function EventEmitter() {
	    this.events = {};
	}
	
	EventEmitter.prototype.on = function (event, listener) {
	    if (!(0, _isArray3.default)(this.events[event])) {
	        this.events[event] = [];
	    }
	    this.events[event].push(listener);
	};
	
	EventEmitter.prototype.removeListener = function (event, listener) {
	    if ((0, _isArray3.default)(this.events[event])) {
	        (0, _pull3.default)(this.events[event], listener);
	    }
	};
	
	EventEmitter.prototype.emit = function (event) {
	    var _this = this,
	        _arguments = arguments;
	
	    if ((0, _isArray3.default)(this.events[event])) {
	        (function () {
	            var listeners = _this.events[event].slice();
	            var args = [].slice.call(_arguments, 1);
	            (0, _forEach3.default)(listeners, function (listener) {
	                return listener.apply(_this, args);
	            });
	        })();
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AdminQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.List, _querySet.Delete, _querySet.Update);
	
	var AdminMeta = (0, _base.Meta)({
	  name: 'admin',
	  pluralName: 'admins',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/admins/{id}/'
	    },
	    'list': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/admins/'
	    }
	  }
	});
	
	/**
	 * OO wrapper around instance admins {@link http://docs.syncano.com/v4.0/docs/v1instancesinstanceadmins endpoint}.
	 * @constructor
	 * @type {Admin}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} first_name
	 * @property {String} last_name
	 * @property {String} email
	 * @property {String} role One of full, write and read.
	 * @property {Object} [links = {}]
	 */
	var Admin = (0, _stampit2.default)().compose(_base.Model).setQuerySet(AdminQuerySet).setMeta(AdminMeta);
	
	exports.default = Admin;
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ApiKeyQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.Create, _querySet.BulkCreate, _querySet.Delete, _querySet.Update, _querySet.List).methods({
	  reset: function reset() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'reset';
	    return this;
	  }
	});
	
	var ApiKeyMeta = (0, _base.Meta)({
	  name: 'apiKey',
	  pluralName: 'apiKeys',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/api_keys/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/api_keys/'
	    },
	    'reset': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/api_keys/{id}/reset_key/'
	    }
	  }
	});
	
	var ApiKeyConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  description: {
	    string: true
	  },
	  ignore_acl: {
	    boolean: true
	  },
	  allow_user_create: {
	    boolean: true
	  },
	  allow_anonymous_read: {
	    boolean: true
	  }
	};
	
	/**
	 * OO wrapper around instance api keys {@link http://docs.syncano.io/docs/authentication endpoint}.
	 * @constructor
	 * @type {ApiKey}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} [api_key = null]
	 * @property {Boolean} [allow_user_create = null]
	 * @property {Boolean} [ignore_acl = null]
	 * @property {String} [links = {}]
	 */
	var ApiKey = (0, _stampit2.default)().compose(_base.Model).setMeta(ApiKeyMeta).methods({
	  reset: function reset() {
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('reset', this);
	
	    return this.makeRequest('POST', path);
	  }
	}).setQuerySet(ApiKeyQuerySet).setConstraints(ApiKeyConstraints);
	
	exports.default = ApiKey;
	module.exports = exports['default'];

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var APNSConfigQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Update, _querySet.Get);
	
	var APNSConfigMeta = (0, _base.Meta)({
	  name: 'gcmconfig',
	  pluralName: 'gcmconfig',
	  endpoints: {
	    'detail': {
	      'methods': ['post', 'get', 'patch', 'put'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/config/'
	    }
	  }
	});
	
	var APNSConfigConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  }
	};
	
	/**
	 * OO wrapper around instance APNS config {@link # endpoint}.
	 * @constructor
	 * @type {APNSConfig}
	
	 * @property {String} instanceName
	 * @property {File} production_certificate
	 * @property {String} [production_certificate_name = null]
	 * @property {String} production_bundle_identifier
	 * @property {String} [production_expiration_date = null]
	 * @property {String} development_certificate_name
	 * @property {File} development_certificate
	 * @property {String} development_bundle_identifier
	 * @property {String} [development_expiration_date = null]
	 * @property {Object} [links = {}]
	 */
	var APNSConfig = (0, _stampit2.default)().compose(_base.Model).setMeta(APNSConfigMeta).setQuerySet(APNSConfigQuerySet).setConstraints(APNSConfigConstraints);
	
	exports.default = APNSConfig;
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var APNSDeviceQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.List, _querySet.Create, _querySet.BulkCreate, _querySet.Delete, _querySet.Get, _querySet.Update, _querySet.UpdateOrCreate, _querySet.GetOrCreate).methods({
	  sendMessage: function sendMessage() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig = this.getConfig();
	
	    var APNSMessage = _getConfig.APNSMessage;
	
	    return APNSMessage.please().sendToDevice((0, _assign3.default)({}, this.properties, properties), content);
	  }
	});
	
	var APNSDeviceMeta = (0, _base.Meta)({
	  name: 'apnsdevice',
	  pluralName: 'apnsdevices',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/devices/{registration_id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/devices/'
	    }
	  }
	});
	
	var APNSDeviceConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  user: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  registration_id: {
	    presence: true,
	    string: true
	  },
	  device_id: {
	    string: true
	  },
	  metadata: {
	    object: true
	  },
	  is_active: {
	    boolean: true
	  }
	};
	
	/**
	 * OO wrapper around instance APNS devices {@link # endpoint}.
	 * @constructor
	 * @type {APNSDevice}
	
	 * @property {String} registration_id
	 * @property {String} device_id
	 * @property {String} instanceName
	 * @property {String} [label = null]
	 * @property {Number} [user = null]
	 * @property {Boolean} [is_active = true]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var APNSDevice = (0, _stampit2.default)().compose(_base.Model).setMeta(APNSDeviceMeta).setQuerySet(APNSDeviceQuerySet).setConstraints(APNSDeviceConstraints);
	
	exports.default = APNSDevice;
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var APNSMessageQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Create, _querySet.BulkCreate, _querySet.Get, _querySet.List, _querySet.GetOrCreate).methods({
	  sendToDevice: function sendToDevice() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = { content: content };
	    this.method = 'POST';
	    this.endpoint = 'deviceMessage';
	
	    return this;
	  }
	});
	
	var APNSMessageMeta = (0, _base.Meta)({
	  name: 'apnsmessage',
	  pluralName: 'apnsmessages',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/messages/{id}/'
	    },
	    'list': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/messages/'
	    },
	    'deviceMessage': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/apns/devices/{registration_id}/send_message/'
	    }
	  }
	});
	
	var APNSMessageConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  content: {
	    presence: true,
	    object: true
	  },
	  'content.registration_ids': {
	    presence: true,
	    array: true
	  },
	  'content.environment': {
	    presence: true,
	    inclusion: ['development', 'production']
	  },
	  'content.aps': {
	    presence: true
	  },
	  'content.aps.alert': {
	    presence: true
	  }
	};
	
	/**
	 * OO wrapper around instance APNS messages {@link # endpoint}.
	 * @constructor
	 * @type {APNSMessage}
	
	 * @property {Number} id
	 * @property {String} [status = null]
	 * @property {Object} [content = {}]
	 * @property {Object} [result = {}]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var APNSMessage = (0, _stampit2.default)().compose(_base.Model).setQuerySet(APNSMessageQuerySet).setConstraints(APNSMessageConstraints).setMeta(APNSMessageMeta);
	
	exports.default = APNSMessage;
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ChannelPoll = undefined;
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _request = __webpack_require__(19);
	
	var _request2 = _interopRequireDefault(_request);
	
	var _utils = __webpack_require__(23);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ChannelQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	
	  /**
	    * Puslishes to a channel.
	     * @memberOf QuerySet
	    * @instance
	     * @param {Object} channel
	    * @param {Object} message
	    * @param {String} [room = null]
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * Channel.please().publish({ instanceName: 'test-instace', name: 'test-class' }, { content: 'my message'});
	     */
	
	  publish: function publish(properties, message) {
	    var room = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = { payload: JSON.stringify(message) };
	
	    if (room) {
	      this.payload.room = room;
	    }
	
	    this.method = 'POST';
	    this.endpoint = 'publish';
	
	    return this;
	  },
	
	
	  /**
	    * Allows polling of a channel.
	     * @memberOf QuerySet
	    * @instance
	     * @param {Object} options
	    * @param {Boolean} [start = true]
	    * @returns {ChannelPoll}
	     * @example {@lang javascript}
	    * var poll = Channel.please().poll({ instanceName: 'test-instace', name: 'test-class' });
	    *
	    * poll.on('start', function() {
	    *   console.log('poll::start');
	    * });
	    *
	    * poll.on('stop', function() {
	    *   console.log('poll::stop');
	    * });
	    *
	    * poll.on('message', function(message) {
	    *   console.log('poll::message', message);
	    * });
	    *
	    * poll.on('custom', function(message) {
	    *   console.log('poll::custom', message);
	    * });
	    *
	    * poll.on('create', function(data) {
	    *   console.log('poll::create', data);
	    * });
	    *
	    * poll.on('delete', function(data) {
	    *   console.log('poll::delete', data);
	    * });
	    *
	    * poll.on('update', function(data) {
	    *   console.log('poll::update', data);
	    * });
	    *
	    * poll.on('error', function(error) {
	    *   console.log('poll::error', error);
	    * });
	    *
	    * poll.start();
	    *
	    */
	
	  poll: function poll() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    var start = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    var config = this.getConfig();
	    var meta = this.model.getMeta();
	    var path = meta.resolveEndpointPath('poll', this.properties);
	
	    options.path = path;
	
	    var channelPoll = ChannelPoll.setConfig(config)(options);
	
	    if (start === true) {
	      channelPoll.start();
	    }
	
	    return channelPoll;
	  },
	  history: function history() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var query = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'GET';
	    this.endpoint = 'history';
	    this.query = query;
	    this._serialize = false;
	
	    return this;
	  }
	});
	
	var ChannelMeta = (0, _base.Meta)({
	  name: 'channel',
	  pluralName: 'channels',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/channels/{name}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/channels/'
	    },
	    'poll': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/channels/{name}/poll/'
	    },
	    'publish': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/channels/{name}/publish/'
	    },
	    'history': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/channels/{name}/history/'
	    }
	  }
	});
	
	var channelConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  name: {
	    presence: true,
	    string: true,
	    length: {
	      minimum: 5
	    }
	  },
	  description: {
	    string: true
	  },
	  type: {
	    inclusion: ['default', 'separate_rooms']
	  },
	  group: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  group_permissions: {
	    inclusion: ['none', 'subscribe', 'publish']
	  },
	  other_permissions: {
	    inclusion: ['none', 'subscribe', 'publish']
	  },
	  custom_publish: {
	    boolean: true
	  }
	};
	
	/**
	  * Wrapper around {@link http://docs.syncano.io/v0.1/docs/channels-poll|channels poll} endpoint which implements `EventEmitter` interface.
	  * Use it via `Channel` poll method.
	
	  * @constructor
	  * @type {ChannelPoll}
	
	  * @property {Number} [timeout = 300000] 5 mins
	  * @property {String} [path = null] request path
	  * @property {Number} [lastId = null] used internally in for loop
	  * @property {Number} [room = null]
	  * @property {Boolean} [abort = false]  used internally to conrole for loop
	
	  * @example {@lang javascript}
	  * var poll = ChannelPoll.setConfig(config)({
	  *   path: '/v1.1/instances/some-instance/channels/some-channel/poll/'
	  * });
	  *
	  * poll.on('start', function() {
	  *   console.log('poll::start');
	  * });
	  *
	  * poll.on('stop', function() {
	  *   console.log('poll::stop');
	  * });
	  *
	  * poll.on('message', function(message) {
	  *   console.log('poll::message', message);
	  * });
	  *
	  * poll.on('custom', function(message) {
	  *   console.log('poll::custom', message);
	  * });
	  *
	  * poll.on('create', function(data) {
	  *   console.log('poll::create', data);
	  * });
	  *
	  * poll.on('delete', function(data) {
	  *   console.log('poll::delete', data);
	  * });
	  *
	  * poll.on('update', function(data) {
	  *   console.log('poll::update', data);
	  * });
	  *
	  * poll.on('error', function(error) {
	  *   console.log('poll::error', error);
	  * });
	  *
	  * poll.start();
	  *
	  */
	var ChannelPoll = exports.ChannelPoll = (0, _stampit2.default)().compose(_request2.default, _utils.EventEmittable).props({
	  timeout: 1000 * 60 * 5,
	  path: null,
	  lastId: null,
	  room: null,
	  abort: false
	}).methods({
	  request: function request() {
	    var options = {
	      timeout: this.timeout,
	      query: {
	        last_id: this.lastId,
	        room: this.room
	      }
	    };
	
	    this.emit('request', options);
	    return this.makeRequest('GET', this.path, options);
	  },
	  start: function start() {
	    var _this = this;
	
	    this.emit('start');
	
	    // some kind of while loop which uses Promises
	    var loop = function loop() {
	      if (_this.abort === true) {
	        _this.emit('stop');
	        return;
	      }
	
	      return _this.request().then(function (message) {
	        _this.emit('message', message);
	        _this.emit(message.action, message);
	        _this.lastId = message.id;
	        return message;
	      }).finally(loop).catch(function (error) {
	        if (error.timeout && error.timeout === _this.timeout) {
	          return _this.emit('timeout', error);
	        }
	
	        _this.emit('error', error);
	        _this.stop();
	      });
	    };
	
	    process.nextTick(loop);
	    return this.stop;
	  },
	  stop: function stop() {
	    this.abort = true;
	    return this;
	  }
	});
	
	/**
	 * OO wrapper around channels {@link http://docs.syncano.io/v0.1/docs/channels-list endpoint}.
	 * **Channel** has two special methods called ``publish`` and ``poll``. First one will send message to the channel and second one will create {@link http://en.wikipedia.org/wiki/Push_technology#Long_polling long polling} connection which will listen for messages.
	
	 * @constructor
	 * @type {Channel}
	
	 * @property {String} name
	 * @property {String} instanceName
	 * @property {String} type
	 * @property {Number} [group = null]
	 * @property {String} [group_permissions = null]
	 * @property {String} [other_permissions = null]
	 * @property {Boolean} [custom_publish = null]
	
	 * @example {@lang javascript}
	 * Channel.please().get('instance-name', 'channel-name').then((channel) => {
	 *   return channel.publish({x: 1});
	 * });
	 *
	 * Channel.please().get('instance-name', 'channel-name').then((channel) => {
	 *   const poll = channel.poll();
	 *
	 *   poll.on('start', function() {
	 *     console.log('poll::start');
	 *   });
	 *
	 *   poll.on('stop', function() {
	 *     console.log('poll::stop');
	 *   });
	 *
	 *   poll.on('message', function(message) {
	 *     console.log('poll::message', message);
	 *   });
	 *
	 *   poll.on('custom', function(message) {
	 *     console.log('poll::custom', message);
	 *   });
	 *
	 *   poll.on('create', function(data) {
	 *     console.log('poll::create', data);
	 *   });
	 *
	 *   poll.on('delete', function(data) {
	 *     console.log('poll::delete', data);
	 *   });
	 *
	 *   poll.on('update', function(data) {
	 *     console.log('poll::update', data);
	 *   });
	 *
	 *   poll.on('error', function(error) {
	 *     console.log('poll::error', error);
	 *   });
	 *
	 *   poll.start();
	 * });
	 */
	var Channel = (0, _stampit2.default)().compose(_base.Model).setMeta(ChannelMeta).setQuerySet(ChannelQuerySet).methods({
	  poll: function poll() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var start = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    var config = this.getConfig();
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('poll', this);
	
	    options.path = path;
	
	    var channelPoll = ChannelPoll.setConfig(config)(options);
	
	    if (start === true) {
	      channelPoll.start();
	    }
	
	    return channelPoll;
	  },
	  publish: function publish(message) {
	    var room = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	    var options = {
	      payload: {
	        payload: JSON.stringify(message)
	      }
	    };
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('publish', this);
	
	    if (room !== null) {
	      options.payload.room = room;
	    }
	
	    return this.makeRequest('POST', path, options);
	  },
	  history: function history() {
	    var query = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('history', this);
	
	    return this.makeRequest('GET', path, { query: query });
	  }
	}).setConstraints(channelConstraints);
	
	exports.default = Channel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60)))

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ClassMeta = (0, _base.Meta)({
	  name: 'class',
	  pluralName: 'classes',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/classes/{name}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/classes/'
	    }
	  },
	  relatedModels: ['DataObject']
	});
	
	var ClassConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  name: {
	    presence: true,
	    string: true
	  },
	  description: {
	    string: true
	  },
	  schema: {
	    array: true
	  },
	  group: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  group_permissions: {
	    inclusion: ['none', 'read', 'create_objects']
	  },
	  other_permissions: {
	    inclusion: ['none', 'read', 'create_objects']
	  },
	  metadata: {
	    object: true
	  }
	};
	
	/**
	 * OO wrapper around instance groups {@link http://docs.syncano.com/v4.0/docs/instancesinstanceclasses endpoint}.
	 * @constructor
	 * @type {Class}
	
	 * @property {String} name
	 * @property {String} instanceName
	 * @property {Number} objects_count
	 * @property {Array} schema
	 * @property {String} status
	 * @property {Object} metadata
	 * @property {String} revision
	 * @property {String} expected_revision
	 * @property {String} group
	 * @property {String} group_permissions
	 * @property {String} other_permissions
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	
	 */
	var Class = (0, _stampit2.default)().compose(_base.Model).setMeta(ClassMeta).setConstraints(ClassConstraints);
	
	exports.default = Class;
	module.exports = exports['default'];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DataEndpointQerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	
	  /**
	  * Fetches Data Objects matching the Data View properties.
	  * @memberOf DataEndpointQerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {DataEndpointQerySet}
	   * @example {@lang javascript}
	  * DataEndpoint.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});
	   */
	
	  fetchData: function fetchData() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'GET';
	    this.endpoint = 'get';
	    this._serialize = false;
	
	    return this;
	  }
	});
	
	var DataEndpointMeta = (0, _base.Meta)({
	  name: 'dataview',
	  pluralName: 'dataviews',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/data/'
	    },
	    'get': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/get/'
	    },
	    'rename': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/rename/'
	    },
	    'clear_cache': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/data/{name}/clear_cache/'
	    }
	  }
	});
	
	var DataEndpointConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  name: {
	    presence: true,
	    string: true,
	    length: {
	      maximum: 64
	    }
	  },
	  description: {
	    string: true
	  },
	  class: {
	    presence: true,
	    string: true,
	    length: {
	      minimum: 5
	    }
	  },
	  query: {
	    object: true
	  },
	  excluded_fields: {
	    string: true
	  },
	  order_by: {
	    string: true
	  },
	  page_size: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  expand: {
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around data views {@link # endpoint}.
	 * @constructor
	 * @type {DataEndpoint}
	
	 * @property {String} name
	 * @property {String} instanceName
	 * @property {Object} query
	 * @property {String} excluded_fields
	 * @property {String} order_by
	 * @property {Number} page_size
	 * @property {String} expand
	 * @property {String} class
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 */
	var DataEndpoint = (0, _stampit2.default)().compose(_base.Model).setMeta(DataEndpointMeta).setQuerySet(DataEndpointQerySet).setConstraints(DataEndpointConstraints).methods({
	
	  /**
	  * Fetches Data Objects matching the Data View properties.
	  * @memberOf DataEndpoint
	  * @instance
	   * @param {Object}
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * DataEndpoint.please().fetchData({name: 'dataViewName', instanceName: 'test-one'}).then(function(dataObjects) {});
	  */
	
	  fetchData: function fetchData() {
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('get', this);
	
	    return this.makeRequest('GET', path);
	  }
	});
	
	exports.default = DataEndpoint;
	module.exports = exports['default'];

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _add2 = __webpack_require__(199);
	
	var _add3 = _interopRequireDefault(_add2);
	
	var _isNumber2 = __webpack_require__(210);
	
	var _isNumber3 = _interopRequireDefault(_isNumber2);
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _keys2 = __webpack_require__(8);
	
	var _keys3 = _interopRequireDefault(_keys2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _bluebird = __webpack_require__(18);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var DataObjectQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	  /**
	    * Filters DataObjects.
	     * @memberOf QuerySet
	    * @instance
	     * @param {Object} filters
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).filter({ field_name: { _contains: 'Lord Of The Rings' }}).then(function(dataobjects) {});
	     */
	
	  filter: function filter() {
	    var filters = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.query['query'] = JSON.stringify(filters);
	    return this;
	  },
	
	  /**
	    * Orders DataObject by field.
	     * @memberOf QuerySet
	    * @instance
	     * @param {String} field
	    * @returns {QuerySet}
	     * @example {@lang javascript}
	    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).orderBy('author').then(function(dataobjects) {});
	    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).orderBy('-author').then(function(dataobjects) {});
	     */
	  orderBy: function orderBy(field) {
	    this.query['order_by'] = field;
	    return this;
	  },
	
	  /**
	  * Updates single object based on provided arguments
	   * @memberOf QuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} field to increment.
	  * @returns {QuerySet}
	   * @example {@lang javascript}
	  * DataObject.please().increment({instanceName: 'my-instance', className: 'my-class', id: 1}, {views: 1})
	   */
	  increment: function increment() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var payload = {};
	    payload[(0, _keys3.default)(object)[0]] = { _increment: object[(0, _keys3.default)(object)[0]] };
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = JSON.stringify(payload);
	
	    this.method = 'PATCH';
	    this.endpoint = 'detail';
	    return this;
	  },
	
	  /**
	    * Returns DataObject count.
	     * @memberOf QuerySet
	    * @instance
	     * @returns {QuerySet}
	     * @example {@lang javascript}
	    * DataObject.please().list({ instanceName: 'test-instace', className: 'test-class' }).count().then(function(response) {});
	     */
	  count: function count() {
	    this.query['include_count'] = true;
	    this.raw();
	    return this;
	  }
	});
	
	var DataObjectMeta = (0, _base.Meta)({
	  name: 'dataobject',
	  pluralName: 'dataobjects',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/classes/{className}/objects/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/classes/{className}/objects/'
	    }
	  }
	});
	
	var DataobjectConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  className: {
	    presence: true,
	    string: true
	  },
	  owner: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  owner_permissions: {
	    inclusion: ['none', 'read', 'write', 'full']
	  },
	  group: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  group_permissions: {
	    inclusion: ['none', 'read', 'write', 'full']
	  },
	  other_permissions: {
	    inclusion: ['none', 'read', 'write', 'full']
	  },
	  channel: {
	    string: true
	  },
	  channel_room: {
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around instance data objects {@link http://docs.syncano.com/v4.0/docs/view-data-objects endpoint}.
	 * This model is special because each instance will be **dynamically populated** with fields defined in related {@link Class} schema attribute.
	 * @constructor
	 * @type {DataObject}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} className
	 * @property {Number} revision
	 * @property {Number} [owner = null]
	 * @property {String} [owner_permissions = null]
	 * @property {Number} [group = null]
	 * @property {String} [group_permissions = null]
	 * @property {String} [other_permissions = null]
	 * @property {String} [channel = null]
	 * @property {String} [channel_room = null]
	
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var DataObject = (0, _stampit2.default)().compose(_base.Model).setMeta(DataObjectMeta).methods({
	  increment: function increment(field, by) {
	    if (!(0, _isNumber3.default)(this[field])) return _bluebird2.default.reject(new Error('The ' + field + ' is not numeric.'));
	    if (!(0, _isNumber3.default)(by)) return _bluebird2.default.reject(new Error('The provided value is not numeric.'));
	
	    this[field] += (0, _add3.default)(this[field], by);
	
	    return this.save();
	  }
	}).setQuerySet(DataObjectQuerySet).setConstraints(DataobjectConstraints);
	
	exports.default = DataObject;
	module.exports = exports['default'];

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GCMConfigQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Update, _querySet.Get);
	
	var GCMConfigMeta = (0, _base.Meta)({
	  name: 'gcmconfig',
	  pluralName: 'gcmconfig',
	  endpoints: {
	    'detail': {
	      'methods': ['post', 'get', 'patch', 'put'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/config/'
	    }
	  }
	});
	
	var GCMConfigConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  }
	};
	
	/**
	 * OO wrapper around instance GCM config {@link # endpoint}.
	 * @constructor
	 * @type {GCMConfig}
	
	 * @property {String} instanceName
	 * @property {String} production_api_key
	 * @property {String} development_api_key
	 * @property {Object} [links = {}]
	 */
	var GCMConfig = (0, _stampit2.default)().compose(_base.Model).setMeta(GCMConfigMeta).setQuerySet(GCMConfigQuerySet).setConstraints(GCMConfigConstraints);
	
	exports.default = GCMConfig;
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GCMDeviceQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.List, _querySet.Create, _querySet.BulkCreate, _querySet.Delete, _querySet.Get, _querySet.Update, _querySet.UpdateOrCreate, _querySet.GetOrCreate).methods({
	  sendMessage: function sendMessage() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig = this.getConfig();
	
	    var GCMMessage = _getConfig.GCMMessage;
	
	    return GCMMessage.please().sendToDevice((0, _assign3.default)({}, this.properties, properties), content);
	  }
	});
	
	var GCMDeviceMeta = (0, _base.Meta)({
	  name: 'gcmdevice',
	  pluralName: 'gcmdevices',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/devices/{registration_id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/devices/'
	    }
	  }
	});
	
	var GCMDevicConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  user: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  registration_id: {
	    presence: true,
	    string: true
	  },
	  device_id: {
	    string: true
	  },
	  metadata: {
	    object: true
	  },
	  is_active: {
	    boolean: true
	  }
	};
	
	/**
	 * OO wrapper around instance GCM devices {@link # endpoint}.
	 * @constructor
	 * @type {GCMDevice}
	
	 * @property {String} registration_id
	 * @property {String} device_id
	 * @property {String} instanceName
	 * @property {String} [label = null]
	 * @property {Number} [user = null]
	 * @property {Boolean} [is_active = true]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var GCMDevice = (0, _stampit2.default)().compose(_base.Model).setMeta(GCMDeviceMeta).setQuerySet(GCMDeviceQuerySet).setConstraints(GCMDevicConstraints);
	
	exports.default = GCMDevice;
	module.exports = exports['default'];

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GCMMessageQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Create, _querySet.BulkCreate, _querySet.Get, _querySet.List, _querySet.GetOrCreate).methods({
	  sendToDevice: function sendToDevice() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var content = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = { content: content };
	    this.method = 'POST';
	    this.endpoint = 'deviceMessage';
	
	    return this;
	  }
	});
	
	var GCMMessageMeta = (0, _base.Meta)({
	  name: 'gcmmessage',
	  pluralName: 'gcmmessages',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/messages/{id}/'
	    },
	    'list': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/messages/'
	    },
	    'deviceMessage': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/push_notifications/gcm/devices/{registration_id}/send_message/'
	    }
	  }
	});
	
	var GCMMessageConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  content: {
	    presence: true,
	    object: true
	  },
	  'content.registration_ids': {
	    presence: true,
	    array: true
	  },
	  'content.environment': {
	    presence: true,
	    inclusion: ['development', 'production']
	  }
	};
	
	/**
	 * OO wrapper around instance GCM messages {@link # endpoint}.
	 * @constructor
	 * @type {GCMMessage}
	
	 * @property {Number} id
	 * @property {String} [status = null]
	 * @property {Object} [content = {}]
	 * @property {Object} [result = {}]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var GCMMessage = (0, _stampit2.default)().compose(_base.Model).setMeta(GCMMessageMeta).setQuerySet(GCMMessageQuerySet).setConstraints(GCMMessageConstraints);
	
	exports.default = GCMMessage;
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var GroupQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	  /**
	  * Fetches Users belonging to a group.
	  * @memberOf GroupQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {GroupQuerySet}
	   * @example {@lang javascript}
	  * Grop.please().users({ id: 1, instanceName: 'test-one'}).then(function(users) {});
	  */
	
	  users: function users() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig = this.getConfig();
	
	    var User = _getConfig.User;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return User.please().groupUsers(this.properties);
	  },
	
	  /**
	  * Adds user to group.
	  * @memberOf GroupQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} user object with user to be added
	  * @returns {GroupQuerySet}
	   * @example {@lang javascript}
	  * Grop.please().addUser({ id: 1, instanceName: 'test-one'}, { user: 1 }).then(function(response) {});
	  */
	  addUser: function addUser() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var user = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig2 = this.getConfig();
	
	    var User = _getConfig2.User;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return User.please().addUserToGroup(this.properties, user);
	  },
	
	  /**
	  * Deletes user from group.
	  * @memberOf GroupQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} user object with user to be added
	  * @returns {GroupQuerySet}
	   * @example {@lang javascript}
	  * Grop.please().deleteUser({ id: 1, instanceName: 'test-one'}, { user: 1 }).then(function(response) {});
	  */
	  deleteUser: function deleteUser() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var user = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig3 = this.getConfig();
	
	    var User = _getConfig3.User;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return User.please().deleteUserFromGroup(this.properties, user);
	  },
	
	  /**
	  * Fetches details of a user belonging to a group.
	  * @memberOf Group
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} user object with user to be fetched
	   * @example {@lang javascript}
	  * Group.please().getUserDetails({ user: 1}).then(function(response) {});
	  */
	  getUserDetails: function getUserDetails() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var user = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig4 = this.getConfig();
	
	    var User = _getConfig4.User;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return User.please().getDetails(this.properties, user);
	  },
	  getUserGroups: function getUserGroups() {
	    var _this = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'GET';
	    this.endpoint = 'userGroups';
	
	    return this.then(function (response) {
	      return _this.model.please().asResultSet(response, 'group');
	    });
	  },
	  getUserGroup: function getUserGroup() {
	    var _this2 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var group = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties, group);
	
	    this.method = 'GET';
	    this.endpoint = 'userGroup';
	
	    return this.then(function (response) {
	      return _this2.model.fromJSON(response.group, _this2.properties);
	    });
	  },
	  addUserGroup: function addUserGroup() {
	    var _this3 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var group = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = group;
	    this.method = 'POST';
	    this.endpoint = 'userGroups';
	
	    return this.then(function (response) {
	      return _this3.model.fromJSON(response.group, _this3.properties);
	    });
	  },
	  deleteUserGroup: function deleteUserGroup() {
	    var _this4 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var group = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties, group);
	
	    this.method = 'DELETE';
	    this.endpoint = 'userGroup';
	
	    return this.then(function (response) {
	      return _this4.model.fromJSON(response.group, _this4.properties);
	    });
	  }
	});
	
	var GroupMeta = (0, _base.Meta)({
	  name: 'group',
	  pluralName: 'groups',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/groups/{id}/'
	    },
	    'list': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/groups/'
	    },
	    'userGroups': {
	      'methods': ['get', 'post'],
	      'path': '/v1.1/instances/{instanceName}/users/{user}/groups/'
	    },
	    'userGroup': {
	      'methods': ['get', 'delete'],
	      'path': '/v1.1/instances/{instanceName}/users/{user}/groups/{group}/'
	    }
	  }
	});
	
	var GroupConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  label: {
	    presence: true,
	    string: true
	  },
	  description: {
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around instance groups {@link http://docs.syncano.com/v4.0/docs/groups endpoint}.
	 * @constructor
	 * @type {Group}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} label
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var Group = (0, _stampit2.default)().compose(_base.Model).setMeta(GroupMeta).setConstraints(GroupConstraints).setQuerySet(GroupQuerySet).methods({
	  /**
	  * Fetches Users belonging to a group.
	  * @memberOf Group
	  * @instance
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * Group.users().then(function(users) {});
	  */
	
	  users: function users() {
	    var _getConfig5 = this.getConfig();
	
	    var User = _getConfig5.User;
	
	    return User.please().groupUsers({ id: this.id, instanceName: this.instanceName });
	  },
	
	  /**
	  * Add user to group.
	  * @memberOf Group
	  * @instance
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * Group.addUser({ user: 1}).then(function(response) {});
	  */
	  addUser: function addUser() {
	    var user = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig6 = this.getConfig();
	
	    var User = _getConfig6.User;
	
	    return User.please().addUserToGroup({ id: this.id, instanceName: this.instanceName }, user);
	  },
	
	  /**
	  * Delete user from group.
	  * @memberOf Group
	  * @instance
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * Group.deleteUser({ user: 1}).then(function(response) {});
	  */
	  deleteUser: function deleteUser() {
	    var user = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig7 = this.getConfig();
	
	    var User = _getConfig7.User;
	
	    return User.please().deleteUserFromGroup({ id: this.id, instanceName: this.instanceName }, user);
	  },
	
	  /**
	  * Fetches details of a user belonging to a group.
	  * @memberOf Group
	  * @instance
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * Group.getUserDetails({ user: 1}).then(function(response) {});
	  */
	  getUserDetails: function getUserDetails() {
	    var user = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig8 = this.getConfig();
	
	    var User = _getConfig8.User;
	
	    return User.please().getDetails({ id: this.id, instanceName: this.instanceName }, user);
	  }
	});
	
	exports.default = Group;
	module.exports = exports['default'];

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _instance = __webpack_require__(119);
	
	var _instance2 = _interopRequireDefault(_instance);
	
	var _class = __webpack_require__(111);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _channel = __webpack_require__(110);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	var _dataobject = __webpack_require__(113);
	
	var _dataobject2 = _interopRequireDefault(_dataobject);
	
	var _user = __webpack_require__(131);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _group = __webpack_require__(117);
	
	var _group2 = _interopRequireDefault(_group);
	
	var _admin = __webpack_require__(105);
	
	var _admin2 = _interopRequireDefault(_admin);
	
	var _apikey = __webpack_require__(106);
	
	var _apikey2 = _interopRequireDefault(_apikey);
	
	var _instanceinvitation = __webpack_require__(120);
	
	var _instanceinvitation2 = _interopRequireDefault(_instanceinvitation);
	
	var _invitation = __webpack_require__(121);
	
	var _invitation2 = _interopRequireDefault(_invitation);
	
	var _script = __webpack_require__(124);
	
	var _script2 = _interopRequireDefault(_script);
	
	var _schedule = __webpack_require__(122);
	
	var _schedule2 = _interopRequireDefault(_schedule);
	
	var _trigger = __webpack_require__(129);
	
	var _trigger2 = _interopRequireDefault(_trigger);
	
	var _scriptendpoint = __webpack_require__(125);
	
	var _scriptendpoint2 = _interopRequireDefault(_scriptendpoint);
	
	var _dataendpoint = __webpack_require__(112);
	
	var _dataendpoint2 = _interopRequireDefault(_dataendpoint);
	
	var _scripttrace = __webpack_require__(127);
	
	var _scripttrace2 = _interopRequireDefault(_scripttrace);
	
	var _scheduletrace = __webpack_require__(123);
	
	var _scheduletrace2 = _interopRequireDefault(_scheduletrace);
	
	var _triggertrace = __webpack_require__(130);
	
	var _triggertrace2 = _interopRequireDefault(_triggertrace);
	
	var _scriptendpointtrace = __webpack_require__(126);
	
	var _scriptendpointtrace2 = _interopRequireDefault(_scriptendpointtrace);
	
	var _gcmdevice = __webpack_require__(115);
	
	var _gcmdevice2 = _interopRequireDefault(_gcmdevice);
	
	var _gcmconfig = __webpack_require__(114);
	
	var _gcmconfig2 = _interopRequireDefault(_gcmconfig);
	
	var _apnsdevice = __webpack_require__(108);
	
	var _apnsdevice2 = _interopRequireDefault(_apnsdevice);
	
	var _apnsconfig = __webpack_require__(107);
	
	var _apnsconfig2 = _interopRequireDefault(_apnsconfig);
	
	var _gcmmessage = __webpack_require__(116);
	
	var _gcmmessage2 = _interopRequireDefault(_gcmmessage);
	
	var _apnsmessage = __webpack_require__(109);
	
	var _apnsmessage2 = _interopRequireDefault(_apnsmessage);
	
	var _template = __webpack_require__(128);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  Instance: _instance2.default,
	  Class: _class2.default,
	  Channel: _channel2.default,
	  DataObject: _dataobject2.default,
	  User: _user2.default,
	  Group: _group2.default,
	  Admin: _admin2.default,
	  ApiKey: _apikey2.default,
	  InstanceInvitation: _instanceinvitation2.default,
	  Invitation: _invitation2.default,
	  Script: _script2.default,
	  Schedule: _schedule2.default,
	  Trigger: _trigger2.default,
	  ScriptEndpoint: _scriptendpoint2.default,
	  DataEndpoint: _dataendpoint2.default,
	  ScriptTrace: _scripttrace2.default,
	  ScheduleTrace: _scheduletrace2.default,
	  TriggerTrace: _triggertrace2.default,
	  ScriptEndpointTrace: _scriptendpointtrace2.default,
	  GCMDevice: _gcmdevice2.default,
	  APNSDevice: _apnsdevice2.default,
	  APNSConfig: _apnsconfig2.default,
	  GCMMessage: _gcmmessage2.default,
	  GCMConfig: _gcmconfig2.default,
	  APNSMessage: _apnsmessage2.default,
	  Template: _template2.default
	};
	module.exports = exports['default'];

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InstanceQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	  rename: function rename() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = object;
	
	    this.method = 'POST';
	    this.endpoint = 'rename';
	    return this;
	  }
	});
	
	var InstanceMeta = (0, _base.Meta)({
	  name: 'instance',
	  pluralName: 'instances',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{name}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/'
	    },
	    'rename': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{name}/rename/'
	    }
	  },
	  relatedModels: ['Admin', 'Class', 'Script', 'Schedule', 'InstanceInvitation', 'ApiKey', 'Trigger', 'ScriptEndpoint', 'User', 'Group', 'GCMDevice', 'Channel', 'APNSDevice', 'Template']
	});
	
	var InstanceConstraints = {
	  name: {
	    presence: true,
	    string: true,
	    length: {
	      minimum: 5
	    }
	  },
	  description: {
	    string: true
	  },
	  metadata: {
	    object: true
	  }
	};
	
	/**
	 * OO wrapper around instances {@link http://docs.syncano.io/v0.1/docs/instances-list endpoint}.
	 * @constructor
	 * @type {Instance}
	
	 * @property {String} name
	 * @property {Object} owner
	 * @property {Number} owner.id
	 * @property {String} owner.email
	 * @property {String} owner.first_name
	 * @property {String} owner.last_name
	 * @property {Boolean} owner.is_active
	 * @property {Boolean} owner.has_password
	 * @property {String} role
	 * @property {Object} [metadata = {}]
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var Instance = (0, _stampit2.default)().compose(_base.Model).setMeta(InstanceMeta).methods({
	  rename: function rename() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? { new_name: this.name } : arguments[0];
	
	    var options = { payload: payload };
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('rename', this);
	
	    return this.makeRequest('POST', path, options);
	  }
	}).setQuerySet(InstanceQuerySet).setConstraints(InstanceConstraints);
	
	exports.default = Instance;
	module.exports = exports['default'];

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InstanceInvitationQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Create, _querySet.BulkCreate, _querySet.Get, _querySet.GetOrCreate, _querySet.Delete, _querySet.List, _querySet.Delete).methods({
	  resend: function resend() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'resend';
	    return this;
	  }
	});
	
	var InstanceInvitationMeta = (0, _base.Meta)({
	  name: 'instanceInvitation',
	  pluralName: 'instanceInvitations',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'get'],
	      'path': '/v1.1/instances/{instanceName}/invitations/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/invitations/'
	    },
	    'resend': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/invitations/{id}/resend/'
	    }
	  }
	});
	
	var InstanceInvitationConstraints = {
	  email: {
	    presence: true,
	    email: true
	  },
	  role: {
	    presence: true,
	    inclusion: ['full', 'write', 'read']
	  },
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  }
	};
	
	/**
	 * OO wrapper around instance invitations {@link # endpoint}.
	 * @constructor
	 * @type {InstanceInvitation}
	
	 * @property {String} email
	 * @property {String} role
	 * @property {String} [key = null]
	 * @property {String} [inviter = null]
	 * @property {String} [status = null]
	 * @property {Number} [id = null]
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var InstanceInvitation = (0, _stampit2.default)().compose(_base.Model).setMeta(InstanceInvitationMeta).methods({
	  resend: function resend() {
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('resend', this);
	
	    return this.makeRequest('POST', path);
	  }
	}).setQuerySet(InstanceInvitationQuerySet).setConstraints(InstanceInvitationConstraints);
	
	exports.default = InstanceInvitation;
	module.exports = exports['default'];

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var InvitationQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Create, _querySet.BulkCreate, _querySet.Get, _querySet.GetOrCreate, _querySet.Delete, _querySet.List, _querySet.Delete).methods({
	  accept: function accept(invitation_key) {
	    this.method = 'POST';
	    this.endpoint = 'accept';
	    this.payload = { invitation_key: invitation_key };
	    this._serialize = false;
	
	    return this;
	  }
	});
	
	var InvitationMeta = (0, _base.Meta)({
	  name: 'invitation',
	  pluralName: 'invitations',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'get'],
	      'path': '/v1.1/account/invitations/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/account/invitations/'
	    },
	    'accept': {
	      'methods': ['post'],
	      'path': '/v1.1/account/invitations/accept/'
	    }
	  }
	});
	
	/**
	 * OO wrapper around invitations {@link # endpoint}.
	 * @constructor
	 * @type {Invitation}
	
	 * @property {String} email
	 * @property {String} role
	 * @property {String} [key = null]
	 * @property {String} [inviter = null]
	 * @property {String} [status = null]
	 * @property {Number} [id = null]
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var Invitation = (0, _stampit2.default)().compose(_base.Model).setMeta(InvitationMeta).setQuerySet(InvitationQuerySet).methods({
	  accept: function accept(invitation_key) {
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('accept', this);
	
	    return this.makeRequest('POST', path, { invitation_key: invitation_key });
	  }
	});
	
	exports.default = Invitation;
	module.exports = exports['default'];

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScheduleMeta = (0, _base.Meta)({
	  name: 'schedule',
	  pluralName: 'schedules',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/schedules/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/schedules/'
	    }
	  },
	  relatedModels: ['ScheduleTrace']
	});
	
	var ScheduleConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  label: {
	    presence: true,
	    string: true
	  },
	  description: {
	    string: true
	  },
	  interval_sec: {
	    numericality: {
	      noStrings: true
	    }
	  },
	  crontab: {
	    format: {
	      pattern: /([0-59]|\*)\s([0-23]|\*)\s([1-31]|\*)\s([1-12]|\*)\s([0-7]|\*)/
	    }
	  },
	  timezone: {
	    string: true
	  },
	  script: {
	    presence: true,
	    numericality: {
	      noStrings: true
	    }
	  }
	};
	
	/**
	 * OO wrapper around instance groups {@link http://docs.syncano.com/v4.0/docs/codebox-schedules-list endpoint}.
	 * @constructor
	 * @type {Schedule}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} label
	 * @property {Number} interval_sec
	 * @property {String} crontab
	 * @property {Object} payload
	 * @property {String} scheduled_next
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var Schedule = (0, _stampit2.default)().compose(_base.Model).setMeta(ScheduleMeta).setConstraints(ScheduleConstraints);
	
	exports.default = Schedule;
	module.exports = exports['default'];

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScheduleTraceQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.List);
	
	var ScheduleTraceMeta = (0, _base.Meta)({
	  name: 'scheduletrace',
	  pluralName: 'scheduletraces',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/schedules/{scheduleId}/traces/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/schedules/{scheduleId}/traces/'
	    }
	  }
	});
	
	var ScheduleTraceConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  scheduleId: {
	    presence: true,
	    numericality: {
	      noStrings: true
	    }
	  }
	};
	
	/**
	 * OO wrapper around shedule traces {@link # endpoint}.
	 * @constructor
	 * @type {ScheduleTrace}
	
	 * @property {Number} id
	 * @property {Number} scheduleId
	 * @property {String} instanceName
	 * @property {String} status
	 * @property {Date} executed_at
	 * @property {Number} duration
	 * @property {Object} [result = {}]
	 * @property {String} result.stderr
	 * @property {String} result.stdout
	 * @property {String} [links = {}]
	 */
	var ScheduleTrace = (0, _stampit2.default)().compose(_base.Model).setQuerySet(ScheduleTraceQuerySet).setMeta(ScheduleTraceMeta).setConstraints(ScheduleTraceConstraints);
	
	exports.default = ScheduleTrace;
	module.exports = exports['default'];

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScriptQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	
	  /**
	  * Runs Script matching the given lookup properties.
	  * @memberOf ScriptQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {ScriptQuerySet}
	   * @example {@lang javascript}
	  * Script.please().run({id: 1, instanceName: 'test-one'}).then(function(trace) {});
	   */
	
	  run: function run() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'POST';
	    this.endpoint = 'run';
	    this.payload = payload;
	    this._serialize = false;
	
	    return this;
	  },
	
	
	  /**
	  * Gets allowed runtimes.
	  * @memberOf ScriptQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {ScriptQuerySet}
	   * @example {@lang javascript}
	  * Script.please().runtimes({instanceName: 'test-one'}).then(function(trace) {});
	   */
	  getRuntimes: function getRuntimes() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'GET';
	    this.endpoint = 'runtimes';
	    this._serialize = false;
	
	    return this;
	  }
	});
	
	var ScriptMeta = (0, _base.Meta)({
	  name: 'script',
	  pluralName: 'scripts',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/snippets/scripts/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/snippets/scripts/'
	    },
	    'runtimes': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/snippets/scripts/runtimes/'
	    },
	    'run': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/snippets/scripts/{id}/run/'
	    }
	  },
	  relatedModels: ['ScriptTrace']
	});
	
	var ScriptConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  runtime_name: {
	    presence: true,
	    inclusion: ['golang', 'nodejs_library_v1.0', 'ruby', 'nodejs_library_v0.4', 'python_library_v4.2', 'python_library_v5.0', 'php', 'swift']
	  },
	  source: {
	    string: true
	  },
	  config: {
	    object: true
	  },
	  label: {
	    presence: true,
	    string: true
	  },
	  description: {
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around scripts {@link http://docs.syncano.com/v4.0/docs/codebox-list-codeboxes endpoint}.
	 * **Script** has special method called ``run`` which will execute attached source code.
	 * @constructor
	 * @type {Script}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} label
	 * @property {String} source
	 * @property {String} runtime_name
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var Script = (0, _stampit2.default)().compose(_base.Model).setMeta(ScriptMeta).setConstraints(ScriptConstraints).setQuerySet(ScriptQuerySet).methods({
	
	  /**
	  * Runs current Script.
	  * @memberOf Script
	  * @instance
	   * @param {Object} [payload = {}]
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * Script.please().get({instanceName: 'test-one', id: 1}).then(function(script) {
	  *   script.run({some: 'variable'}).then(function(trace) {});
	  * });
	  */
	
	  run: function run() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('run', this);
	
	    return this.makeRequest('POST', path, { payload: payload });
	  },
	
	
	  /**
	  * Gets allowed runtimes.
	  * @memberOf Script
	  * @instance
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * Script.please().runtimes({instanceName: 'test-one', id: 1}).then(function(script) {
	  *   script.runtimes().then(function(runtimes) {});
	  * });
	  */
	  getRuntimes: function getRuntimes() {
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('runtimes', this);
	
	    return this.makeRequest('GET', path);
	  }
	});
	
	exports.default = Script;
	module.exports = exports['default'];

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScriptEndpointQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	
	  /**
	  * Runs ScriptEndpoint matching the given lookup properties.
	  * @memberOf ScriptEndpointQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * ScriptEndpoint.please().run({name: 'test', instanceName: 'test-one'}).then(function(trace) {});
	   */
	
	  run: function run() {
	    var _this = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig = this.getConfig();
	
	    var ScriptEndpointTrace = _getConfig.ScriptEndpointTrace;
	
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'run';
	    this.payload = payload;
	    this._serialize = false;
	
	    return this.then(function (trace) {
	      return ScriptEndpointTrace.fromJSON(trace, {
	        instanceName: _this.properties.instanceName,
	        webhookName: _this.properties.name
	      });
	    });
	  },
	
	
	  /**
	  * Runs `public` ScriptEndpoint matching the given lookup properties.
	  * @memberOf ScriptEndpointQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * ScriptEndpoint.please().runPublic({public_link: '44cfc5552eacc', instanceName: 'test-one'}).then(function(trace) {});
	   */
	  runPublic: function runPublic() {
	    var _this2 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var payload = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig2 = this.getConfig();
	
	    var ScriptEndpointTrace = _getConfig2.ScriptEndpointTrace;
	
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'public';
	    this.payload = payload;
	    this._serialize = false;
	
	    return this.then(function (trace) {
	      return ScriptEndpointTrace.fromJSON(trace, {
	        instanceName: _this2.properties.instanceName,
	        webhookName: _this2.properties.name
	      });
	    });
	  },
	
	
	  /**
	  * Resets ScriptEndpoint matching the given lookup properties.
	  * @memberOf ScriptEndpointQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {ScriptEndpointQuerySet}
	   * @example {@lang javascript}
	  * ScriptEndpoint.please().reset({name: 'test', instanceName: 'test-one'}).then(function(trace) {});
	   */
	  reset: function reset() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	
	    this.method = 'POST';
	    this.endpoint = 'reset';
	
	    return this;
	  }
	});
	
	var ScriptEndpointMeta = (0, _base.Meta)({
	  name: 'scriptendpoint',
	  pluralName: 'scriptendpoints',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{name}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/'
	    },
	    'run': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{name}/run/'
	    },
	    'reset': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{name}/reset_link/'
	    },
	    'public': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/p/{public_link}/{name}/'
	    }
	  },
	  relatedModels: ['ScriptEndpointTrace']
	});
	
	var ScriptEndpointConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  name: {
	    presence: true,
	    string: true,
	    length: {
	      minimum: 5
	    }
	  },
	  description: {
	    string: true
	  },
	  public: {
	    boolean: true
	  },
	  script: {
	    presence: true,
	    numericality: {
	      noStrings: true
	    }
	  }
	};
	
	/**
	 * OO wrapper around instance webhooks {@link # endpoint}.
	 * @constructor
	 * @type {ScriptEndpoint}
	
	 * @property {String} name
	 * @property {String} instanceName
	 * @property {String} public_link
	 * @property {Boolean} public
	 * @property {Number} codebox
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 */
	var ScriptEndpoint = (0, _stampit2.default)().compose(_base.Model).setMeta(ScriptEndpointMeta).setQuerySet(ScriptEndpointQuerySet).setConstraints(ScriptEndpointConstraints).methods({
	
	  /**
	  * Runs current ScriptEndpoint.
	  * @memberOf ScriptEndpoint
	  * @instance
	   * @param {Object} [payload = {}]
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * ScriptEndpoint.please().get({instanceName: 'test-one', id: 1}).then(function(codebox) {
	      codebox.run({some: 'variable'}).then(function(trace) {});
	    });
	  */
	
	  run: function run() {
	    var _this3 = this;
	
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig3 = this.getConfig();
	
	    var ScriptEndpointTrace = _getConfig3.ScriptEndpointTrace;
	
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('run', this);
	
	    return this.makeRequest('POST', path, { payload: payload }).then(function (body) {
	      return ScriptEndpointTrace.fromJSON(body, {
	        instanceName: _this3.instanceName,
	        webhookName: _this3.name
	      });
	    });
	  },
	
	
	  /**
	  * Runs current `public` ScriptEndpoint.
	  * @memberOf ScriptEndpoint
	  * @instance
	   * @param {Object} [payload = {}]
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * ScriptEndpoint.please().get({instanceName: 'test-one', id: 1}).then(function(codebox) {
	      codebox.runPublic({some: 'variable'}).then(function(trace) {});
	    });
	  */
	  runPublic: function runPublic() {
	    var _this4 = this;
	
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig4 = this.getConfig();
	
	    var ScriptEndpointTrace = _getConfig4.ScriptEndpointTrace;
	
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('public', this);
	
	    return this.makeRequest('POST', path, { payload: payload }).then(function (body) {
	      return ScriptEndpointTrace.fromJSON(body, {
	        instanceName: _this4.instanceName,
	        webhookName: _this4.name
	      });
	    });
	  },
	
	
	  /**
	  * Resets current ScriptEndpoint.
	  * @memberOf ScriptEndpoint
	  * @instance
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * ScriptEndpoint.please().get({instanceName: 'test-one', name: 'test'}).then(function(webhook) {
	      webhook.reset().then(function() {});
	    });
	  */
	  reset: function reset() {
	    var _this5 = this;
	
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('reset', this);
	
	    return this.makeRequest('POST', path).then(function (body) {
	      return _this5.serialize(body);
	    });
	  }
	});
	
	exports.default = ScriptEndpoint;
	module.exports = exports['default'];

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScriptEndpointTraceQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.List);
	
	var ScriptEndpointTraceMeta = (0, _base.Meta)({
	  name: 'triggertrace',
	  pluralName: 'triggertraces',
	  endpoints: {
	    'detail': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{scriptEndpointName}/traces/{id}/'
	    },
	    'list': {
	      'methods': ['get'],
	      'path': '/v1.1/instances/{instanceName}/endpoints/scripts/{scriptEndpointName}/traces/'
	    }
	  }
	});
	
	var ScriptEndpointTraceConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  scriptEndpointName: {
	    presence: true,
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around webhook traces {@link # endpoint}.
	 * This model is *read only*.
	 * @constructor
	 * @type {ScriptEndpointTrace}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} scriptEndpointName
	 * @property {String} status
	 * @property {Date} executed_at
	 * @property {Number} duration
	 * @property {Object} [result = {}]
	 * @property {String} result.stderr
	 * @property {String} result.stdout
	 * @property {String} [links = {}]
	 */
	var ScriptEndpointTrace = (0, _stampit2.default)().compose(_base.Model).setMeta(ScriptEndpointTraceMeta).setQuerySet(ScriptEndpointTraceQuerySet).setConstraints(ScriptEndpointTraceConstraints);
	
	exports.default = ScriptEndpointTrace;
	module.exports = exports['default'];

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ScriptTraceQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.List);
	
	var ScriptTraceMeta = (0, _base.Meta)({
	  name: 'scripttrace',
	  pluralName: 'scripttrace',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/scripts/{scriptId}/traces/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/scripts/{scriptId}/traces/'
	    }
	  }
	});
	
	var ScriptConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  scriptId: {
	    presence: true
	  }
	};
	
	/**
	 * OO wrapper around script trace {@link # endpoint}.
	 * This model is *read only*.
	 * @constructor
	 * @type {ScriptTrace}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {Number} scriptId
	 * @property {String} status
	 * @property {Date} executed_at
	 * @property {Number} duration
	 * @property {Object} [result = {}]
	 * @property {String} result.stderr
	 * @property {String} result.stdout
	 * @property {String} [links = {}]
	 */
	var ScriptTrace = (0, _stampit2.default)().compose(_base.Model).setQuerySet(ScriptTraceQuerySet).setConstraints(ScriptConstraints).setMeta(ScriptTraceMeta);
	
	exports.default = ScriptTrace;
	module.exports = exports['default'];

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	var _querySet2 = _interopRequireDefault(_querySet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TemplateQuerySet = (0, _stampit2.default)().compose(_querySet2.default).methods({
	  /**
	  * Renames a template.
	  * @memberOf TemplateQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} payload object with request payload
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * Template.please().rename({name: 'my-template', instanceName: 'test-one'}, { new_name: 'new-name'}).then(function(template) {});
	   */
	
	  rename: function rename() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var payload = arguments.length <= 1 || arguments[1] === undefined ? { new_name: this.name } : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'rename';
	    this.payload = payload;
	
	    return this;
	  },
	  render: function render() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'render';
	    this.payload = { context: context };
	    this.responseAttr = 'text';
	    this.raw();
	
	    return this;
	  }
	});
	
	var TemplateMeta = (0, _base.Meta)({
	  name: 'template',
	  pluralName: 'templates',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/snippets/templates/{name}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/snippets/templates/'
	    },
	    'rename': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/snippets/templates/{name}/rename/'
	    },
	    'render': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/snippets/templates/{name}/render/'
	    }
	  }
	});
	
	var TemplateConstraints = {
	  name: {
	    presence: true,
	    string: true,
	    length: {
	      minimum: 5
	    }
	  },
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  content: {
	    presence: true,
	    string: true
	  },
	  content_type: {
	    presence: true,
	    string: true
	  },
	  context: {
	    object: true
	  }
	};
	
	/**
	 * OO wrapper around templates {@link # endpoint}.
	 * @constructor
	 * @type {Template}
	
	 * @property {String} name
	 * @property {String} instanceName
	 * @property {String} content
	 * @property {String} content_type
	 * @property {Object} context
	 * @property {String} [links = {}]
	 */
	var Template = (0, _stampit2.default)().compose(_base.Model).setMeta(TemplateMeta).setQuerySet(TemplateQuerySet).methods({
	  rename: function rename() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? { new_name: this.name } : arguments[0];
	
	    var options = { payload: payload };
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('rename', this);
	
	    return this.makeRequest('POST', path, options);
	  },
	  render: function render() {
	    var context = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var options = {
	      payload: { context: context },
	      responseAttr: 'text'
	    };
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('render', this);
	
	    return this.makeRequest('POST', path, options);
	  }
	}).setConstraints(TemplateConstraints);
	
	exports.default = Template;
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TriggerMeta = (0, _base.Meta)({
	  name: 'trigger',
	  pluralName: 'triggers',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/triggers/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/triggers/'
	    }
	  },
	  relatedModels: ['TriggerTrace']
	});
	
	var TriggerConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  label: {
	    presence: true,
	    string: true
	  },
	  description: {
	    string: true
	  },
	  signal: {
	    presence: true,
	    inclusion: ['post_update', 'post_create', 'post_delete']
	  },
	  script: {
	    presence: true,
	    numericality: {
	      noStrings: true
	    }
	  },
	  class: {
	    presence: true,
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around instance triggers {@link # endpoint}.
	 * @constructor
	 * @type {Trigger}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} label
	 * @property {String} signal
	 * @property {Number} codebox
	 * @property {String} class
	 * @property {String} [description = null]
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var Trigger = (0, _stampit2.default)().compose(_base.Model).setConstraints(TriggerConstraints).setMeta(TriggerMeta);
	
	exports.default = Trigger;
	module.exports = exports['default'];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TriggerTraceQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.List);
	
	var TriggerTraceMeta = (0, _base.Meta)({
	  name: 'triggertrace',
	  pluralName: 'triggertraces',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/triggers/{triggerId}/traces/{id}/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/triggers/{triggerId}/traces/'
	    }
	  }
	});
	
	var TriggerTraceConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  triggerId: {
	    presence: true,
	    numericality: {
	      noStrings: true
	    }
	  }
	};
	
	/**
	 * OO wrapper around trigger trace {@link # endpoint}.
	 * This model is *read only*.
	 * @constructor
	 * @type {TriggerTrace}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {Number} triggerId
	 * @property {String} status
	 * @property {Date} executed_at
	 * @property {Number} duration
	 * @property {Object} [result = {}]
	 * @property {String} result.stderr
	 * @property {String} result.stdout
	 * @property {String} [links = {}]
	 */
	var TriggerTrace = (0, _stampit2.default)().compose(_base.Model).setQuerySet(TriggerTraceQuerySet).setConstraints(TriggerTraceConstraints).setMeta(TriggerTraceMeta);
	
	exports.default = TriggerTrace;
	module.exports = exports['default'];

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty2 = __webpack_require__(20);
	
	var _isEmpty3 = _interopRequireDefault(_isEmpty2);
	
	var _assign2 = __webpack_require__(4);
	
	var _assign3 = _interopRequireDefault(_assign2);
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _base = __webpack_require__(2);
	
	var _querySet = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var UserQuerySet = (0, _stampit2.default)().compose(_querySet.BaseQuerySet, _querySet.Get, _querySet.Create, _querySet.Delete, _querySet.BulkCreate, _querySet.List).methods({
	  /**
	  * Gets a user's groups.
	  * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().getGroups({id: 1, instanceName: 'test-one'}).then(function(groups) {});
	   */
	
	  getGroups: function getGroups() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig = this.getConfig();
	
	    var Group = _getConfig.Group;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return Group.please().getUserGroups(this.properties);
	  },
	
	  /**
	  * Gets a user's group.
	  * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().getGroup({user: 1, instanceName: 'test-one', group: 1}).then(function(group) {});
	   */
	  getGroup: function getGroup() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var group = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig2 = this.getConfig();
	
	    var Group = _getConfig2.Group;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return Group.please().getUserGroup(this.properties, group);
	  },
	
	  /**
	  * Adds a group to user.
	  * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} group object with id of group to be added
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().getGroup({user: 1, instanceName: 'test-one'}, {group: 1}).then(function(group) {});
	   */
	  addGroup: function addGroup() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var group = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig3 = this.getConfig();
	
	    var Group = _getConfig3.Group;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return Group.please().addUserGroup(this.properties, group);
	  },
	
	  /**
	  * Removes a user's group.
	  * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @param {Object} group object with id of group to be added
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().deleteGroup({user: 1, instanceName: 'test-one'}, {group: 1}).then(function(group) {});
	   */
	  deleteGroup: function deleteGroup() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var group = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _getConfig4 = this.getConfig();
	
	    var Group = _getConfig4.Group;
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    return Group.please().deleteUserGroup(this.properties, group);
	  },
	  getDetails: function getDetails() {
	    var _this = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var user = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties, user);
	    this.method = 'GET';
	    this.endpoint = 'groupUser';
	
	    return this.then(function (response) {
	      return _this.model.fromJSON(response.user, _this.properties);
	    });
	  },
	  groupUsers: function groupUsers() {
	    var _this2 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'GET';
	    this.endpoint = 'groupUsers';
	
	    return this.then(function (response) {
	      return _this2.model.please().asResultSet(response, 'user');
	    });
	  },
	  addUserToGroup: function addUserToGroup() {
	    var _this3 = this;
	
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var user = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = user;
	    this.method = 'POST';
	    this.endpoint = 'groupUsers';
	
	    return this.then(function (response) {
	      return _this3.model.fromJSON(response.user, _this3.properties);
	    });
	  },
	  deleteUserFromGroup: function deleteUserFromGroup() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var user = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties, user);
	    this.payload = user;
	    this.method = 'DELETE';
	    this.endpoint = 'groupUser';
	
	    return this;
	  },
	  get: function get() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var config = this.getConfig();
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'GET';
	    this.endpoint = 'detail';
	
	    if ((0, _isEmpty3.default)(config.getAccountKey()) && !(0, _isEmpty3.default)(config.getUserKey()) && !(0, _isEmpty3.default)(config.getApiKey())) {
	      this.endpoint = 'user';
	    }
	
	    return this;
	  },
	  update: function update() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var object = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var config = this.getConfig();
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.payload = object;
	    this.method = 'PATCH';
	    this.endpoint = 'detail';
	
	    if ((0, _isEmpty3.default)(config.getAccountKey()) && !(0, _isEmpty3.default)(config.getUserKey()) && !(0, _isEmpty3.default)(config.getApiKey())) {
	      this.endpoint = 'user';
	    }
	
	    return this;
	  },
	
	
	  /**
	  * Restes user key.
	  * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties lookup properties used for path resolving
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().resetKey({id: 1, instanceName: 'test-one'}).then(function(user) {});
	   */
	  resetKey: function resetKey() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'reset_key';
	
	    return this;
	  },
	
	
	  /**
	  * A convenience method for authenticating instance user with email and password.
	   * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties
	  * @param {String} properties.instanceName
	  * @param {Object} credentials
	  * @param {String} credentials.email
	  * @param {String} credentials.password
	  * @returns {Promise}
	   */
	  login: function login() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var credentials = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'login';
	    this.payload = credentials;
	
	    return this;
	  },
	
	
	  /**
	  * A convenience method for authenticating instance user with email and password.
	   * @memberOf UserQuerySet
	  * @instance
	   * @param {Object} properties
	  * @param {String} properties.instanceName
	  * @param {String} properties.backend
	  * @param {Object} credentials
	  * @param {String} credentials.access_token
	  * @returns {Promise}
	   */
	  socialLogin: function socialLogin() {
	    var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var credentials = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    this.properties = (0, _assign3.default)({}, this.properties, properties);
	    this.method = 'POST';
	    this.endpoint = 'socialLogin';
	    this.payload = credentials;
	
	    return this;
	  }
	});
	
	var UserMeta = (0, _base.Meta)({
	  name: 'user',
	  pluralName: 'users',
	  endpoints: {
	    'detail': {
	      'methods': ['delete', 'patch', 'put', 'get'],
	      'path': '/v1.1/instances/{instanceName}/users/{id}/'
	    },
	    'reset_key': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/users/{id}/reset_key/'
	    },
	    'list': {
	      'methods': ['post', 'get'],
	      'path': '/v1.1/instances/{instanceName}/users/'
	    },
	    'login': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/user/auth/'
	    },
	    'socialLogin': {
	      'methods': ['post'],
	      'path': '/v1.1/instances/{instanceName}/user/auth/{backend}/'
	    },
	    'user': {
	      'methods': ['get', 'post', 'patch'],
	      'path': '/v1.1/instances/{instanceName}/user/'
	    },
	    'groupUsers': {
	      'methods': ['get', 'post'],
	      'path': '/v1.1/instances/{instanceName}/groups/{id}/users/'
	    },
	    'groupUser': {
	      'methods': ['get', 'delete'],
	      'path': '/v1.1/instances/{instanceName}/groups/{id}/users/{user}/'
	    }
	  }
	});
	
	var UserConstraints = {
	  instanceName: {
	    presence: true,
	    length: {
	      minimum: 5
	    }
	  },
	  username: {
	    presence: true,
	    string: true
	  },
	  password: {
	    presence: true,
	    string: true
	  },
	  profile: {
	    object: true
	  },
	  'profile.owner_permissions': {
	    inclusion: ['none', 'read', 'write', 'full']
	  },
	  'profile.group': {
	    numericality: {
	      noStrings: true
	    }
	  },
	  'profile.group_permissions': {
	    inclusion: ['none', 'read', 'write', 'full']
	  },
	  'profile.other_permissions': {
	    inclusion: ['none', 'read', 'write', 'full']
	  },
	  'profile.channel': {
	    string: true
	  },
	  'profile.channel_room': {
	    string: true
	  }
	};
	
	/**
	 * OO wrapper around instance users {@link http://docs.syncano.com/v4.0/docs/user-management endpoint}.
	 * @constructor
	 * @type {User}
	
	 * @property {Number} id
	 * @property {String} instanceName
	 * @property {String} username
	 * @property {String} password
	 * @property {String} user_key
	 * @property {String} [links = {}]
	 * @property {Date} [created_at = null]
	 * @property {Date} [updated_at = null]
	 */
	var User = (0, _stampit2.default)().compose(_base.Model).setMeta(UserMeta).setQuerySet(UserQuerySet).setConstraints(UserConstraints).methods({
	  /**
	  * Gets a user's groups.
	  * @memberOf User
	  * @instance
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().get({instanceName: 'test-one', id: 1}).then(function(user) {
	  *   user.getGroups().then(function(groups) {});
	  * });
	  */
	
	  getGroups: function getGroups() {
	    var _getConfig5 = this.getConfig();
	
	    var Group = _getConfig5.Group;
	
	    return Group.please().getUserGroups({ user: this.id, instanceName: this.instanceName });
	  },
	
	  /**
	  * Gets a user's group.
	  * @memberOf User
	  * @instance
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().get({instanceName: 'test-one', id: 1}).then(function(user) {
	  *   user.getGroup({ group: 1 }).then(function(group) {});
	  * });
	  */
	  getGroup: function getGroup() {
	    var group = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig6 = this.getConfig();
	
	    var Group = _getConfig6.Group;
	
	    return Group.please().getUserGroup({ user: this.id, instanceName: this.instanceName }, group);
	  },
	
	  /**
	  * Adds a group to user.
	  * @memberOf User
	  * @instance
	   * @param {Object} group object with id of group to be added
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().get({instanceName: 'test-one', id: 1}).then(function(user) {
	  *   user.addGroup({ group: 1}).then(function(group) {});
	  * });
	  */
	  addGroup: function addGroup() {
	    var group = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig7 = this.getConfig();
	
	    var Group = _getConfig7.Group;
	
	    return Group.please().addUserGroup({ user: this.id, instanceName: this.instanceName }, group);
	  },
	
	  /**
	  * Removes a user's group.
	  * @memberOf User
	  * @instance
	   * @param {Object} group object with id of group to be added
	   * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().get({instanceName: 'test-one', id: 1}).then(function(user) {
	  *   user.deleteGroup({ group: 1}).then(function(group) {});
	  * });
	  */
	  deleteGroup: function deleteGroup() {
	    var group = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _getConfig8 = this.getConfig();
	
	    var Group = _getConfig8.Group;
	
	    return Group.please().deleteUserGroup({ user: this.id, instanceName: this.instanceName }, group);
	  },
	
	  /**
	  * Restes user key.
	  * @memberOf User
	  * @instance
	  * @returns {Promise}
	   * @example {@lang javascript}
	  * User.please().get({instanceName: 'test-one', id: 1}).then(function(user) {
	  *   user.resetKey().then(function(user) {});
	  * });
	  */
	  resetKey: function resetKey() {
	    var _this4 = this;
	
	    var meta = this.getMeta();
	    var path = meta.resolveEndpointPath('reset_key', this);
	
	    return this.makeRequest('POST', path, {}).then(function (body) {
	      return _this4.serialize(body);
	    });
	  }
	});
	
	exports.default = User;
	module.exports = exports['default'];

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _stampit = __webpack_require__(1);
	
	var _stampit2 = _interopRequireDefault(_stampit);
	
	var _utils = __webpack_require__(23);
	
	var _request = __webpack_require__(19);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	* Utility for pinging the api. Allows checking for connection to the platofrm. Meant to be used directly form the {@link Syncano} instance.
	*
	* @constructor
	* @type {Pinger}
	*
	* @example {@lang javascript}
	* const connection = Syncano();
	* connection.Monitor.startMonitoring();
	* connection.Monitor.on('connected', () => {
	*    // connected to the api
	* });
	* connection.Monitor.on('disconnected', (error) => {
	*    // disconnected from the api
	* });
	*/
	
	var Pinger = (0, _stampit2.default)().compose(_request2.default, _utils.EventEmittable).props({
	  timeout: 5000,
	  interval: null,
	  connected: null
	}).methods({
	  request: function request() {
	    var path = this.getConfig().getBaseUrl();
	    return this.makeRequest('GET', path);
	  },
	  startMonitoring: function startMonitoring() {
	    var _this = this;
	
	    this.interval = setInterval(function () {
	      return _this.ping();
	    }, this.timeout);
	  },
	  ping: function ping() {
	    var _this2 = this;
	
	    this.request().then(function () {
	      if (!_this2.connected) {
	        _this2.connected = true;
	        _this2.emit('connected');
	      }
	    }).catch(function (error) {
	      if (_this2.connected) {
	        _this2.connected = false;
	        _this2.emit('disconnected', error);
	      }
	    });
	  },
	  stopMonitoring: function stopMonitoring() {
	    clearInterval(this.interval);
	  }
	});
	
	exports.default = Pinger;
	module.exports = exports['default'];

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(28);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}
	
	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;
	
	module.exports = Hash;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(15);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(15);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(26),
	    root = __webpack_require__(15);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = 0,
	      result = [];
	
	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}
	
	module.exports = arrayFilter;


/***/ },
/* 139 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;
	
	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}
	
	module.exports = arrayPush;


/***/ },
/* 140 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(29);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used by `_.defaults` to customize its `_.assignIn` use.
	 *
	 * @private
	 * @param {*} objValue The destination value.
	 * @param {*} srcValue The source value.
	 * @param {string} key The key of the property to assign.
	 * @param {Object} object The parent object of `objValue`.
	 * @returns {*} Returns the value to assign.
	 */
	function assignInDefaults(objValue, srcValue, key, object) {
	  if (objValue === undefined ||
	      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
	    return srcValue;
	  }
	  return objValue;
	}
	
	module.exports = assignInDefaults;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(31);
	
	/**
	 * Casts `value` to an empty array if it's not an array like object.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the array-like object.
	 */
	function baseCastArrayLikeObject(value) {
	  return isArrayLikeObject(value) ? value : [];
	}
	
	module.exports = baseCastArrayLikeObject;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(89);
	
	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the array-like object.
	 */
	function baseCastFunction(value) {
	  return typeof value == 'function' ? value : identity;
	}
	
	module.exports = baseCastFunction;


/***/ },
/* 144 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
	 *
	 * @private
	 * @param {number} number The number to clamp.
	 * @param {number} [lower] The lower bound.
	 * @param {number} upper The upper bound.
	 * @returns {number} Returns the clamped number.
	 */
	function baseClamp(number, lower, upper) {
	  if (number === number) {
	    if (upper !== undefined) {
	      number = number <= upper ? number : upper;
	    }
	    if (lower !== undefined) {
	      number = number >= lower ? number : lower;
	    }
	  }
	  return number;
	}
	
	module.exports = baseClamp;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(169);
	
	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(138),
	    isFunction = __webpack_require__(21);
	
	/**
	 * The base implementation of `_.functions` which creates an array of
	 * `object` function property names filtered from `props`.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} props The property names to filter.
	 * @returns {Array} Returns the new array of filtered property names.
	 */
	function baseFunctions(object, props) {
	  return arrayFilter(props, function(key) {
	    return isFunction(object[key]);
	  });
	}
	
	module.exports = baseFunctions;


/***/ },
/* 147 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 148 */
/***/ function(module, exports) {

	/**
	 * This function is like `baseIndexOf` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOfWith(array, value, fromIndex, comparator) {
	  var index = fromIndex - 1,
	      length = array.length;
	
	  while (++index < length) {
	    if (comparator(array[index], value)) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = baseIndexOfWith;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(37),
	    arrayIncludes = __webpack_require__(38),
	    arrayIncludesWith = __webpack_require__(39),
	    arrayMap = __webpack_require__(6),
	    baseUnary = __webpack_require__(45),
	    cacheHas = __webpack_require__(46);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMin = Math.min;
	
	/**
	 * The base implementation of methods like `_.intersection`, without support
	 * for iteratee shorthands, that accepts an array of arrays to inspect.
	 *
	 * @private
	 * @param {Array} arrays The arrays to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of shared values.
	 */
	function baseIntersection(arrays, iteratee, comparator) {
	  var includes = comparator ? arrayIncludesWith : arrayIncludes,
	      length = arrays[0].length,
	      othLength = arrays.length,
	      othIndex = othLength,
	      caches = Array(othLength),
	      maxLength = Infinity,
	      result = [];
	
	  while (othIndex--) {
	    var array = arrays[othIndex];
	    if (othIndex && iteratee) {
	      array = arrayMap(array, baseUnary(iteratee));
	    }
	    maxLength = nativeMin(array.length, maxLength);
	    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
	      ? new SetCache(othIndex && array)
	      : undefined;
	  }
	  array = arrays[0];
	
	  var index = -1,
	      seen = caches[0];
	
	  outer:
	  while (++index < length && result.length < maxLength) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    if (!(seen
	          ? cacheHas(seen, computed)
	          : includes(result, computed, comparator)
	        )) {
	      othIndex = othLength;
	      while (--othIndex) {
	        var cache = caches[othIndex];
	        if (!(cache
	              ? cacheHas(cache, computed)
	              : includes(arrays[othIndex], computed, comparator))
	            ) {
	          continue outer;
	        }
	      }
	      if (seen) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseIntersection;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(65),
	    equalArrays = __webpack_require__(82),
	    equalByTag = __webpack_require__(174),
	    equalObjects = __webpack_require__(175),
	    getTag = __webpack_require__(178),
	    isArray = __webpack_require__(5),
	    isHostObject = __webpack_require__(87),
	    isTypedArray = __webpack_require__(212);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      stack || (stack = new Stack);
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(65),
	    baseIsEqual = __webpack_require__(77);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack,
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;
	
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(134),
	    iteratorToArray = __webpack_require__(184);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);
	
	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}
	
	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(41),
	    isArrayLike = __webpack_require__(7);
	
	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];
	
	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}
	
	module.exports = baseMap;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(151),
	    getMatchData = __webpack_require__(177);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];
	
	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value &&
	        (value !== undefined || (key in Object(object)));
	    };
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(77),
	    get = __webpack_require__(51),
	    hasIn = __webpack_require__(207);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(76);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(6),
	    baseIndexOf = __webpack_require__(43),
	    baseIndexOfWith = __webpack_require__(148),
	    baseUnary = __webpack_require__(45);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * The base implementation of `_.pullAllBy` without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to remove.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns `array`.
	 */
	function basePullAll(array, values, iteratee, comparator) {
	  var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
	      index = -1,
	      length = values.length,
	      seen = array;
	
	  if (iteratee) {
	    seen = arrayMap(array, baseUnary(iteratee));
	  }
	  while (++index < length) {
	    var fromIndex = 0,
	        value = values[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
	      if (seen !== array) {
	        splice.call(seen, fromIndex, 1);
	      }
	      splice.call(array, fromIndex, 1);
	    }
	  }
	  return array;
	}
	
	module.exports = basePullAll;


/***/ },
/* 159 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight`, without support
	 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initAccum Specify using the first or last element of `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
	  eachFunc(collection, function(value, index, collection) {
	    accumulator = initAccum
	      ? (initAccum = false, value)
	      : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}
	
	module.exports = baseReduce;


/***/ },
/* 160 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;
	
	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;
	
	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}
	
	module.exports = baseSlice;


/***/ },
/* 161 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(6);
	
	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}
	
	module.exports = baseToPairs;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(37),
	    arrayIncludes = __webpack_require__(38),
	    arrayIncludesWith = __webpack_require__(39),
	    cacheHas = __webpack_require__(46),
	    createSet = __webpack_require__(172),
	    setToArray = __webpack_require__(88);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new duplicate free array.
	 */
	function baseUniq(array, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      length = array.length,
	      isCommon = true,
	      result = [],
	      seen = result;
	
	  if (comparator) {
	    isCommon = false;
	    includes = arrayIncludesWith;
	  }
	  else if (length >= LARGE_ARRAY_SIZE) {
	    var set = iteratee ? null : createSet(array);
	    if (set) {
	      return setToArray(set);
	    }
	    isCommon = false;
	    includes = cacheHas;
	    seen = new SetCache;
	  }
	  else {
	    seen = iteratee ? [] : result;
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;
	
	    if (isCommon && computed === computed) {
	      var seenIndex = seen.length;
	      while (seenIndex--) {
	        if (seen[seenIndex] === computed) {
	          continue outer;
	        }
	      }
	      if (iteratee) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	    else if (!includes(seen, computed, comparator)) {
	      if (seen !== result) {
	        seen.push(computed);
	      }
	      result.push(value);
	    }
	  }
	  return result;
	}
	
	module.exports = baseUniq;


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(6);
	
	/**
	 * The base implementation of `_.values` and `_.valuesIn` which creates an
	 * array of `object` property values corresponding to the property names
	 * of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the array of property values.
	 */
	function baseValues(object, props) {
	  return arrayMap(props, function(key) {
	    return object[key];
	  });
	}
	
	module.exports = baseValues;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(14);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the set cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var map = this.__data__;
	  if (isKeyable(value)) {
	    var data = map.__data__,
	        hash = typeof value == 'string' ? data.string : data.hash;
	
	    hash[value] = HASH_UNDEFINED;
	  }
	  else {
	    map.set(value, HASH_UNDEFINED);
	  }
	}
	
	module.exports = cachePush;


/***/ },
/* 166 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = checkGlobal;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(80);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}
	
	module.exports = copyObject;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(7);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 169 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var stringToArray = __webpack_require__(197),
	    toString = __webpack_require__(11);
	
	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsZWJ = '\\u200d';
	
	/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
	var reHasComplexSymbol = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');
	
	/**
	 * Creates a function like `_.lowerFirst`.
	 *
	 * @private
	 * @param {string} methodName The name of the `String` case method to use.
	 * @returns {Function} Returns the new function.
	 */
	function createCaseFirst(methodName) {
	  return function(string) {
	    string = toString(string);
	
	    var strSymbols = reHasComplexSymbol.test(string)
	      ? stringToArray(string)
	      : undefined;
	
	    var chr = strSymbols ? strSymbols[0] : string.charAt(0),
	        trailing = strSymbols ? strSymbols.slice(1).join('') : string.slice(1);
	
	    return chr[methodName]() + trailing;
	  };
	}
	
	module.exports = createCaseFirst;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var arrayReduce = __webpack_require__(40),
	    deburr = __webpack_require__(203),
	    words = __webpack_require__(229);
	
	/**
	 * Creates a function like `_.camelCase`.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function(string) {
	    return arrayReduce(words(deburr(string)), callback, '');
	  };
	}
	
	module.exports = createCompounder;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var Set = __webpack_require__(64),
	    noop = __webpack_require__(216);
	
	/**
	 * Creates a set of `values`.
	 *
	 * @private
	 * @param {Array} values The values to add to the set.
	 * @returns {Object} Returns the new set.
	 */
	var createSet = !(Set && new Set([1, 2]).size === 2) ? noop : function(values) {
	  return new Set(values);
	};
	
	module.exports = createSet;


/***/ },
/* 173 */
/***/ function(module, exports) {

	/** Used to map latin-1 supplementary letters to basic latin letters. */
	var deburredLetters = {
	  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	  '\xc7': 'C',  '\xe7': 'c',
	  '\xd0': 'D',  '\xf0': 'd',
	  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	  '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	  '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	  '\xd1': 'N',  '\xf1': 'n',
	  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	  '\xc6': 'Ae', '\xe6': 'ae',
	  '\xde': 'Th', '\xfe': 'th',
	  '\xdf': 'ss'
	};
	
	/**
	 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	function deburrLetter(letter) {
	  return deburredLetters[letter];
	}
	
	module.exports = deburrLetter;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(66),
	    Uint8Array = __webpack_require__(135),
	    equalArrays = __webpack_require__(82),
	    mapToArray = __webpack_require__(190),
	    setToArray = __webpack_require__(88);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(42),
	    keys = __webpack_require__(8);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(79);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(183),
	    toPairs = __webpack_require__(225);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;
	
	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(13),
	    Set = __webpack_require__(64),
	    WeakMap = __webpack_require__(136);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if ((Map && getTag(new Map) != mapTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';
	
	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString: return mapTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(84);
	
	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(28);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(28);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}
	
	module.exports = hashSet;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(29),
	    isArrayLike = __webpack_require__(7),
	    isIndex = __webpack_require__(27),
	    isObject = __webpack_require__(16);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(16);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 184 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];
	
	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}
	
	module.exports = iteratorToArray;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(133),
	    Map = __webpack_require__(13);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}
	
	module.exports = mapClear;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(13),
	    assocDelete = __webpack_require__(69),
	    hashDelete = __webpack_require__(179),
	    isKeyable = __webpack_require__(14);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}
	
	module.exports = mapDelete;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(13),
	    assocGet = __webpack_require__(70),
	    hashGet = __webpack_require__(180),
	    isKeyable = __webpack_require__(14);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}
	
	module.exports = mapGet;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(13),
	    assocHas = __webpack_require__(71),
	    hashHas = __webpack_require__(84),
	    isKeyable = __webpack_require__(14);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}
	
	module.exports = mapHas;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(13),
	    assocSet = __webpack_require__(72),
	    hashSet = __webpack_require__(181),
	    isKeyable = __webpack_require__(14);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}
	
	module.exports = mapSet;


/***/ },
/* 190 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(160),
	    get = __webpack_require__(51);
	
	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}
	
	module.exports = parent;


/***/ },
/* 192 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}
	
	module.exports = stackClear;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(69);
	
	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(70);
	
	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocGet(array, key) : data.map.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(71);
	
	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;
	
	  return array ? assocHas(array, key) : data.map.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(63),
	    assocSet = __webpack_require__(72);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;
	
	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 197 */
/***/ function(module, exports) {

	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsVarRange = '\\ufe0e\\ufe0f';
	
	/** Used to compose unicode capture groups. */
	var rsAstral = '[' + rsAstralRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
	
	/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
	var reComplexSymbol = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
	
	/**
	 * Converts `string` to an array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function stringToArray(string) {
	  return string.match(reComplexSymbol);
	}
	
	module.exports = stringToArray;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(11);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}
	
	module.exports = stringToPath;


/***/ },
/* 199 */
/***/ function(module, exports) {

	/**
	 * Adds two numbers.
	 *
	 * @static
	 * @memberOf _
	 * @category Math
	 * @param {number} augend The first number in an addition.
	 * @param {number} addend The second number in an addition.
	 * @returns {number} Returns the total.
	 * @example
	 *
	 * _.add(6, 4);
	 * // => 10
	 */
	function add(augend, addend) {
	  var result;
	  if (augend === undefined && addend === undefined) {
	    return 0;
	  }
	  if (augend !== undefined) {
	    result = augend;
	  }
	  if (addend !== undefined) {
	    result = result === undefined ? addend : (result + addend);
	  }
	  return result;
	}
	
	module.exports = add;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(80),
	    createAssigner = __webpack_require__(81),
	    keysIn = __webpack_require__(90);
	
	/**
	 * This method is like `_.assignIn` except that it accepts `customizer` which
	 * is invoked to produce the assigned values. If `customizer` returns `undefined`
	 * assignment is handled by the method instead. The `customizer` is invoked
	 * with five arguments: (objValue, srcValue, key, object, source).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @alias extendWith
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   return _.isUndefined(objValue) ? srcValue : objValue;
	 * }
	 *
	 * var defaults = _.partialRight(_.assignInWith, customizer);
	 *
	 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
	 * // => { 'a': 1, 'b': 2 }
	 */
	var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
	  copyObjectWith(source, keysIn(source), object, customizer);
	});
	
	module.exports = assignInWith;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var capitalize = __webpack_require__(202),
	    createCompounder = __webpack_require__(171);
	
	/**
	 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the camel cased string.
	 * @example
	 *
	 * _.camelCase('Foo Bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('--foo-bar');
	 * // => 'fooBar'
	 *
	 * _.camelCase('__foo_bar__');
	 * // => 'fooBar'
	 */
	var camelCase = createCompounder(function(result, word, index) {
	  word = word.toLowerCase();
	  return result + (index ? capitalize(word) : word);
	});
	
	module.exports = camelCase;


/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(11),
	    upperFirst = __webpack_require__(227);
	
	/**
	 * Converts the first character of `string` to upper case and the remaining
	 * to lower case.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to capitalize.
	 * @returns {string} Returns the capitalized string.
	 * @example
	 *
	 * _.capitalize('FRED');
	 * // => 'Fred'
	 */
	function capitalize(string) {
	  return upperFirst(toString(string).toLowerCase());
	}
	
	module.exports = capitalize;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var deburrLetter = __webpack_require__(173),
	    toString = __webpack_require__(11);
	
	/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
	
	/** Used to compose unicode character classes. */
	var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0';
	
	/** Used to compose unicode capture groups. */
	var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';
	
	/**
	 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
	 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
	 */
	var reComboMark = RegExp(rsCombo, 'g');
	
	/**
	 * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = toString(string);
	  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	}
	
	module.exports = deburr;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(74),
	    baseFlatten = __webpack_require__(25),
	    isArrayLikeObject = __webpack_require__(31),
	    rest = __webpack_require__(9);
	
	/**
	 * Creates an array of unique `array` values not included in the other
	 * given arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. The order of result values is determined by the
	 * order they occur in the first array.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @example
	 *
	 * _.difference([3, 2, 1], [4, 2]);
	 * // => [3, 1]
	 */
	var difference = rest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, true))
	    : [];
	});
	
	module.exports = difference;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	var baseFunctions = __webpack_require__(146),
	    keys = __webpack_require__(8);
	
	/**
	 * Creates an array of function property names from own enumerable properties
	 * of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to inspect.
	 * @returns {Array} Returns the new array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = _.constant('a');
	 *   this.b = _.constant('b');
	 * }
	 *
	 * Foo.prototype.c = _.constant('c');
	 *
	 * _.functions(new Foo);
	 * // => ['a', 'b']
	 */
	function functions(object) {
	  return object == null ? [] : baseFunctions(object, keys(object));
	}
	
	module.exports = functions;


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(42),
	    hasPath = __webpack_require__(83);
	
	/**
	 * Checks if `path` is a direct property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = { 'a': { 'b': { 'c': 3 } } };
	 * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.has(object, 'a');
	 * // => true
	 *
	 * _.has(object, 'a.b.c');
	 * // => true
	 *
	 * _.has(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.has(other, 'a');
	 * // => false
	 */
	function has(object, path) {
	  return hasPath(object, path, baseHas);
	}
	
	module.exports = has;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(147),
	    hasPath = __webpack_require__(83);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(6),
	    baseCastArrayLikeObject = __webpack_require__(142),
	    baseIntersection = __webpack_require__(149),
	    rest = __webpack_require__(9);
	
	/**
	 * Creates an array of unique values that are included in all given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. The order of result values is determined by the
	 * order they occur in the first array.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of intersecting values.
	 * @example
	 *
	 * _.intersection([2, 1], [4, 2], [1, 2]);
	 * // => [2]
	 */
	var intersection = rest(function(arrays) {
	  var mapped = arrayMap(arrays, baseCastArrayLikeObject);
	  return (mapped.length && mapped[0] === arrays[0])
	    ? baseIntersection(mapped)
	    : [];
	});
	
	module.exports = intersection;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(21),
	    isHostObject = __webpack_require__(87),
	    isObjectLike = __webpack_require__(10);
	
	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(10);
	
	/** `Object#toString` result references. */
	var numberTag = '[object Number]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Number` primitive or object.
	 *
	 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	 * as numbers, use the `_.isFinite` method.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isNumber(3);
	 * // => true
	 *
	 * _.isNumber(Number.MIN_VALUE);
	 * // => true
	 *
	 * _.isNumber(Infinity);
	 * // => true
	 *
	 * _.isNumber('3');
	 * // => false
	 */
	function isNumber(value) {
	  return typeof value == 'number' ||
	    (isObjectLike(value) && objectToString.call(value) == numberTag);
	}
	
	module.exports = isNumber;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(10);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(32),
	    isObjectLike = __webpack_require__(10);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 213 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	 * @example
	 *
	 * _.isUndefined(void 0);
	 * // => true
	 *
	 * _.isUndefined(null);
	 * // => false
	 */
	function isUndefined(value) {
	  return value === undefined;
	}
	
	module.exports = isUndefined;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(86),
	    toInteger = __webpack_require__(33);
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * This method is like `_.indexOf` except that it iterates over elements of
	 * `array` from right to left.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} [fromIndex=array.length-1] The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 * @example
	 *
	 * _.lastIndexOf([1, 2, 1, 2], 2);
	 * // => 3
	 *
	 * // Search from the `fromIndex`.
	 * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	 * // => 1
	 */
	function lastIndexOf(array, value, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = length;
	  if (fromIndex !== undefined) {
	    index = toInteger(fromIndex);
	    index = (index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1)) + 1;
	  }
	  if (value !== value) {
	    return indexOfNaN(array, index, true);
	  }
	  while (index--) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}
	
	module.exports = lastIndexOf;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(75),
	    baseIteratee = __webpack_require__(44);
	
	/**
	 * Creates an object with the same keys as `object` and values generated by
	 * running each own enumerable property of `object` through `iteratee`. The
	 * iteratee is invoked with three arguments: (value, key, object).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Object} Returns the new mapped object.
	 * @example
	 *
	 * var users = {
	 *   'fred':    { 'user': 'fred',    'age': 40 },
	 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	 * };
	 *
	 * _.mapValues(users, function(o) { return o.age; });
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.mapValues(users, 'age');
	 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	 */
	function mapValues(object, iteratee) {
	  var result = {};
	  iteratee = baseIteratee(iteratee, 3);
	
	  baseForOwn(object, function(value, key, object) {
	    result[key] = iteratee(value, key, object);
	  });
	  return result;
	}
	
	module.exports = mapValues;


/***/ },
/* 216 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(6),
	    baseDifference = __webpack_require__(74),
	    baseFlatten = __webpack_require__(25),
	    basePick = __webpack_require__(78),
	    keysIn = __webpack_require__(90),
	    rest = __webpack_require__(9);
	
	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to omit, specified
	 *  individually or in arrays.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.omit(object, ['a', 'c']);
	 * // => { 'b': '2' }
	 */
	var omit = rest(function(object, props) {
	  if (object == null) {
	    return {};
	  }
	  props = arrayMap(baseFlatten(props, 1), String);
	  return basePick(object, baseDifference(keysIn(object), props));
	});
	
	module.exports = omit;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(25),
	    basePick = __webpack_require__(78),
	    rest = __webpack_require__(9);
	
	/**
	 * Creates an object composed of the picked `object` properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {...(string|string[])} [props] The property names to pick, specified
	 *  individually or in arrays.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': '2', 'c': 3 };
	 *
	 * _.pick(object, ['a', 'c']);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var pick = rest(function(object, props) {
	  return object == null ? {} : basePick(object, baseFlatten(props, 1));
	});
	
	module.exports = pick;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(79),
	    basePropertyDeep = __webpack_require__(157),
	    isKey = __webpack_require__(47);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var pullAll = __webpack_require__(221),
	    rest = __webpack_require__(9);
	
	/**
	 * Removes all given values from `array` using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
	 * to remove elements from an array by predicate.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {...*} [values] The values to remove.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [1, 2, 3, 1, 2, 3];
	 *
	 * _.pull(array, 2, 3);
	 * console.log(array);
	 * // => [1, 1]
	 */
	var pull = rest(pullAll);
	
	module.exports = pull;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var basePullAll = __webpack_require__(158);
	
	/**
	 * This method is like `_.pull` except that it accepts an array of values to remove.
	 *
	 * **Note:** Unlike `_.difference`, this method mutates `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to remove.
	 * @returns {Array} Returns `array`.
	 * @example
	 *
	 * var array = [1, 2, 3, 1, 2, 3];
	 *
	 * _.pullAll(array, [2, 3]);
	 * console.log(array);
	 * // => [1, 1]
	 */
	function pullAll(array, values) {
	  return (array && array.length && values && values.length)
	    ? basePullAll(array, values)
	    : array;
	}
	
	module.exports = pullAll;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(11);
	
	/**
	 * Replaces matches for `pattern` in `string` with `replacement`.
	 *
	 * **Note:** This method is based on [`String#replace`](https://mdn.io/String/replace).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to modify.
	 * @param {RegExp|string} pattern The pattern to replace.
	 * @param {Function|string} replacement The match replacement.
	 * @returns {string} Returns the modified string.
	 * @example
	 *
	 * _.replace('Hi Fred', 'Fred', 'Barney');
	 * // => 'Hi Barney'
	 */
	function replace() {
	  var args = arguments,
	      string = toString(args[0]);
	
	  return args.length < 3 ? string : string.replace(args[1], args[2]);
	}
	
	module.exports = replace;


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var baseClamp = __webpack_require__(144),
	    toInteger = __webpack_require__(33),
	    toString = __webpack_require__(11);
	
	/**
	 * Checks if `string` starts with the given target string.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to search.
	 * @param {string} [target] The string to search for.
	 * @param {number} [position=0] The position to search from.
	 * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	 * @example
	 *
	 * _.startsWith('abc', 'a');
	 * // => true
	 *
	 * _.startsWith('abc', 'b');
	 * // => false
	 *
	 * _.startsWith('abc', 'b', 1);
	 * // => true
	 */
	function startsWith(string, target, position) {
	  string = toString(string);
	  position = baseClamp(toInteger(position), 0, string.length);
	  return string.lastIndexOf(target, position) == position;
	}
	
	module.exports = startsWith;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(21),
	    isObject = __webpack_require__(16);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(162),
	    keys = __webpack_require__(8);
	
	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}
	
	module.exports = toPairs;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten = __webpack_require__(25),
	    baseUniq = __webpack_require__(163),
	    rest = __webpack_require__(9);
	
	/**
	 * Creates an array of unique values, in order, from all given arrays using
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {...Array} [arrays] The arrays to inspect.
	 * @returns {Array} Returns the new array of combined values.
	 * @example
	 *
	 * _.union([2, 1], [4, 2], [1, 2]);
	 * // => [2, 1, 4]
	 */
	var union = rest(function(arrays) {
	  return baseUniq(baseFlatten(arrays, 1, true));
	});
	
	module.exports = union;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var createCaseFirst = __webpack_require__(170);
	
	/**
	 * Converts the first character of `string` to upper case.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the converted string.
	 * @example
	 *
	 * _.upperFirst('fred');
	 * // => 'Fred'
	 *
	 * _.upperFirst('FRED');
	 * // => 'FRED'
	 */
	var upperFirst = createCaseFirst('toUpperCase');
	
	module.exports = upperFirst;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var baseValues = __webpack_require__(164),
	    keys = __webpack_require__(8);
	
	/**
	 * Creates an array of the own enumerable property values of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property values.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.values(new Foo);
	 * // => [1, 2] (iteration order is not guaranteed)
	 *
	 * _.values('hi');
	 * // => ['h', 'i']
	 */
	function values(object) {
	  return object ? baseValues(object, keys(object)) : [];
	}
	
	module.exports = values;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(11);
	
	/** Used to compose unicode character classes. */
	var rsAstralRange = '\\ud800-\\udfff',
	    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
	    rsComboSymbolsRange = '\\u20d0-\\u20f0',
	    rsDingbatRange = '\\u2700-\\u27bf',
	    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
	    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
	    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
	    rsQuoteRange = '\\u2018\\u2019\\u201c\\u201d',
	    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
	    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
	    rsVarRange = '\\ufe0e\\ufe0f',
	    rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange;
	
	/** Used to compose unicode capture groups. */
	var rsBreak = '[' + rsBreakRange + ']',
	    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
	    rsDigits = '\\d+',
	    rsDingbat = '[' + rsDingbatRange + ']',
	    rsLower = '[' + rsLowerRange + ']',
	    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
	    rsFitz = '\\ud83c[\\udffb-\\udfff]',
	    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
	    rsNonAstral = '[^' + rsAstralRange + ']',
	    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
	    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
	    rsUpper = '[' + rsUpperRange + ']',
	    rsZWJ = '\\u200d';
	
	/** Used to compose unicode regexes. */
	var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
	    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
	    reOptMod = rsModifier + '?',
	    rsOptVar = '[' + rsVarRange + ']?',
	    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
	    rsSeq = rsOptVar + reOptMod + rsOptJoin,
	    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
	
	/** Used to match non-compound words composed of alphanumeric characters. */
	var reBasicWord = /[a-zA-Z0-9]+/g;
	
	/** Used to match complex or compound words. */
	var reComplexWord = RegExp([
	  rsUpper + '?' + rsLower + '+(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
	  rsUpperMisc + '+(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
	  rsUpper + '?' + rsLowerMisc + '+',
	  rsUpper + '+',
	  rsDigits,
	  rsEmoji
	].join('|'), 'g');
	
	/** Used to detect strings that need a more robust regexp to match words. */
	var reHasComplexWord = /[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
	
	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  string = toString(string);
	  pattern = guard ? undefined : pattern;
	
	  if (pattern === undefined) {
	    pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord;
	  }
	  return string.match(pattern) || [];
	}
	
	module.exports = words;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(231).Promise;
	
	module.exports = function promiseMapSeries(array, iterator, thisArg) {
	  var length = array.length
	  var current = Promise.resolve()
	  var results = new Array(length)
	  var cb = arguments.length > 2 ? iterator.bind(thisArg) : iterator
	
	  for (var i = 0; i < length; ++i) {
	    current = results[i] = current.then(function(i) {
	      return cb(array[i], i, array)
	    }.bind(undefined, i))
	  }
	
	  return Promise.all(results)
	}


/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, setImmediate, global, module) {/*!
	 * @overview RSVP - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
	 * @version   3.2.1
	 */
	
	(function() {
	    "use strict";
	    function lib$rsvp$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$rsvp$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$rsvp$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$rsvp$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$rsvp$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$rsvp$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$rsvp$utils$$isArray = lib$rsvp$utils$$_isArray;
	
	    var lib$rsvp$utils$$now = Date.now || function() { return new Date().getTime(); };
	
	    function lib$rsvp$utils$$F() { }
	
	    var lib$rsvp$utils$$o_create = (Object.create || function (o) {
	      if (arguments.length > 1) {
	        throw new Error('Second argument not supported');
	      }
	      if (typeof o !== 'object') {
	        throw new TypeError('Argument must be an object');
	      }
	      lib$rsvp$utils$$F.prototype = o;
	      return new lib$rsvp$utils$$F();
	    });
	    function lib$rsvp$events$$indexOf(callbacks, callback) {
	      for (var i=0, l=callbacks.length; i<l; i++) {
	        if (callbacks[i] === callback) { return i; }
	      }
	
	      return -1;
	    }
	
	    function lib$rsvp$events$$callbacksFor(object) {
	      var callbacks = object._promiseCallbacks;
	
	      if (!callbacks) {
	        callbacks = object._promiseCallbacks = {};
	      }
	
	      return callbacks;
	    }
	
	    var lib$rsvp$events$$default = {
	
	      /**
	        `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
	        Example:
	
	        ```javascript
	        var object = {};
	
	        RSVP.EventTarget.mixin(object);
	
	        object.on('finished', function(event) {
	          // handle event
	        });
	
	        object.trigger('finished', { detail: value });
	        ```
	
	        `EventTarget.mixin` also works with prototypes:
	
	        ```javascript
	        var Person = function() {};
	        RSVP.EventTarget.mixin(Person.prototype);
	
	        var yehuda = new Person();
	        var tom = new Person();
	
	        yehuda.on('poke', function(event) {
	          console.log('Yehuda says OW');
	        });
	
	        tom.on('poke', function(event) {
	          console.log('Tom says OW');
	        });
	
	        yehuda.trigger('poke');
	        tom.trigger('poke');
	        ```
	
	        @method mixin
	        @for RSVP.EventTarget
	        @private
	        @param {Object} object object to extend with EventTarget methods
	      */
	      'mixin': function(object) {
	        object['on']      = this['on'];
	        object['off']     = this['off'];
	        object['trigger'] = this['trigger'];
	        object._promiseCallbacks = undefined;
	        return object;
	      },
	
	      /**
	        Registers a callback to be executed when `eventName` is triggered
	
	        ```javascript
	        object.on('event', function(eventInfo){
	          // handle the event
	        });
	
	        object.trigger('event');
	        ```
	
	        @method on
	        @for RSVP.EventTarget
	        @private
	        @param {String} eventName name of the event to listen for
	        @param {Function} callback function to be called when the event is triggered.
	      */
	      'on': function(eventName, callback) {
	        if (typeof callback !== 'function') {
	          throw new TypeError('Callback must be a function');
	        }
	
	        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks;
	
	        callbacks = allCallbacks[eventName];
	
	        if (!callbacks) {
	          callbacks = allCallbacks[eventName] = [];
	        }
	
	        if (lib$rsvp$events$$indexOf(callbacks, callback) === -1) {
	          callbacks.push(callback);
	        }
	      },
	
	      /**
	        You can use `off` to stop firing a particular callback for an event:
	
	        ```javascript
	        function doStuff() { // do stuff! }
	        object.on('stuff', doStuff);
	
	        object.trigger('stuff'); // doStuff will be called
	
	        // Unregister ONLY the doStuff callback
	        object.off('stuff', doStuff);
	        object.trigger('stuff'); // doStuff will NOT be called
	        ```
	
	        If you don't pass a `callback` argument to `off`, ALL callbacks for the
	        event will not be executed when the event fires. For example:
	
	        ```javascript
	        var callback1 = function(){};
	        var callback2 = function(){};
	
	        object.on('stuff', callback1);
	        object.on('stuff', callback2);
	
	        object.trigger('stuff'); // callback1 and callback2 will be executed.
	
	        object.off('stuff');
	        object.trigger('stuff'); // callback1 and callback2 will not be executed!
	        ```
	
	        @method off
	        @for RSVP.EventTarget
	        @private
	        @param {String} eventName event to stop listening to
	        @param {Function} callback optional argument. If given, only the function
	        given will be removed from the event's callback queue. If no `callback`
	        argument is given, all callbacks will be removed from the event's callback
	        queue.
	      */
	      'off': function(eventName, callback) {
	        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, index;
	
	        if (!callback) {
	          allCallbacks[eventName] = [];
	          return;
	        }
	
	        callbacks = allCallbacks[eventName];
	
	        index = lib$rsvp$events$$indexOf(callbacks, callback);
	
	        if (index !== -1) { callbacks.splice(index, 1); }
	      },
	
	      /**
	        Use `trigger` to fire custom events. For example:
	
	        ```javascript
	        object.on('foo', function(){
	          console.log('foo event happened!');
	        });
	        object.trigger('foo');
	        // 'foo event happened!' logged to the console
	        ```
	
	        You can also pass a value as a second argument to `trigger` that will be
	        passed as an argument to all event listeners for the event:
	
	        ```javascript
	        object.on('foo', function(value){
	          console.log(value.name);
	        });
	
	        object.trigger('foo', { name: 'bar' });
	        // 'bar' logged to the console
	        ```
	
	        @method trigger
	        @for RSVP.EventTarget
	        @private
	        @param {String} eventName name of the event to be triggered
	        @param {*} options optional value to be passed to any event handlers for
	        the given `eventName`
	      */
	      'trigger': function(eventName, options, label) {
	        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, callback;
	
	        if (callbacks = allCallbacks[eventName]) {
	          // Don't cache the callbacks.length since it may grow
	          for (var i=0; i<callbacks.length; i++) {
	            callback = callbacks[i];
	
	            callback(options, label);
	          }
	        }
	      }
	    };
	
	    var lib$rsvp$config$$config = {
	      instrument: false
	    };
	
	    lib$rsvp$events$$default['mixin'](lib$rsvp$config$$config);
	
	    function lib$rsvp$config$$configure(name, value) {
	      if (name === 'onerror') {
	        // handle for legacy users that expect the actual
	        // error to be passed to their function added via
	        // `RSVP.configure('onerror', someFunctionHere);`
	        lib$rsvp$config$$config['on']('error', value);
	        return;
	      }
	
	      if (arguments.length === 2) {
	        lib$rsvp$config$$config[name] = value;
	      } else {
	        return lib$rsvp$config$$config[name];
	      }
	    }
	
	    var lib$rsvp$instrument$$queue = [];
	
	    function lib$rsvp$instrument$$scheduleFlush() {
	      setTimeout(function() {
	        var entry;
	        for (var i = 0; i < lib$rsvp$instrument$$queue.length; i++) {
	          entry = lib$rsvp$instrument$$queue[i];
	
	          var payload = entry.payload;
	
	          payload.guid = payload.key + payload.id;
	          payload.childGuid = payload.key + payload.childId;
	          if (payload.error) {
	            payload.stack = payload.error.stack;
	          }
	
	          lib$rsvp$config$$config['trigger'](entry.name, entry.payload);
	        }
	        lib$rsvp$instrument$$queue.length = 0;
	      }, 50);
	    }
	
	    function lib$rsvp$instrument$$instrument(eventName, promise, child) {
	      if (1 === lib$rsvp$instrument$$queue.push({
	        name: eventName,
	        payload: {
	          key: promise._guidKey,
	          id:  promise._id,
	          eventName: eventName,
	          detail: promise._result,
	          childId: child && child._id,
	          label: promise._label,
	          timeStamp: lib$rsvp$utils$$now(),
	          error: lib$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
	        }})) {
	          lib$rsvp$instrument$$scheduleFlush();
	        }
	      }
	    var lib$rsvp$instrument$$default = lib$rsvp$instrument$$instrument;
	    function lib$rsvp$then$$then(onFulfillment, onRejection, label) {
	      var parent = this;
	      var state = parent._state;
	
	      if (state === lib$rsvp$$internal$$FULFILLED && !onFulfillment || state === lib$rsvp$$internal$$REJECTED && !onRejection) {
	        lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default('chained', parent, parent);
	        return parent;
	      }
	
	      parent._onError = null;
	
	      var child = new parent.constructor(lib$rsvp$$internal$$noop, label);
	      var result = parent._result;
	
	      lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default('chained', parent, child);
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$rsvp$config$$config.async(function(){
	          lib$rsvp$$internal$$invokeCallback(state, child, callback, result);
	        });
	      } else {
	        lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$rsvp$then$$default = lib$rsvp$then$$then;
	    function lib$rsvp$promise$resolve$$resolve(object, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
	      lib$rsvp$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$rsvp$promise$resolve$$default = lib$rsvp$promise$resolve$$resolve;
	    function lib$rsvp$enumerator$$makeSettledResult(state, position, value) {
	      if (state === lib$rsvp$$internal$$FULFILLED) {
	        return {
	          state: 'fulfilled',
	          value: value
	        };
	      } else {
	         return {
	          state: 'rejected',
	          reason: value
	        };
	      }
	    }
	
	    function lib$rsvp$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$rsvp$$internal$$noop, label);
	      this._abortOnReject = abortOnReject;
	
	      if (this._validateInput(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._init();
	
	        if (this.length === 0) {
	          lib$rsvp$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$rsvp$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$rsvp$$internal$$reject(this.promise, this._validationError());
	      }
	    }
	
	    var lib$rsvp$enumerator$$default = lib$rsvp$enumerator$$Enumerator;
	
	    lib$rsvp$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$rsvp$utils$$isArray(input);
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length     = this.length;
	      var promise    = this.promise;
	      var input      = this._input;
	
	      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._settleMaybeThenable = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$rsvp$promise$resolve$$default) {
	        var then = lib$rsvp$$internal$$getThen(entry);
	
	        if (then === lib$rsvp$then$$default &&
	            entry._state !== lib$rsvp$$internal$$PENDING) {
	          entry._onError = null;
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = this._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
	        } else if (c === lib$rsvp$promise$$default) {
	          var promise = new c(lib$rsvp$$internal$$noop);
	          lib$rsvp$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      if (lib$rsvp$utils$$isMaybeThenable(entry)) {
	        this._settleMaybeThenable(entry, i);
	      } else {
	        this._remaining--;
	        this._result[i] = this._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
	      }
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$rsvp$$internal$$PENDING) {
	        this._remaining--;
	
	        if (this._abortOnReject && state === lib$rsvp$$internal$$REJECTED) {
	          lib$rsvp$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = this._makeResult(state, i, value);
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$rsvp$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
	      return value;
	    };
	
	    lib$rsvp$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$rsvp$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$rsvp$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$rsvp$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$rsvp$promise$all$$all(entries, label) {
	      return new lib$rsvp$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
	    }
	    var lib$rsvp$promise$all$$default = lib$rsvp$promise$all$$all;
	    function lib$rsvp$promise$race$$race(entries, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
	
	      if (!lib$rsvp$utils$$isArray(entries)) {
	        lib$rsvp$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }
	
	      var length = entries.length;
	
	      function onFulfillment(value) {
	        lib$rsvp$$internal$$resolve(promise, value);
	      }
	
	      function onRejection(reason) {
	        lib$rsvp$$internal$$reject(promise, reason);
	      }
	
	      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
	        lib$rsvp$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }
	
	      return promise;
	    }
	    var lib$rsvp$promise$race$$default = lib$rsvp$promise$race$$race;
	    function lib$rsvp$promise$reject$$reject(reason, label) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
	      lib$rsvp$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$rsvp$promise$reject$$default = lib$rsvp$promise$reject$$reject;
	
	    var lib$rsvp$promise$$guidKey = 'rsvp_' + lib$rsvp$utils$$now() + '-';
	    var lib$rsvp$promise$$counter = 0;
	
	    function lib$rsvp$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$rsvp$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    function lib$rsvp$promise$$Promise(resolver, label) {
	      this._id = lib$rsvp$promise$$counter++;
	      this._label = label;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];
	
	      lib$rsvp$config$$config.instrument && lib$rsvp$instrument$$default('created', this);
	
	      if (lib$rsvp$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$rsvp$promise$$needsResolver();
	        this instanceof lib$rsvp$promise$$Promise ? lib$rsvp$$internal$$initializePromise(this, resolver) : lib$rsvp$promise$$needsNew();
	      }
	    }
	
	    var lib$rsvp$promise$$default = lib$rsvp$promise$$Promise;
	
	    // deprecated
	    lib$rsvp$promise$$Promise.cast = lib$rsvp$promise$resolve$$default;
	    lib$rsvp$promise$$Promise.all = lib$rsvp$promise$all$$default;
	    lib$rsvp$promise$$Promise.race = lib$rsvp$promise$race$$default;
	    lib$rsvp$promise$$Promise.resolve = lib$rsvp$promise$resolve$$default;
	    lib$rsvp$promise$$Promise.reject = lib$rsvp$promise$reject$$default;
	
	    lib$rsvp$promise$$Promise.prototype = {
	      constructor: lib$rsvp$promise$$Promise,
	
	      _guidKey: lib$rsvp$promise$$guidKey,
	
	      _onError: function (reason) {
	        var promise = this;
	        lib$rsvp$config$$config.after(function() {
	          if (promise._onError) {
	            lib$rsvp$config$$config['trigger']('error', reason, promise._label);
	          }
	        });
	      },
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfillment
	      @param {Function} onRejection
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$rsvp$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection, label) {
	        return this.then(undefined, onRejection, label);
	      },
	
	    /**
	      `finally` will be invoked regardless of the promise's fate just as native
	      try/catch/finally behaves
	
	      Synchronous example:
	
	      ```js
	      findAuthor() {
	        if (Math.random() > 0.5) {
	          throw new Error();
	        }
	        return new Author();
	      }
	
	      try {
	        return findAuthor(); // succeed or fail
	      } catch(error) {
	        return findOtherAuther();
	      } finally {
	        // always runs
	        // doesn't affect the return value
	      }
	      ```
	
	      Asynchronous example:
	
	      ```js
	      findAuthor().catch(function(reason){
	        return findOtherAuther();
	      }).finally(function(){
	        // author was either found, or not
	      });
	      ```
	
	      @method finally
	      @param {Function} callback
	      @param {String} label optional string for labeling the promise.
	      Useful for tooling.
	      @return {Promise}
	    */
	      'finally': function(callback, label) {
	        var promise = this;
	        var constructor = promise.constructor;
	
	        return promise.then(function(value) {
	          return constructor.resolve(callback()).then(function() {
	            return value;
	          });
	        }, function(reason) {
	          return constructor.resolve(callback()).then(function() {
	            return constructor.reject(reason);
	          });
	        }, label);
	      }
	    };
	    function  lib$rsvp$$internal$$withOwnPromise() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$rsvp$$internal$$noop() {}
	
	    var lib$rsvp$$internal$$PENDING   = void 0;
	    var lib$rsvp$$internal$$FULFILLED = 1;
	    var lib$rsvp$$internal$$REJECTED  = 2;
	
	    var lib$rsvp$$internal$$GET_THEN_ERROR = new lib$rsvp$$internal$$ErrorObject();
	
	    function lib$rsvp$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$rsvp$$internal$$GET_THEN_ERROR.error = error;
	        return lib$rsvp$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$rsvp$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$rsvp$$internal$$handleForeignThenable(promise, thenable, then) {
	      lib$rsvp$config$$config.async(function(promise) {
	        var sealed = false;
	        var error = lib$rsvp$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$rsvp$$internal$$resolve(promise, value, undefined);
	          } else {
	            lib$rsvp$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$rsvp$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$rsvp$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$rsvp$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$rsvp$$internal$$FULFILLED) {
	        lib$rsvp$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$rsvp$$internal$$REJECTED) {
	        thenable._onError = null;
	        lib$rsvp$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$rsvp$$internal$$subscribe(thenable, undefined, function(value) {
	          if (thenable !== value) {
	            lib$rsvp$$internal$$resolve(promise, value, undefined);
	          } else {
	            lib$rsvp$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          lib$rsvp$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$rsvp$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$rsvp$then$$default &&
	          constructor.resolve === lib$rsvp$promise$resolve$$default) {
	        lib$rsvp$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$rsvp$$internal$$GET_THEN_ERROR) {
	          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$rsvp$utils$$isFunction(then)) {
	          lib$rsvp$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$rsvp$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$rsvp$$internal$$fulfill(promise, value);
	      } else if (lib$rsvp$utils$$objectOrFunction(value)) {
	        lib$rsvp$$internal$$handleMaybeThenable(promise, value, lib$rsvp$$internal$$getThen(value));
	      } else {
	        lib$rsvp$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$rsvp$$internal$$publishRejection(promise) {
	      if (promise._onError) {
	        promise._onError(promise._result);
	      }
	
	      lib$rsvp$$internal$$publish(promise);
	    }
	
	    function lib$rsvp$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$rsvp$$internal$$FULFILLED;
	
	      if (promise._subscribers.length === 0) {
	        if (lib$rsvp$config$$config.instrument) {
	          lib$rsvp$instrument$$default('fulfilled', promise);
	        }
	      } else {
	        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, promise);
	      }
	    }
	
	    function lib$rsvp$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }
	      promise._state = lib$rsvp$$internal$$REJECTED;
	      promise._result = reason;
	      lib$rsvp$config$$config.async(lib$rsvp$$internal$$publishRejection, promise);
	    }
	
	    function lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onError = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$rsvp$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$rsvp$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, parent);
	      }
	    }
	
	    function lib$rsvp$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (lib$rsvp$config$$config.instrument) {
	        lib$rsvp$instrument$$default(settled === lib$rsvp$$internal$$FULFILLED ? 'fulfilled' : 'rejected', promise);
	      }
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$rsvp$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$rsvp$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$rsvp$$internal$$TRY_CATCH_ERROR = new lib$rsvp$$internal$$ErrorObject();
	
	    function lib$rsvp$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$rsvp$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$rsvp$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$rsvp$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$rsvp$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$rsvp$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$rsvp$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$withOwnPromise());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$rsvp$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$rsvp$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$rsvp$$internal$$reject(promise, error);
	      } else if (settled === lib$rsvp$$internal$$FULFILLED) {
	        lib$rsvp$$internal$$fulfill(promise, value);
	      } else if (settled === lib$rsvp$$internal$$REJECTED) {
	        lib$rsvp$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$rsvp$$internal$$initializePromise(promise, resolver) {
	      var resolved = false;
	      try {
	        resolver(function resolvePromise(value){
	          if (resolved) { return; }
	          resolved = true;
	          lib$rsvp$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          if (resolved) { return; }
	          resolved = true;
	          lib$rsvp$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$rsvp$$internal$$reject(promise, e);
	      }
	    }
	
	    function lib$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
	      this._superConstructor(Constructor, entries, false /* don't abort on reject */, label);
	    }
	
	    lib$rsvp$all$settled$$AllSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
	    lib$rsvp$all$settled$$AllSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
	    lib$rsvp$all$settled$$AllSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;
	    lib$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
	      return new Error('allSettled must be called with an array');
	    };
	
	    function lib$rsvp$all$settled$$allSettled(entries, label) {
	      return new lib$rsvp$all$settled$$AllSettled(lib$rsvp$promise$$default, entries, label).promise;
	    }
	    var lib$rsvp$all$settled$$default = lib$rsvp$all$settled$$allSettled;
	    function lib$rsvp$all$$all(array, label) {
	      return lib$rsvp$promise$$default.all(array, label);
	    }
	    var lib$rsvp$all$$default = lib$rsvp$all$$all;
	    var lib$rsvp$asap$$len = 0;
	    var lib$rsvp$asap$$toString = {}.toString;
	    var lib$rsvp$asap$$vertxNext;
	    function lib$rsvp$asap$$asap(callback, arg) {
	      lib$rsvp$asap$$queue[lib$rsvp$asap$$len] = callback;
	      lib$rsvp$asap$$queue[lib$rsvp$asap$$len + 1] = arg;
	      lib$rsvp$asap$$len += 2;
	      if (lib$rsvp$asap$$len === 2) {
	        // If len is 1, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        lib$rsvp$asap$$scheduleFlush();
	      }
	    }
	
	    var lib$rsvp$asap$$default = lib$rsvp$asap$$asap;
	
	    var lib$rsvp$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$rsvp$asap$$browserGlobal = lib$rsvp$asap$$browserWindow || {};
	    var lib$rsvp$asap$$BrowserMutationObserver = lib$rsvp$asap$$browserGlobal.MutationObserver || lib$rsvp$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$rsvp$asap$$isNode = typeof self === 'undefined' &&
	      typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$rsvp$asap$$useNextTick() {
	      var nextTick = process.nextTick;
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // setImmediate should be used instead instead
	      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	        nextTick = setImmediate;
	      }
	      return function() {
	        nextTick(lib$rsvp$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$rsvp$asap$$useVertxTimer() {
	      return function() {
	        lib$rsvp$asap$$vertxNext(lib$rsvp$asap$$flush);
	      };
	    }
	
	    function lib$rsvp$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$rsvp$asap$$BrowserMutationObserver(lib$rsvp$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$rsvp$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$rsvp$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$rsvp$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$rsvp$asap$$flush, 1);
	      };
	    }
	
	    var lib$rsvp$asap$$queue = new Array(1000);
	    function lib$rsvp$asap$$flush() {
	      for (var i = 0; i < lib$rsvp$asap$$len; i+=2) {
	        var callback = lib$rsvp$asap$$queue[i];
	        var arg = lib$rsvp$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$rsvp$asap$$queue[i] = undefined;
	        lib$rsvp$asap$$queue[i+1] = undefined;
	      }
	
	      lib$rsvp$asap$$len = 0;
	    }
	
	    function lib$rsvp$asap$$attemptVertex() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(265);
	        lib$rsvp$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$rsvp$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$rsvp$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$rsvp$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$rsvp$asap$$isNode) {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useNextTick();
	    } else if (lib$rsvp$asap$$BrowserMutationObserver) {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMutationObserver();
	    } else if (lib$rsvp$asap$$isWorker) {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMessageChannel();
	    } else if (lib$rsvp$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$attemptVertex();
	    } else {
	      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useSetTimeout();
	    }
	    function lib$rsvp$defer$$defer(label) {
	      var deferred = {};
	
	      deferred['promise'] = new lib$rsvp$promise$$default(function(resolve, reject) {
	        deferred['resolve'] = resolve;
	        deferred['reject'] = reject;
	      }, label);
	
	      return deferred;
	    }
	    var lib$rsvp$defer$$default = lib$rsvp$defer$$defer;
	    function lib$rsvp$filter$$filter(promises, filterFn, label) {
	      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
	        if (!lib$rsvp$utils$$isFunction(filterFn)) {
	          throw new TypeError("You must pass a function as filter's second argument.");
	        }
	
	        var length = values.length;
	        var filtered = new Array(length);
	
	        for (var i = 0; i < length; i++) {
	          filtered[i] = filterFn(values[i]);
	        }
	
	        return lib$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
	          var results = new Array(length);
	          var newLength = 0;
	
	          for (var i = 0; i < length; i++) {
	            if (filtered[i]) {
	              results[newLength] = values[i];
	              newLength++;
	            }
	          }
	
	          results.length = newLength;
	
	          return results;
	        });
	      });
	    }
	    var lib$rsvp$filter$$default = lib$rsvp$filter$$filter;
	
	    function lib$rsvp$promise$hash$$PromiseHash(Constructor, object, label) {
	      this._superConstructor(Constructor, object, true, label);
	    }
	
	    var lib$rsvp$promise$hash$$default = lib$rsvp$promise$hash$$PromiseHash;
	
	    lib$rsvp$promise$hash$$PromiseHash.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
	    lib$rsvp$promise$hash$$PromiseHash.prototype._superConstructor = lib$rsvp$enumerator$$default;
	    lib$rsvp$promise$hash$$PromiseHash.prototype._init = function() {
	      this._result = {};
	    };
	
	    lib$rsvp$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
	      return input && typeof input === 'object';
	    };
	
	    lib$rsvp$promise$hash$$PromiseHash.prototype._validationError = function() {
	      return new Error('Promise.hash must be called with an object');
	    };
	
	    lib$rsvp$promise$hash$$PromiseHash.prototype._enumerate = function() {
	      var enumerator = this;
	      var promise    = enumerator.promise;
	      var input      = enumerator._input;
	      var results    = [];
	
	      for (var key in input) {
	        if (promise._state === lib$rsvp$$internal$$PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
	          results.push({
	            position: key,
	            entry: input[key]
	          });
	        }
	      }
	
	      var length = results.length;
	      enumerator._remaining = length;
	      var result;
	
	      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
	        result = results[i];
	        enumerator._eachEntry(result.entry, result.position);
	      }
	    };
	
	    function lib$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
	      this._superConstructor(Constructor, object, false, label);
	    }
	
	    lib$rsvp$hash$settled$$HashSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$promise$hash$$default.prototype);
	    lib$rsvp$hash$settled$$HashSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
	    lib$rsvp$hash$settled$$HashSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;
	
	    lib$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
	      return new Error('hashSettled must be called with an object');
	    };
	
	    function lib$rsvp$hash$settled$$hashSettled(object, label) {
	      return new lib$rsvp$hash$settled$$HashSettled(lib$rsvp$promise$$default, object, label).promise;
	    }
	    var lib$rsvp$hash$settled$$default = lib$rsvp$hash$settled$$hashSettled;
	    function lib$rsvp$hash$$hash(object, label) {
	      return new lib$rsvp$promise$hash$$default(lib$rsvp$promise$$default, object, label).promise;
	    }
	    var lib$rsvp$hash$$default = lib$rsvp$hash$$hash;
	    function lib$rsvp$map$$map(promises, mapFn, label) {
	      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
	        if (!lib$rsvp$utils$$isFunction(mapFn)) {
	          throw new TypeError("You must pass a function as map's second argument.");
	        }
	
	        var length = values.length;
	        var results = new Array(length);
	
	        for (var i = 0; i < length; i++) {
	          results[i] = mapFn(values[i]);
	        }
	
	        return lib$rsvp$promise$$default.all(results, label);
	      });
	    }
	    var lib$rsvp$map$$default = lib$rsvp$map$$map;
	
	    function lib$rsvp$node$$Result() {
	      this.value = undefined;
	    }
	
	    var lib$rsvp$node$$ERROR = new lib$rsvp$node$$Result();
	    var lib$rsvp$node$$GET_THEN_ERROR = new lib$rsvp$node$$Result();
	
	    function lib$rsvp$node$$getThen(obj) {
	      try {
	       return obj.then;
	      } catch(error) {
	        lib$rsvp$node$$ERROR.value= error;
	        return lib$rsvp$node$$ERROR;
	      }
	    }
	
	
	    function lib$rsvp$node$$tryApply(f, s, a) {
	      try {
	        f.apply(s, a);
	      } catch(error) {
	        lib$rsvp$node$$ERROR.value = error;
	        return lib$rsvp$node$$ERROR;
	      }
	    }
	
	    function lib$rsvp$node$$makeObject(_, argumentNames) {
	      var obj = {};
	      var name;
	      var i;
	      var length = _.length;
	      var args = new Array(length);
	
	      for (var x = 0; x < length; x++) {
	        args[x] = _[x];
	      }
	
	      for (i = 0; i < argumentNames.length; i++) {
	        name = argumentNames[i];
	        obj[name] = args[i + 1];
	      }
	
	      return obj;
	    }
	
	    function lib$rsvp$node$$arrayResult(_) {
	      var length = _.length;
	      var args = new Array(length - 1);
	
	      for (var i = 1; i < length; i++) {
	        args[i - 1] = _[i];
	      }
	
	      return args;
	    }
	
	    function lib$rsvp$node$$wrapThenable(then, promise) {
	      return {
	        then: function(onFulFillment, onRejection) {
	          return then.call(promise, onFulFillment, onRejection);
	        }
	      };
	    }
	
	    function lib$rsvp$node$$denodeify(nodeFunc, options) {
	      var fn = function() {
	        var self = this;
	        var l = arguments.length;
	        var args = new Array(l + 1);
	        var arg;
	        var promiseInput = false;
	
	        for (var i = 0; i < l; ++i) {
	          arg = arguments[i];
	
	          if (!promiseInput) {
	            // TODO: clean this up
	            promiseInput = lib$rsvp$node$$needsPromiseInput(arg);
	            if (promiseInput === lib$rsvp$node$$GET_THEN_ERROR) {
	              var p = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
	              lib$rsvp$$internal$$reject(p, lib$rsvp$node$$GET_THEN_ERROR.value);
	              return p;
	            } else if (promiseInput && promiseInput !== true) {
	              arg = lib$rsvp$node$$wrapThenable(promiseInput, arg);
	            }
	          }
	          args[i] = arg;
	        }
	
	        var promise = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
	
	        args[l] = function(err, val) {
	          if (err)
	            lib$rsvp$$internal$$reject(promise, err);
	          else if (options === undefined)
	            lib$rsvp$$internal$$resolve(promise, val);
	          else if (options === true)
	            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$arrayResult(arguments));
	          else if (lib$rsvp$utils$$isArray(options))
	            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$makeObject(arguments, options));
	          else
	            lib$rsvp$$internal$$resolve(promise, val);
	        };
	
	        if (promiseInput) {
	          return lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
	        } else {
	          return lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
	        }
	      };
	
	      fn.__proto__ = nodeFunc;
	
	      return fn;
	    }
	
	    var lib$rsvp$node$$default = lib$rsvp$node$$denodeify;
	
	    function lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
	      var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
	      if (result === lib$rsvp$node$$ERROR) {
	        lib$rsvp$$internal$$reject(promise, result.value);
	      }
	      return promise;
	    }
	
	    function lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self){
	      return lib$rsvp$promise$$default.all(args).then(function(args){
	        var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
	        if (result === lib$rsvp$node$$ERROR) {
	          lib$rsvp$$internal$$reject(promise, result.value);
	        }
	        return promise;
	      });
	    }
	
	    function lib$rsvp$node$$needsPromiseInput(arg) {
	      if (arg && typeof arg === 'object') {
	        if (arg.constructor === lib$rsvp$promise$$default) {
	          return true;
	        } else {
	          return lib$rsvp$node$$getThen(arg);
	        }
	      } else {
	        return false;
	      }
	    }
	    var lib$rsvp$platform$$platform;
	
	    /* global self */
	    if (typeof self === 'object') {
	      lib$rsvp$platform$$platform = self;
	
	    /* global global */
	    } else if (typeof global === 'object') {
	      lib$rsvp$platform$$platform = global;
	    } else {
	      throw new Error('no global: `self` or `global` found');
	    }
	
	    var lib$rsvp$platform$$default = lib$rsvp$platform$$platform;
	    function lib$rsvp$race$$race(array, label) {
	      return lib$rsvp$promise$$default.race(array, label);
	    }
	    var lib$rsvp$race$$default = lib$rsvp$race$$race;
	    function lib$rsvp$reject$$reject(reason, label) {
	      return lib$rsvp$promise$$default.reject(reason, label);
	    }
	    var lib$rsvp$reject$$default = lib$rsvp$reject$$reject;
	    function lib$rsvp$resolve$$resolve(value, label) {
	      return lib$rsvp$promise$$default.resolve(value, label);
	    }
	    var lib$rsvp$resolve$$default = lib$rsvp$resolve$$resolve;
	    function lib$rsvp$rethrow$$rethrow(reason) {
	      setTimeout(function() {
	        throw reason;
	      });
	      throw reason;
	    }
	    var lib$rsvp$rethrow$$default = lib$rsvp$rethrow$$rethrow;
	
	    // defaults
	    lib$rsvp$config$$config.async = lib$rsvp$asap$$default;
	    lib$rsvp$config$$config.after = function(cb) {
	      setTimeout(cb, 0);
	    };
	    var lib$rsvp$$cast = lib$rsvp$resolve$$default;
	    function lib$rsvp$$async(callback, arg) {
	      lib$rsvp$config$$config.async(callback, arg);
	    }
	
	    function lib$rsvp$$on() {
	      lib$rsvp$config$$config['on'].apply(lib$rsvp$config$$config, arguments);
	    }
	
	    function lib$rsvp$$off() {
	      lib$rsvp$config$$config['off'].apply(lib$rsvp$config$$config, arguments);
	    }
	
	    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
	    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
	      var lib$rsvp$$callbacks = window['__PROMISE_INSTRUMENTATION__'];
	      lib$rsvp$config$$configure('instrument', true);
	      for (var lib$rsvp$$eventName in lib$rsvp$$callbacks) {
	        if (lib$rsvp$$callbacks.hasOwnProperty(lib$rsvp$$eventName)) {
	          lib$rsvp$$on(lib$rsvp$$eventName, lib$rsvp$$callbacks[lib$rsvp$$eventName]);
	        }
	      }
	    }
	
	    var lib$rsvp$umd$$RSVP = {
	      'race': lib$rsvp$race$$default,
	      'Promise': lib$rsvp$promise$$default,
	      'allSettled': lib$rsvp$all$settled$$default,
	      'hash': lib$rsvp$hash$$default,
	      'hashSettled': lib$rsvp$hash$settled$$default,
	      'denodeify': lib$rsvp$node$$default,
	      'on': lib$rsvp$$on,
	      'off': lib$rsvp$$off,
	      'map': lib$rsvp$map$$default,
	      'filter': lib$rsvp$filter$$default,
	      'resolve': lib$rsvp$resolve$$default,
	      'reject': lib$rsvp$reject$$default,
	      'all': lib$rsvp$all$$default,
	      'rethrow': lib$rsvp$rethrow$$default,
	      'defer': lib$rsvp$defer$$default,
	      'EventTarget': lib$rsvp$events$$default,
	      'configure': lib$rsvp$config$$configure,
	      'async': lib$rsvp$$async
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(58)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$rsvp$umd$$RSVP; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$rsvp$umd$$RSVP;
	    } else if (typeof lib$rsvp$platform$$default !== 'undefined') {
	      lib$rsvp$platform$$default['RSVP'] = lib$rsvp$umd$$RSVP;
	    }
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(60), __webpack_require__(61).setImmediate, (function() { return this; }()), __webpack_require__(59)(module)))

/***/ },
/* 232 */
/***/ function(module, exports) {

	/*!
	 * promise-spread <https://github.com/AndreasPizsa/promise-spread>
	 *
	 * Based on code by Benjamin Gruenbaum <https://github.com/benjamingr>
	 * http://stackoverflow.com/a/22776850/199263
	 *
	 * Copyright (c) 2016, Andreas Pizsa.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	function spread(promise) {
	  if(!promise) promise = Promise;
	  if (promise.prototype.spread) return;
	
	  promise.prototype.spread = function (fn) {
	    return this.then(function (args) {
	      return Promise.all(args);
	    }).then(function(args){
	      return fn.apply(this, args);
	    });
	  };
	}
	
	if(typeof Promise !== 'undefined') spread();
	
	module.exports = spread;


/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(92),
	    baseEach = __webpack_require__(238),
	    createForEach = __webpack_require__(243);
	
	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);
	
	module.exports = forEach;


/***/ },
/* 234 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;
	
	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}
	
	module.exports = arrayCopy;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(237),
	    keys = __webpack_require__(100);
	
	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}
	
	module.exports = baseAssign;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(234),
	    arrayEach = __webpack_require__(92),
	    baseAssign = __webpack_require__(235),
	    baseForOwn = __webpack_require__(55),
	    initCloneArray = __webpack_require__(246),
	    initCloneByTag = __webpack_require__(247),
	    initCloneObject = __webpack_require__(248),
	    isArray = __webpack_require__(35),
	    isObject = __webpack_require__(12);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[stringTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[mapTag] = cloneableTags[setTag] =
	cloneableTags[weakMapTag] = false;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;
	
	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;
	
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);
	
	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);
	
	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}
	
	module.exports = baseClone;


/***/ },
/* 237 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}
	
	module.exports = baseCopy;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(55),
	    createBaseEach = __webpack_require__(241);
	
	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 239 */
79,
/* 240 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Native method references. */
	var ArrayBuffer = global.ArrayBuffer,
	    Uint8Array = global.Uint8Array;
	
	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  var result = new ArrayBuffer(buffer.byteLength),
	      view = new Uint8Array(result);
	
	  view.set(new Uint8Array(buffer));
	  return result;
	}
	
	module.exports = bufferClone;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(94),
	    isLength = __webpack_require__(22),
	    toObject = __webpack_require__(98);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(98);
	
	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(34),
	    isArray = __webpack_require__(35);
	
	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}
	
	module.exports = createForEach;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(34),
	    keysIn = __webpack_require__(101);
	
	/**
	 * Creates a function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForIn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee, keysIn);
	  };
	}
	
	module.exports = createForIn;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(34);
	
	/**
	 * Creates a function for `_.forOwn` or `_.forOwnRight`.
	 *
	 * @private
	 * @param {Function} objectFunc The function to iterate over an object.
	 * @returns {Function} Returns the new each function.
	 */
	function createForOwn(objectFunc) {
	  return function(object, iteratee, thisArg) {
	    if (typeof iteratee != 'function' || thisArg !== undefined) {
	      iteratee = bindCallback(iteratee, thisArg, 3);
	    }
	    return objectFunc(object, iteratee);
	  };
	}
	
	module.exports = createForOwn;


/***/ },
/* 246 */
/***/ function(module, exports) {

	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);
	
	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}
	
	module.exports = initCloneArray;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(240);
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;
	
	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);
	
	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);
	
	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
	
	    case numberTag:
	    case stringTag:
	      return new Ctor(object);
	
	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}
	
	module.exports = initCloneByTag;


/***/ },
/* 248 */
/***/ function(module, exports) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor;
	}
	
	module.exports = initCloneObject;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(99),
	    isArray = __webpack_require__(35),
	    isIndex = __webpack_require__(97),
	    isLength = __webpack_require__(22),
	    keysIn = __webpack_require__(101);
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;
	
	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));
	
	  var index = -1,
	      result = [];
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = shimKeys;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(236),
	    bindCallback = __webpack_require__(34);
	
	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it's invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var deep = _.cloneDeep(users);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.cloneDeep(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(true);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 20
	 */
	function cloneDeep(value, customizer, thisArg) {
	  return typeof customizer == 'function'
	    ? baseClone(value, true, bindCallback(customizer, thisArg, 3))
	    : baseClone(value, true);
	}
	
	module.exports = cloneDeep;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(57),
	    isObjectLike = __webpack_require__(56);
	
	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for native method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}
	
	module.exports = isNative;


/***/ },
/* 252 */
213,
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(93),
	    createForIn = __webpack_require__(244);
	
	/**
	 * Iterates over own and inherited enumerable properties of an object invoking
	 * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	 * with three arguments: (value, key, object). Iteratee functions may exit
	 * iteration early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forIn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	 */
	var forIn = createForIn(baseFor);
	
	module.exports = forIn;


/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(55),
	    createForOwn = __webpack_require__(245);
	
	/**
	 * Iterates over own enumerable properties of an object invoking `iteratee`
	 * for each property. The `iteratee` is bound to `thisArg` and invoked with
	 * three arguments: (value, key, object). Iteratee functions may exit iteration
	 * early by explicitly returning `false`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.forOwn(new Foo, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => logs 'a' and 'b' (iteration order is not guaranteed)
	 */
	var forOwn = createForOwn(baseForOwn);
	
	module.exports = forOwn;


/***/ },
/* 255 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mixer = __webpack_require__(257);
	
	var _mixer2 = _interopRequireDefault(_mixer);
	
	var _lodashLangIsFunction = __webpack_require__(57);
	
	var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);
	
	var isNotFunction = function isNotFunction(val) {
	  return !(0, _lodashLangIsFunction2['default'])(val);
	};
	
	/**
	 * Regular mixin function.
	 */
	var mixin = (0, _mixer2['default'])();
	
	/**
	 * Mixin functions only.
	 */
	var mixinFunctions = (0, _mixer2['default'])({
	  filter: _lodashLangIsFunction2['default']
	});
	
	/**
	 * Mixin functions including prototype chain.
	 */
	var mixinChainFunctions = (0, _mixer2['default'])({
	  filter: _lodashLangIsFunction2['default'],
	  chain: true
	});
	
	/**
	 * Regular object merge function. Ignores functions.
	 */
	var merge = (0, _mixer2['default'])({
	  deep: true
	});
	
	/**
	 * Regular object merge function. Ignores functions.
	 */
	var mergeUnique = (0, _mixer2['default'])({
	  deep: true,
	  noOverwrite: true
	});
	
	/**
	 * Merge objects including prototype chain properties.
	 */
	var mergeChainNonFunctions = (0, _mixer2['default'])({
	  filter: isNotFunction,
	  deep: true,
	  chain: true
	});
	
	exports['default'] = _mixer2['default'];
	exports.mixin = mixin;
	exports.mixinFunctions = mixinFunctions;
	exports.mixinChainFunctions = mixinChainFunctions;
	exports.merge = merge;
	exports.mergeUnique = mergeUnique;
	exports.mergeChainNonFunctions = mergeChainNonFunctions;

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixer;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _lodashObjectForOwn = __webpack_require__(254);
	
	var _lodashObjectForOwn2 = _interopRequireDefault(_lodashObjectForOwn);
	
	var _lodashObjectForIn = __webpack_require__(253);
	
	var _lodashObjectForIn2 = _interopRequireDefault(_lodashObjectForIn);
	
	var _lodashLangCloneDeep = __webpack_require__(250);
	
	var _lodashLangCloneDeep2 = _interopRequireDefault(_lodashLangCloneDeep);
	
	var _lodashLangIsObject = __webpack_require__(12);
	
	var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);
	
	var _lodashLangIsUndefined = __webpack_require__(252);
	
	var _lodashLangIsUndefined2 = _interopRequireDefault(_lodashLangIsUndefined);
	
	/**
	 * Factory for creating mixin functions of all kinds.
	 *
	 * @param {Object} opts
	 * @param {Function} opts.filter Function which filters value and key.
	 * @param {Function} opts.transform Function which transforms each value.
	 * @param {Boolean} opts.chain Loop through prototype properties too.
	 * @param {Boolean} opts.deep Deep looping through the nested properties.
	 * @param {Boolean} opts.noOverwrite Do not overwrite any existing data (aka first one wins).
	 * @return {Function} A new mix function.
	 */
	
	function mixer() {
	  var opts = arguments[0] === undefined ? {} : arguments[0];
	
	  // We will be recursively calling the exact same function when walking deeper.
	  if (opts.deep && !opts._innerMixer) {
	    opts._innerMixer = true; // avoiding infinite recursion.
	    opts._innerMixer = mixer(opts); // create same mixer for recursion purpose.
	  }
	
	  /**
	   * Combine properties from the passed objects into target. This method mutates target,
	   * if you want to create a new Object pass an empty object as first param.
	   *
	   * @param {Object} target Target Object
	   * @param {...Object} objects Objects to be combined (0...n objects).
	   * @return {Object} The mixed object.
	   */
	  return function mix(target) {
	    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      sources[_key - 1] = arguments[_key];
	    }
	
	    // Check if it's us who called the function. See recursion calls are below.
	    if ((0, _lodashLangIsUndefined2['default'])(target) || !opts.noOverwrite && !(0, _lodashLangIsObject2['default'])(target)) {
	      if (sources.length > 1) {
	        // Weird, but someone (not us!) called this mixer with an incorrect first argument.
	        return opts._innerMixer.apply(opts, [{}].concat(sources));
	      }
	      return (0, _lodashLangCloneDeep2['default'])(sources[0]);
	    }
	
	    if (opts.noOverwrite) {
	      if (!(0, _lodashLangIsObject2['default'])(target) || !(0, _lodashLangIsObject2['default'])(sources[0])) {
	        return target;
	      }
	    }
	
	    function iteratee(sourceValue, key) {
	      var targetValue = target[key];
	      if (opts.filter && !opts.filter(sourceValue, targetValue, key)) {
	        return;
	      }
	
	      var result = opts.deep ? opts._innerMixer(targetValue, sourceValue) : sourceValue;
	      target[key] = opts.transform ? opts.transform(result, targetValue, key) : result;
	    }
	
	    var loop = opts.chain ? _lodashObjectForIn2['default'] : _lodashObjectForOwn2['default'];
	    sources.forEach(function (obj) {
	      loop(obj, iteratee);
	    });
	
	    return target;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(261);
	var reduce = __webpack_require__(262);
	var requestBase = __webpack_require__(259);
	var isObject = __webpack_require__(102);
	
	/**
	 * Root reference for iframes.
	 */
	
	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  root = this;
	}
	
	/**
	 * Noop.
	 */
	
	function noop(){};
	
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isHost(obj) {
	  var str = {}.toString.call(obj);
	
	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Expose `request`.
	 */
	
	var request = module.exports = __webpack_require__(260).bind(null, Request);
	
	/**
	 * Determine XHR.
	 */
	
	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};
	
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */
	
	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
	
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */
	
	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pushEncodedKeyValuePair(pairs, key, obj[key]);
	        }
	      }
	  return pairs.join('&');
	}
	
	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */
	
	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (Array.isArray(val)) {
	    return val.forEach(function(v) {
	      pushEncodedKeyValuePair(pairs, key, v);
	    });
	  }
	  pairs.push(encodeURIComponent(key)
	    + '=' + encodeURIComponent(val));
	}
	
	/**
	 * Expose serialization method.
	 */
	
	 request.serializeObject = serialize;
	
	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */
	
	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;
	
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }
	
	  return obj;
	}
	
	/**
	 * Expose parser.
	 */
	
	request.parseString = parseString;
	
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */
	
	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */
	
	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };
	
	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */
	
	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;
	
	  lines.pop(); // trailing CRLF
	
	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }
	
	  return fields;
	}
	
	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */
	
	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}
	
	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function type(str){
	  return str.split(/ *; */).shift();
	};
	
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();
	
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */
	
	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}
	
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};
	
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */
	
	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);
	
	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};
	
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */
	
	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};
	
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */
	
	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	
	  var type = status / 100 | 0;
	
	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;
	
	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;
	
	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};
	
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */
	
	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	
	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	
	  return err;
	};
	
	/**
	 * Expose `Response`.
	 */
	
	request.Response = Response;
	
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */
	
	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;
	
	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }
	
	    self.emit('response', res);
	
	    if (err) {
	      return self.callback(err, res);
	    }
	
	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }
	
	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;
	
	    self.callback(new_err, res);
	  });
	}
	
	/**
	 * Mixin `Emitter` and `requestBase`.
	 */
	
	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}
	
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	
	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};
	
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and 
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};
	
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }
	
	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;
	
	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};
	
	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/
	
	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};
	
	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};
	
	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];
	
	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }
	
	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};
	
	/**
	 * @deprecated
	 */
	Response.prototype.parse = function serialize(fn){
	  if (root.console) {
	    console.warn("Client-side parse() method has been renamed to serialize(). This method is not compatible with superagent v2.0");
	  }
	  this.serialize(fn);
	  return this;
	};
	
	Response.prototype.serialize = function serialize(fn){
	  this._parser = fn;
	  return this;
	};
	
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */
	
	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};
	
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */
	
	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;
	
	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;
	
	  this.callback(err);
	};
	
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */
	
	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};
	
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */
	
	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};
	
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;
	
	  // store callback
	  this._callback = fn || noop;
	
	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	
	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }
	
	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };
	
	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }
	
	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }
	
	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	
	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }
	
	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;
	
	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }
	
	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }
	
	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }
	
	  // send stuff
	  this.emit('request', this);
	
	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};
	
	
	/**
	 * Expose `Request`.
	 */
	
	request.Request = Request;
	
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};
	
	request['del'] = del;
	request['delete'] = del;
	
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */
	
	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(102);
	
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};
	
	/**
	 * Force given parser
	 *
	 * Sets the body parser no matter type.
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};
	
	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};
	
	/**
	 * Faux promise support
	 *
	 * @param {Function} fulfill
	 * @param {Function} reject
	 * @return {Request}
	 */
	
	exports.then = function then(fulfill, reject) {
	  return this.end(function(err, res) {
	    err ? reject(err) : fulfill(res);
	  });
	}
	
	/**
	 * Allow for extension
	 */
	
	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}
	
	
	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};
	
	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */
	
	exports.getHeader = exports.get;
	
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	
	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	
	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};


/***/ },
/* 260 */
/***/ function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */
	
	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }
	
	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }
	
	  return new RequestConstructor(method, url);
	}
	
	module.exports = request;


/***/ },
/* 261 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 262 */
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */
	
	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];
	
	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ },
/* 263 */
/***/ function(module, exports) {

	'use strict';
	
	function promisify (fn, options) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('first parameter is not a function');
	  }
	
	  const opts = Object.assign({
	    context: {},
	    multiArgs: false
	  }, options);
	
	  return function () {
	    const callArgs = Array.prototype.slice.call(arguments);
	
	    return new Promise(function (resolve, reject) {
	      callArgs.push(function (err) {
	        if (err) {
	          reject(err);
	          return;
	        }
	
	        if (opts.multiArgs) {
	          resolve(Array.prototype.slice.call(arguments, 1));
	        } else {
	          resolve(arguments[1]);
	        }
	      });
	
	      fn.apply(opts.context, callArgs);
	    });
	  };
	}
	
	module.exports = promisify;


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * validate.js 0.9.0
	 *
	 * (c) 2013-2015 Nicklas Ansman, 2013 Wrapp
	 * Validate.js may be freely distributed under the MIT license.
	 * For all details and documentation:
	 * http://validatejs.org/
	 */
	
	(function(exports, module, define) {
	  "use strict";
	
	  // The main function that calls the validators specified by the constraints.
	  // The options are the following:
	  //   - format (string) - An option that controls how the returned value is formatted
	  //     * flat - Returns a flat array of just the error messages
	  //     * grouped - Returns the messages grouped by attribute (default)
	  //     * detailed - Returns an array of the raw validation data
	  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
	  //
	  // Please note that the options are also passed to each validator.
	  var validate = function(attributes, constraints, options) {
	    options = v.extend({}, v.options, options);
	
	    var results = v.runValidations(attributes, constraints, options)
	      , attr
	      , validator;
	
	    for (attr in results) {
	      for (validator in results[attr]) {
	        if (v.isPromise(results[attr][validator])) {
	          throw new Error("Use validate.async if you want support for promises");
	        }
	      }
	    }
	    return validate.processValidationResults(results, options);
	  };
	
	  var v = validate;
	
	  // Copies over attributes from one or more sources to a single destination.
	  // Very much similar to underscore's extend.
	  // The first argument is the target object and the remaining arguments will be
	  // used as sources.
	  v.extend = function(obj) {
	    [].slice.call(arguments, 1).forEach(function(source) {
	      for (var attr in source) {
	        obj[attr] = source[attr];
	      }
	    });
	    return obj;
	  };
	
	  v.extend(validate, {
	    // This is the version of the library as a semver.
	    // The toString function will allow it to be coerced into a string
	    version: {
	      major: 0,
	      minor: 9,
	      patch: 0,
	      metadata: null,
	      toString: function() {
	        var version = v.format("%{major}.%{minor}.%{patch}", v.version);
	        if (!v.isEmpty(v.version.metadata)) {
	          version += "+" + v.version.metadata;
	        }
	        return version;
	      }
	    },
	
	    // Below is the dependencies that are used in validate.js
	
	    // The constructor of the Promise implementation.
	    // If you are using Q.js, RSVP or any other A+ compatible implementation
	    // override this attribute to be the constructor of that promise.
	    // Since jQuery promises aren't A+ compatible they won't work.
	    Promise: typeof Promise !== "undefined" ? Promise : /* istanbul ignore next */ null,
	
	    EMPTY_STRING_REGEXP: /^\s*$/,
	
	    // Runs the validators specified by the constraints object.
	    // Will return an array of the format:
	    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
	    runValidations: function(attributes, constraints, options) {
	      var results = []
	        , attr
	        , validatorName
	        , value
	        , validators
	        , validator
	        , validatorOptions
	        , error;
	
	      if (v.isDomElement(attributes) || v.isJqueryElement(attributes)) {
	        attributes = v.collectFormValues(attributes);
	      }
	
	      // Loops through each constraints, finds the correct validator and run it.
	      for (attr in constraints) {
	        value = v.getDeepObjectValue(attributes, attr);
	        // This allows the constraints for an attribute to be a function.
	        // The function will be called with the value, attribute name, the complete dict of
	        // attributes as well as the options and constraints passed in.
	        // This is useful when you want to have different
	        // validations depending on the attribute value.
	        validators = v.result(constraints[attr], value, attributes, attr, options, constraints);
	
	        for (validatorName in validators) {
	          validator = v.validators[validatorName];
	
	          if (!validator) {
	            error = v.format("Unknown validator %{name}", {name: validatorName});
	            throw new Error(error);
	          }
	
	          validatorOptions = validators[validatorName];
	          // This allows the options to be a function. The function will be
	          // called with the value, attribute name, the complete dict of
	          // attributes as well as the options and constraints passed in.
	          // This is useful when you want to have different
	          // validations depending on the attribute value.
	          validatorOptions = v.result(validatorOptions, value, attributes, attr, options, constraints);
	          if (!validatorOptions) {
	            continue;
	          }
	          results.push({
	            attribute: attr,
	            value: value,
	            validator: validatorName,
	            globalOptions: options,
	            attributes: attributes,
	            options: validatorOptions,
	            error: validator.call(validator,
	                value,
	                validatorOptions,
	                attr,
	                attributes,
	                options)
	          });
	        }
	      }
	
	      return results;
	    },
	
	    // Takes the output from runValidations and converts it to the correct
	    // output format.
	    processValidationResults: function(errors, options) {
	      var attr;
	
	      errors = v.pruneEmptyErrors(errors, options);
	      errors = v.expandMultipleErrors(errors, options);
	      errors = v.convertErrorMessages(errors, options);
	
	      switch (options.format || "grouped") {
	        case "detailed":
	          // Do nothing more to the errors
	          break;
	
	        case "flat":
	          errors = v.flattenErrorsToArray(errors);
	          break;
	
	        case "grouped":
	          errors = v.groupErrorsByAttribute(errors);
	          for (attr in errors) {
	            errors[attr] = v.flattenErrorsToArray(errors[attr]);
	          }
	          break;
	
	        default:
	          throw new Error(v.format("Unknown format %{format}", options));
	      }
	
	      return v.isEmpty(errors) ? undefined : errors;
	    },
	
	    // Runs the validations with support for promises.
	    // This function will return a promise that is settled when all the
	    // validation promises have been completed.
	    // It can be called even if no validations returned a promise.
	    async: function(attributes, constraints, options) {
	      options = v.extend({}, v.async.options, options);
	
	      var WrapErrors = options.wrapErrors || function(errors) {
	        return errors;
	      };
	
	      // Removes unknown attributes
	      if (options.cleanAttributes !== false) {
	        attributes = v.cleanAttributes(attributes, constraints);
	      }
	
	      var results = v.runValidations(attributes, constraints, options);
	
	      return new v.Promise(function(resolve, reject) {
	        v.waitForResults(results).then(function() {
	          var errors = v.processValidationResults(results, options);
	          if (errors) {
	            reject(new WrapErrors(errors, options, attributes, constraints));
	          } else {
	            resolve(attributes);
	          }
	        }, function(err) {
	          reject(err);
	        });
	      });
	    },
	
	    single: function(value, constraints, options) {
	      options = v.extend({}, v.single.options, options, {
	        format: "flat",
	        fullMessages: false
	      });
	      return v({single: value}, {single: constraints}, options);
	    },
	
	    // Returns a promise that is resolved when all promises in the results array
	    // are settled. The promise returned from this function is always resolved,
	    // never rejected.
	    // This function modifies the input argument, it replaces the promises
	    // with the value returned from the promise.
	    waitForResults: function(results) {
	      // Create a sequence of all the results starting with a resolved promise.
	      return results.reduce(function(memo, result) {
	        // If this result isn't a promise skip it in the sequence.
	        if (!v.isPromise(result.error)) {
	          return memo;
	        }
	
	        return memo.then(function() {
	          return result.error.then(
	            function(error) {
	              result.error = error || null;
	            },
	            function(error) {
	              if (error instanceof Error) {
	                throw error;
	              }
	              v.error("Rejecting promises with the result is deprecated. Please use the resolve callback instead.");
	              result.error = error;
	            }
	          );
	        });
	      }, new v.Promise(function(r) { r(); })); // A resolved promise
	    },
	
	    // If the given argument is a call: function the and: function return the value
	    // otherwise just return the value. Additional arguments will be passed as
	    // arguments to the function.
	    // Example:
	    // ```
	    // result('foo') // 'foo'
	    // result(Math.max, 1, 2) // 2
	    // ```
	    result: function(value) {
	      var args = [].slice.call(arguments, 1);
	      if (typeof value === 'function') {
	        value = value.apply(null, args);
	      }
	      return value;
	    },
	
	    // Checks if the value is a number. This function does not consider NaN a
	    // number like many other `isNumber` functions do.
	    isNumber: function(value) {
	      return typeof value === 'number' && !isNaN(value);
	    },
	
	    // Returns false if the object is not a function
	    isFunction: function(value) {
	      return typeof value === 'function';
	    },
	
	    // A simple check to verify that the value is an integer. Uses `isNumber`
	    // and a simple modulo check.
	    isInteger: function(value) {
	      return v.isNumber(value) && value % 1 === 0;
	    },
	
	    // Uses the `Object` function to check if the given argument is an object.
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	
	    // Simply checks if the object is an instance of a date
	    isDate: function(obj) {
	      return obj instanceof Date;
	    },
	
	    // Returns false if the object is `null` of `undefined`
	    isDefined: function(obj) {
	      return obj !== null && obj !== undefined;
	    },
	
	    // Checks if the given argument is a promise. Anything with a `then`
	    // function is considered a promise.
	    isPromise: function(p) {
	      return !!p && v.isFunction(p.then);
	    },
	
	    isJqueryElement: function(o) {
	      return o && v.isString(o.jquery);
	    },
	
	    isDomElement: function(o) {
	      if (!o) {
	        return false;
	      }
	
	      if (!v.isFunction(o.querySelectorAll) || !v.isFunction(o.querySelector)) {
	        return false;
	      }
	
	      if (v.isObject(document) && o === document) {
	        return true;
	      }
	
	      // http://stackoverflow.com/a/384380/699304
	      /* istanbul ignore else */
	      if (typeof HTMLElement === "object") {
	        return o instanceof HTMLElement;
	      } else {
	        return o &&
	          typeof o === "object" &&
	          o !== null &&
	          o.nodeType === 1 &&
	          typeof o.nodeName === "string";
	      }
	    },
	
	    isEmpty: function(value) {
	      var attr;
	
	      // Null and undefined are empty
	      if (!v.isDefined(value)) {
	        return true;
	      }
	
	      // functions are non empty
	      if (v.isFunction(value)) {
	        return false;
	      }
	
	      // Whitespace only strings are empty
	      if (v.isString(value)) {
	        return v.EMPTY_STRING_REGEXP.test(value);
	      }
	
	      // For arrays we use the length property
	      if (v.isArray(value)) {
	        return value.length === 0;
	      }
	
	      // Dates have no attributes but aren't empty
	      if (v.isDate(value)) {
	        return false;
	      }
	
	      // If we find at least one property we consider it non empty
	      if (v.isObject(value)) {
	        for (attr in value) {
	          return false;
	        }
	        return true;
	      }
	
	      return false;
	    },
	
	    // Formats the specified strings with the given values like so:
	    // ```
	    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
	    // ```
	    // If you want to write %{...} without having it replaced simply
	    // prefix it with % like this `Foo: %%{foo}` and it will be returned
	    // as `"Foo: %{foo}"`
	    format: v.extend(function(str, vals) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str.replace(v.format.FORMAT_REGEXP, function(m0, m1, m2) {
	        if (m1 === '%') {
	          return "%{" + m2 + "}";
	        } else {
	          return String(vals[m2]);
	        }
	      });
	    }, {
	      // Finds %{key} style patterns in the given string
	      FORMAT_REGEXP: /(%?)%\{([^\}]+)\}/g
	    }),
	
	    // "Prettifies" the given string.
	    // Prettifying means replacing [.\_-] with spaces as well as splitting
	    // camel case words.
	    prettify: function(str) {
	      if (v.isNumber(str)) {
	        // If there are more than 2 decimals round it to two
	        if ((str * 100) % 1 === 0) {
	          return "" + str;
	        } else {
	          return parseFloat(Math.round(str * 100) / 100).toFixed(2);
	        }
	      }
	
	      if (v.isArray(str)) {
	        return str.map(function(s) { return v.prettify(s); }).join(", ");
	      }
	
	      if (v.isObject(str)) {
	        return str.toString();
	      }
	
	      // Ensure the string is actually a string
	      str = "" + str;
	
	      return str
	        // Splits keys separated by periods
	        .replace(/([^\s])\.([^\s])/g, '$1 $2')
	        // Removes backslashes
	        .replace(/\\+/g, '')
	        // Replaces - and - with space
	        .replace(/[_-]/g, ' ')
	        // Splits camel cased words
	        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
	          return "" + m1 + " " + m2.toLowerCase();
	        })
	        .toLowerCase();
	    },
	
	    stringifyValue: function(value) {
	      return v.prettify(value);
	    },
	
	    isString: function(value) {
	      return typeof value === 'string';
	    },
	
	    isArray: function(value) {
	      return {}.toString.call(value) === '[object Array]';
	    },
	
	    contains: function(obj, value) {
	      if (!v.isDefined(obj)) {
	        return false;
	      }
	      if (v.isArray(obj)) {
	        return obj.indexOf(value) !== -1;
	      }
	      return value in obj;
	    },
	
	    forEachKeyInKeypath: function(object, keypath, callback) {
	      if (!v.isString(keypath)) {
	        return undefined;
	      }
	
	      var key = ""
	        , i
	        , escape = false;
	
	      for (i = 0; i < keypath.length; ++i) {
	        switch (keypath[i]) {
	          case '.':
	            if (escape) {
	              escape = false;
	              key += '.';
	            } else {
	              object = callback(object, key, false);
	              key = "";
	            }
	            break;
	
	          case '\\':
	            if (escape) {
	              escape = false;
	              key += '\\';
	            } else {
	              escape = true;
	            }
	            break;
	
	          default:
	            escape = false;
	            key += keypath[i];
	            break;
	        }
	      }
	
	      return callback(object, key, true);
	    },
	
	    getDeepObjectValue: function(obj, keypath) {
	      if (!v.isObject(obj)) {
	        return undefined;
	      }
	
	      return v.forEachKeyInKeypath(obj, keypath, function(obj, key) {
	        if (v.isObject(obj)) {
	          return obj[key];
	        }
	      });
	    },
	
	    // This returns an object with all the values of the form.
	    // It uses the input name as key and the value as value
	    // So for example this:
	    // <input type="text" name="email" value="foo@bar.com" />
	    // would return:
	    // {email: "foo@bar.com"}
	    collectFormValues: function(form, options) {
	      var values = {}
	        , i
	        , input
	        , inputs
	        , value;
	
	      if (v.isJqueryElement(form)) {
	        form = form[0];
	      }
	
	      if (!form) {
	        return values;
	      }
	
	      options = options || {};
	
	      inputs = form.querySelectorAll("input[name], textarea[name]");
	      for (i = 0; i < inputs.length; ++i) {
	        input = inputs.item(i);
	
	        if (v.isDefined(input.getAttribute("data-ignored"))) {
	          continue;
	        }
	
	        value = v.sanitizeFormValue(input.value, options);
	        if (input.type === "number") {
	          value = value ? +value : null;
	        } else if (input.type === "checkbox") {
	          if (input.attributes.value) {
	            if (!input.checked) {
	              value = values[input.name] || null;
	            }
	          } else {
	            value = input.checked;
	          }
	        } else if (input.type === "radio") {
	          if (!input.checked) {
	            value = values[input.name] || null;
	          }
	        }
	        values[input.name] = value;
	      }
	
	      inputs = form.querySelectorAll("select[name]");
	      for (i = 0; i < inputs.length; ++i) {
	        input = inputs.item(i);
	        value = v.sanitizeFormValue(input.options[input.selectedIndex].value, options);
	        values[input.name] = value;
	      }
	
	      return values;
	    },
	
	    sanitizeFormValue: function(value, options) {
	      if (options.trim && v.isString(value)) {
	        value = value.trim();
	      }
	
	      if (options.nullify !== false && value === "") {
	        return null;
	      }
	      return value;
	    },
	
	    capitalize: function(str) {
	      if (!v.isString(str)) {
	        return str;
	      }
	      return str[0].toUpperCase() + str.slice(1);
	    },
	
	    // Remove all errors who's error attribute is empty (null or undefined)
	    pruneEmptyErrors: function(errors) {
	      return errors.filter(function(error) {
	        return !v.isEmpty(error.error);
	      });
	    },
	
	    // In
	    // [{error: ["err1", "err2"], ...}]
	    // Out
	    // [{error: "err1", ...}, {error: "err2", ...}]
	    //
	    // All attributes in an error with multiple messages are duplicated
	    // when expanding the errors.
	    expandMultipleErrors: function(errors) {
	      var ret = [];
	      errors.forEach(function(error) {
	        // Removes errors without a message
	        if (v.isArray(error.error)) {
	          error.error.forEach(function(msg) {
	            ret.push(v.extend({}, error, {error: msg}));
	          });
	        } else {
	          ret.push(error);
	        }
	      });
	      return ret;
	    },
	
	    // Converts the error mesages by prepending the attribute name unless the
	    // message is prefixed by ^
	    convertErrorMessages: function(errors, options) {
	      options = options || {};
	
	      var ret = [];
	      errors.forEach(function(errorInfo) {
	        var error = v.result(errorInfo.error,
	            errorInfo.value,
	            errorInfo.attribute,
	            errorInfo.options,
	            errorInfo.attributes,
	            errorInfo.globalOptions);
	
	        if (!v.isString(error)) {
	          ret.push(errorInfo);
	          return;
	        }
	
	        if (error[0] === '^') {
	          error = error.slice(1);
	        } else if (options.fullMessages !== false) {
	          error = v.capitalize(v.prettify(errorInfo.attribute)) + " " + error;
	        }
	        error = error.replace(/\\\^/g, "^");
	        error = v.format(error, {value: v.stringifyValue(errorInfo.value)});
	        ret.push(v.extend({}, errorInfo, {error: error}));
	      });
	      return ret;
	    },
	
	    // In:
	    // [{attribute: "<attributeName>", ...}]
	    // Out:
	    // {"<attributeName>": [{attribute: "<attributeName>", ...}]}
	    groupErrorsByAttribute: function(errors) {
	      var ret = {};
	      errors.forEach(function(error) {
	        var list = ret[error.attribute];
	        if (list) {
	          list.push(error);
	        } else {
	          ret[error.attribute] = [error];
	        }
	      });
	      return ret;
	    },
	
	    // In:
	    // [{error: "<message 1>", ...}, {error: "<message 2>", ...}]
	    // Out:
	    // ["<message 1>", "<message 2>"]
	    flattenErrorsToArray: function(errors) {
	      return errors.map(function(error) { return error.error; });
	    },
	
	    cleanAttributes: function(attributes, whitelist) {
	      function whitelistCreator(obj, key, last) {
	        if (v.isObject(obj[key])) {
	          return obj[key];
	        }
	        return (obj[key] = last ? true : {});
	      }
	
	      function buildObjectWhitelist(whitelist) {
	        var ow = {}
	          , lastObject
	          , attr;
	        for (attr in whitelist) {
	          if (!whitelist[attr]) {
	            continue;
	          }
	          v.forEachKeyInKeypath(ow, attr, whitelistCreator);
	        }
	        return ow;
	      }
	
	      function cleanRecursive(attributes, whitelist) {
	        if (!v.isObject(attributes)) {
	          return attributes;
	        }
	
	        var ret = v.extend({}, attributes)
	          , w
	          , attribute;
	
	        for (attribute in attributes) {
	          w = whitelist[attribute];
	
	          if (v.isObject(w)) {
	            ret[attribute] = cleanRecursive(ret[attribute], w);
	          } else if (!w) {
	            delete ret[attribute];
	          }
	        }
	        return ret;
	      }
	
	      if (!v.isObject(whitelist) || !v.isObject(attributes)) {
	        return {};
	      }
	
	      whitelist = buildObjectWhitelist(whitelist);
	      return cleanRecursive(attributes, whitelist);
	    },
	
	    exposeModule: function(validate, root, exports, module, define) {
	      if (exports) {
	        if (module && module.exports) {
	          exports = module.exports = validate;
	        }
	        exports.validate = validate;
	      } else {
	        root.validate = validate;
	        if (validate.isFunction(define) && define.amd) {
	          define([], function () { return validate; });
	        }
	      }
	    },
	
	    warn: function(msg) {
	      if (typeof console !== "undefined" && console.warn) {
	        console.warn("[validate.js] " + msg);
	      }
	    },
	
	    error: function(msg) {
	      if (typeof console !== "undefined" && console.error) {
	        console.error("[validate.js] " + msg);
	      }
	    }
	  });
	
	  validate.validators = {
	    // Presence validates that the value isn't empty
	    presence: function(value, options) {
	      options = v.extend({}, this.options, options);
	      if (v.isEmpty(value)) {
	        return options.message || this.message || "can't be blank";
	      }
	    },
	    length: function(value, options, attribute) {
	      // Empty values are allowed
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var is = options.is
	        , maximum = options.maximum
	        , minimum = options.minimum
	        , tokenizer = options.tokenizer || function(val) { return val; }
	        , err
	        , errors = [];
	
	      value = tokenizer(value);
	      var length = value.length;
	      if(!v.isNumber(length)) {
	        v.error(v.format("Attribute %{attr} has a non numeric value for `length`", {attr: attribute}));
	        return options.message || this.notValid || "has an incorrect length";
	      }
	
	      // Is checks
	      if (v.isNumber(is) && length !== is) {
	        err = options.wrongLength ||
	          this.wrongLength ||
	          "is the wrong length (should be %{count} characters)";
	        errors.push(v.format(err, {count: is}));
	      }
	
	      if (v.isNumber(minimum) && length < minimum) {
	        err = options.tooShort ||
	          this.tooShort ||
	          "is too short (minimum is %{count} characters)";
	        errors.push(v.format(err, {count: minimum}));
	      }
	
	      if (v.isNumber(maximum) && length > maximum) {
	        err = options.tooLong ||
	          this.tooLong ||
	          "is too long (maximum is %{count} characters)";
	        errors.push(v.format(err, {count: maximum}));
	      }
	
	      if (errors.length > 0) {
	        return options.message || errors;
	      }
	    },
	    numericality: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var errors = []
	        , name
	        , count
	        , checks = {
	            greaterThan:          function(v, c) { return v > c; },
	            greaterThanOrEqualTo: function(v, c) { return v >= c; },
	            equalTo:              function(v, c) { return v === c; },
	            lessThan:             function(v, c) { return v < c; },
	            lessThanOrEqualTo:    function(v, c) { return v <= c; }
	          };
	
	      // Coerce the value to a number unless we're being strict.
	      if (options.noStrings !== true && v.isString(value)) {
	        value = +value;
	      }
	
	      // If it's not a number we shouldn't continue since it will compare it.
	      if (!v.isNumber(value)) {
	        return options.message || options.notValid || this.notValid || "is not a number";
	      }
	
	      // Same logic as above, sort of. Don't bother with comparisons if this
	      // doesn't pass.
	      if (options.onlyInteger && !v.isInteger(value)) {
	        return options.message || options.notInteger || this.notInteger  || "must be an integer";
	      }
	
	      for (name in checks) {
	        count = options[name];
	        if (v.isNumber(count) && !checks[name](value, count)) {
	          // This picks the default message if specified
	          // For example the greaterThan check uses the message from
	          // this.notGreaterThan so we capitalize the name and prepend "not"
	          var key = "not" + v.capitalize(name);
	          var msg = options[key] || this[key] || "must be %{type} %{count}";
	
	          errors.push(v.format(msg, {
	            count: count,
	            type: v.prettify(name)
	          }));
	        }
	      }
	
	      if (options.odd && value % 2 !== 1) {
	        errors.push(options.notOdd || this.notOdd || "must be odd");
	      }
	      if (options.even && value % 2 !== 0) {
	        errors.push(options.notEven || this.notEven || "must be even");
	      }
	
	      if (errors.length) {
	        return options.message || errors;
	      }
	    },
	    datetime: v.extend(function(value, options) {
	      if (!v.isFunction(this.parse) || !v.isFunction(this.format)) {
	        throw new Error("Both the parse and format functions needs to be set to use the datetime/date validator");
	      }
	
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var err
	        , errors = []
	        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
	        , latest = options.latest ? this.parse(options.latest, options) : NaN;
	
	      value = this.parse(value, options);
	
	      // 86400000 is the number of seconds in a day, this is used to remove
	      // the time from the date
	      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0) {
	        return options.message || this.notValid || "must be a valid date";
	      }
	
	      if (!isNaN(earliest) && value < earliest) {
	        err = this.tooEarly || "must be no earlier than %{date}";
	        err = v.format(err, {date: this.format(earliest, options)});
	        errors.push(err);
	      }
	
	      if (!isNaN(latest) && value > latest) {
	        err = this.tooLate || "must be no later than %{date}";
	        err = v.format(err, {date: this.format(latest, options)});
	        errors.push(err);
	      }
	
	      if (errors.length) {
	        return options.message || errors;
	      }
	    }, {
	      parse: null,
	      format: null
	    }),
	    date: function(value, options) {
	      options = v.extend({}, options, {dateOnly: true});
	      return v.validators.datetime.call(v.validators.datetime, value, options);
	    },
	    format: function(value, options) {
	      if (v.isString(options) || (options instanceof RegExp)) {
	        options = {pattern: options};
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var message = options.message || this.message || "is invalid"
	        , pattern = options.pattern
	        , match;
	
	      // Empty values are allowed
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	
	      if (v.isString(pattern)) {
	        pattern = new RegExp(options.pattern, options.flags);
	      }
	      match = pattern.exec(value);
	      if (!match || match[0].length != value.length) {
	        return message;
	      }
	    },
	    inclusion: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message ||
	        this.message ||
	        "^%{value} is not included in the list";
	      return v.format(message, {value: value});
	    },
	    exclusion: function(value, options) {
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (v.isArray(options)) {
	        options = {within: options};
	      }
	      options = v.extend({}, this.options, options);
	      if (!v.contains(options.within, value)) {
	        return;
	      }
	      var message = options.message || this.message || "^%{value} is restricted";
	      return v.format(message, {value: value});
	    },
	    email: v.extend(function(value, options) {
	      options = v.extend({}, this.options, options);
	      var message = options.message || this.message || "is not a valid email";
	      // Empty values are fine
	      if (v.isEmpty(value)) {
	        return;
	      }
	      if (!v.isString(value)) {
	        return message;
	      }
	      if (!this.PATTERN.exec(value)) {
	        return message;
	      }
	    }, {
	      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
	    }),
	    equality: function(value, options, attribute, attributes) {
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      if (v.isString(options)) {
	        options = {attribute: options};
	      }
	      options = v.extend({}, this.options, options);
	      var message = options.message ||
	        this.message ||
	        "is not equal to %{attribute}";
	
	      if (v.isEmpty(options.attribute) || !v.isString(options.attribute)) {
	        throw new Error("The attribute must be a non empty string");
	      }
	
	      var otherValue = v.getDeepObjectValue(attributes, options.attribute)
	        , comparator = options.comparator || function(v1, v2) {
	          return v1 === v2;
	        };
	
	      if (!comparator(value, otherValue, options, attribute, attributes)) {
	        return v.format(message, {attribute: v.prettify(options.attribute)});
	      }
	    },
	
	    // A URL validator that is used to validate URLs with the ability to
	    // restrict schemes and some domains.
	    url: function(value, options) {
	      if (v.isEmpty(value)) {
	        return;
	      }
	
	      options = v.extend({}, this.options, options);
	
	      var message = options.message || this.message || "is not a valid url"
	        , schemes = options.schemes || this.schemes || ['http', 'https']
	        , allowLocal = options.allowLocal || this.allowLocal || false;
	
	      if (!v.isString(value)) {
	        return message;
	      }
	
	      // https://gist.github.com/dperini/729294
	      var regex =
	        "^" +
	          // schemes
	          "(?:(?:" + schemes.join("|") + "):\\/\\/)" +
	          // credentials
	          "(?:\\S+(?::\\S*)?@)?";
	
	      regex += "(?:";
	
	      var hostname =
	          "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" +
	          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" +
	          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))";
	
	      // This ia a special case for the localhost hostname
	      if (allowLocal) {
	        hostname = "(?:localhost|" + hostname + ")";
	      } else {
	          // private & local addresses
	          regex +=
	              "(?!10(?:\\.\\d{1,3}){3})" +
	              "(?!127(?:\\.\\d{1,3}){3})" +
	              "(?!169\\.254(?:\\.\\d{1,3}){2})" +
	              "(?!192\\.168(?:\\.\\d{1,3}){2})" +
	              "(?!172" +
	                "\\.(?:1[6-9]|2\\d|3[0-1])" +
	                "(?:\\.\\d{1,3})" +
	              "{2})";
	      }
	
	      // reserved addresses
	      regex +=
	          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
	          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
	          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
	        "|" +
	          hostname +
	          // port number
	          "(?::\\d{2,5})?" +
	          // path
	          "(?:\\/[^\\s]*)?" +
	        "$";
	
	      var PATTERN = new RegExp(regex, 'i');
	      if (!PATTERN.exec(value)) {
	        return message;
	      }
	    }
	  };
	
	  validate.exposeModule(validate, this, exports, module, __webpack_require__(58));
	}).call(this,
	         true ? /* istanbul ignore next */ exports : null,
	         true ? /* istanbul ignore next */ module : null,
	        __webpack_require__(58));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)(module)))

/***/ },
/* 265 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
/******/ ])));
//# sourceMappingURL=syncano.fuse.js.map