/*global Backbone */
var app = app || {};

(function() {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Todos = SyncanoCollection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		// Filter down the list of all todo items that are finished.
		completed: function() {
			return this.where({
				completed: true
			});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function() {
			return this.where({
				completed: false
			});
		}
	});

	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();