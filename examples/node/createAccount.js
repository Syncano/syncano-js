'use strict';

/* place your data here */
var Config = {
	password: 'your-password',
	email: 'your-email',
	firstName: 'first-name',
	lastName: 'last-name',
	instance: 'your-instance-name',
	instance_description: 'instance-description'
};



var Syncano = require('../../lib/syncano4.js');
var syncano = new Syncano();

createAccount().then(function(account) {
	return authorize();
}).then(function() {
	return createInstance();
}).then(function(instance) {
	var arr = [
		"var Config = {",
		"\tinstance: '" + Config.instance + "',",
		"\temail: '" + Config.email + "',",
		"\tpassword: '" + Config.password + "',",
		"\tapiKey: ''",
		"};"
	];
	console.log('Done.');
	console.log(arr.join('\n'));
}, function(err) {
	console.log('Error', err);
});


function createAccount() {
	return syncano.Accounts.create({
		email: Config.email,
		first_name: Config.firstName,
		last_name: Config.lastName,
		password: Config.password
	});
}

function authorize() {
	return syncano.connect(Config.email, Config.password);
}

function createInstance() {
	return syncano.Instances.create({
		name: Config.instance,
		description: Config.instance_description
	});
}