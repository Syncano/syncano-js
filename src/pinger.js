import stampit from 'stampit';
import {EventEmittable} from './utils';
import Request from './request';

/**
* Utility for pinging the api. Allows checking for connection to the platofrm. Meant to be used directly form the {@link Syncano} instance.
*
* @constructor
* @type {Pinger}
*
* @example {@lang javascript}
* const connection = Syncano();
* connection.Monitor.startMonitoring();
* connection.Monitor.on('connected', () => {
*    // connected to the api
* });
* connection.Monitor.on('disconnected', (error) => {
*    // disconnected from the api
* });
*/

const Pinger = stampit()
  .compose(Request, EventEmittable)
  .props({
    timeout: 5000,
    interval: null,
    connected: null
  })
  .methods({

    request() {
      const path = this.getConfig().getBaseUrl();
      return this.makeRequest('GET', path);
    },

    startMonitoring() {
      this.interval = setInterval(() => this.ping(), this.timeout);
    },

    ping() {
      this.request()
        .then(() => {
          if(!this.connected) {
            this.connected = true;
            this.emit('connected')
          }
        })
        .catch((error) => {
          if(this.connected) {
            this.connected = false;
            this.emit('disconnected', error)
          }
        });
    },

    stopMonitoring() {
      clearInterval(this.interval);
    }
  });

export default Pinger;
