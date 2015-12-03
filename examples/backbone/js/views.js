var View = Backbone.View.extend({
	el: '#app',

	events: {
		'submit form': 'submitForm'
	},

	initialize: function() {
		this.$list = this.$('ul');
		this.collection = new Todos();
		this.listenTo(this.collection, 'add', this.addOne);
		this.collection.fetch();
	},

	addOne: function(model) {
		var view = new ItemView({
			model: model
		});
		this.$list.append(view.render().el);
	},

	submitForm: function(e) {
		e.preventDefault();
		var $form = $(e.target);
		this.collection.create({
			title: $form.find('input').val()
		}, {
			wait: true
		});
	}
});


var ItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#item-template').html()),

	events: {
		'click span': 'removeItem',
		'click label': 'toggleEditing',
		'keyup input[type="text"]': 'onKeyUp',
		'click input[type="checkbox"]': 'toggleCompleted'
	},

	initialize: function() {
		this.editing = false;
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);
	},

	toggleEditing: function() {
		this.editing = !this.editing;
		this.render();
	},

	render: function() {
		var json = this.model.toJSON();
		json.editing = this.editing;
		json.completedCheckbox = '<input type="checkbox" ' + (json.completed ? 'checked' : '') + '>';
		this.$el.html(this.template(json));
		if (json.editing) {
			this.$('input[type="text"]').focus();
		}
		return this;
	},

	onKeyUp: function(e) {
		var keyCode = e.keyCode;
		if (keyCode === 27) {
			this.toggleEditing();
			return;
		}
		if (keyCode === 13) {
			e.preventDefault();
			var newTitle = this.$('input[type="text"]').val();
			this.model.save('title', newTitle, {
				success: function() {
					this.editing = false;
					this.render();
				}.bind(this)
			});
		}
	},

	toggleCompleted: function(e) {
		this.model.save('completed', !this.model.get('completed'), {
			success: function() {
				this.editing = false;
				this.render();
			}.bind(this)
		});
	},

	removeItem: function(e) {
		e.preventDefault();
		this.model.destroy();
	}
});