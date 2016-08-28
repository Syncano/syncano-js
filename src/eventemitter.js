import _ from 'lodash';

/**
* A simple implementation of an EventEmitter. Created for compatibility with environments that don't have access to native node modules (like React Native). Not meant to be used on it's own.
*/

export default function EventEmitter() {
    this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
    if (!_.isArray(this.events[event])) {
        this.events[event] = [];
    }
    this.events[event].push(listener);
};

EventEmitter.prototype.removeListener = function(event, listener) {
    if (_.isArray(this.events[event])) {
        _.pull(this.events[event], listener);
    }
};

EventEmitter.prototype.removeListeners = function(event) {
  if (_.isArray(this.events[event])) {
    this.events[event] = [];
  }
};

EventEmitter.prototype.removeAllListeners = function() {
  this.events = {};
};

EventEmitter.prototype.emit = function(event, ...args) {
    if (_.isArray(this.events[event])) {
        const listeners = this.events[event];
        _.forEach(listeners, (listener) => listener.apply(this, args));
    }
};
