import crypto from 'crypto';
import  _  from 'lodash';

const hashData = `_${new Date().getTime()}_${_.random(0, 99999)}`;

export const suffix = {
  value: crypto.createHash('md5').update(hashData).digest('hex'),
  get(text) {
    return `${text.toString()}_${this.value}`;
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
    const values = _.filter(keys, (key) => {
      return !_.isEmpty(this[key]) && !_.isUndefined(this[key]);
    });

    return values.length > 0;
  }
};
