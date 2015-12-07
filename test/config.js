var config = {
  accountKey: 'EXAMPLEACCOUNTKEY',
  apiKey: 'EXAMPLEAPIKEY',
  userKey: 'EXAMPLEUSERKEY',
  socialToken: 'SOCIALTOKEN',
  backend: 'BACKENDNAME',
  instance: 'INSTANCENAME',
  className: 'CLASSNAME',
  channelId: 'CHANNELNAME',
  groupId: 123,
  userId: 456,
  adminId: 123,
  apiKeyId: 456,
  scheduleId: 123,
  triggerId: 456,
  webhookId: 123,
  codeboxId: 456,
  dataobjectId: 123,
  traceId: 456,
  inviteId: 123,
  requestMock: function(opts, cb) {
    var res = {};
    res.body = opts;
    res.statusCode = 200;
    cb(null, res);
    return;
  },
  browserRequestMock: function(opts) {
    return new Promise(function(resolve, reject) {
      resolve({data: opts, status: 200});
    });
  },
  mockSettings: {
    warnOnReplace: false,
    warnOnUnregistered: false,
    useCleanCache: true
  }
};

module.exports = config;
