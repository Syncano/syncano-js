var Todo = SyncanoModel.extend({
	syncanoParams: {
		className: 'todomvc'
	},

	defaults: {
		title: '',
		completed: false
	}
});