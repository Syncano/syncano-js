import stampit from 'stampit';
import {EventEmittable} from './utils';
import Request from './request';

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
