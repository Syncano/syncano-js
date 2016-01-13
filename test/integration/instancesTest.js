import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';
import {ValidationError} from '../../src/errors';

describe('Instance', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  const instanceName = suffix.get('name');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
  });

  afterEach(function(done) {
    Instance
      .please()
      .delete({name: instanceName})
      .then(() => done())
      .catch(() => done());
  });

  it('should be validated', function() {
    should(Instance().save()).be.rejectedWith(ValidationError);
  });

  it('should be able to save via model instance', function() {
    const data = {
      name: instanceName,
      description: suffix.get('description')
    };

    return Instance(data).save()
      .then((instance) => {
        should(instance).be.a.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    const data = {
      name: instanceName,
      description: suffix.get('description')
    };

    return Instance(data).save()
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
      });
  });

  it('should be able to delete via model instance', function() {
    const data = {
      name: instanceName,
      description: suffix.get('description')
    };

    return Instance(data).save()
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);

        return instance.delete();
      });
  });

  describe('#please()', function() {

    afterEach(function() {
      return Instance
        .please()
        .list()
        .then((instances) => {
          return Promise.all(_.map(instances, (instance) => Instance.please().delete({name: instance.name})));
        });
    });

    it('should be able to list instances', function() {
      return Instance.please().list().then((instances) => {
        should(instances).be.an.Array();
      });
    });

    it('should be able to create an instance', function() {
      return Instance.please().create({name: instanceName}).then((instance) => {
        should(instance).be.a.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String();
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to get an instance', function() {
      return Instance.please().create({name: instanceName})
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
        });
    });

    it('should be able to delete an instance', function() {
      return Instance.please().create({name: instanceName})
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
        });
    });

    it('should be able to get or create instance (CREATE)', function() {
      return Instance.please().getOrCreate({name: instanceName}, {description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to get or create instance (GET)', function() {
      return Instance.please().create({name: instanceName, description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');

        return Instance.please().getOrCreate({name: instanceName}, {description: 'newTest'});
      })
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');
      });
    });

    it('should be able to update an instance', function() {
      return Instance.please().create({name: instanceName, description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');

        return Instance.please().update({name: instance.name}, {description: 'newTest'});
      })
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('newTest');
      });
    });

    it('should be able to update or create instance (UPDATE)', function() {
      return Instance.please().create({name: instanceName, description: 'test'}).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('test');

        return Instance.please().updateOrCreate({name: instance.name}, {description: 'newTest'});
      })
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('newTest');
      });
    });

    it('should be able to update or create instance (CREATE)', function() {
      let properties = {name: instanceName};
      let object = {description: 'updateTest'};
      let defaults = {
          description: 'createTest',
          metadata: {'test': 1}
      };

      return Instance.please().updateOrCreate(properties, object, defaults).then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(instanceName);
        should(instance).have.property('description').which.is.String().equal('createTest');
        should(instance).have.property('created_at').which.is.String();
        should(instance).have.property('updated_at').which.is.String();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to get first instance (SUCCESS)', function() {
      const names = [
        `${instanceName}_1`,
        `${instanceName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Instance.please().create({name})))
        .then(() => {
          return Instance.please().first();
        })
        .then((instance) => {
          should(instance).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const names = [
        `${instanceName}_1`,
        `${instanceName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Instance.please().create({name: name})))
        .then((instances) => {
          should(instances).be.an.Array().with.length(2);
          return Instance.please().pageSize(1);
        })
        .then((instances) => {
          should(instances).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const names = [
        `${instanceName}_1`,
        `${instanceName}_2`
      ];
      let ascInstances = null;

      return Promise
        .all(_.map(names, (name) => Instance.please().create({name: name})))
        .then((instances) => {
          should(instances).be.an.Array().with.length(2);
          return Instance.please().ordering('asc');
        })
        .then((instances) => {
          should(instances).be.an.Array().with.length(2);
          ascInstances = instances;
          return Instance.please().ordering('desc');
        }).then((descInstances) => {
          const ascNames = _.map(ascInstances, 'name');
          const descNames = _.map(descInstances, 'name');
          descNames.reverse();

          should(descInstances).be.an.Array().with.length(2);
          _.forEach(ascNames, (ascName, index) => {
            should(ascName).be.equal(descNames[index]);
          });
        });
    });

    it('should be able to get raw data', function() {
      return Instance.please().list().raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
