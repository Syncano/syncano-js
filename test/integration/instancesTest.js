import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';

describe('Instance', function() {
  this.timeout(5000);

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
        instance.save().then((newInstance) => {
          should(newInstance).be.an.Object();
          should(newInstance).have.property('name').which.is.String().equal(instance.name);
          should(newInstance).have.property('description').which.is.String().equal(instance.description);

          done();
        }).catch((err) => {
          throw err;
        });
      }).catch((err) => {
        throw err;
      });
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

        instance.delete()
          .then(() => done())
          .catch((err) => {
            throw err;
          })
      }).catch((err) => {
        throw err;
      });
  });

  describe('#please()', function() {

    it('shoule be able to list instances', function() {
      return connection.Instance.please().list();
    });

    it('shoule be able to create an instance', function() {
      return connection.Instance.please().create({name: instanceName});
    });

    it('shoule be able to get an instance', function(done) {
      connection.Instance.please().create({name: instanceName})
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);

          connection.Instance.please().get({name: instanceName})
            .then((newInstance) => {
              should(newInstance).be.an.Object();
              should(newInstance).have.property('name').which.is.String().equal(instanceName);
              should(newInstance).have.property('name').which.is.String().equal(instance.name);

              done();
            }).catch((err) => {
              throw err;
            });

        }).catch((err) => {
          throw err;
        });
    });

    it('shoule be able to delete an instance', function() {

    });

  });

});