var mockery = require('mockery');
var config = require('../../config.js');

before(function() {
  mockery.enable(config.mockSettings);
  mockery.registerMock('./request.js', config.browserRequestMock);
  mockery.registerSubstitute('../server/core.js', '../browser/core.js');
  var Syncano = require('../../../lib/syncano.js');
  scope = new Syncano({ apiKey: config.apiKey, instance: config.instance, userKey: config.userKey });
});

after(function() {
  mockery.deregisterAll();
  mockery.disable();
});
