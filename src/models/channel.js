import stampit from 'stampit';
import {Meta, Model} from './base';
import Request from '../request';
import {EventEmittable} from '../utils';
import _ from 'lodash';
import QuerySet from '../querySet';

const ChannelQuerySet = stampit().compose(QuerySet).methods({

  /**
    * Puslishes to a channel.

    * @memberOf QuerySet
    * @instance

    * @param {Object} channel
    * @param {Object} message
    * @param {String} [room = null]
    * @returns {QuerySet}

    * @example {@lang javascript}
    * Channel.please().publish({ instanceName: 'test-instace', name: 'test-class' }, { content: 'my message'});

    */

  publish(properties, message, room = null) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = {payload: JSON.stringify(message)};

    if (room) {
      this.payload.room = room;
    }

    this.method = 'POST';
    this.endpoint = 'publish';

    return this;
  },

  /**
    * Allows polling of a channel.

    * @memberOf QuerySet
    * @instance

    * @param {Object} options
    * @param {Boolean} [start = true]
    * @returns {ChannelPoll}

    * @example {@lang javascript}
    * var poll = Channel.please().poll({ instanceName: 'test-instace', name: 'test-class' });
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
    * poll.on('custom', function(message) {
    *   console.log('poll::custom', message);
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

  poll(properties = {}, options = {}, start = true) {
    this.properties = _.assign({}, this.properties, properties);

    const config = this.getConfig();
    const meta = this.model.getMeta();
    const path = meta.resolveEndpointPath('poll', this.properties);

    options.path = path;

    const channelPoll = ChannelPoll.setConfig(config)(options);

    if (start === true) {
      channelPoll.start();
    }

    return channelPoll;
  },

  history(properties = {}, query = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'history';
    this.query = query;
    this._serialize = false;

    return this;
  }

});

const ChannelMeta = Meta({
  name: 'channel',
  pluralName: 'channels',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/channels/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/channels/'
    },
    'poll': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/channels/{name}/poll/'
    },
    'publish': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/channels/{name}/publish/'
    },
    'history': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/channels/{name}/history/'
    }
  }
});

const channelConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    presence: true,
    string: true,
    length: {
      minimum: 5
    }
  },
  description: {
    string: true
  },
  type: {
    inclusion: ['default', 'separate_rooms']
  },
  group: {
    numericality: true
  },
  group_permissions: {
    inclusion: ['none', 'subscribe', 'publish']
  },
  other_permissions: {
    inclusion: ['none', 'subscribe', 'publish']
  },
  custom_publish: {
    boolean: true
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
  *   path: '/v1.1/instances/some-instance/channels/some-channel/poll/'
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
  * poll.on('custom', function(message) {
  *   console.log('poll::custom', message);
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
      return this.makeRequest('GET', this.path, options);
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

/**
 * OO wrapper around channels {@link http://docs.syncano.io/v0.1/docs/channels-list endpoint}.
 * **Channel** has two special methods called ``publish`` and ``poll``. First one will send message to the channel and second one will create {@link http://en.wikipedia.org/wiki/Push_technology#Long_polling long polling} connection which will listen for messages.

 * @constructor
 * @type {Channel}

 * @property {String} name
 * @property {String} instanceName
 * @property {String} type
 * @property {Number} [group = null]
 * @property {String} [group_permissions = null]
 * @property {String} [other_permissions = null]
 * @property {Boolean} [custom_publish = null]

 * @example {@lang javascript}
 * Channel.please().get('instance-name', 'channel-name').then((channel) => {
 *   return channel.publish({x: 1});
 * });
 *
 * Channel.please().get('instance-name', 'channel-name').then((channel) => {
 *   const poll = channel.poll();
 *
 *   poll.on('start', function() {
 *     console.log('poll::start');
 *   });
 *
 *   poll.on('stop', function() {
 *     console.log('poll::stop');
 *   });
 *
 *   poll.on('message', function(message) {
 *     console.log('poll::message', message);
 *   });
 *
 *   poll.on('custom', function(message) {
 *     console.log('poll::custom', message);
 *   });
 *
 *   poll.on('create', function(data) {
 *     console.log('poll::create', data);
 *   });
 *
 *   poll.on('delete', function(data) {
 *     console.log('poll::delete', data);
 *   });
 *
 *   poll.on('update', function(data) {
 *     console.log('poll::update', data);
 *   });
 *
 *   poll.on('error', function(error) {
 *     console.log('poll::error', error);
 *   });
 *
 *   poll.start();
 * });
 */
const Channel = stampit()
  .compose(Model)
  .setMeta(ChannelMeta)
  .setQuerySet(ChannelQuerySet)
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

      return this.makeRequest('POST', path, options);
    },

    history(query = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('history', this);

      return this.makeRequest('GET', path, {query});
    }

  })
  .setConstraints(channelConstraints);

export default Channel;
