import stampit from 'stampit';
import Promise from 'bluebird';
import _ from 'lodash';
import Request from './request';

const Account = stampit().compose(Request)
  .props({
    _account: {
      registerPath: '/v1/account/register/'
    }
  })
  .methods({
    register(user = {}) {
      const path = this._account.registerPath;
      const options = {payload: user};

      return new Promise((resolve, reject) => {
        this.makeRequest('POST', path, options, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(res.body, res);
        });
      })
    }
  });


export default Account;