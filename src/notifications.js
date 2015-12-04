	var Notification = {};


	/**
	 *  Sends custom notification to API client through Sync Server. If uuid is specified - will only send to this specific instance.
	 *
	 *  @method Notification.send
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] Destination API client id. If not specified, will use current API client
	 *  @param {string} [optionalParams.uuid] UUID of client identity. If not specified, will send a broadcast to all API client identities within current instance
	 *  @param {object} [optionalParams.data] Additional key-value parameters to be sent.
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:notification:send
	 */
	Notification.send = function(optionalParams, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			optionalParams = undefined;
		}
		var method = 'notification.send';
		var params = {};
		
		if(isset(optionalParams)){
			if(isset(optionalParams.apiClientId)){
				if(isNumber(optionalParams.apiClientId)){
					params.api_client_id = optionalParams.apiClientId;
				} else {
					throw new Error(method + ': apiClientId must be a number');
				}
			}
			
			if(isset(optionalParams.uuid)){
				if(typeof optionalParams.uuid === 'string'){
					params.uuid = optionalParams.uuid;
				} else {
					throw new Error(method + ': uuid must be a string');
				}
			}
			
			if(isset(optionalParams.data)){
				for(var key in optionalParams.data){
					if(optionalParams.data.hasOwnProperty(key)){
						var val = optionalParams.data[key];
						if(inArray(key, ['apiClientId', 'api_client_id', 'uuid'])){
							throw new Error(method + ': Cannot send custom param named ' + key);
						}
						params[key] = val;
					}
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Get history of notifications of specified API client. History items are stored for 24 hours
	 *
	 *  @method Notification.getHistory
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] Client id. If not specified, will return history of current API client.
	 *  @param {number} [optionalParams.sinceId] If specified, will only return data with id higher than since_id (newer).
	 *  @param {string} [optionalParams.sinceTime] String with date. If specified, will only return data with timestamp after specified value (newer).
	 *  @param {number} [optionalParams.limit] Maximum number of history items to get. Default and max: 100
	 *  @param {string} [optionalParams.order] Sets order of data that will be returned. ASC (default) - oldest first, DESC - newest first
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:notification:get_history
	 */
	Notification.getHistory = function(optionalParams, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			optionalParams = undefined;
		}
		var method = 'notification.get_history';
		var params = {};
		
		if(isset(optionalParams)){
			if(isset(optionalParams.apiClientId)){
				if(isNumber(optionalParams.apiClientId)){
					params.api_client_id = optionalParams.apiClientId;
				} else {
					throw new Error(method + ': apiClientId must be a number');
				}
			}
			
			/**
			 *  these optionalParams have to be numbers - so check if they are set and are proper numbers. If not - throw an Error
			 */
			var numericParams = ['limit', 'sinceId'];
			for(var i=0; i<numericParams.length; i++){
				var numParam = numericParams[i];
				if(isset(optionalParams[numParam])){
					if(isNumber(optionalParams[numParam])){
						params[uncamelize(numParam)] = optionalParams[numParam];
					} else {
						throw new Error(method + ': ' + numParam + ' must be a number');
					}
				}
			}
			
			if(isset(optionalParams.sinceTime)){
				if(isDate(optionalParams.sinceTime)){
					params.since_time = optionalParams.sinceTime;
				} else {
					throw new Error(method + ': sinceTime must be a proper date string');
				}
			}
			
			if(isset(optionalParams.order)){
				if(typeof optionalParams.order.toLowerCase !== 'undefined' && inArray(optionalParams.order.toLowerCase(), ['asc', 'desc'])){
					params.order = optionalParams.order;
				} else {
					throw new Error(method + ': incorrect value of order param - only "asc" and "desc" are allowed');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'history', callback);
	};