import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('DataEndpoint', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  let Class = null;
  let dataObject = null;
  const instanceName = suffix.getHyphened('DataEndpoint');
  const dataEndpointName = suffix.get('dataendpoint');
  const className = suffix.get('class');
  const data = {
    name: dataEndpointName,
    instanceName: instanceName,
    description: 'description',
    query: {},
    class: className,
    order_by: '-int',
    page_size: 5
  };
  const classData = {
    name: className,
    instanceName: instanceName,
    schema: [{
      "order_index": true,
      "filter_index": true,
      "type": "integer",
      "name": "int"
      }]
    };
  let objects = null;
  let dataobjects = null;

  before(function(done) {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.DataEndpoint;
    Class = connection.Class;
    dataObject = connection.DataObject;

    dataobjects = _.map(_.range(10), (int) => dataObject({className, instanceName, int}));

    objects = [
      Model({name: `${dataEndpointName}_1`, instanceName, class: className}),
      Model({name: `${dataEndpointName}_2`, instanceName, class: className})
    ];

    return Instance.please().create({name: instanceName}).then(() => {
      Class.please().create(classData).then(() => done());
    });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({name: dataEndpointName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "name"', function() {
    should(Model({name: {}, instanceName}).save()).be.rejectedWith(/name/);
  });

  it('should require "class"', function() {
    should(Model({name: dataEndpointName, instanceName}).save()).be.rejectedWith(/class/);
  });

  it('should validate "description"', function() {
    should(Model({name: dataEndpointName, instanceName, description: 1337}).save()).be.rejectedWith(/description/);
  });

  it('should validate "query"', function() {
    should(Model({name: dataEndpointName, instanceName, query: 1337}).save()).be.rejectedWith(/query/);
  });

  it('should validate "excluded_fields"', function() {
    should(Model({name: dataEndpointName, instanceName, excluded_fields: 1337}).save()).be.rejectedWith(/excluded_fields/);
  });

  it('should validate "order_by"', function() {
    should(Model({name: dataEndpointName, instanceName, order_by: 1337}).save()).be.rejectedWith(/order_by/);
  });

  it('should validate "page_size"', function() {
    should(Model({name: dataEndpointName, instanceName, page_size: 'first'}).save()).be.rejectedWith(/page_size/);
  });

  it('should validate "expand"', function() {
    should(Model({name: dataEndpointName, instanceName, expand: 1337}).save()).be.rejectedWith(/expand/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).be.a.Object();
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('description').which.is.String().equal(data.description);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('query').which.is.Object();
        should(dta).have.property('excluded_fields').which.is.Null();
        should(dta).have.property('order_by').which.is.String().equal(data.order_by);
        should(dta).have.property('page_size').which.is.Number().equal(data.page_size);
        should(dta).have.property('expand').which.is.Null();
        should(dta).have.property('links').which.is.Object();
        should(dta).have.property('class').which.is.String().equal(data.class)
      });
  });

  it('should be able to create a DataObject via model instance', function() {
    let dataEndpoint = null;

    return Model(data).save()
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).be.a.Object();
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('description').which.is.String().equal(data.description);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('query').which.is.Object();
        should(dta).have.property('excluded_fields').which.is.Null();
        should(dta).have.property('order_by').which.is.String().equal(data.order_by);
        should(dta).have.property('page_size').which.is.Number().equal(data.page_size);
        should(dta).have.property('expand').which.is.Null();
        should(dta).have.property('links').which.is.Object();
        should(dta).have.property('class').which.is.String().equal(data.class);

        dataEndpoint = dta;

        return dataEndpoint.createDataObject({ int: 1})
      })
      .then(() => {
        return dataEndpoint.fetchData();
      })
      .then((data) => {
        should(data).be.an.Array().with.length(1);
        should(data[0]).be.an.Object();
        should(data[0]).have.property('int').which.is.Number().equal(1);
      })
  });

  it('should be able to fetch DataObjects via model instance with filtering', function() {
    return dataObject.please().bulkCreate(dataobjects)
      .then(cleaner.mark)
      .then(() => {
        return Model(data).save();
      })
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).be.an.Object();
        return dta.fetchData(null, { int: { _eq: 5 } });
      })
      .then((data) => {
        should(data).be.an.Array().with.length(1);
        should(data[0]).have.property('int').which.is.Number().equal(5);
      });
  });

  it('should be able to fetch DataObjects via model instance with cache_key', function() {
    return dataObject.please().bulkCreate(dataobjects)
      .then(cleaner.mark)
      .then(() => {
        return Model(data).save();
      })
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).be.an.Object();
        return dta.fetchData('123');
      })
      .then((data) => {
        should(data).be.an.Array().with.length(5);
        should(data[0]).have.property('int').which.is.Number().equal(9);
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('description').which.is.String().equal(data.description);

        dta.description = 'new description';
        return dta.save();
      })
      .then((dta) => {
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('description').which.is.String().equal('new description');
      });
  });

  it('should be able to clear cache via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('description').which.is.String().equal(data.description);

        return dta.clearCache();
      })
  });

  it('should be able to rename via model instance', function() {
    return Model(data).save()
      .then((dta) => {
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('description').which.is.String().equal(data.description);

        return dta.rename({ new_name: 'new_name'})
      })
      .then(cleaner.mark)
      .then((dta) => {
        should(dta).have.property('name').which.is.String().equal('new_name');
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((dta) => {
        should(dta).have.property('name').which.is.String().equal(data.name);
        should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dta).have.property('description').which.is.String().equal(data.description);

        return dta.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list({instanceName}).then((Models) => {
        should(Models).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal(data.description);
          should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(dta).have.property('query').which.is.Object();
          should(dta).have.property('excluded_fields').which.is.Null();
          should(dta).have.property('order_by').which.is.String().equal(data.order_by);
          should(dta).have.property('page_size').which.is.Number().equal(data.page_size);
          should(dta).have.property('expand').which.is.Null();
          should(dta).have.property('links').which.is.Object();
          should(dta).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to create a DataObject', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal(data.description);
          should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(dta).have.property('query').which.is.Object();
          should(dta).have.property('excluded_fields').which.is.Null();
          should(dta).have.property('order_by').which.is.String().equal(data.order_by);
          should(dta).have.property('page_size').which.is.Number().equal(data.page_size);
          should(dta).have.property('expand').which.is.Null();
          should(dta).have.property('links').which.is.Object();
          should(dta).have.property('class').which.is.String().equal(data.class)

          return Model.please().createDataObject({instanceName, name: dataEndpointName}, { int: 1});
        })
        .then(() => {
          return Model.please().fetchData({instanceName, name: dataEndpointName});
        })
        .then((data) => {
          should(data).be.an.Array().with.length(2);
          should(data[0]).be.an.Object();
          should(data[0]).have.property('int').which.is.Number().equal(1);
        })
    });

    it('should be able to rename a Model', function() {
      return Model.please().create(data)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal(data.description);

          return Model.please().rename(dta, { new_name: 'new_name'})
        })
        .then((dta) => {
          should(dta).have.property('name').which.is.String().equal('new_name');

          return Model.please().delete(dta);
        });
    });

    it('should be able to clear cache', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal(data.description);

          return Model.please().clearCache(dta)
        });
    });

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(data),
        Model(_.assign({}, data, {name: `${dataEndpointName}1`}))
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);

          return dta;
        })
        .then(() => {
          return Model
            .please()
            .get({name: dataEndpointName, instanceName})
            .request();
        })
        .then(([dta, response]) => {
          should(response).be.an.Object();
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal(data.description);
          should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(dta).have.property('query').which.is.Object();
          should(dta).have.property('excluded_fields').which.is.Null();
          should(dta).have.property('order_by').which.is.String().equal(data.order_by);
          should(dta).have.property('page_size').which.is.Number().equal(data.page_size);
          should(dta).have.property('expand').which.is.Null();
          should(dta).have.property('links').which.is.Object();
          should(dta).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to fetch DataObjects', function() {
      return dataObject.please().bulkCreate(dataobjects)
        .then(cleaner.mark)
        .then(() => {
            return Model.please().create(data)
        })
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);

          return dta;
        })
        .then(() => {
          return Model
            .please()
            .fetchData({name: dataEndpointName, instanceName})
        })
        .then((data) => {
          should(data).be.an.Array().with.length(5);
        });
    });

    it('should be able to fetch DataObjects with filtering', function() {
      return dataObject.please().bulkCreate(dataobjects)
        .then(cleaner.mark)
        .then(() => {
            return Model.please().create(data)
        })
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);

          return dta;
        })
        .then(() => {
          return Model
            .please()
            .filter({ int: { _eq: 5 } })
            .fetchData({name: dataEndpointName, instanceName})
        })
        .then((data) => {
          should(data).be.an.Array().with.length(1);
          should(data[0]).have.property('int').which.is.Number().equal(5);
        });
    });

    it('should be able to fetch DataObjects with cache_key', function() {
      return dataObject.please().bulkCreate(dataobjects)
        .then(cleaner.mark)
        .then(() => {
            return Model.please().create(data)
        })
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);

          return dta;
        })
        .then(() => {
          return Model
            .please()
            .cacheKey('123')
            .fetchData({name: dataEndpointName, instanceName})
        })
        .then((data) => {
          should(data).be.an.Array().with.length(5);
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(data)
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          return dta;
        })
        .then(() => {
          return Model
            .please()
            .delete({name: dataEndpointName, instanceName})
            .request();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().getOrCreate(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal(data.description);
          should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(dta).have.property('query').which.is.Object();
          should(dta).have.property('excluded_fields').which.is.Null();
          should(dta).have.property('order_by').which.is.String().equal(data.order_by);
          should(dta).have.property('page_size').which.is.Number().equal(data.page_size);
          should(dta).have.property('expand').which.is.Null();
          should(dta).have.property('links').which.is.Object();
          should(dta).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to get or create a Model (GET)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          should(dta).have.property('description').which.is.String().equal(data.description);

          return Model.please().getOrCreate(data);
        })
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          should(dta.description).which.is.String().equal(data.description);
        });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          should(dta).have.property('description').which.is.String().equal(data.description);

          return Model.please().update({name: dataEndpointName, instanceName, class: className}, {description: 'newTest'});
        })
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          should(dta.description).which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create Model (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          should(dta).have.property('description').which.is.String().equal(data.description);

          return Model.please().updateOrCreate({name: dataEndpointName, instanceName, class: className}, {description: 'newTest'});
        })
        .then((dta) => {
          should(dta).be.an.Object();
          should(dta).have.property('name').which.is.String().equal(dataEndpointName);
          should(dta).have.property('instanceName').which.is.String().equal(instanceName);
          should(dta).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create Model (CREATE)', function() {
      const properties = {name: dataEndpointName, instanceName, class: className};
      const object = {description: 'updateTest'};
      const defaults = {
          description: 'createTest',
          order_by: 'int',
          page_size: 10
      };

      return Model.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.a.Object();
          should(dta).have.property('name').which.is.String().equal(data.name);
          should(dta).have.property('description').which.is.String().equal('createTest');
          should(dta).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(dta).have.property('query').which.is.Object();
          should(dta).have.property('excluded_fields').which.is.Null();
          should(dta).have.property('order_by').which.is.String().equal('int');
          should(dta).have.property('page_size').which.is.Number().equal(10);
          should(dta).have.property('expand').which.is.Null();
          should(dta).have.property('links').which.is.Object();
          should(dta).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to get first Model (SUCCESS)', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((dta) => {
          should(dta).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.an.Array().with.length(2);
          return Model.please({instanceName}).pageSize(1);
        })
        .then((dta) => {
          should(dta).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      let asc = null;

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((dta) => {
          should(dta).be.an.Array().with.length(2);
          return Model.please({instanceName}).ordering('asc');
        })
        .then((dta) => {
          should(dta).be.an.Array().with.length(2);
          asc = dta;
          return Model.please({instanceName}).ordering('desc');
        }).then((desc) => {
          const ascNames = _.map(asc, 'name');
          const descNames = _.map(desc, 'name');
          descNames.reverse();

          should(desc).be.an.Array().with.length(2);

          _.forEach(ascNames, (ascName, index) => {
            should(ascName).be.equal(descNames[index]);
          });
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
