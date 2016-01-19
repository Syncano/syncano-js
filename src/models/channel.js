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

const ChannelPoll = stampit()
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
            this.lastId = message.id;
            return message;
          })
          .then(loop)
          .catch((error) => {
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
    },

    then(callback) {
      return this.resolver.promise.then(callback);
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

  });

export default Channel;
