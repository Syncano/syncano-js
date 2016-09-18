import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';

describe('Admin', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('Admin');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Admin;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  describe('#please()', function() {

    it('should be able to list admins', function() {
      return Model.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to get an admin', function() {
      let adminId = null;

      return Model.please().first({instanceName}).then((admin) => {
        should(admin).have.property('instanceName').which.is.String().equal(instanceName);
        adminId = admin.id;

        return admin;
      })
      .then(() => {
        return Model
          .please()
          .get({id: adminId, instanceName})
          .request();
      })
      .then(([admin, response]) => {
        should(response).be.an.Object();
        should(admin).be.an.Object();
        should(admin).have.property('instanceName').which.is.String().equal(instanceName);
        should(admin).have.property('id').which.is.Number();
        should(admin).have.property('first_name').which.is.String();
        should(admin).have.property('last_name').which.is.String();
        should(admin).have.property('links').which.is.Object();
        should(admin).have.property('email').which.is.String();
        should(admin).have.property('role').which.is.String();
      });
    });

    it('should be able to get first admin', function() {
      return Model.please().list({instanceName}).then((admin) => {
        should(admin).be.an.Object();
      });
    });

    it('should be able to get raw data', function() {
      return Model.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
