var SyncanoCollection = Backbone.Collection.extend({
	sync: function(method, collection, options) {
		options = options || {};

		var success = function(data) {
			if (options.success) {
				options.success(data);
			}
		};

		var params = {};

		var error = function(err) {
			if (options.error) {
				options.error(err);
			}
		};

		var className;
		if (typeof this.syncanoParams !== 'undefined') {
			className = this.syncanoParams.className;
		} else if (typeof this.model.prototype.syncanoParams !== 'undefined') {
			className = this.model.prototype.syncanoParams.className;
		}

		switch (method) {
			case 'read':
				var promise = syncano.DataObjects.list(className, params).then(function(result) {
					success(result._items);
				}.bind(this), function(error) {
					error(error);
				}.bind(this));
				break;

			default:
				console.info('COLLECTION SYNC', method, className, params);
				break;
		}
	}
});