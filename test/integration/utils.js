import crypto from 'crypto';
import Promise from 'bluebird';
import  _  from 'lodash';

const hashData = `_${new Date().getTime()}_${_.random(0, 99999)}`;

export const suffix = {
  value: crypto.createHash('md5').update(hashData).digest('hex'),
  get(text) {
    return `${text.toString()}_${this.value}`;
  },
  getHyphened(text) {
    return `${text.toString()}-${this.value}`;
  }
};

export const hex = {
  getRandom(len) {
    return crypto.randomBytes(Math.ceil(len/2)).toString('hex').slice(0, len);
  }
};

export const credentials = {
  user: null,
  baseUrl: process.env.INTEGRATION_BASE_URL || 'https://api.syncano.rocks',
  accountKey: process.env.INTEGRATION_ACCOUNT_KEY,
  userKey: process.env.INTEGRATION_USER_KEY,
  socialToken: process.env.INTEGRATION_SOCIAL_TOKEN,

  setCredentials(_credentials = {}) {
    _.assign(this, _credentials);
  },

  getCredentials() {
    return this;
  },

  isAuthenticated() {
    const keys = ['accountKey', 'userKey', 'socialToken', 'user'];
    return _.some(keys, (key) => !_.isEmpty(this[key]) && !_.isUndefined(this[key]));
  }
};

export function createCleaner() {
  let _data = [];

  return {
    mark(value) {
      if (_.isArray(value)) {
        _data.push.apply(_data, value)
      } else {
        _data.push(value);
      }

      return value;
    },

    clean() {
      return Promise
        .mapSeries(_data, (object) => object.delete())
        .finally(() => {
          _data = [];
        });
    }
  }
}
