import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe('Class', function() {
  this.timeout(15000);

  const connection = Syncano(credentials);
  const Class = connection.Class;
  const instanceName = suffix.get('instance');
  const className = suffix.get('class');

  before(function() {
    return connection.Instance.please().create({name: instanceName});
  });

  after(function() {
    return connection.Instance.please().delete({name: instanceName});
  });

  afterEach(function(done) {
    return connection.Class.please().delete({
      instanceName: instanceName,
      name: className
    })
    .then(() => done())
    .catch(() => done());
  });

  it('should be validated', function() {
    should(Class().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Class({name: className}).save()).be.rejectedWith(/instanceName/);
  });

  it('should be able to save via model instance', function() {
    const data = {
      name: className,
      instanceName: instanceName,
      description: 'test'
    };

    return Class(data).save()
      .then((cls) => {
        should(cls).be.a.Object();
        should(cls).have.property('name').which.is.String().equal(data.name);
        should(cls).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(cls).have.property('description').which.is.String().equal(data.description);
        should(cls).have.property('created_at').which.is.String();
        should(cls).have.property('updated_at').which.is.String();
        should(cls).have.property('links').which.is.Object();
        should(cls).have.property('metadata').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    const data = {
      name: className,
      instanceName: instanceName,
      description: suffix.get('description')
    };

    return Class(data).save()
      .then((cls) => {
        should(cls).have.property('name').which.is.String().equal(data.name);
        should(cls).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(cls).have.property('description').which.is.String().equal(data.description);

        cls.description = 'new description';
        return cls.save();
      })
      .then((cls) => {
        should(cls).have.property('name').which.is.String().equal(data.name);
        should(cls).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(cls).have.property('description').which.is.String().equal('new description');
      });
  });

  it('should be able to delete via model instance', function() {
    const data = {
      name: className,
      instanceName: instanceName,
      description: suffix.get('description')
    };

    return Class(data).save()
      .then((cls) => {
        should(cls).have.property('name').which.is.String().equal(data.name);
        should(cls).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(cls).have.property('description').which.is.String().equal(data.description);

        return cls.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list classes', function() {
      return Class.please().list({instanceName}).then((classes) => {
        should(classes).be.an.Array();
      });
    });

    it('should be able to create a class', function() {
      return Class.please().create({name: className, instanceName}).then((cls) => {
        should(cls).be.a.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String();
        should(cls).have.property('created_at').which.is.String();
        should(cls).have.property('updated_at').which.is.String();
        should(cls).have.property('links').which.is.Object();
        should(cls).have.property('metadata').which.is.Object();
        should(cls).have.property('schema').which.is.Array();
      });
    });

    it('should be able to get a class', function() {
      return Class.please().create({name: className, instanceName})
        .then((cls) => {
          should(cls).be.an.Object();
          should(cls).have.property('name').which.is.String().equal(className);
          should(cls).have.property('instanceName').which.is.String().equal(instanceName);

          return cls;
        })
        .then(() => {
          return Class
            .please()
            .get({name: className, instanceName})
            .request();
        })
        .then((cls) => {
          should(cls).be.an.Object();
          should(cls).have.property('name').which.is.String().equal(className);
          should(cls).have.property('instanceName').which.is.String().equal(instanceName);
          should(cls).have.property('description').which.is.String();
          should(cls).have.property('created_at').which.is.String();
          should(cls).have.property('updated_at').which.is.String();
          should(cls).have.property('links').which.is.Object();
          should(cls).have.property('metadata').which.is.Object();
          should(cls).have.property('schema').which.is.Array();
        });
    });

    it('should be able to delete a class', function() {
      return Class.please().create({name: className, instanceName})
        .then((cls) => {
          should(cls).be.an.Object();
          should(cls).have.property('name').which.is.String().equal(className);
          should(cls).have.property('instanceName').which.is.String().equal(instanceName);
          return cls;
        })
        .then(() => {
          return Class
            .please()
            .delete({name: className, instanceName})
            .request();
        });
    });

    it('should be able to get or create a class (CREATE)', function() {
      return Class.please().getOrCreate({name: className, instanceName}, {description: 'test'}).then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String().equal('test');
        should(cls).have.property('created_at').which.is.String();
        should(cls).have.property('updated_at').which.is.String();
        should(cls).have.property('links').which.is.Object();
        should(cls).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to get or create a class (GET)', function() {
      return Class.please().create({name: className, instanceName, description: 'test'}).then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String().equal('test');

        return Class.please().getOrCreate({name: className, instanceName}, {description: 'newTest'});
      })
      .then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls.description).which.is.String().equal('test');
      });
    });

    it('should be able to update a class', function() {
      return Class.please().create({name: className, description: 'test', instanceName}).then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String().equal('test');

        return Class.please().update({name: className, instanceName}, {description: 'newTest'});
      })
      .then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls.description).which.is.String().equal('newTest');
      });
    });

    it('should be able to update or create class (UPDATE)', function() {
      return Class.please().create({name: className, instanceName, description: 'test'}).then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String().equal('test');

        return Class.please().updateOrCreate({name: className, instanceName}, {description: 'newTest'});
      })
      .then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String().equal('newTest');
      });
    });

    it('should be able to update or create class (CREATE)', function() {
      let properties = {name: className, instanceName};
      let object = {description: 'updateTest'};
      let defaults = {
          description: 'createTest',
          metadata: {'test': 1}
      };

      return Class.please().updateOrCreate(properties, object, defaults).then((cls) => {
        should(cls).be.an.Object();
        should(cls).have.property('name').which.is.String().equal(className);
        should(cls).have.property('instanceName').which.is.String().equal(instanceName);
        should(cls).have.property('description').which.is.String().equal('createTest');
        should(cls).have.property('created_at').which.is.String();
        should(cls).have.property('updated_at').which.is.String();
        should(cls).have.property('links').which.is.Object();
        should(cls).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to get first instance (SUCCESS)', function() {
      const names = [
        `${className}_1`,
        `${className}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Class.please().create({name, instanceName})))
        .then(() => {
          return Class.please().first({instanceName});
        })
        .then((cls) => {
          should(cls).be.an.Object();
        })
        .finally(() => {
          return Promise.all(_.map(names, (name) => Class.please().delete({name, instanceName})));
        });
    });

    it('should be able to change page size', function() {
      const names = [
        `${className}_1`,
        `${className}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Class.please().create({name, instanceName})))
        .then((classes) => {
          should(classes).be.an.Array().with.length(2);
          return Class.please({instanceName}).pageSize(1);
        })
        .then((classes) => {
          should(classes).be.an.Array().with.length(1);
        })
        .finally(() => {
          return Promise.all(_.map(names, (name) => Class.please().delete({name, instanceName})));
        });
    });

    it('should be able to change ordering', function() {
      const names = [
        `${className}_1`,
        `${className}_2`
      ];
      let asc = null;

      return Promise
        .all(_.map(names, (name) => Class.please().create({name, instanceName})))
        .then((classes) => {
          should(classes).be.an.Array();
          return Class.please({instanceName}).ordering('asc');
        })
        .then((classes) => {
          should(classes).be.an.Array();
          asc = classes;
          return Class.please({instanceName}).ordering('desc');
        }).then((desc) => {
          const ascNames = _.map(asc, 'name');
          const descNames = _.map(desc, 'name');
          descNames.reverse();

          should(desc).be.an.Array();

          _.forEach(ascNames, (ascName, index) => {
            should(ascName).be.equal(descNames[index]);
          });
        })
        .finally(() => {
          return Promise.all(_.map(names, (name) => Class.please().delete({name, instanceName})));
        });
    });

    it('should be able to get raw data', function() {
      return Class.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
