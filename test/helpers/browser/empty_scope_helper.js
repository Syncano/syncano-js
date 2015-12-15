var mockery = require('mockery');
var config = require('../../config.js');

var before = function() {
  mockery.enable(config.mockSettings);
  mockery.registerMock('./request.js', config.browserRequestMock);
  mockery.registerSubstitute('../server/core.js', '../browser/core.js');
  Syncano = require('../../../lib/syncano.js');
  scope = new Syncano();
};

var after = function() {
  mockery.deregisterAll();
  mockery.disable();
};

module.exports = {
  beforeFunc: before,
  afterFunc: after
}
