import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';
import {ValidationError} from '../../src/errors';

describe('Instance', function() {
  this.timeout(25000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  const instanceName = suffix.getHyphened('name');
  const data = {
    name: instanceName,
    description: suffix.get('description')
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Model = connection.Instance;

    objects = [
      Model({ name: `${instanceName}-1`}),
      Model({ name: `${instanceName}-2`})
    ];
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should validate "name"', function() {
    should(Model({name: {}}).save()).be.rejectedWith(/name/);
  });

  it('should validate "description"', function() {
    should(Model({name: instanceName, description: 123}).save()).be.rejectedWith(/description/);
  });

  it('should validate "metadata"', function() {
    should(Model({name: instanceName, metadata: 123}).save()).be.rejectedWith(/metadata/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((instance) => {
        should(instance).be.a.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);
        should(instance).have.property('created_at').which.is.Date();
        should(instance).have.property('updated_at').which.is.Date();
        should(instance).have.property('links').which.is.Object();
        should(instance).have.property('owner').which.is.Object();
        should(instance).have.property('metadata').which.is.Object();
      });
  });

  it('should be able to set global config via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((instance) => {
        return instance.setGlobalConfig({ var1: 'value1', var2: 'value2' });
      })
      .then((response) => {
        should(response).be.an.Object();
        should(response).have.property('config').which.is.Object();
        should(response.config).have.property('var1').which.is.String().equal('value1');
        should(response.config).have.property('var2').which.is.String().equal('value2');
      })
  });

  it('should be able to get global config via model instance', function() {
    let tempInstance = null;

    return Model(data).save()
      .then(cleaner.mark)
      .then((instance) => {
        tempInstance = instance;
        return tempInstance.setGlobalConfig({ var1: 'value1', var2: 'value2' });
      })
      .then(() => {
        return tempInstance.getGlobalConfig();
      })
      .then((response) => {
        should(response).be.an.Object();
        should(response).have.property('config').which.is.Object();
        should(response.config).have.property('var1').which.is.String().equal('value1');
        should(response.config).have.property('var2').which.is.String().equal('value2');
      })
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
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

  it('should be able to rename via model instance', function() {
    const newInstanceName = suffix.getHyphened('name');
    return Model(data).save()
      .then(cleaner.mark)
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);

        return instance.rename({ new_name: newInstanceName })
      })
      .then((instance) => {
        should(instance).have.property('name').which.is.String().equal(newInstanceName);
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((instance) => {
        should(instance).be.an.Object();
        should(instance).have.property('name').which.is.String().equal(data.name);
        should(instance).have.property('description').which.is.String().equal(data.description);

        return instance.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list instances', function() {
      return Model.please().list().then((instances) => {
        should(instances).be.an.Array();
      });
    });

    it('should be able to list classes as template', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().list().templateResponse('objects_html_table').then((response) => {
            should(response).be.html;
          });
        })
    });

    it('should be able to create an instance', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.a.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          should(instance).have.property('description').which.is.String();
          should(instance).have.property('created_at').which.is.Date();
          should(instance).have.property('updated_at').which.is.Date();
          should(instance).have.property('links').which.is.Object();
          should(instance).have.property('owner').which.is.Object();
          should(instance).have.property('metadata').which.is.Object();
        });
    });

    it('should be able to set global config', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          return Model.please().setGlobalConfig(instance, { var1: 'value1', var2: 'value2' });
        })
        .then((response) => {
          should(response).be.an.Object();
          should(response).have.property('config').which.is.Object();
          should(response.config).have.property('var1').which.is.String().equal('value1');
          should(response.config).have.property('var2').which.is.String().equal('value2');
        })
    });

    it('should be able to get global config', function() {
      let tempInstance = null;

      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          tempInstance = instance

          return Model.please().setGlobalConfig(tempInstance, { var1: 'value1', var2: 'value2' });
        })
        .then(() => {
          return Model.please().getGlobalConfig(tempInstance);
        })
        .then((response) => {
          should(response).be.an.Object();
          should(response).have.property('config').which.is.Object();
          should(response.config).have.property('var1').which.is.String().equal('value1');
          should(response.config).have.property('var2').which.is.String().equal('value2');
        })
    });

    it('should be able to bulk create objects', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get an instance', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          return instance;
        })
        .then(() => {
          return Model
            .please()
            .get(data)
            .request();
        })
        .then(([instance, response]) => {
          should(response).be.an.Object();
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          should(instance).have.property('description').which.is.String();
          should(instance).have.property('created_at').which.is.Date();
          should(instance).have.property('updated_at').which.is.Date();
          should(instance).have.property('links').which.is.Object();
          should(instance).have.property('owner').which.is.Object();
          should(instance).have.property('metadata').which.is.Object();
        });
    });

    it('should be able to delete an instance', function() {
      return Model.please().create({name: instanceName})
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          return instance;
        })
        .then(() => {
          return Model
            .please()
            .delete({name: instanceName})
            .request();
        });
    });

    it('should be able to get or create instance (CREATE)', function() {
      return Model.please().getOrCreate({name: instanceName}, {description: 'test'})
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          should(instance).have.property('description').which.is.String().equal('test');
          should(instance).have.property('created_at').which.is.Date();
          should(instance).have.property('updated_at').which.is.Date();
          should(instance).have.property('links').which.is.Object();
          should(instance).have.property('owner').which.is.Object();
          should(instance).have.property('metadata').which.is.Object();
        });
    });

    it('should be able to get or create instance (GET)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(data.name);
          should(instance).have.property('description').which.is.String().equal(data.description);

          return Model.please().getOrCreate({name: instanceName}, {description: 'newTest'});
        })
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(data.name);
          should(instance).have.property('description').which.is.String().equal(data.description);
        });
    });

    it.skip('should be able to rename an instance', function() {
      const newInstanceName = suffix.get('name');
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(data.name);
          should(instance).have.property('description').which.is.String().equal(data.description);

          return Model.please().rename({name: instance.name}, {new_name: newInstanceName});
        })
        .then((instance) => {
          should(instance).have.property('name').which.is.String().equal(newInstanceName);
        });
    });

    it('should be able to update an instance', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(data.name);
          should(instance).have.property('description').which.is.String().equal(data.description);

          return Model.please().update({name: instance.name}, {description: 'newTest'});
        })
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          should(instance).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create instance (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(data.name);
          should(instance).have.property('description').which.is.String().equal(data.description);

          return Model.please().updateOrCreate({name: instance.name}, {description: 'newTest'});
        })
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(instanceName);
          should(instance).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create instance (CREATE)', function() {
      const object = {description: 'updateTest'};
      const defaults = {description: 'createTest'};

      return Model.please().updateOrCreate(data, object, defaults)
        .then(cleaner.mark)
        .then((instance) => {
          should(instance).be.an.Object();
          should(instance).have.property('name').which.is.String().equal(data.name);
          should(instance).have.property('description').which.is.String().equal('createTest');
          should(instance).have.property('created_at').which.is.Date();
          should(instance).have.property('updated_at').which.is.Date();
          should(instance).have.property('links').which.is.Object();
          should(instance).have.property('owner').which.is.Object();
          should(instance).have.property('metadata').which.is.Object();
        });
    });

    it('should be able to get first instance (SUCCESS)', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first();
        })
        .then((instance) => {
          should(instance).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((instances) => {
          should(instances).be.an.Array().with.length(2);
          return Model.please().pageSize(1);
        })
        .then((instances) => {
          should(instances).be.an.Array().with.length(1);
        });
    });

    it.skip('should be able to change ordering', function() {
      let ascInstances = null;

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((instances) => {
          should(instances).be.an.Array().with.length(2);
          return Instance.please().ordering('asc');
        })
        .then((instances) => {
          should(instances).be.an.Array().with.length(2);
          ascInstances = instances;
          return Model.please().ordering('desc');
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
      return Model.please().list().raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });
  });
});
