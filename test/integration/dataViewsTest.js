import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';


describe.only('DataView', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  let Class = null;
  let dataObject = null;
  const instanceName = suffix.get('instance');
  const dataViewName = suffix.get('dataview');
  const className = suffix.get('class');
  const data = {
    name: dataViewName,
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
  const objectData = {
    className: className,
    instanceName: instanceName

  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.DataView;
    Class = connection.Class;
    dataObject = connection.DataObject;

    return Instance.please().create({name: instanceName}).then(() => {
      return Class.please().create(classData);
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
    should(Model({name: dataViewName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((chn) => {
        should(chn).be.a.Object();
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('description').which.is.String().equal(data.description);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('query').which.is.Object();
        should(chn).have.property('excluded_fields').which.is.Null();
        should(chn).have.property('order_by').which.is.String().equal(data.order_by);
        should(chn).have.property('page_size').which.is.Number().equal(data.page_size);
        should(chn).have.property('expand').which.is.Null();
        should(chn).have.property('links').which.is.Object();
        should(chn).have.property('class').which.is.String().equal(data.class)
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((chn) => {
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('description').which.is.String().equal(data.description);

        chn.description = 'new description';
        return chn.save();
      })
      .then((chn) => {
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('description').which.is.String().equal('new description');
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((chn) => {
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('description').which.is.String().equal(data.description);

        return chn.delete();
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
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(data.name);
          should(chn).have.property('description').which.is.String().equal(data.description);
          should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(chn).have.property('query').which.is.Object();
          should(chn).have.property('excluded_fields').which.is.Null();
          should(chn).have.property('order_by').which.is.String().equal(data.order_by);
          should(chn).have.property('page_size').which.is.Number().equal(data.page_size);
          should(chn).have.property('expand').which.is.Null();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to get a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);

          return chn;
        })
        .then(() => {
          return Model
            .please()
            .get({name: dataViewName, instanceName})
            .request();
        })
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(data.name);
          should(chn).have.property('description').which.is.String().equal(data.description);
          should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(chn).have.property('query').which.is.Object();
          should(chn).have.property('excluded_fields').which.is.Null();
          should(chn).have.property('order_by').which.is.String().equal(data.order_by);
          should(chn).have.property('page_size').which.is.Number().equal(data.page_size);
          should(chn).have.property('expand').which.is.Null();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(data)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          return chn;
        })
        .then(() => {
          return Model
            .please()
            .delete({name: dataViewName, instanceName})
            .request();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().getOrCreate(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(data.name);
          should(chn).have.property('description').which.is.String().equal(data.description);
          should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(chn).have.property('query').which.is.Object();
          should(chn).have.property('excluded_fields').which.is.Null();
          should(chn).have.property('order_by').which.is.String().equal(data.order_by);
          should(chn).have.property('page_size').which.is.Number().equal(data.page_size);
          should(chn).have.property('expand').which.is.Null();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to get or create a Model (GET)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal(data.description);

          return Model.please().getOrCreate(data);
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn.description).which.is.String().equal(data.description);
        });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal(data.description);

          return Model.please().update({name: dataViewName, instanceName, class: className}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn.description).which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create Model (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal(data.description);

          return Model.please().updateOrCreate({name: dataViewName, instanceName, class: className}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(dataViewName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create Model (CREATE)', function() {
      let properties = {name: dataViewName, instanceName, class: className};
      let object = {description: 'updateTest'};
      let defaults = {
          description: 'createTest',
          order_by: 'int',
          page_size: 10
      };

      return Model.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(data.name);
          should(chn).have.property('description').which.is.String().equal('createTest');
          should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(chn).have.property('query').which.is.Object();
          should(chn).have.property('excluded_fields').which.is.Null();
          should(chn).have.property('order_by').which.is.String().equal('int');
          should(chn).have.property('page_size').which.is.Number().equal(10);
          should(chn).have.property('expand').which.is.Null();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('class').which.is.String().equal(data.class)
        });
    });

    it('should be able to get first Model (SUCCESS)', function() {
      const names = [
        `${dataViewName}_1`,
        `${dataViewName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Model.please().create({name, instanceName, class: className})))
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((chn) => {
          should(chn).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const names = [
        `${dataViewName}_1`,
        `${dataViewName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Model.please().create({name, instanceName, class: className})))
        .then(cleaner.mark)
        .then((chns) => {
          should(chns).be.an.Array().with.length(2);
          return Model.please({instanceName}).pageSize(1);
        })
        .then((chns) => {
          should(chns).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const names = [
        `${dataViewName}_1`,
        `${dataViewName}_2`
      ];
      let asc = null;

      return Promise
        .all(_.map(names, (name) => Model.please().create({name, instanceName, class: className})))
        .then(cleaner.mark)
        .then((chns) => {
          should(chns).be.an.Array().with.length(2);
          return Model.please({instanceName}).ordering('asc');
        })
        .then((chns) => {
          should(chns).be.an.Array().with.length(2);
          asc = chns;
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
