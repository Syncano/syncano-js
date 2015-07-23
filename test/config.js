var config = {
  accountKey: 'EXAMPLEACCOUNTKEY',
  apiKey: 'EXAMPLEAPIKEY',
  userKey: 'EXAMPLEUSERKEY',
  instance: 'INSTANCENAME',
  className: 'CLASSNAME',
  channel: 'CHANNELNAME',
  groupId: 123,
  userId: 456,
  
  requestMock: function(uri, options, callback) {
    var res = {};
    res.body = options;
    callback(null, res);
    return;
  },
  mockSettings: {
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
  }
};

module.exports = config;
