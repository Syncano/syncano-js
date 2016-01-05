import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';
import {ValidationError} from '../../src/errors';

describe('Instance', function() {
  this.timeout(15000);

  let connection = null;
  let instanceName = suffix.get('name');

  beforeEach(function() {
    connection = Syncano(credentials);
  });

  afterEach(function(done) {
    connection.Instance
      .please()
      .delete({name: instanceName})
      .then(() => done())
      .catch(() => done());
  });

  it('shoule be validated', function() {
    connection.Instance().save().catch((err) => {
      should(function() {
        throw err;
      }).throw(new ValidationError());
    });
  });

  it('shoule be able to save via model instance', function(done) {
    const data = {
      name: instanceName,
      description: suffix.get('description')
    };

    connection.Instance(data).save()
      .then((instance) => {
        should(instance).be.a.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();

        done();
      }).catch((err) => {
        throw err;
      });
  });

  it('shoule be able to update via model instance', function(done) {
    const data = {
      name: instanceName,
      description: suffix.get('description')
    };

    connection.Instance(data).save()
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);

        instance.description = 'new description';
        return instance.save();
      })
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal('new description');
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => done());
  });

  it('shoule be able to delete via model instance', function(done) {
    const data = {
      name: instanceName,
      description: suffix.get('description')
    };

    connection.Instance(data).save()
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);

        return instance.delete();
      }).catch((err) => {
        throw err;
      })
      .finally(() => done());
  });

  describe('#please()', function() {

    it('shoule be able to list instances', function(done) {
      connection.Instance.please().list().then((instances) => {
        should(instances).be.an.Array();
      }).catch((err) => {
        throw err;
      })
      .finally(() => done());
    });

    it('shoule be able to create an instance', function(done) {
      connection.Instance.please().create({name: instanceName}).then((instance) => {
        should(instance).be.a.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String();
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      }).catch((err) => {
        throw err;
      })
      .finally(() => done());
    });

    it('shoule be able to get an instance', function(done) {
      connection.Instance.please().create({name: instanceName})
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          return instance;
        })
        .then(() => {
          return connection
            .Instance
            .please()
            .get({name: instanceName})
            .request();
        })
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          should(instance).have.property('description').which.is.String();
          should(instance).have.property('created_at').which.is.String();
          should(instance).have.property('updated_at').which.is.String();
          should(instance).have.property('links').which.is.Object();
          should(instance).have.property('owner').which.is.Object();
          should(instance).have.property('metadata').which.is.Object();
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => done());
    });

    it('shoule be able to delete an instance', function(done) {
      connection.Instance.please().create({name: instanceName})
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          return instance;
        })
        .then(() => {
          return connection
            .Instance
            .please()
            .delete({name: instanceName})
            .request();
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => done());
    });

    it('shoule be able to get or create instance (CREATE)', function(done) {
      connection.Instance.please().getOrCreate({name: instanceName}, {description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => done());
    });

    it('shoule be able to get or create instance (GET)', function(done) {
      connection.Instance.please().create({name: instanceName, description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');

        return connection.Instance.please().getOrCreate({name: instanceName}, {description: 'newTest'});
      })
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => done());
    });

    it('shoule be able to update an instance', function(done) {
      connection.Instance.please().create({name: instanceName, description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');

        return connection.Instance.please().update({name: instance.name}, {description: 'newTest'});
      })
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('newTest');
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => done());
    });

    it('shoule be able to update or create instance (UPDATE)', function() {

    });

    it('shoule be able to update or create instance (CREATE)', function() {

    });

    it('shoule be able to get first instance', function() {

    });

    it('shoule be able to change page size', function() {

    });

    it('shoule be able to change ordering', function() {

    });

    it('shoule be able to get raw data', function(done) {
      connection.Instance.please().list().raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      }).catch((err) => {
        throw err;
      })
      .finally(() => done());
    });

  });

});