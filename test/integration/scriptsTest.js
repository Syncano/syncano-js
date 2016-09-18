import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';

describe('Script', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('Script');
  const scriptName = suffix.get('script');
  const runtimeName = 'python_library_v4.2';
  const data = {
    instanceName: instanceName,
    label: scriptName,
    runtime_name: runtimeName,
    source: 'print "test"'
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Script;

    objects = [
      Model({instanceName, label: 'label_1', runtime_name: runtimeName}),
      Model({instanceName, label: 'label_2', runtime_name: runtimeName})
    ];

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(Error);
  });

  it('should require "instanceName"', function() {
    should(Model({label: scriptName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "runtime_name"', function() {
    should(Model({label: scriptName, instanceName}).save()).be.rejectedWith(/runtime_name/);
  });

  it('should valiate "label"', function() {
    should(Model({label: {}, instanceName}).save()).be.rejectedWith(/label/);
  });

  it('should valiate "source"', function() {
    should(Model({label: scriptName, instanceName, source: 1337}).save()).be.rejectedWith(/source/);
  });

  it('should valiate "config"', function() {
    should(Model({label: scriptName, instanceName, config: 1337}).save()).be.rejectedWith(/config/);
  });

  it('should valiate "description"', function() {
    should(Model({label: scriptName, instanceName, description: 1337}).save()).be.rejectedWith(/description/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((script) => {
        should(script).be.an.Object();
        should(script).have.property('instanceName').which.is.String().equal(instanceName);
        should(script).have.property('description').which.is.String();
        should(script).have.property('created_at').which.is.Date();
        should(script).have.property('updated_at').which.is.Date();
        should(script).have.property('links').which.is.Object();
        should(script).have.property('id').which.is.Number();
        should(script).have.property('label').which.is.String();
        should(script).have.property('source').which.is.String();
        should(script).have.property('runtime_name').which.is.String().equal(runtimeName);
        should(script).have.property('config').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((script) => {
        should(script).be.an.Object();
        should(script).have.property('instanceName').which.is.String().equal(instanceName);
        should(script).have.property('description').which.is.String();
        should(script).have.property('created_at').which.is.Date();
        should(script).have.property('updated_at').which.is.Date();
        should(script).have.property('links').which.is.Object();
        should(script).have.property('id').which.is.Number();
        should(script).have.property('label').which.is.String();
        should(script).have.property('source').which.is.String();
        should(script).have.property('runtime_name').which.is.String().equal(runtimeName);
        should(script).have.property('config').which.is.Object();

        script.label = 'new label';
        script.description = 'new description';
        return script.save();
      })
      .then((script) => {
        should(script).have.property('label').which.is.String().equal('new label');
        should(script).have.property('description').which.is.String().equal('new description');
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((script) => {
        should(script).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(script).have.property('label').which.is.String().equal(data.label);

        return script.delete();
      });
  });

  it('should be able to run via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((script) => {
        should(script).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(script).have.property('source').which.is.String().equal(data.source);
        should(script).have.property('label').which.is.String().equal(data.label);
        return script.run();
      }).then((trace) => {
        should(trace).be.an.Object();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('executed_at');
        should(trace).have.property('duration');
        should(trace).have.property('result');
        should(trace).have.property('links').which.is.Object();
      });
  });

  it('should be able to get runtimes via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((script) => {
        should(script).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(script).have.property('label').which.is.String().equal(data.label);

        return script.getRuntimes();
      })
      .then((runtimes) => {
        should(runtimes).be.an.Object();
        should(runtimes).have.property('python_library_v4.2').which.is.Object();
        should(runtimes).have.property('nodejs_library_v1.0').which.is.Object();
        should(runtimes).have.property('swift').which.is.Object();
        should(runtimes).have.property('nodejs_library_v0.4').which.is.Object();
        should(runtimes).have.property('golang').which.is.Object();
        should(runtimes).have.property('python_library_v5.0').which.is.Object();
        should(runtimes).have.property('php').which.is.Object();
        should(runtimes).have.property('ruby').which.is.Object();
      })
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to create a script', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((script) => {
          should(script).have.property('instanceName').which.is.String().equal(instanceName);
          should(script).have.property('description').which.is.String();
          should(script).have.property('created_at').which.is.Date();
          should(script).have.property('updated_at').which.is.Date();
          should(script).have.property('links').which.is.Object();
          should(script).have.property('id').which.is.Number();
          should(script).have.property('label').which.is.String();
          should(script).have.property('source').which.is.String();
          should(script).have.property('runtime_name').which.is.String().equal(runtimeName);
          should(script).have.property('config').which.is.Object();
        });
      });

    it('should be able to bulk create objects', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a script', function() {
      let scriptId = null;

      return Model.please().create(data)
        .then(cleaner.mark)
        .then((script) => {
          should(script).have.property('instanceName').which.is.String().equal(instanceName);
          scriptId = script.id;

          return script;
        })
        .then(() => {
          return Model
            .please()
            .get({id: scriptId, instanceName})
            .request();
        })
      .then(([script, response]) => {
        should(response).be.an.Object();
        should(script).be.an.Object();
        should(script).have.property('instanceName').which.is.String().equal(instanceName);
        should(script).have.property('description').which.is.String();
        should(script).have.property('created_at').which.is.Date();
        should(script).have.property('updated_at').which.is.Date();
        should(script).have.property('links').which.is.Object();
        should(script).have.property('id').which.is.Number();
        should(script).have.property('label').which.is.String();
        should(script).have.property('source').which.is.String();
        should(script).have.property('runtime_name').which.is.String().equal(runtimeName);
        should(script).have.property('config').which.is.Object();
      });
    });

    it('should be able to delete a script', function() {
      let scriptId = null;

      return Model.please().create(data)
        .then((script) => {
          should(script).be.an.Object();
          should(script).have.property('instanceName').which.is.String().equal(instanceName);
          scriptId = script.id;
          return script;
        })
        .then(() => {
          return Model
            .please()
            .delete({id: scriptId, instanceName})
            .request();
        });
    });

    it('should be able to update a script', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((script) => {
          should(script).be.an.Object();
          should(script).have.property('instanceName').which.is.String().equal(instanceName);
          should(script).have.property('label').which.is.String().equal(scriptName);

          return Model.please().update({id: script.id, instanceName}, {label: 'newLabel'});
        })
        .then((script) => {
          should(script).be.an.Object();
          should(script).have.property('instanceName').which.is.String().equal(instanceName);
          should(script).have.property('label').which.is.String().equal('newLabel');
        })
    });

    it('should be able to get first script', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((script) => {
          should(script).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((keys) => {
            should(keys).be.an.Array().with.length(2);
            return Model.please({instanceName}).pageSize(1);
        })
        .then((keys) => {
          should(keys).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      let asc = null;

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((keys) => {
          should(keys).be.an.Array().with.length(2);
          return Model.please({instanceName}).ordering('asc');
        })
        .then((keys) => {
          should(keys).be.an.Array().with.length(2);
          asc = keys;
          return Model.please({instanceName}).ordering('desc');
        })
        .then((desc) => {
          const asdDescs = _.map(asc, 'description');
          const descDescs = _.map(desc, 'description');
          descDescs.reverse();
          should(desc).be.an.Array().with.length(2);

          _.forEach(asdDescs, (ascDesc, index) => {
            should(ascDesc).be.equal(descDescs[index]);
          });
        })
    });

    it('should be able to get raw data', function() {
      return Model.please().list({instanceName}).raw()
        .then((script) => {
          should(script).be.a.Object();
          should(script).have.property('objects').which.is.Array();
          should(script).have.property('next').which.is.null();
          should(script).have.property('prev').which.is.null();
        });
      });

    it('should be able to run a script', function() {
      let scriptId = null;

      return Model.please().create(data)
        .then((script) => {
          should(script).be.an.Object();
          should(script).have.property('instanceName').which.is.String().equal(instanceName);
          scriptId = script.id;

          return Model.please().run({id: scriptId, instanceName}, {x: 1});
        })
        .then((trace) => {
          should(trace).be.an.Object();
          should(trace).have.property('status').which.is.String();
          should(trace).have.property('executed_at');
          should(trace).have.property('duration');
          should(trace).have.property('result');
          should(trace).have.property('links').which.is.Object();
        });
    });

    it('should be able to get runtimes', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((script) => {
          should(script).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(script).have.property('label').which.is.String().equal(data.label);

          return Model.please().getRuntimes({instanceName});
        })
        .then((runtimes) => {
          should(runtimes).be.an.Object();
          should(runtimes).have.property('python_library_v4.2').which.is.Object();
          should(runtimes).have.property('nodejs_library_v1.0').which.is.Object();
          should(runtimes).have.property('swift').which.is.Object();
          should(runtimes).have.property('nodejs_library_v0.4').which.is.Object();
          should(runtimes).have.property('golang').which.is.Object();
          should(runtimes).have.property('python_library_v5.0').which.is.Object();
          should(runtimes).have.property('php').which.is.Object();
          should(runtimes).have.property('ruby').which.is.Object();
        })
    });
  });
});
