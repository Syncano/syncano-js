import stampit from 'stampit';
import Promise from 'bluebird';
import {Meta, Model} from './base';
import Request from '../request';
import {EventEmittable} from '../utils';


const ChannelMeta = Meta({
  name: 'channel',
  pluralName: 'channels',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/channels/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/channels/'
    },
    'poll': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/channels/{name}/poll/'
    },
    'publish': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/channels/{name}/publish/'
    },
    'history': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/channels/{name}/history/'
    }
  }
});

const channelConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

/**
  * Wrapper around {@link http://docs.syncano.io/v0.1/docs/channels-poll|channels poll} endpoint which implements `EventEmitter` interface.
  * Use it via `Channel` poll method.

  * @constructor
  * @type {ChannelPoll}

  * @property {Number} [timeout = 300000] 5 mins
  * @property {String} [path = null] request path
  * @property {Number} [lastId = null] used internally in for loop
  * @property {Number} [room = null]
  * @property {Boolean} [abort = false]  used internally to conrole for loop

  * @example {@lang javascript}
  * var poll = ChannelPoll.setConfig(config)({
  *   path: '/v1/instances/some-instance/channels/some-channel/poll/'
  * });
  *
  * poll.on('start', function() {
  *   console.log('poll::start');
  * });
  *
  * poll.on('stop', function() {
  *   console.log('poll::stop');
  * });
  *
  * poll.on('message', function(message) {
  *   console.log('poll::message', message);
  * });
  *
  * poll.on('create', function(data) {
  *   console.log('poll::create', data);
  * });
  *
  * poll.on('delete', function(data) {
  *   console.log('poll::delete', data);
  * });
  *
  * poll.on('update', function(data) {
  *   console.log('poll::update', data);
  * });
  *
  * poll.on('error', function(error) {
  *   console.log('poll::error', error);
  * });
  *
  * poll.start();
  *
  */
export const ChannelPoll = stampit()
  .compose(Request, EventEmittable)
  .props({
    timeout: 1000 * 60 * 5,
    path: null,
    lastId: null,
    room: null,
    abort: false
  })
  .methods({

    request() {
      const options = {
        timeout: this.timeout,
        query: {
          last_id: this.lastId,
          room: this.room
        }
      };

      this.emit('request', options);

      return new Promise((resolve, reject) => {
        this.makeRequest('GET', this.path, options, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(res.body, res);
        });
      });
    },

    start() {
      this.emit('start');

      // some kind of while loop which uses Promises
      const loop = () => {
        if (this.abort === true) {
          this.emit('stop');
          return
        }

        return this.request()
          .then((message) => {
            this.emit('message', message);
            this.emit(message.action, message);
            this.lastId = message.id;
            return message;
          })
          .finally(loop)
          .catch((error) => {
            if (error.timeout && error.timeout === this.timeout) {
              return this.emit('timeout', error);
            }

            this.emit('error', error);
            this.stop();
          });
      }

      process.nextTick(loop);
      return this.stop;
    },

    stop() {
      this.abort = true;
      return this;
    }

  });

const Channel = stampit()
  .compose(Model)
  .setMeta(ChannelMeta)
  .methods({

    poll(options = {}, start = true) {
      const config = this.getConfig();
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('poll', this);

      options.path = path;

      const channelPoll = ChannelPoll.setConfig(config)(options);

      if (start === true) {
        channelPoll.start();
      }

      return channelPoll;
    },

    publish(message, room = null) {
      const options = {
        payload: {
          payload: JSON.stringify(message)
        }
      };
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('publish', this);

      if (room !== null) {
        options.payload.room = room;
      }

      return new Promise((resolve, reject) => {
        this.makeRequest('POST', path, options, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(res.body, res);
        });
      });
    }

  })
  .setConstraints(channelConstraints);

export default Channel;
