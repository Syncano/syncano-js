import stampit from 'stampit';
import _ from 'lodash';
import models from './models';
import Account from './account';
import Pinger from './pinger';

/**
 * Main Syncano object.
 * @constructor
 * @type {Syncano}

 * @param {Object} options All configuration options
 * @param {Object} [options.baseUrl = 'https://api.syncano.io'] Base URL for all api calls.
 * @param {Object} [options.accountKey = null] Your Syncano account key.
 * @param {Object} [options.userKey = null] Instance user api key.
 * @param {Object} [options.socialToken = null] Instance social authentication token.
 * @returns {Syncano}

 * @example {@lang javascript}
 * var connection = Syncano({accountKey: '123'});
 * var connection = Syncano({userKey: '123'});
 * var connection = Syncano({socialToken: '123'});
 */
const Syncano = stampit()
  // We need function here, do not use arrow syntax!
  .init(function() {
    this.Account = Account.setConfig(this)();
    this.Monitor = Pinger.setConfig(this)();

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

    /**
    * Sets *baseUrl*.

    * @memberOf Syncano
    * @instance

    * @param {String} baseUrl Base URL for all api calls
    * @returns {Syncano}
    * @throws {Error} Base URL is required.

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * connection.setBaseUrl('https://dummy.com/');

    */
    setBaseUrl(baseUrl) {
      if(_.isEmpty(baseUrl)) throw new Error('Base URL is required.');
      this.baseUrl = baseUrl;
      return this;
    },

    /**
    * Gets *baseUrl*.

    * @memberOf Syncano
    * @instance
    * @returns {String}

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * var baseUrl = connection.getBaseUrl();

    */
    getBaseUrl() {
      return this.baseUrl;
    },

    /**
    * Sets *accountKey*.

    * @memberOf Syncano
    * @instance

    * @param {String} accountKey Your {@link https://syncano.io|Syncano} account key
    * @returns {Syncano}
    * @throws {Error} Account key is required.

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * connection.setAccountKey('abcd');

    */
    setAccountKey(accountKey) {
      if(_.isEmpty(accountKey)) throw new Error('Account key is required.');
      this.accountKey = accountKey;
      return this;
    },

    /**
    * Gets *accountKey*.

    * @memberOf Syncano
    * @instance
    * @returns {String}

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * var accountKey = connection.getAccountKey();

    */
    getAccountKey() {
      return this.accountKey;
    },

    /**
    * Sets *userKey*.

    * @memberOf Syncano
    * @instance

    * @param {String} userKey Instance user api key
    * @returns {Syncano}
    * @throws {Error} User key is required.

    * @example {@lang javascript}
    * var connection = Syncano({userKey: '123'});
    * connection.setUserKey('abcd');

    */
    setUserKey(userKey) {
      if(_.isEmpty(userKey)) throw new Error('User key is required.');
      this.userKey = userKey;
      return this;
    },

    /**
    * Gets *userKey*.

    * @memberOf Syncano
    * @instance
    * @returns {String}

    * @example {@lang javascript}
    * var connection = Syncano({userKey: '123'});
    * var userKey = connection.getUserKey();

    */
    getUserKey() {
      return this.userKey;
    },

    /**
    * Sets *socialToken*.

    * @memberOf Syncano
    * @instance

    * @param {String} socialToken Instance social authentication token
    * @returns {Syncano}
    * @throws {Error} Social token is required.

    * @example {@lang javascript}
    * var connection = Syncano({socialToken: '123'});
    * connection.setSocialToken('abcd');

    */
    setSocialToken(socialToken) {
      if(_.isEmpty(socialToken)) throw new Error('Social token is required.');
      this.socialToken = socialToken;
      return this;
    },

    /**
    * Gets *socialToken*.

    * @memberOf Syncano
    * @instance
    * @returns {String}

    * @example {@lang javascript}
    * var connection = Syncano({socialToken: '123'});
    * var socialToken = connection.getSocialToken();

    */
    getSocialToken() {
      return this.socialToken;
    }
  });

export default Syncano;
