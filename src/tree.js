	var Tree = {};

	Tree.__internalReadLevel = function(projectId, collection, params, ids, callback){
		this.__super__.BigData.get(projectId, collection, params, function(levelData){
			var len = levelData.length;
			var parentIds = [];
			for(var i=0; i<len; i++){
				var item = levelData[i];
				var id = item.id | 0;
				ids.push(id);
				if(item.children_count > 0){
					parentIds.push(id);
				}
			}
			if(parentIds.length > 0){
				params.parentIds = parentIds;
				this.__internalReadLevel(projectId, collection, params, ids, callback);
			} else {
				callback(ids);
			}
		}.bind(this));
	};

	Tree.__internalRemoveIds = function(projectId, collection, ids, folders, callback){
		var packSize = 100;
		var idsPack = ids.splice(0, packSize);

		var params = {
			dataIds: idsPack,
			folders: folders
		};
		this.__super__.Data.delete(projectId, collection, params, function(){
			if(ids.length === 0){
				callback();
			} else {
				this.__internalRemoveIds(projectId, collection, ids, folders, callback);
			}
		}.bind(this));
	};


	Tree.delete = function(projectId, collection, dataId, folders, callback){
		var params = {
			parentIds: dataId,
			folders: folders,
			includeChildren: false
		};
		var ids = [dataId];
		this.__internalReadLevel(projectId, collection, params, ids, function(ids){
			this.__internalRemoveIds(projectId, collection, ids, folders, callback);
		}.bind(this));
	};


	/*
		odczytaj wszystkie rekordy ze wskazanych folderów
		zapisz je w tablicy
		zapamiętaj wszystkie identyfikatory rekordów mających children_count > 0
	*/
	Tree.get = function(projectId, collection, folders, callback){
		var params = {
			folders: folders,
			includeChildren: false
		};
		var out = [];
		var parents = [];
		var relations = {};

		var internalReadChildren = function(){
			console.log('Przetwarzam, liczba węzłów:', parents.length);
			var parent = parents.shift();
			relations[parent] = [];
			var params = {
				includeChildren: false,
				parentIds: parent
			};
			this.__super__.BigData.get(projectId, collection, params, function(data){
				// w data mamy wszystkie dzieci zadanego węzła
				for(var i=0; i<data.length; i++){
					var rec = data[i];
					rec.id = rec.id | 0;

					// zapamiętaj relację
					relations[parent].push(rec.id);
					// zapamiętaj data object
					out.push(rec);
					// jeśli ma dzieci, dopisz go do listy
					if(rec.children_count > 0){
						parents.push(rec.id);
					}
				}
				
				// przetworzono wszystkie dzieci. Zdecyduj, czy przetwarzamy dalej
				if(parents.length === 0){
					callback(out, relations);
				} else {
					internalReadChildren();
				}
			}.bind(this));
		}.bind(this);

		this.__super__.BigData.get(projectId, collection, params, function(data){
			for(var i=0; i<data.length; i++){
				var rec = data[i];
				rec.id = rec.id | 0;
				out.push(rec);
				if(rec.children_count > 0){
					parents.push(rec.id);
				}
			}
			internalReadChildren();
		});
	};







