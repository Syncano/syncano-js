import _ from 'lodash';

export default function EventEmitter() {
    this.events = {};
}

EventEmitter.prototype.on = function (event, listener) {
    if (!_.isArray(this.events[event])) {
        this.events[event] = [];
    }
    this.events[event].push(listener);
};

EventEmitter.prototype.removeListener = function (event, listener) {
    if (_.isArray(this.events[event])) {
        _.pull(this.events[event], listener);
    }
};

EventEmitter.prototype.emit = function (event) {
    if (_.isArray(this.events[event])) {
        const listeners = this.events[event].slice();
        const args = [].slice.call(arguments, 1);
        _.forEach(listeners, (listener) => listener.apply(this, args));
    }
};
