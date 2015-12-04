	/**
	 * Methods for handling projects - creating, reading, updating, deleting 
	 */
	var Project = {};

		
	/**
	 * Create new project 
	 * 
	 * @method Project.new
	 * @param {string} name Name of the project
	 * @param {string} [description] Short description of the project
	 * @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:new
	 */
	Project.new = function(name, description, callback){
		var method = 'project.new';
		
		if(!isset(name)){
			throw new Error(method + ': name must be defined');
		}
		
		var params = {
			name: name,
		};
		
		if(isset(description)){
			params.description = description;
		}
		this.__super__.__sendWithCallback(method, params, 'project', callback);
	};
		

	/**
	 *  Gets list of all projects in current instance
	 *
	 *  @method Project.get
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:get
	 */
	Project.get = function(callback){
		var method = 'project.get';
		this.__super__.__sendWithCallback(method, {}, 'project', callback);
	};

		
	/**
	 *  Receives detailed informations about project with given id 
	 * 
	 *  @method Project.getOne
	 *  @param {number} id Project identifier
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:get_one
	 */
	Project.getOne = function(id, callback){
		this.__super__.__checkProjectId(id);
		var method = 'project.get_one';
		this.__super__.__sendWithCallback(method, {project_id: id}, 'project', callback);
	};
		

	/**
	 *  Updates project details (name, description)
	 *
	 *  @method Project.update
	 *  @param {number} id Project identifier
	 *  @param {string} name Optional new name of the project
	 *  @param {string} name Optional new description of the project
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:update
	 */
	Project.update = function(id, name, description, callback){
		this.__super__.__checkProjectId(id);
		if((typeof name === 'undefined' || name === null) && (typeof description === 'undefined' || name === null)){
			return false;
		}
		var method = 'project.update';
		var params = {
			project_id: id
		};
		if(name){
			params.name = name;
		}
		if(typeof description !== 'undefined' && description !== null){
			params.description = description;
		}
		this.__super__.__sendWithCallback(method, params, 'project', callback);
	};


	/**
	 *  Deletes project
	 *
	 *  @method Project.delete
	 *  @param {function} [callback] Function to be called when successful response comes
	 */
	/** 
	 *  @event syncano:project:delete
	 */
	Project.delete = function(id, callback){
		this.__super__.__checkProjectId(id);
		var method = 'project.delete';
		this.__super__.__sendWithCallback(method, {project_id: id}, null, callback);
	};
