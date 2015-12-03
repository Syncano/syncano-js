'use strict';

/*
 * Create config.js file with this structure, or uncomment this and remove line with require('./config')
var Config = {
	instance: 'instance-name',
	// use email and password
	email: 'your-email',
	password: 'your-password',
	// or apiKey
	apiKey: 'api-key'
};
module.exports = Config;
*/

var Config = require('./config');
var Syncano = require('syncano-js-4');

var syncano = new Syncano(Config.instance);
syncano.connect(Config.apiKey).then(function() {
	syncano.ApiKeys.list().then(function(List) {
		console.log('ApiKeys found:', List.length);
		if (List.length > 0) {
			console.log('First apiKey details:', List.at(0));
		}
	});
}, function(err) {
	console.log('ERROR: ', err);
}).then(function() {
	// pass your own code here...
});