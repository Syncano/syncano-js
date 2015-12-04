	/**
	 * methods for handling folders - creating, reading, updating, deleting 
	 */

	var Folder = {};

	/**
	 *  Create new folder within specified collection
	 *
	 *  @method Folder.new
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Either collection id (number) or key (string)
	 *  @param {string} name Folder name
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:new
	 */
	Folder.new = function(projectId, collection, name, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.new';
		var params = {
			name: name,
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(!name){
			throw new Error('Folder must have a name');
		}
		
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Get folders for specified collection
	 *
	 *  @method Folder.get 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folders will be returned
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:get
	 */
	Folder.get = function(projectId, collection, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'folder.get';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Get folders for specified collection 
	 * 
	 *  @name method Folder.getOne 
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folder will be returned
	 *  @param {string} folderName Folder name defining folder
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:get_one
	 */
	Folder.getOne = function(projectId, collection, folderName, callback){
		this.__super__.__checkProjectId(projectId);
		
		var method = 'folder.get_one';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.folder_name = folderName;
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Update existing folder
	 *  Params newName and sourceId can be passed as a single object: {newName: '', sourceId: ''} 
	 * 
	 *  @method Folder.update
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folder will be returned
	 *  @param {string} folderName Folder name defining folder
	 *  @param {string} [newName] New folder name
	 *  @param {string} [sourceId] New source id, can be used for mapping folders to external source
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:update
	 */
	Folder.update = function(projectId, collection, folderName, newName, sourceId, callback){
		if(typeof arguments[3] === 'object'){
			var obj = Object.create(arguments[3]);
			callback = arguments[4];
			newName = obj.newName;
			sourceId = obj.sourceId;
		}
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.update';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.name = folderName;
		
		if(isset(newName)){
			if(typeof newName !== 'string'){
				throw new Error('newName must be a string');
			}
			params.new_name = newName;
		} else {
			throw new Error('newName must be passed');
		}
		
		if(isset(sourceId)){
			if(isNumber(sourceId)){
				params.source_id = sourceId + '';
			} else {
				throw new Error('sourceId must be a number');
			}
		}
		this.__super__.__sendWithCallback(method, params, 'folder', callback);
	};


	/**
	 *  Permanently delete specified folder and all associated data
	 *
	 *  @method Folder.delete
	 *  @param {number} projectId Project id
	 *  @param {string / Number} collection Collection id or key defining collection for which folder will be returned
	 *  @param {string} folderName Folder name defining folder
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:folder:delete
	 */
	Folder.delete = function(projectId, collection, folderName, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.delete';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		
		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.name = folderName;
		
		this.__super__.__sendWithCallback(method, params, null, callback);
	};


	Folder.authorize = function(apiKey, projectId, collection, permission, folderName, callback){
		this.__super__.__checkProjectId(projectId);
		var method = 'folder.authorize';
		var params = {
			project_id: projectId
		};
		params = this.__super__.__addCollectionIdentifier(params, collection);
		params.api_client_id = apiKey;

		if(typeof folderName !== 'string'){
			throw new Error('FolderName must be a string');
		}
		params.name = folderName;

		var availPermissions = [
			'create_data', 'read_data', 'read_own_data', 'update_data', 'update_own_data', 'delete_data', 'delete_own_data'
		];

		if(isset(permission) && availPermissions.indexOf(permission) !== -1){
			params.permission = permission;
		} else {
			throw new Error('Permission must be one of: ' + availPermissions.join(', '));
		}

		this.__super__.__sendWithCallback(method, params, null, callback);
	};