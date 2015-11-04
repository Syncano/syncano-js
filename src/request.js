var https = require('https');
var url = require('url');
var qs = require('querystring');


var request = function(opts, cb) {

  var u = url.parse(opts.baseUrl + opts.url);
  var sendOptions = {
    protocol: u.protocol,
    host: u.host,
    port: u.port,
    path: u.path,
    headers: opts.headers,
    method: opts.method,
    withCredentials: opts.withCredentials
  };

  if (opts.qs !== {}) {
    sendOptions.path += '?' + qs.stringify(opts.qs);
  }

  var req = https.request(sendOptions, function(response) {
    var str = '';

    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function() {
      response.body = str;
      cb(null, response, response.body);
    });

    response.on('error', function(err) {
      cb(err);
    });

  });

  if (opts.json) {
    req.write(JSON.stringify(opts.json));
  }

  req.end();

};

module.exports = request;
