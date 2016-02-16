import stampit from 'stampit';
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

      return this.makeRequest('POST', path, options);
    }
  });


export default Account;