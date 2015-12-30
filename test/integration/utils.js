import crypto from 'crypto';
import  _  from 'lodash';

const hashData = `_${new Date().getTime()}_${_.random(0, 99999)}`;

export const suffix = {
  value: crypto.createHash('md5').update(hashData).digest('hex'),
  get(text) {
    return `${text.toString()}_${this.value}`;
  }
};

export const credentials = {
  baseUrl: process.env.INTEGRATION_BASE_URL,
  accountKey: process.env.INTEGRATION_ACCOUNT_KEY,
  userKey: process.env.INTEGRATION_USER_KEY,
  socialToken: process.env.INTEGRATION_SOCIAL_TOKEN
};
