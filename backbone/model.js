var SyncanoModel = Backbone.Model.extend({

	syncanoParams: {},	// project, collection, folder

	initialize: function(){
		if(Object.keys(this.syncanoParams).length === 0){
			throw new Error('Cannot create direct instances of SyncanoModel. You have to extend it with proper syncanoParams defined!');
		}
		this.syncano = SyncanoConnector.getInstance();

		if(typeof this.start === 'function'){
			this.start();
		}
	},

	_setRequestParams: function(attributes){
		var params = {
			folder: this.syncanoParams.folder
		};
		var attributesToCopy = ['dataKey', 'link', 'title', 'text', 'state', 'parentId', 'image', 'imageUrl'];
		for(var i=0; i<attributesToCopy.length; i++){
			var attributeName = attributesToCopy[i];
			if(!_.isUndefined(attributes[attributeName])){
				params[attributeName] = attributes[attributeName];
			}
		}
		return params;
	},


	sync: function(method, model, options){
		var attributes, params, id, additionalParams, i;
		var WAITING = '__WAITING__';

		var syncanoAttributes = ['created_at', 'parent_id', 'folder', 'id', 'key', 'link', 'state', 'text', 'image', 'imageUrl', 'title', 'updated_at', 'user', 'children_count'];

		var success = function(data){
			if(options.success){
				options.success(data);
			}
		};

		if(this.syncanoParams.verbose){
			console.info('[SyncanoModel SYNC] ', method, _.extend({model_id: parseInt(model.get('id'), 10)}, this.syncanoParams));
		}

		switch(method){

			case 'read':
				id = model.get('id');
				if(id === WAITING){
					return;
				}
				id = parseInt(id, 10);
				this.syncano.Data.getOne(this.syncanoParams.projectId, this.syncanoParams.collectionId, id, function(data){
					if(typeof data.additional !== 'undefined'){
						for(var key in data.additional){
							if(data.additional.hasOwnProperty(key)){
								var val = data.additional[key];
								data[key] = val;
								delete data.additional[key];
							}
						}
						delete data.additional;
					}
					delete data.updated_at;
					delete data.user;
					delete data.folder;
					success(data);
				});
				break;


			case 'update':
				id = model.get('id');
				if(id === WAITING){
					return;
				}
				id = parseInt(id, 10);

				attributes = _.clone(model.attributes);
				additionalParams = _.clone(attributes);
				for(i=0; i<syncanoAttributes.length; i++){
					delete additionalParams[syncanoAttributes[i]];
				}
				params = this._setRequestParams(attributes);
				params.additional = additionalParams;
				params.updateMethod = 'merge';

				this.syncano.Data.update(this.syncanoParams.projectId, this.syncanoParams.collectionId, id, params, function(data){
					if(typeof data.additional !== 'undefined'){
						for(var key in data.additional){
							if(data.additional.hasOwnProperty(key)){
								data[key] = _.clone(data.additional[key]);
								delete data.additional[key];
							}
						}
						delete data.additional;
					}
					delete data.created_at;
					delete data.user;
					delete data.folder;
					delete data.children_count;
					success(data);
				});
				break;


			case 'create':
				var requestType = null;
				attributes = _.clone(model.attributes);

				if(typeof attributes._request_type !== 'undefined'){
					requestType = attributes._request_type;
					delete attributes._request_type;
				}

				additionalParams = _.clone(attributes);
				for(i=0; i<syncanoAttributes.length; i++){
					delete additionalParams[syncanoAttributes[i]];
				}
				params = this._setRequestParams(attributes);

				params.additional = additionalParams;
				model.set('id', WAITING);

				this.syncano.Data.new(this.syncanoParams.projectId, this.syncanoParams.collectionId, params, function(data){
					model.set('id', data.id);
					if(typeof data.additional !== 'undefined'){
						for(var key in data.additional){
							if(data.additional.hasOwnProperty(key)){
								data[key] = _.clone(data.additional[key]);
								delete data.additional[key];
							}
						}
						delete data.additional;
					}
					delete data.updated_at;
					delete data.user;
					delete data.folder;
					success(data);
				}, requestType);
				break;


			case 'delete':
				id = model.get('id');
				if(id === WAITING){
					return;
				}
				id = parseInt(id, 10);
				params = {
					dataIds: [id]
				};
				this.syncano.Data.delete(this.syncanoParams.projectId, this.syncanoParams.collectionId, params, function(data){
					success(data);
				});
				break;
		}
	}
});
