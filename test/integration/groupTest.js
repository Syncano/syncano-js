import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';


describe('Group', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('instance');
  const groupLabel = suffix.get('group');
  const data = {
    instanceName,
    label: groupLabel,
    description: 'test',
    id: null
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Group;

    return Instance.please().create({name: instanceName});
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
    should(Model({label: groupLabel}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "label"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/label/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('description').which.is.String().equal(data.description);
        should(object).have.property('links').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(object).have.property('description').which.is.String().equal(data.description);

        object.description = 'new description';
        return object.save();
      })
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(object).have.property('description').which.is.String().equal('new description');
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('description').which.is.String().equal(data.description);
        should(object).have.property('links').which.is.Object();

        return object.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list(data).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to create an object', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('links').which.is.Object();
        });
    });

    it('should be able to get an object', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('links').which.is.Object();

          data.id = object.id;
          return object;
        })
        .then(() => {
          return Model
            .please()
            .get(data)
            .request();
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('links').which.is.Object();
        });
    });

    it('should be able to delete an object', function() {
      return Model.please().create(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('links').which.is.Object();

          data.id = object.id;
          return object;
        })
        .then(() => {
          return Model
            .please()
            .delete(data)
            .request();
        });
    });

    it('should be able to get or create an object (CREATE)', function() {
      return Model.please().getOrCreate(data, {label: 'test2'})
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal('test2');
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
        });
    });

    it('should be able to get or create an object (GET)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);

          data.id = object.id;
          return Model.please().getOrCreate(data, {label: 'newTest'});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
        });
    });

    it('should be able to update an object', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);

          data.id = object.id;
          return Model.please().update(data, {description: 'newTest'});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create an object (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);

          data.id = object.id;
          return Model.please().updateOrCreate(data, {description: 'newTest'});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create an object (CREATE)', function() {
      let object = {description: 'updateTest'};
      let defaults = {description: 'createTest'};

      return Model.please().updateOrCreate(data, object, defaults)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('description').which.is.String().equal(defaults.description);
        });
    });

    it('should be able to get first object (SUCCESS)', function() {
      const labels = [
        `${groupLabel}1`,
        `${groupLabel}2`
      ];

      return Promise
        .all(_.map(labels, (label) => Model.please().create(_.assign({}, data, {label}))))
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first(data);
        })
        .then((object) => {
          should(object).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const labels = [
        `${groupLabel}1`,
        `${groupLabel}2`
      ];

      return Promise
        .all(_.map(labels, (label) => Model.please().create(_.assign({}, data, {label}))))
        .then(cleaner.mark)
        .then((objects) => {
          should(objects).be.an.Array().with.length(2);
          return Model.please(data).pageSize(1);
        })
        .then((objects) => {
          should(objects).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const labels = [
        `${groupLabel}1`,
        `${groupLabel}2`
      ];
      let asc = null;

      return Promise
        .all(_.map(labels, (label) => Model.please().create(_.assign({}, data, {label}))))
        .then(cleaner.mark)
        .then((objects) => {
          should(objects).be.an.Array().with.length(2);
          return Model.please(data).ordering('asc');
        })
        .then((objects) => {
          should(objects).be.an.Array().with.length(2);
          asc = objects;
          return Model.please(data).ordering('desc');
        }).then((desc) => {
          const ascAttrs = _.map(asc, 'label');
          const descAttrs = _.map(desc, 'label');
          descAttrs.reverse();

          should(desc).be.an.Array().with.length(2);

          _.forEach(ascAttrs, (ascId, index) => {
            should(ascId).be.equal(descAttrs[index]);
          });
        });
    });

    it('should be able to get raw data', function() {
      return Model.please().list(data).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
