import stampit from 'stampit';
import Request from './request';


/**
 * Wrapper around account endpoint. Meant to be used directly form {@link Syncano} instance.

 * @constructor
 * @type {Account}

 * @example {@lang javascript}
 * const {Account} = Syncano();
 * Account.login({email: '', password: ''}).then((user) => {
 *
 * });
 */
const Account = stampit().compose(Request)
  .props({
    _account: {
      registerPath: '/v1/account/register/',
      loginPath: '/v1/account/auth/',
      updatePath: '/v1/account/',
      userLoginPath: (instanceName) => `/v1/instances/${instanceName}/user/auth/`
    }
  })
  .methods({

    /**
    * A convenience method for creating a new account.

    * @memberOf Account
    * @instance

    * @param {Object} payload
    * @param {String} payload.email
    * @param {String} payload.password
    * @returns {Promise}

    */
    register(payload = {}) {
      const path = this._account.registerPath;
      return this.makeRequest('POST', path, {payload});
    },

    /**
    * A convenience method for authenticating with email and password.

    * @memberOf Account
    * @instance

    * @param {Object} payload
    * @param {String} payload.email
    * @param {String} payload.password
    * @param {Boolean} [setAccountKey = true]
    * @returns {Promise}

    */
    login(payload = {}, setAccountKey = true) {
      const config = this.getConfig();
      const path = this._account.loginPath;

      return this.makeRequest('POST', path, {payload}).then((user) => {
        if (setAccountKey === true) {
          config.setAccountKey(user.account_key);
        }
        return user;
      });
    },

    /**
    * A convenience method for authenticating instance user with email and password.

    * @memberOf Account
    * @instance

    * @param {Object} payload
    * @param {String} payload.email
    * @param {String} payload.password
    * @param {String} payload.instanceName
    * @param {Boolean} [setUserKey = true]
    * @returns {Promise}

    */
    userLogin(payload = {}, setUserKey = true) {
      const config = this.getConfig();
      const path = this._account.userLoginPath(payload.instanceName);

      return this.makeRequest('POST', path, {payload}).then((user) => {
        if (setUserKey === true) {
          config.setUserKey(user.user_key);
        }
        return user;
      });
    },

    /**
    * A convenience method for updating your account details.

    * @memberOf Account
    * @instance

    * @param {Object} payload
    * @param {String} payload.first_name
    * @param {String} payload.last_name
    * @returns {Promise}

    */
    update(payload = {}) {
      const path = this._account.updatePath;
      return this.makeRequest('PUT', path, {payload});
    }

  });


export default Account;