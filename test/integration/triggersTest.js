import should from 'should/as-function';
import Syncano from '../../src/syncano';
import _ from 'lodash';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('Trigger', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('Script');
  const scriptName = suffix.get('script');
  const className = suffix.get('class');
  const data = {
    instanceName: instanceName,
    label: 'my trigger',
    description: 'my description',
    signal: 'post_create',
    class: className
  };
  const data2 = {
    instanceName: instanceName,
    label: 'my trigger2',
    description: 'my description2',
    signal: 'post_create',
    class: className
  };
  const classData = {
    name: className,
    instanceName: instanceName,
    description: 'test'
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Trigger;

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.Script.please().create({
        instanceName: instanceName,
        label: scriptName,
        runtime_name: 'python_library_v4.2',
        source: 'print "x"'
      }).then((script) => {
        data.script = script.id;
        data2.script = script.id;
        objects = [
          Model(data),
          Model(data2)
        ];
        return connection.Class(classData).save();
      })
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
    should(Model({class: className}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "label"', function() {
    should(Model({class: className, instanceName}).save()).be.rejectedWith(/label/);
  });

  it('should validate "label"', function() {
    should(Model({class: className, instanceName, label: {}}).save()).be.rejectedWith(/label/);
  });

  it('should require "class"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/class/);
  });

  it('should validate "class"', function() {
    should(Model({instanceName, class: 1337}).save()).be.rejectedWith(/class/);
  });

  it('should require "signal"', function() {
    should(Model({class: className, instanceName, label: 'my trigger'}).save()).be.rejectedWith(/signal/);
  });

  it('should validate "signal"', function() {
    should(Model({class: className, instanceName, label: 'my trigger', signal: 'dunno'}).save()).be.rejectedWith(/signal/);
  });

  it('should require "script"', function() {
    should(Model({class: className, instanceName, label: 'my trigger', signal: 'post_create'}).save()).be.rejectedWith(/script/);
  });

  it('should validate "script"', function() {
    should(Model({class: className, instanceName, label: 'my trigger', signal: 'post_create', script: 'first'}).save()).be.rejectedWith(/script/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((trigger) => {
        should(trigger).be.a.Object();
        should(trigger).have.property('id').which.is.Number();
        should(trigger).have.property('script').which.is.Number().equal(data.script);
        should(trigger).have.property('description').which.is.String().equal(data.description);
        should(trigger).have.property('label').which.is.String().equal(data.label);
        should(trigger).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(trigger).have.property('class').which.is.String().equal(data.class);
        should(trigger).have.property('signal').which.is.String().equal(data.signal);
        should(trigger).have.property('created_at').which.is.Date();
        should(trigger).have.property('updated_at').which.is.Date();
        should(trigger).have.property('links').which.is.Object();
        should(trigger).have.property('triggertraces').which.is.Function();
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((trigger) => {
        should(trigger).have.property('id').which.is.Number();
        should(trigger).have.property('script').which.is.Number().equal(data.script);
        should(trigger).have.property('description').which.is.String().equal(data.description);

        trigger.description = 'new description';
        return trigger.save();
      })
      .then((trigger) => {
        should(trigger).have.property('id').which.is.Number();
        should(trigger).have.property('script').which.is.Number().equal(data.script);
        should(trigger).have.property('description').which.is.String().equal('new description');
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((trigger) => {
        should(trigger).have.property('id').which.is.Number();
        should(trigger).have.property('script').which.is.Number().equal(data.script);
        should(trigger).have.property('description').which.is.String().equal(data.description);

        return trigger.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list({instanceName}).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to create an object', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('script').which.is.Number().equal(data.script);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(object).have.property('class').which.is.String().equal(data.class);
          should(object).have.property('signal').which.is.String().equal(data.signal);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('triggertraces').which.is.Function();
        });
    });

    it('should be able to bulk create objects', function() {
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
          should(object).have.property('script').which.is.Number().equal(data.script);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(object).have.property('class').which.is.String().equal(data.class);
          should(object).have.property('signal').which.is.String().equal(data.signal);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('triggertraces').which.is.Function();

          return object;
        })
        .then((object) => {
          return Model
            .please()
            .get({ id: object.id, instanceName })
            .request();
        })
        .then(([object, response]) => {
          should(response).be.an.Object();
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('script').which.is.Number().equal(data.script);
          should(object).have.property('description').which.is.String().equal(data.description);
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(object).have.property('class').which.is.String().equal(data.class);
          should(object).have.property('signal').which.is.String().equal(data.signal);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('triggertraces').which.is.Function();
        });
    });

    it('should be able to get first object (SUCCESS)', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first(data);
        })
        .then((object) => {
          should(object).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
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
      let asc = null;

      return Model.please().bulkCreate(objects)
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
          const ascNames = _.map(asc, 'label');
          const descNames = _.map(desc, 'label');
          descNames.reverse();

          should(desc).be.an.Array().with.length(2);

          _.forEach(ascNames, (ascName, index) => {
            should(ascName).be.equal(descNames[index]);
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
