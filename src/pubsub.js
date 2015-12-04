	/**
	 * very simple pub-sub structure. Based on PubSubJS by @mroderick (https://github.com/mroderick/PubSubJS) 
	 */

	var PubSub = {};
	var messages = {};
	var lastUID = 0;


	/**
	 *  Register specified function as a callback for given message
	 * 
	 *  @method on
	 *  @param {string} message Message identifier
	 *  @param {function} callback Function to call when message is triggered
	 */
	PubSub.on = function(message, callback){
		if(typeof callback !== 'function'){
			return false;
		}
		
		if(!messages.hasOwnProperty(message)){
			messages[message] = {};
		}
		
		var token = 'uid_' + (++lastUID);
		messages[message][token] = callback;
		return token;
	};


	/**
	 *  Register specified function as a one-time callback (release it after the first run)
	 *
	 *  @method once
	 *  @param {string} message Message identifier
	 *  @param {function} callback Function to call when message is triggered
	 */
	PubSub.once = function(message, callback){
		if(typeof callback !== 'function'){
			return false;
		}
		
		if(!messages.hasOwnProperty(message)){
			messages[message] = {};
		}
		
		var token = 'uid_' + (++lastUID);
		messages[message][token] = function(param){
			delete messages[message][token];
			callback(param);
		};
		return token;
	};


	/**
	 *  Does message have subscribers?
	 *
	 *  @method hasSubscribers
	 *  @param {string} message - message identifier
	 *  @return: boolean
	 */
	PubSub.hasSubscribers = function(message){
		if(typeof message !== 'string'){
			return false;
		}
		if(messages.hasOwnProperty(message) && Object.keys(messages[message]).length){
			return true;
		}
		return false;
	};


	/**
	 *  Remove specified function callback. If no func is given, removes all callbacks for given message
	 *
	 *  @method off
	 *  @param {string} message - message identifier
	 *  @param {function} func - function to remove
	 */
	PubSub.off = function(message, func){
		if(message === 'all'){
			messages = {};
		}
		if(!this.hasSubscribers(message)){
			return false;
		}
		if(typeof func === 'undefined'){
			return delete messages[message];
		}
		var list = messages[message];
		for(var uuid in list){
			if(list.hasOwnProperty(uuid)){
				if(func === list[uuid]){
					return delete messages[message][uuid];
				}
			}
		}
		return false;
	};


	/**
	 *  Calls asynchronically all registered functions for given message. Shortcut method for doTrigger(message, false)
	 *
	 *  @method trigger
	 *  @param {string} message - message identifier
	 *  @return: boolean (true = success, false = fail)
	 */
	PubSub.trigger = function(message){
		return PubSub.doTrigger(message, false, Array.prototype.slice.call(arguments, 1));
	};


	/**
	 *  Calls synchronically all registered functions for given message. Shortcut method for doTrigger(message, true)
	 *
	 *  @method triggerSync
	 *  @param {string} message - message identifier 
	 */
	PubSub.triggerSync = function(message){
		return PubSub.doTrigger(message, true, Array.prototype.slice.call(arguments, 1));
	};


	/**
	 *  Calls all registered functions for given message
	 *
	 *  @method doTrigger
	 *  @param {string} message - message identifier
	 *  @param {boolean} sync - true for synchronous calls, false for asynchronous
	 */
	PubSub.doTrigger = function(message, sync){
		var list, uuid, func;
		var called = false;

		var params = Array.prototype.slice.call(arguments, 2)[0];
		if(this.hasSubscribers(message)){
			list = messages[message];
			for(uuid in list){
				if(list.hasOwnProperty(uuid)){
					func = list[uuid];
					if(sync === false){
						setTimeout(func.call(func, params), 0);
					} else {
						func.call(func, params);
					}
					called = true;
				}
			}
		}
		/**
		 *  trigger event for 'all'. Send original message name as the first parameter
		 */
		var allMessage = 'all';
		if(this.hasSubscribers(allMessage)){
			list = messages[allMessage];
			for(uuid in list){
				if(list.hasOwnProperty(uuid)){
					func = list[uuid];
					if(sync === false){
						setTimeout(func.call(func, message, params), 0);
					} else {
						func.call(func, message, params);
					}
					called = true;
				}
			}
		}

		return called;
	};