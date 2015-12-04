	var Connection = {};

	/**
	 *  Get currently connected API client connections up to limit (max 100).
	 *
	 *  @method Connection.get
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] API client id. If not specified, will get connections for current API client
	 *  @param {string} [optionalParams.name] If specified, will only return connections of specified name.
	 *  @param {number} [optionalParams.sinceId] If specified, will only return data with id higher than since_id (newer).
	 *  @param {number} [optionalParams.limit] Maximum number of API client connections to get. Default and max: 100
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:connection:get
	 */
	Connection.get = function(optionalParams, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			optionalParams = undefined;
		}
		var method = 'connection.get';
		var params = {};
		
		if(isset(optionalParams)){

			var numericParams = ['apiClientId', 'sinceId', 'limit'];
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
			
			if(isset(optionalParams.name)){
				if(typeof optionalParams.name === 'string'){
					params.name = optionalParams.name;
				} else {
					throw new Error(method + ': name must be a string');
				}
			}
		}
		this.__super__.__sendWithCallback(method, params, 'connection', callback);
	};


	/**
	 *  Updates specified API client connection info.
	 *
	 *  @method Connection.update
	 *  @param {string} uuid Identity UUID
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.apiClientId] API client id. If not specified, will query current API client connections
	 *  @param {string} [optionalParams.name] New connection name to set.
	 *  @param {string} [optionalParams.state] New state to set
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:connection:update
	 */
	Connection.update = function(uuid, optionalParams, callback){
		if(typeof arguments[1] === 'function'){
			callback = arguments[1];
			optionalParams = undefined;
		}
		var method = 'connection.update';
		var params = {};
		
		if(!isset(uuid) || typeof uuid !== 'string'){
			throw new Error(method + ': uuid parameter is required');
		} else {
			params.uuid = uuid;
		}
		
		if(isset(optionalParams)){
			
			if(isset(optionalParams.apiClientId)){
				if(isNumber(optionalParams.apiClientId)){
					params.api_client_id = optionalParams.apiClientId;
				} else {
					throw new Error(method + ': apiClientId must be a number');
				}
			}
			
			if(isset(optionalParams.name)){
				if(typeof optionalParams.name === 'string'){
					params.name = optionalParams.name;
				} else {
					throw new Error(method + ': name must be a string');
				}
			}
			
			if(isset(optionalParams.state)){
				if(typeof optionalParams.state === 'string'){
					params.state = optionalParams.state;
				} else {
					throw new Error(method + ': state must be a string');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'connection', callback);
	};