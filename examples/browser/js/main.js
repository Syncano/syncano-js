function TestSuite() {
	this.$lastClickedButton = null;
	this.connection = new Syncano(Config.instance);
}

TestSuite.prototype = {
	showApiKey: function(apiKey) {
		if (apiKey.length) {
			apiKey = 'apiKey: ' + apiKey;
		} else {
			apiKey = 'not connected';
		}
		document.getElementById('api-key').innerHTML = apiKey;
	},

	connectApiKey: function() {
		var promise = this.connection.connect(Config.apiKey);
		this.proceedWithAuth(promise);
	},

	connectEmail: function() {
		var promise = this.connection.connect(Config.email, Config.password);
		this.proceedWithAuth(promise);
	},

	proceedWithAuth: function(promise) {
		this.showApiKey('');
		promise.then(function() {
			this.showApiKey(this.connection.getInfo().account.account_key);
			$('.panel').addClass('active');
			this.onSuccess();
		}.bind(this), this.onError.bind(this));
	},

	registerAccount: function() {
		var password = this.generateRandomString(6);
		var email = this.generateRandomString(6) + '@mindpower.pl';
		console.info(email, password);
		this.connection.Accounts.create({
			email: email,
			password: password,
			first_name: this.generateRandomString(8),
			last_name: this.generateRandomString(8)
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getAccountInfo: function() {
		this.connection.Accounts.get().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	updateAccount: function() {
		this.connection.Accounts.update({
			email: Config.email,
			last_name: this.generateRandomString(10)
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	accountResetKey: function() {
		this.connection.Accounts.resetKey().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createUserClass: function() {
		this.createClass('userclass');
	},

	createRelationClass: function() {
		this.connection.Classes.create({
			name: 'relation',
			description: 'relation description',
			schema: new Syncano.Schema()
				.addField('name', 'string')
				.addField('user', 'reference', 'userclass')
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createClass: function(name) {
		if (typeof name === 'undefined') {
			name = this.generateRandomString();
		}
		this.connection.Classes.create({
			name: name,
			description: 'class description',
			schema: new Syncano.Schema()
				.addField('first_name', 'string')
				.addField('last_name', 'string').addOrderIndex()
				.addField('year_of_birth', 'integer').addFilterIndex()
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listClasses: function() {
		this.connection.Classes.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	deleteClass: function() {
		this.connection.Classes.list().then(function(list) {
			var classToDelete = null;
			for (var key in list) {
				if (key !== 'userclass') {
					classToDelete = key;
					break;
				}
			}
			this.connection.Classes.remove(classToDelete).then(this.onSuccess.bind(this), this.onError.bind(this));
		}.bind(this), this.onError.bind(this));
	},

	getClassInfo: function() {
		this.connection.Classes.get('userclass').then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	updateClass: function() {
		this.connection.Classes.list().then(function(list) {
			var className = null;
			for (var key in list) {
				if (key !== 'userclass') {
					className = key;
					break;
				}
			}
			this.connection.Classes.update({
				name: className,
				description: this.generateRandomPhrase(4),
				schema: new Syncano.Schema().addField('field_name', 'string')
			}).then(this.onSuccess.bind(this), this.onError.bind(this));
		}.bind(this), this.onError.bind(this));
	},

	listDataObjects: function() {
		this.connection.DataObjects.list('userclass').then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listDataObjectsWithReference: function() {
		this.connection.DataObjects.list('relation').then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createDataObjectWithReference: function() {
		this.connection.DataObjects.list('userclass').then(function(Users) {
			if (Users.length > 0) {
				var user = Users.at(0);
				this.connection.DataObjects.create({
					class_name: 'relation',
					name: this.generateRandomString(8),
					user: user.id
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create user first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createDataObject: function() {
		this.connection.DataObjects.create({
			class_name: 'userclass',
			first_name: this.generateRandomString(6),
			last_name: this.generateRandomString(10),
			year_of_birth: this.generateRandomNumber(1950, 2000)
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	deleteDataObject: function() {
		this.connection.DataObjects.list('userclass').then(function(list) {
			if (list.length > 0) {
				this.connection.DataObjects.remove({
					class_name: 'userclass',
					id: list.at(0).id
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create data object first');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateDataObject: function() {
		this.connection.DataObjects.list('userclass').then(function(list) {
			if (list.length > 0) {
				this.connection.DataObjects.update('userclass', {
					id: list.at(0).id,
					first_name: this.generateRandomString(8),
					last_name: this.generateRandomString(10)
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create data object first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getDataObject: function() {
		this.connection.DataObjects.list('userclass').then(function(list) {
			if (list.length > 0) {
				this.connection.DataObjects.get('userclass', {
					id: list.at(0).id
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create data object first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createInstance: function() {
		var name = this.generateRandomString(12);
		this.connection.Instances.create({
			name: name,
			description: 'description for test instance ' + name
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listInstances: function() {
		this.connection.Instances.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getInstanceInfoString: function() {
		this.connection.Instances.get(Config.instance).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getInstanceInfoObject: function() {
		this.connection.Instances.get({
			name: Config.instance
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	deleteInstance: function() {
		this.connection.Instances.list().then(function(list) {
			var instanceToDelete = null;
			for (var key in list) {
				if (key !== Config.instance) {
					instanceToDelete = key;
					break;
				}
			}
			if (instanceToDelete) {
				this.connection.Instances.remove(instanceToDelete).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Please create instance first');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateInstance: function() {
		this.connection.Instances.update(Config.instance, {
			description: this.generateRandomPhrase(3)
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getInstanceAdmins: function() {
		this.connection.Instances.listAdmins(Config.instance).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listDataObjectsWithFilter: function() {
		this.connection.DataObjects.list('userclass', {
			query: JSON.stringify({
				year_of_birth: {
					_eq: 1959
				}
			})
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listDataObjectsWithPagination: function() {
		this.connection.DataObjects.list('userclass', {
			limit: 3
		}).then(function(pageList) {
			console.log('First page', pageList);
			if (pageList.hasNextPage()) {
				pageList.loadNextPage().then(function(secondPageList) {
					this.onSuccess(secondPageList);
				}.bind(this), this.onError);
			} else {
				this.onError('Cannot load second page');
			}
		}.bind(this), this.onError.bind(this));
	},

	listApiKeys: function() {
		this.connection.ApiKeys.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createApiKey: function() {
		this.connection.ApiKeys.create().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createApiKeyWithCreateFlag: function() {
		this.connection.ApiKeys.create({
			allow_user_create: true
		}).then(function(res) {
			if (res['allow_user_create'] === true) {
				this.onSuccess(res);
			} else {
				this.onError('Could not create api key with required priviledges.');
			}
		}.bind(this), this.onError.bind(this));
	},

	getApiKeyInfo: function() {
		this.connection.ApiKeys.list().then(function(List) {
			if (List.length > 0) {
				this.connection.ApiKeys.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create api key first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteApiKey: function() {
		this.connection.ApiKeys.list().then(function(List) {
			if (List.length > 0) {
				this.connection.ApiKeys.remove(List.at(0).id).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create api key first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createCodeboxPython: function() {
		var source = [
			"print 'hello'"
		].join('\n');
		var params = {
			label: 'Codebox ' + this.generateRandomNumber(10, 1000),
			source: source,
			runtime_name: 'python'
		}
		this.connection.CodeBoxes.create(params).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createCodeboxJs: function() {
		var source = [
			"var obj = {name: 'Syncano'};",
			"console.log(JSON.stringify(obj));"
		].join('\n');
		var params = {
			label: 'Codebox ' + this.generateRandomNumber(10, 1000),
			source: source
		}
		this.connection.CodeBoxes.create(params).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listCodeboxes: function() {
		this.connection.CodeBoxes.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getCodebox: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.CodeBoxes.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateCodebox: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				var item = List.at(0);
				var params = {
					id: item.id,
					description: this.generateRandomPhrase(3),
					source: item.source + '\n\n\n/* comment */'
				};
				this.connection.CodeBoxes.update(params).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteCodebox: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.CodeBoxes.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listCodeboxRuntimes: function() {
		this.connection.CodeBoxes.listRuntimes().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	runCodebox: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.CodeBoxes.run(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listCodeboxTraces: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.CodeBoxes.traces(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getCodeboxTrace: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				var scheduleId = List.at(0).id;
				this.connection.CodeBoxes.traces(scheduleId).then(function(List) {
					this.connection.CodeBoxes.trace(scheduleId, List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createInvitation: function() {
		var params = {
			email: 'fake-email@syncano.com'
		};
		this.connection.createInvitation(params).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listInvitations: function() {
		this.connection.Invitations.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getInvitation: function() {
		this.connection.Invitations.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Invitations.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create invitation first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteInvitation: function() {
		this.connection.Invitations.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Invitations.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create invitation first');
			}
		}.bind(this), this.onError.bind(this));
	},


	createWebhook: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.WebHooks.create({
					name: this.generateRandomString(6),
					codebox: List.at(0),
					slug: 'slug_' + this.generateRandomString(8)
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listWebhooks: function() {
		this.connection.WebHooks.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getWebhook: function() {
		this.connection.WebHooks.list().then(function(List) {
			if (List.length > 0) {
				this.connection.WebHooks.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create webhook first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteWebhook: function() {
		this.connection.WebHooks.list().then(function(List) {
			if (List.length > 0) {
				this.connection.WebHooks.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create webhook first');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateWebhook: function() {
		this.connection.CodeBoxes.list().then(function(CBList) {
			if (CBList.length >= 2) {
				this.connection.WebHooks.list().then(function(WHList) {
					if (WHList.length > 0) {
						var webhook = WHList.at(0);
						var cb = webhook.codebox;
						var newcb = 0;
						for (var i = 0; i < CBList.length; i++) {
							if (CBList.at(i).id !== cb) {
								newcb = CBList.at(i).id;
								break;
							}
						}
						this.connection.WebHooks.update(WHList.at(0).slug, {
							codebox: newcb
						}).then(this.onSuccess.bind(this), this.onError.bind(this));
					} else {
						this.onError('Create webhook first');
					}
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create at least 2 codeboxes first');
			}
		}.bind(this), this.onError.bind(this));
	},

	runWebhook: function() {
		this.connection.WebHooks.list().then(function(List) {
			if (List.length > 0) {
				this.connection.WebHooks.run(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create webhook first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listWebhookTraces: function() {
		this.connection.WebHooks.list().then(function(List) {
			if (List.length > 0) {
				this.connection.WebHooks.traces(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create Webhook first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getWebhookTrace: function() {
		this.connection.WebHooks.list().then(function(List) {
			if (List.length > 0) {
				var webhookId = List.at(0).id;
				this.connection.WebHooks.traces(webhookId).then(function(List) {
					this.connection.WebHooks.trace(webhookId, List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create Webhook first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createTrigger: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Triggers.create({
					label: this.generateRandomString(8),
					codebox: List.at(0),
					'class': 'userclass',
					signal: 'post_create'
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listTriggers: function() {
		this.connection.Triggers.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listTriggerTraces: function() {
		this.connection.Triggers.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Triggers.traces(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create trigger first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getTriggerTrace: function() {
		this.connection.Triggers.list().then(function(List) {
			if (List.length > 0) {
				var triggerId = List.at(0).id;
				this.connection.Triggers.traces(triggerId).then(function(List) {
					this.connection.Triggers.trace(triggerId, List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create trigger first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getTrigger: function() {
		this.connection.Triggers.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Triggers.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create trigger first');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateTrigger: function() {
		this.connection.Triggers.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Triggers.update(List.at(0).id, {
					signal: 'post_update'
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create trigger first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteTrigger: function() {
		this.connection.Triggers.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Triggers.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create trigger first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createSchedule: function() {
		this.connection.CodeBoxes.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Schedules.create({
					codebox: List.at(0),
					label: 'every 30 seconds one bunny dies',
					interval_sec: 30
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create codebox first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listSchedules: function() {
		this.connection.Schedules.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getSchedule: function() {
		this.connection.Schedules.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Schedules.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create schedule first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteSchedule: function() {
		this.connection.Schedules.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Schedules.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create schedule first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listScheduleTraces: function() {
		this.connection.Schedules.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Schedules.traces(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create schedule first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getScheduleTrace: function() {
		this.connection.Schedules.list().then(function(List) {
			if (List.length > 0) {
				var scheduleId = List.at(0).id;
				this.connection.Schedules.traces(scheduleId).then(function(List) {
					this.connection.Schedules.trace(scheduleId, List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create schedule first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createUser: function() {
		this.connection.Users.create({
			username: this.generateRandomString(10),
			password: this.generateRandomString(8)
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listUsers: function() {
		this.connection.Users.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getUser: function() {
		this.connection.Users.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Users.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create user first');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateUser: function() {
		this.connection.Users.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Users.update(List.at(0).id, {
					username: this.generateRandomString(10),
					password: this.generateRandomString(8),
					age: this.generateRandomNumber(10, 60),
					sex: 'M'
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create user first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createDataObjectWithOwner: function() {
		this.connection.Groups.list().then(function(List) {
			if (List.length > 0) {
				var group = List.at(0);
				this.connection.Users.list().then(function(List) {
					if (List.length > 0) {
						var user = List.at(0);
						this.connection.DataObjects.create({
							class_name: 'userclass',
							first_name: this.generateRandomString(6),
							last_name: this.generateRandomString(10),
							year_of_birth: 2222,
							owner: user.id,
							owner_permissions: 'full',
							group: group.id,
							group_permissions: 'write'
						}).then(this.onSuccess.bind(this), this.onError.bind(this));
					} else {
						this.onError('Create user first');
					}
				}.bind(this), this.onError.bind(this));

			} else {
				this.onError('Create group first');
			}
		}.bind(this), this.onError.bind(this));
	},

	changeDataObjectOwnerAndGroup: function() {
		this.connection.Groups.list().then(function(List) {
			if (List.length > 1) {
				var group = List.at(1);
				this.connection.Users.list().then(function(List) {
					if (List.length > 1) {
						var user = List.at(1);
						this.connection.DataObjects.list('userclass').then(function(List) {
							var id = null,
								obj = null;
							for (var i = 0; i < List.length; i++) {
								var item = List.at(i);
								if (item.year_of_birth === 2222) {
									id = item.id;
									obj = item;
									break;
								}
							}
							if (id === null) {
								this.onError('Create DO with owner and group first');
							} else {
								console.log('Object before change', obj);
								this.connection.DataObjects.update('userclass', {
									id: id,
									group: group.id,
									group_permissions: 'read',
									owner: user.id
								}).then(this.onSuccess.bind(this), this.onError.bind(this));
							}
						}.bind(this), this.onError.bind(this));
					} else {
						this.onError('Create at least two users');
					}
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create at least two groups');
			}
		}.bind(this), this.onError.bind(this));
	},

	updateUserProfile: function() {
		this.connection.Classes.update({
			name: 'user_profile',
			schema: new Syncano.Schema()
				.addField('sex', 'string').addOrderIndex().addFilterIndex()
				.addField('age', 'integer').addOrderIndex()
		}).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	deleteUser: function() {
		this.connection.Users.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Users.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create user first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createGroup: function() {
		this.connection.Groups.create(this.generateRandomString(6)).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	getGroup: function() {
		this.connection.Groups.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Groups.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create group first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listGroups: function() {
		this.connection.Groups.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	deleteGroup: function() {
		this.connection.Groups.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Groups.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create group first');
			}
		}.bind(this), this.onError.bind(this));
	},

	addUserToGroup: function() {
		this.connection.Users.list().then(function(List) {
			if (List.length > 0) {
				var userId = List.at(0).id;
				console.log('User', userId);
				this.connection.Groups.list().then(function(List) {
					if (List.length > 0) {
						var groupId = List.at(0).id;
						this.connection.Groups.addUser({
							group: groupId,
							user: userId
						}).then(this.onSuccess.bind(this), this.onError.bind(this));
					} else {
						this.onError('Create group first');
					}
				}.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create user first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createObjectWithReadPermission: function() {
		this.connection.Groups.list().then(function(List) {
			if (List.length > 0) {
				var grp = List.at(0);
				this.connection.DataObjects.create({
					class_name: 'userclass',
					first_name: this.generateRandomString(6),
					last_name: this.generateRandomString(10),
					year_of_birth: this.generateRandomNumber(1950, 2000),
					group: grp.id,
					group_permissions: 'read',
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create group first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createChannel: function() {
		var params = {
			name: this.generateRandomString(6),
			custom_publish: true
		};
		this.connection.createChannel(params).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	createChannelWithSeparateRooms: function() {
		var params = {
			name: this.generateRandomString(6),
			custom_publish: true,
			type: 'separate_rooms'
		};
		this.connection.createChannel(params).then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	listChannels: function() {
		this.connection.Channels.list().then(this.onSuccess.bind(this), this.onError.bind(this));
	},

	updateChannel: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				var chn = List.at(0);
				var params = {};
				if (chn.type === 'separate_rooms') {
					params.type = 'default';
				} else {
					params.type = 'separate_rooms';
				}
				this.connection.Channels.update(chn, params).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteChannel: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Channels.remove(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getChannel: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Channels.get(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	listenToChannel: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Channels.listen(List.at(0), function(data) {
					console.info('Received', data);
				});
				this.onSuccess();
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	publishToChannel: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				var data = {
					title: 'Keep calm',
					message: 'and love Syncano!',
					important: true
				};
				this.connection.Channels.publish(List.at(0), data).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	getChannelHistory: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				this.connection.Channels.getHistory(List.at(0)).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createDataObjectWithChannel: function() {
		this.connection.Channels.list().then(function(List) {
			if (List.length > 0) {
				var channel = List.at(0);
				this.connection.DataObjects.create({
					class_name: 'userclass',
					first_name: this.generateRandomString(6),
					last_name: this.generateRandomString(10),
					year_of_birth: 1111,
					channel: channel.name
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			} else {
				this.onError('Create channel first');
			}
		}.bind(this), this.onError.bind(this));
	},

	createDataObjectWithRoom: function() {
		this.connection.Channels.list().then(function(List) {
			var channel = null;
			for (var i = 0; i < List.length; i++) {
				var item = List.at(i);
				if (item.type === 'separate_rooms') {
					channel = item;
					break;
				}
			}
			if (channel === null) {
				this.onError('Create at least one channel with separate rooms');
			}
			this.connection.DataObjects.create({
				class_name: 'userclass',
				first_name: this.generateRandomString(6),
				last_name: this.generateRandomString(10),
				year_of_birth: 3333,
				channel: channel.name,
				channel_room: 'RoomOfRequirement'
			}).then(this.onSuccess.bind(this), this.onError.bind(this));
		}.bind(this), this.onError.bind(this));
	},

	updateDataObjectWithChannel: function() {
		this.connection.DataObjects.list('userclass').then(function(List) {
			var id = null,
				obj = null;
			for (var i = 0; i < List.length; i++) {
				var item = List.at(i);
				if (item.year_of_birth === 1111) {
					id = item.id;
					obj = item;
					break;
				}
			}
			if (id === null) {
				this.onError('Create DO with channel first');
			} else {
				this.connection.DataObjects.update('userclass', {
					id: id,
					first_name: this.generateRandomString(10)
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			}
		}.bind(this), this.onError.bind(this));
	},

	deleteDataObjectWithChannel: function() {
		this.connection.DataObjects.list('userclass').then(function(List) {
			var id = null,
				obj = null;
			for (var i = 0; i < List.length; i++) {
				var item = List.at(i);
				if (item.year_of_birth === 1111) {
					id = item.id;
					obj = item;
					break;
				}
			}
			if (id === null) {
				this.onError('Create DO with channel first');
			} else {
				this.connection.DataObjects.remove('userclass', {
					id: id,
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			}
		}.bind(this), this.onError.bind(this));
	},

	updateDataObjectWithRoom: function() {
		this.connection.DataObjects.list('userclass').then(function(List) {
			var id = null;
			for (var i = 0; i < List.length; i++) {
				var item = List.at(i);
				if (item.channel_room === 'RoomOfRequirement') {
					id = item.id;
					break;
				}
			}
			if (id === null) {
				this.onError('Create DO with channel first');
			} else {
				this.connection.DataObjects.update('userclass', {
					id: id,
					first_name: this.generateRandomString(10)
				}).then(this.onSuccess.bind(this), this.onError.bind(this));
			}
		}.bind(this), this.onError.bind(this));
	},

	getRoomHistory: function() {
		this.connection.Channels.list().then(function(List) {
			var channel = null;
			for (var i = 0; i < List.length; i++) {
				var item = List.at(i);
				if (item.type === 'separate_rooms') {
					channel = item;
					break;
				}
			}
			if (channel === null) {
				this.onError('Create at least one channel with separate rooms');
			}
			this.connection.Channels.getHistory(channel, {
				room: 'RoomOfRequirement'
			}).then(this.onSuccess.bind(this), this.onError.bind(this));
		}.bind(this), this.onError.bind(this));
	},

	example1: function() {
		[
			'Scenario:',
			'1. Create new class',
			'2. Create two objects using this class',
			'3. Change class definition',
			'4. Read objects',
			'5. Observe new fields'
		].forEach(function(line) {
			console.log(line);
		});

		var CON = this.connection;
		var className = this.generateRandomString(6);
		var fieldName = this.generateRandomString(8);
		CON.Classes.create({
			name: className,
			schema: new Syncano.Schema().addField('field1', 'string')
		}).then(function() {
			console.log('Created class ', className);
			return CON.DataObjects.create({
				class_name: className,
				field1: fieldName + ' 1',
			});
		}, this.onError.bind(this)).then(function() {
			console.log('Created data object ', fieldName + ' 1');
			return CON.DataObjects.create({
				class_name: className,
				field1: fieldName + ' 2',
			});
		}, this.onError.bind(this)).then(function() {
			console.log('Created data object ', fieldName + ' 2');
			return CON.Classes.update(className, {
				schema: new Syncano.Schema().addField('field1', 'string').addField('field2', 'string')
			});
		}, this.onError.bind(this)).then(function() {
			console.log('Updated class', className);
			return CON.DataObjects.list(className);
		}, this.onError.bind(this)).then(function(List) {
			console.log('Objects list', List);
		}.bind(this), this.onError.bind(this));
	},


	generateRandomString: function(len) {
		len = parseInt(len / 2, 10) || 5;
		var lettersA = 'wrtplkjhgfdszcbnm'.split('');
		var lettersB = 'euioa'.split('');
		var s = '';
		for (var i = 0; i < len; i++) {
			s += lettersA[parseInt(Math.random() * lettersA.length, 10)];
			s += lettersB[parseInt(Math.random() * lettersB.length, 10)];
		}
		return s;
	},

	generateRandomPhrase: function(wordsCnt) {
		var s = [];
		for (var i = 0; i < wordsCnt; i++) {
			s.push(this.generateRandomString(8));
		}
		return s.join(' ');
	},

	generateRandomNumber: function(min, max) {
		return parseInt(Math.random() * (max - min), 10) + min;
	},

	onSuccess: function(result) {
		console.log(result);
		this.$lastClickedButton.removeClass('error').addClass('success');
		window.LAST_RESULT = result;
	},

	onError: function(err) {
		console.error(err);
		this.$lastClickedButton.removeClass('success').addClass('error');
	}
};
var test = new TestSuite();

$('.panel a').on('click', function(e) {
	e.preventDefault();
	var $btn = $(e.target);
	var action = $btn.attr('href').substring(1).split('-').map(function(token, idx) {
		return idx === 0 ? token : token.charAt(0).toUpperCase() + token.substring(1);
	}).join('');
	test.$lastClickedButton = $btn;
	try {
		if (typeof test[action] === 'function') {
			test[action]();
		} else {
			throw new Error(action + ' is not defined');
		}
	} catch (e) {
		test.onError(e.message);
	}
});

if (window.location.search.indexOf('auto=true') !== -1) {
	$('a[href="#connect-api-key"]').click();
}