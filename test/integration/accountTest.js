import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';


describe('Account', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let Account = null;
  const username = suffix.get('account');
  const email = `${username}@internal.com`;
  const data = {
    email,
    username,
    password: username,
    instanceName: username,
    first_name: 'first_name_test',
    last_name: 'last_name_test'
  }

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Account = connection.Account;

    return Instance.please().create({name: username});
  });

  after(function() {
    return Instance.please().delete({name: username});
  });

  it('has "register" method', function() {
    should(Account).have.property('register').which.is.Function();
  });

  it('has "login" method', function() {
    should(Account).have.property('login').which.is.Function();
  });

  it('has "userLogin" method', function() {
    should(Account).have.property('userLogin').which.is.Function();
  });

  it('has "update" method', function() {
    should(Account).have.property('update').which.is.Function();
  });

  describe('#register()', function() {

    it('should register a new user', function() {
      return Account.register(data).then((user) => {
        should(user).be.an.Object();
        should(user).have.property('id').which.is.Number();
        should(user).have.property('first_name').which.is.String().equal(data.first_name);
        should(user).have.property('last_name').which.is.String().equal(data.last_name);
        should(user).have.property('account_key').which.is.String();
        should(user).have.property('email').which.is.String().equal(data.email);
        should(user).have.property('is_active').which.is.false();
        should(user).have.property('has_password').which.is.true();
      });
    });

  });

  describe('#login()', function() {

    it('should login user', function() {
      return Account.login(data, false).then((user) => {
        should(user).be.an.Object();
        should(user).have.property('id').which.is.Number();
        should(user).have.property('first_name').which.is.String().equal(data.first_name);
        should(user).have.property('last_name').which.is.String().equal(data.last_name);
        should(user).have.property('account_key').which.is.String();
        should(user).have.property('email').which.is.String().equal(data.email);
        should(user).have.property('is_active').which.is.false();
        should(user).have.property('has_password').which.is.true();
      });
    });

  });

  describe('#userLogin()', function() {

    before(function() {
      return connection.User.please().create(data);
    });

    it('should login instance user', function() {
      return Account.userLogin(data, false).then((user) => {
        should(user).be.an.Object();
        should(user).have.property('id').which.is.Number();
        should(user).have.property('profile').which.is.Object();
        should(user).have.property('username').which.is.String().equal(username);
        should(user).have.property('user_key').which.is.String();
        should(user).have.property('groups').which.is.Array();
      });
    });

  });

  describe('#update()', function() {

    it('should update user data', function() {
      return Account.update(_.assign({}, data, {first_name: 'a', last_name: 'b'}), false).then((user) => {
        should(user).be.an.Object();
        should(user).have.property('first_name').which.is.String().equal('a');
        should(user).have.property('last_name').which.is.String().equal('b');
      });
    });

  });

});