import stampit from 'stampit';
import _ from 'lodash';
import models from './models';
import Account from './Account';

/**
 * Main Syncano object.
 * @constructor
 * @type {Syncano}
 */
const Syncano = stampit()
  // We need function here, do not use arrow syntax!
  .init(function() {
    this.Account = Account.setConfig(this)();

    _.forEach(models, (model, name) => {
      this[name] = model.setConfig(this);
    });
  })
  .refs({
    baseUrl: 'https://api.syncano.io',
    accountKey: null,
    userKey: null,
    socialToken: null
  })
  .methods({
    setBaseUrl(baseUrl) {
      if(_.isEmpty(baseUrl)) throw Error('Base Url is required.');
      this.baseUrl = baseUrl;
      return this;
    },

    getBaseUrl() {
      return this.baseUrl;
    },

    setAccountKey(accountKey) {
      if(_.isEmpty(accountKey)) throw Error('Account key is required.');
      this.accountKey = accountKey;
      return this;
    },

    getAccountKey() {
      return this.accountKey;
    },

    setUserKey(userKey) {
      if(_.isEmpty(userKey)) throw Error('User key is required.');
      this.userKey = userKey;
      return this;
    },

    getUserKey() {
      return this.userKey;
    },

    setSocialToken(socialToken) {
      if(_.isEmpty(socialToken)) throw Error('Social token is required.');
      this.socialToken = socialToken;
      return this;
    },

    getSocialToken() {
      return this.socialToken;
    }
  });

export default Syncano;
