/*
 * Syncano JS Library
 * Copyright 2016 Syncano Inc.
 */

'use strict';

var http = require('http');
var statusCodes = require('http').STATUS_CODES;
var Promise  = require('bluebird');

var Pinger = (function() {

  var url = 'http://syncano.io';
  var options = { protocol: 'http:', host: 'syncano.io', method: 'HEAD'};
  var timeout = 5000;
  var interval = null;
  var onConnectCb = null;
  var onDisconnectCb = null;
  var connected = null;

  function ping() {
    var time = Date.now();
    var req = http.request(options, function(res) {
      connected = true;
      onConnectCb();
    });

    req.on('error', function() {
      connected = false;
      onDisconnectCb();
    });

    req.end();
  }

  function startPinging() {
    interval = setInterval(function() {
      ping();
    }, timeout)
  }

  function stopPinging() {
    if(interval) clearInterval(interval);
  }

  function setConnectCallback(cb) {
    onConnectCb = cb;
  }

  function setDisconnectCallback(cb) {
    onDisconnectCb = cb;
  }

  function getConnected() {
    return connected;
  }

  return {
    start: startPinging,
    onConnect: setConnectCallback,
    onDisconnect: setDisconnectCallback,
    isConnected: getConnected
  };

})();

module.exports = Pinger;
