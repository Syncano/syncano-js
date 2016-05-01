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
      registerPath: '/v1.1/account/register/',
      loginPath: '/v1.1/account/auth/',
      socialLoginPath: '/v1.1/account/auth/{backend}/',
      updatePath: '/v1.1/account/',
      activatePath: '/v1.1/account/activate/',
      emailPath: '/v1.1/account/resend_email/'
    }
  })
  .methods({

    /**
    * A convenience method for activating an accoung.

    * @memberOf Account
    * @instance

    * @param {Object} payload
    * @param {String} payload.uid
    * @param {String} payload.token
    * @returns {Promise}

    */

    activate(payload = {}) {
      const path = this._account.activatePath;
      return this.makeRequest('POST', path, {payload});
    },

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
    * A convenience method for authenticating with a social media token.

    * @memberOf Account
    * @instance

    * @param {String} backend
    * @param {String} access_token
    * @returns {Promise}

    */
    socialLogin(backend, access_token) {
      const path = _.replace(this._account.socialLoginPath, '{backend}', backend);
      return this.makeRequest('POST', path, {access_token});
    },

    /**
    * A convenience method for resending email.

    * @memberOf Account
    * @instance

    * @param {String} email
    * @returns {Promise}

    */
    resendEmail(email) {
      const path = this._account.emailPath;
      return this.makeRequest('POST', path, {email});
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
