import stampit from 'stampit';
import _ from 'lodash';
import Promise from 'bluebird';
import models from './models';
import Account from './account';
import Pinger from './pinger';
import SyncanoFile from './file';

/**
 * Main Syncano object.
 * @constructor
 * @type {Syncano}

 * @param {Object} options All configuration options
 * @param {Object} [options.baseUrl = 'https://api.syncano.io'] Base URL for all api calls.
 * @param {Object} [options.accountKey = null] Your Syncano account key.
 * @param {Object} [options.userKey = null] Instance user api key.
 * @param {Object} [options.socialToken = null] Instance social authentication token.
 * @param {Object} [options.defaults = {}] Object with default properties for api calls.
 * @returns {Syncano}

 * @example {@lang javascript}
 * var connection = Syncano({accountKey: '123'});
 * var connection = Syncano({userKey: '123'});
 * var connection = Syncano({socialToken: '123'});
 * var connection = Syncano({ defaults: { instanceName: 'my-instance' }});
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
    apiKey: null,
    socialToken: null,
    defaults: {}
  })
  .methods({
    /**
    * Sets *instanceName*.

    * @memberOf Syncano
    * @instance

    * @param {String} instanceName Instance name for all api calls
    * @returns {Syncano}
    * @throws {Error} Instance name must be a string.

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * connection.setInstanceName('my-instance');

    */
    setInstanceName(instanceName) {
      if(_.isEmpty(instanceName)) this.defaults.instanceName = null;
      else {
        if(!_.isString(instanceName)) return Promise.reject(new Error('Instance name must be a string.'));
        this.defaults.instanceName = instanceName;
      }
      return this;
    },
    /**
    * Gets *instanceName*.

    * @memberOf Syncano
    * @instance
    * @returns {String}

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * var instanceName = connection.getInstanceName();

    */
    getInstanceName() {
      return this.defaults.instanceName;
    },

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
      if(_.isEmpty(baseUrl)) return Promise.reject(new Error('Base URL is required.'));
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

    * @example {@lang javascript}
    * var connection = Syncano({accountKey: '123'});
    * connection.setAccountKey('abcd');

    */
    setAccountKey(accountKey) {
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

    * @example {@lang javascript}
    * var connection = Syncano({userKey: '123'});
    * connection.setUserKey('abcd');

    */
    setUserKey(userKey) {
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
    * Sets *apiKey*.

    * @memberOf Syncano
    * @instance

    * @param {String} apiKey Instance user api key
    * @returns {Syncano}

    * @example {@lang javascript}
    * var connection = Syncano({apiKey: '123'});
    * connection.setApiKey('abcd');

    */
    setApiKey(apiKey) {
      this.apiKey = apiKey;
      return this;
    },

    /**
    * Gets *apiKey*.

    * @memberOf Syncano
    * @instance
    * @returns {String}

    * @example {@lang javascript}
    * var connection = Syncano({apiKey: '123'});
    * var apiKey = connection.getApiKey();

    */
    getApiKey() {
      return this.apiKey;
    },

    /**
    * Sets *socialToken*.

    * @memberOf Syncano
    * @instance

    * @param {String} socialToken Instance social authentication token
    * @returns {Syncano}

    * @example {@lang javascript}
    * var connection = Syncano({socialToken: '123'});
    * connection.setSocialToken('abcd');

    */
    setSocialToken(socialToken) {
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
    },

    file(content) {
        return new SyncanoFile(content);
    }
  }).static({

    file(content) {
        return new SyncanoFile(content);
    }

  });

export default Syncano;
