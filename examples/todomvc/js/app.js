/*global $ */
/*jshint unused:false */
var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

var syncano = new Syncano(Config.instance);
syncano.connect(Config.apiKey).then(function() {
	new app.AppView();
});