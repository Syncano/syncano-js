var mockery = require('mockery');
var config = require('../../config.js');

var before = function(scopeOptions) {
  return function() {
    mockery.enable(config.mockSettings);
    mockery.registerMock('./request.js', config.browserRequestMock);
    mockery.registerSubstitute('../server/core.js', '../browser/core.js');
    Syncano = require('../../../lib/syncano.js');
    scope = new Syncano(scopeOptions);
  }
};

var after = function() {
  mockery.deregisterAll();
  mockery.disable();
};

module.exports = {
  beforeAccountScopeFunc: before({ accountKey: config.accountKey }),
  beforeEmptyScopeFunc: before(),
  beforeInstanceScopeFunc: before({ apiKey: config.apiKey, instance: config.instance }),
  beforeUserScopeFunc: before({ apiKey: config.apiKey, instance: config.instance, userKey: config.userKey }),
  afterFunc: after
}
