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
  var timeout = 5000;
  var interval = null;
  var onConnectCb = null;
  var onDisconnectCb = null;
  var connected = null;

  function ping() {
    var time = Date.now();
    http.get(url, function(res) {
      if(onConnectCb) {
        connected = true;
        onConnectCb();
      }
    })
    .on('error', function(e) {
        if(onDisconnectCb) {
          connected = false;
          onDisconnectCb();
        }
    });
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
