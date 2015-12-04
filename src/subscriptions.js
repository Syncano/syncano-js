	/**
	 * Subscriptions handling methods 
	 */
	var Subscription = {};


	/**
	 *  Subscribe to project level notifications
	 *
	 *  @method Subscription.subscribeProject
	 *  @param {number} projectId Project id
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:subscribe_project
	 */
	Subscription.subscribeProject = function(projectId, callback){
		var method = 'subscription.subscribe_project';
		if(!isset(projectId) || !isNumber(projectId)){
			throw new Error('projectId must be defined');
		}
		this.__super__.__sendWithCallback(method, {project_id: projectId}, null, callback);
	};


	/**
	 *  Unsubscribe from project
	 *
	 *  @method Subscription.unsubscribeProject
	 *  @param {number} projectId Project id
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:unsubscribe_project
	 */
	Subscription.unsubscribeProject = function(projectId, callback){
		var method = 'subscription.unsubscribe_project';
		if(!isset(projectId) || !isNumber(projectId)){
			throw new Error('projectId must be defined');
		}
		this.__super__.__sendWithCallback(method, {project_id: projectId}, null, callback);
	};


	/**
	 *  Subscribe to collection level notifications within specified project 
	 * 
	 *  @method Subscription.subscribeCollection
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:subscribe_collection
	 */
	Subscription.subscribeCollection = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'subscription.subscribe_collection';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Unsubscribe from collection within specified project 
	 *
	 *  @method Subscription.unsubscribeCollection
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:unsubscribe_collection
	 */
	Subscription.unsubscribeCollection = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);

		var method = 'subscription.unsubscribe_collection';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	/**
	 *  Get API client subscriptions
	 * 
	 *  @method Subscription.get
	 *  @param {string} [apiId] API client id defining client. If not present, gets subscriptions for current client
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:subscription:get
	 */
	Subscription.get = function(apiId, callback){
		if(typeof arguments[0] === 'function'){
			callback = arguments[0];
			apiId = undefined;
		}

		var method = 'subscription.get';
		var params = {};
		if(isset(apiId)){
			params.api_client_id = apiId;
		}
		this.__super__.__sendWithCallback(method, params, 'subscription', callback);
	};