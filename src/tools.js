	/**
	 * Library agnostic version of jQuery's Extend by @jonjaques 
	 */

	function type(obj) {
		var checker = {};
		var types = 'Boolean Number String Function Array Date RegExp Object'.split(' ');
		for(var i in types){
			checker[ '[object ' + types[i] + ']' ] = types[i].toLowerCase();
		}
		return obj === null ?
			String( obj ) :
			checker[ Object.prototype.toString.call(obj) ] || 'object';
	}

	function isFunction(obj) {
		return type(obj) === 'function';
	}

	function isWindow(obj) {
		return obj !== null && obj === obj.window;
	}

	function isPlainObject(obj) {
		var hasOwn = Object.prototype.hasOwnProperty;
		if ( !obj || type(obj) !== 'object' || obj.nodeType || isWindow( obj ) ) {
			return false;
		}
		try {
			if(obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf') ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}
		var key;
		for ( key in obj ) {}
		return key === undefined || hasOwn.call( obj, key );
	}

	function isArray(obj){
		return type(obj) === 'array';
	}


	function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	 
		if ( typeof target === 'boolean' ) {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if ( typeof target !== 'object' && !isFunction(target) ) {
			target = {};
		}

		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) !== null ) {
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
					if ( target === copy ) {
						continue;
					}
					if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}
						target[ name ] = extend( deep, clone, copy );
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
		return target;
	}


	/**
	 * converts string in camel case (eg. dataKey) to lowercase with underscores (eg. data_key) 
	 */
	function uncamelize(s){
		var res = [];
		for(var i=0, l=s.length; i<l; i++){
			var letter = s[i];
			if(s.charCodeAt(i) >= 97){
				res.push(letter);
			} else {
				res.push('_');
				res.push(letter.toLowerCase());
			}
		}
		return res.join('');
	}

	/**
	 *  
	 */
	function isset(v){
		return typeof v !== 'undefined' && v !== null;
	}

	/**
	 *  
	 */
	function isNumber(v){
		if(typeof v === 'number' || parseInt(v, 10) === v){
			return true;
		}
		return false;
	}

	/**
	 *  
	 */
	function isDate(v){
		var d = new Date(v);
		if(Object.prototype.toString.call(d) !== '[object Date]'){
			return false;
		}
		return !isNaN(d.getTime());
	}

	/**
	 *  
	 */
	function inArray(v,a){
		if(a.indexOf(v) !== -1){
			return true;
		}
		return false;
	}

	/**
	 *  
	 */
	function isBool(v){
		return typeof v === 'boolean';
	}