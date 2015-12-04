	var BigData = {};

	BigData.__internalDataGet = function(res, limit, projectId, collectionId, params, callback){
		this.__super__.Data.get(projectId, collectionId, params, function(part){
			var pLen = part.length;
			res = res.concat(part);
			if(pLen === 0 || pLen !== limit){
				callback(res);
			} else {
				params.sinceId = parseInt(part[pLen - 1].id, 10);
				this.__internalDataGet(res, limit, projectId, collectionId, params, callback);
			}
		}.bind(this));
	};

	BigData.get = function(projectId, collectionId, params, callback){
		var res = [];
		var limit = 100;
		if(typeof params.limit !== 'undefined'){
			limit = params.limit;
		}
		this.__internalDataGet(res, limit, projectId, collectionId, params, function(res){
			callback(res);
		});
	};