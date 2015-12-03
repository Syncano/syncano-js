var syncano = new Syncano(Config.instance);
var promise = syncano.connect(Config.apiKey);
promise = promise.then(function() {
	console.log('Connected to Syncano');
	new View();
}, function(err) {
	console.error('Error', err);
});