var SyncanoCollection = Backbone.Collection.extend({

	syncanoParams: {},	// project, collection, folder

	initialize: function(initList, options){
		this.limit = 100;

		if(Object.keys(this.syncanoParams).length === 0){
			throw new Error('Cannot create direct instances of SyncanoBigCollection. You have to extend it with proper syncanoParams defined!');
		}
		this.syncano = SyncanoConnector.getInstance();

		if(typeof this.start === 'function'){
			this.start(options);
		}
	},

	/*
	*/
	loadRecordsChunk: function(startIdx, params, success){
		params.sinceId = startIdx;
		this.syncano.Data.get(this.syncanoParams.projectId, this.syncanoParams.collectionId, params, function(data){
			var l = data.length;
			if(this.syncanoParams.verbose){
				console.log('Readed', l, 'records');
			}
			for(var i=0; i<l; i++){
				data[i] = this.parseLoadedRecord(data[i]);
				startIdx = data[i].id | 0;
				this.add(data[i]);
			}
			if(l === this.limit){
				this.loadRecordsChunk(startIdx, params, success);
			} else {
				success(this.models);
			}
		}.bind(this));
	},

	/*
	*/
	parseLoadedRecord: function(item){
		if(typeof item.additional !== 'undefined'){
			for(var key in item.additional){
				if(item.additional.hasOwnProperty(key)){
					item[key] = item.additional[key];
					delete item.additional[key];
				}
			}
			delete item.additional;
		}
		return item;
	},

	/*
	 *  
	 */
	sync: function(method, collection, options){
		options = options || {};
		var success = function(data){
			if(options.success){
				options.success(data);
			}
		};

		if(this.syncanoParams.verbode){
			console.info('[SyncanoBigCollection SYNC] ', method, this.syncanoParams);
		}
		
		var params = {
			folders: this.syncanoParams.folder
		};
		var availableParams = [
			'state', 'sinceId', 'sinceTime', 'maxId', 'limit', 'order', 'orderBy', 'filter', 'includeChildren', 'depth', 'childrenLimit', 'parentIds'
		];
		for(var i=0; i<availableParams.length; i++){
			var param = availableParams[i];
			if(typeof options[param] !== 'undefined'){
				params[param] = options[param];
			}
		}

		switch(method){
			case 'read':
				if(typeof this.additionalReadParams === 'function'){
					_.extend(params, this.additionalReadParams());
				}
				params.limit = this.limit;

				var startTime = +(new Date());
				this.loadRecordsChunk(0, params, success);
				break;
		}
	}
	
});

