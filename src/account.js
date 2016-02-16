import stampit from 'stampit';
import Request from './request';


/**
 * Wrapper around account endpoint. Meant to be used for {@link Syncano} instance.

 * @constructor
 * @type {Account}

 * @example {@lang javascript}
 * const {Account} = Syncano();
 * Account.login({email: '', password: ''}).then((user) => );
 */
const Account = stampit().compose(Request)
  .props({
    _account: {
      registerPath: '/v1/account/register/',
      loginPath: '/v1/account/auth/'
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

    * @param {Object} credentials
    * @param {String} credentials.email
    * @param {String} credentials.password
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
    * A convenience method for updating your account details.

    * @memberOf Account
    * @instance

    * @param {Object} payload
    * @param {String} payload.first_name
    * @param {String} payload.last_name
    * @returns {Promise}

    */
    update(payload = {}) {
      const path = this._account.loginPath;
      return this.makeRequest('POST', path, {payload});
    }

  });


export default Account;