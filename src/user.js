	/**
	 * Methods for user management 
	 */
	var User = {};

	/**
	 *
	 */
	User.login = function(userName, password, instanceName, apiKey, callback){
		var method = 'user.login';
		var params = {};

		if(type(userName) === 'object' && (isFunction(password) || isPlainObject(password))){
			var tempParams = userName;
			callback = password;
			apiKey = tempParams.api_key;
			userName = tempParams.user_name;
			password = tempParams.password;
			instanceName = tempParams.instance;
		}

		if(isset(userName)){
			params.user_name = userName;
		} else {
			throw new Error('Please provide user name');
		}
		if(isset(password)){
			params.password = password;
		} else {
			throw new Error('Please provide password');
		}
		if(isset(instanceName)){
			params.instance = instanceName;
		}
		if(isset(apiKey)){
			params.apiKey = apiKey;
		}

		var success = function(){};
		var error = function(msg){
			this.__super__.trigger('syncano:error', msg);
		}.bind(this);

		if(typeof callback === 'function'){
			success = callback;
		} else if(typeof callback === 'object'){
			if(typeof callback.success === 'function'){
				success = callback.success;
			}
			if(typeof callback.error === 'function'){
				error = callback.error;
			}
		}

		this.__super__.__sendAjaxRequest(method, params, 'user', function(result){
			if(typeof result.auth_key !== 'undefined' && result.result === 'OK'){
				this.auth_key = result.auth_key;
				success(result);
			} else if(result.result === 'NOK'){
				error(result.error);
			} else {
				success(result);
			}
		}.bind(this.__super__));
	};


	/**
	 *  Creates new user
	 *  
	 *  @method User.new
	 *  @param {string} name User's name
	 *  @param {string} [nick] User's nick
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:new
	 */
	User.new = function(name, nick, callback){
		var method = 'user.new';
		var params = {};
		if(isset(name)){
			params.user_name = name;
		} else {
			throw new Error('user must have a name');
		}
		if(isset(nick)){
			params.nick = nick;
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Get all users from within instance. To paginate and to get more data, use since_id or since_time parameter.
	 *
	 *  @method User.getAll
	 *  @param {number} sinceId If specified, will only return users with id higher than since_id (newer).
	 *  @param {number} limit Number of users to be returned. Default and max value: 100
	 */
	/** 
	 *  @event syncano:user:get_all
	 */
	User.getAll = function(sinceId, limit, callback){
		var method = 'user.get_all';
		
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			sinceId = undefined;
			limit = undefined;
		}
		
		var params = {};
		if(isset(sinceId)){
			if(isNumber(sinceId)){
				params.since_id = sinceId;
			} else {
				throw new Error('sinceId must be a number');
			}
		}
		
		if(isset(limit)){
			if(isNumber(limit)){
				params.limit = limit;
			} else {
				throw new Error('limit must be a number');
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Get users of specified criteria that are associated with Data Objects within specified collection 
	 *
	 *  @method User.count
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id or key
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {string} [optionalParams.state] Return only users whose Data Objects are in specified state. Accepted values: Pending, Moderated, Rejected, All. Default value: All
	 *  @param {string / Array} [optionalParams.folders] Folder name that data will be returned from. Max 100 values per request. If not present returns data from across all collection folders
	 *  @param {string} [optionalParams.filter] TEXT - only return users that sent data with text IMAGE - only return users that sent data with an image
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:get
	 */
	User.get = function(projectId, collection, optionalParams, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'user.get';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);

		if(isset(optionalParams)){
			if(isset(optionalParams.folders)){
				params.folders = optionalParams.folders;
			}
			
			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}
			
			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Get one user
	 *
	 *  @method User.getOne
	 *  @param {string / Number} user User id or name
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:get_one
	 */
	User.getOne = function(user, callback){
		var method = 'user.get_one';
		var params = {};
		if(isset(user)){
			if(typeof user === 'number'){
				params.user_id = user;
			} else if(typeof user === 'string'){
				params.user_name = user;
			} else {
				throw new Error('incorrect type of user param');
			}
		} else {
			throw new Error('user id or name must be passed');
		}
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Updates specified user
	 *
	 *  @method User.update
	 *  @param {string / Number} user User id or name
	 *  @param {string} [nick] User's nick
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:update
	 */
	User.update = function(user, nick, callback){
		var method = 'user.update';
		var params = {};
		if(isset(user)){
			if(typeof user === 'number'){
				params.user_id = user;
			} else if(typeof user === 'string'){
				params.user_name = user;
			} else {
				throw new Error('incorrect type of user param');
			}
		} else {
			throw new Error('user id or name must be passed');
		}
		
		if(isset(nick)){
			if(typeof nick === 'string'){
				params.nick = nick;
			} else {
				throw new Error('nick must be given');
			}
		}
		
		this.__super__.__sendWithCallback(method, params, 'user', callback);
	};


	/**
	 *  Count users of specified criteria 
	 *
	 *  @method User.count
	 *  @param {object} [optionalParams] Optional parameters:
	 *  @param {number} [optionalParams.projectId] Project id. If defined, will only count users that has a Data Object associated within project.
	 *  @param {string / Number} [optionalParams.collection] Collection id or key defining collection. If defined, will only count users that has a Data Object associated within collection
	 *  @param {string} [optionalParams.state] Return only users whose Data Objects are in specified state. Accepted values: Pending, Moderated, All. Default value: All
	 *  @param {string / Array} [optionalParams.folders] Folder name that data will be returned from. Max 100 values per request. If not present returns data from across all collection folders
	 *  @param {string} [optionalParams.filter] TEXT - only return users that sent data with text IMAGE - only return users that sent data with an image
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:count
	 */
	User.count = function(optionalParams, callback){

		var method = 'user.count';
		var params = {};
		
		if(arguments.length === 1){
			callback = arguments[0];
			optionalParams = undefined;
		}

		if(isset(optionalParams)){
			if(isset(optionalParams.projectId)){
				if(isNumber(optionalParams.projectId)){
					params.project_id = optionalParams.projectId;
				}
			}

			if(isset(optionalParams.collection)){
				if(typeof optionalParams.collection === 'string'){
					params.collection_key = optionalParams.collection;
				} else if(typeof optionalParams.collection === 'number'){
					params.collection_id = optionalParams.collection;
				} else {
					throw new Error('collection identifier must be a string (key) or number (id)');
				}
			}

			if(isset(optionalParams.folders)){
				params.folders = optionalParams.folders;
			}

			if(isset(optionalParams.state)){
				if(inArray(optionalParams.state.toLowerCase(), ['pending','moderated','rejected','all'])){
					params.state = optionalParams.state;
				} else {
					throw new Error('incorrect value of state param');
				}
			}

			if(isset(optionalParams.filter)){
				if(inArray(optionalParams.filter.toLowerCase(), ['text', 'image'])){
					params.filter = optionalParams.filter;
				} else {
					throw new Error('incorrect value of filter param - only "text" and "image" are allowed');
				}
			}
		}

		this.__super__.__sendWithCallback(method, params, 'count', callback);
	};


	/**
	 *  Deletes (permanently) specified user and all associated data
	 *
	 *  @method User.delete
	 *  @param {string / Number} user User id or name
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:user:delete
	 */
	User.delete = function(user, callback){
		var method = 'user.delete';
		var params = {};
		if(typeof user === 'number'){
			params.user_id = user;
		} else if(typeof user === 'string'){
			params.user_name = user;
		} else {
			throw new Error('user identifier must be given');
		}
		this.__super__.__sendWithCallback(method, params, null, callback);
	};