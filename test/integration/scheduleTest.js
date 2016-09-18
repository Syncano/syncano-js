import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('Schedule', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('Schedule');
  let data = {
    instanceName,
    label: instanceName,
    script: null,
    interval_sec: 600,
    description: instanceName,
    timezone: 'UTC'
  }

  before(function() {
    const connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Schedule;

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.Script.please().create({
        instanceName: instanceName,
        label: instanceName,
        runtime_name: 'python_library_v4.2',
        source: 'print "x"'
      });
    }).then((script) => {
      data.script = script.id;
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
    should(Model({label: instanceName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "label"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/label/);
  });

  it('should validate "label"', function() {
    should(Model({instanceName, label: {}}).save()).be.rejectedWith(/label/);
  });

  it('should require "script"', function() {
    should(Model({instanceName, label: instanceName}).save()).be.rejectedWith(/script/);
  });

  it('should validate "script"', function() {
    should(Model({instanceName, label: instanceName, script: 'script'}).save()).be.rejectedWith(/script/);
  });

  it('should validate "description"', function() {
    should(Model({instanceName, label: instanceName, script: 'script', description: 1337}).save()).be.rejectedWith(/description/);
  });

  it('should validate "interval_sec"', function() {
    should(Model({instanceName, label: instanceName, script: data.script, interval_sec: 'this many'}).save()).be.rejectedWith(/interval_sec/);
  });

  it('should validate "crontab"', function() {
    should(Model({instanceName, label: instanceName, script: data.script, crontab: 'all the time'}).save()).be.rejectedWith(/crontab/);
  });

  it('should validate "timezone"', function() {
    should(Model({instanceName, label: instanceName, script: data.script, timezone: 1337}).save()).be.rejectedWith(/timezone/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('interval_sec').which.is.Number().equal(data.interval_sec);
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('description').which.is.String().equal(instanceName);
        should(object).have.property('timezone').which.is.String().equal(data.timezone);
        should(object).have.property('scheduled_next').which.is.String();
        should(object).have.property('crontab').which.is.null();
        should(object).have.property('created_at').which.is.Date();
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

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(data),
        Model(data)
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
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
        .then(([object, response]) => {
          should(response).be.an.Object();
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
        `${instanceName}1`,
        `${instanceName}2`
      ];

      return Promise
        .mapSeries(labels, (label) => Model.please().create(_.assign({}, data, {label})))
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
        `${instanceName}1`,
        `${instanceName}2`
      ];

      return Promise
        .mapSeries(labels, (label) => Model.please().create(_.assign({}, data, {label})))
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
        `${instanceName}1`,
        `${instanceName}2`
      ];
      let asc = null;

      return Promise
        .mapSeries(labels, (label) => Model.please().create(_.assign({}, data, {label})))
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
