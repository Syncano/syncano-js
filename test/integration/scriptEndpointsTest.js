import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('ScriptEndpoint', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Script = null;
  let Instance = null;

  const instanceName = suffix.getHyphened('ScriptEndpoint');
  const ModelName = suffix.get('scriptendpoint');
  const runtimeName = 'python_library_v4.2';
  const scriptLabel = suffix.get('script');
  const ModelData = {
    name: ModelName,
    instanceName: instanceName,
    description: 'test',
    public: true
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Script = connection.Script;
    Model = connection.ScriptEndpoint;

    return Instance
      .please()
      .create({name: instanceName})
      .then((instance) => {
        return Script.please().create({
          instanceName: instance.name,
          label: scriptLabel,
          runtime_name: runtimeName,
          source: 'print "test"'
        });
      }).then((script) => {
        ModelData.script = script.id;
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
    should(Model({name: ModelName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "name"', function() {
    should(Model({name: {}}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "description"', function() {
    should(Model({name: ModelName, instanceName, description: 1337 }).save()).be.rejectedWith(/description/);
  });

  it('should validate "public"', function() {
    should(Model({name: ModelName, instanceName, public: 'yes' }).save()).be.rejectedWith(/public/);
  });

  it('should require "script"', function() {
    should(Model({name: ModelName, instanceName}).save()).be.rejectedWith(/script/);
  });

  it('should validate "script"', function() {
    should(Model({name: ModelName, instanceName, script: 'first'}).save()).be.rejectedWith(/script/);
  });

  it('should be able to save via model instance', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        scriptendpoint.description = 'new description';
        return scriptendpoint.save();
      })
      .then((scriptendpoint) => {
        should(scriptendpoint).be.an.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal('new description');
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(ModelData).save()
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return scriptendpoint.delete();
      });
  });

  it('should be able to run script via model instance', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return scriptendpoint.run();
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to run script via model instance with cacke_key', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return scriptendpoint.run({}, '123');
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it.skip('should be able to run *public* script via model instance', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return scriptendpoint.runPublic();
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to run *public* script via model instance with cache_key', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return scriptendpoint.runPublic({}, '123');
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to reset via model instance', function() {
    let publicLink = null;

    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();
        should(scriptendpoint).have.property('public_link').which.is.String();

        publicLink = scriptendpoint.public_link;
        return scriptendpoint.reset();
      }).then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('codebox').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();
        should(scriptendpoint).have.property('public_link').which.is.String().not.equal(publicLink);
      });
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list(ModelData).then((Models) => {
        should(Models).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {
      return Model.please().create(ModelData)
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
          should(scriptendpoint).have.property('links').which.is.Object();
          should(scriptendpoint).have.property('public_link').which.is.String();
        });
    });

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(ModelData),
        Model(_.assign({}, ModelData, {name: `${ModelName}1`}))
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a Model', function() {
      return Model.please().create(ModelData)
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);

          return Model;
        })
        .then(() => {
          return Model
            .please()
            .get(ModelData)
            .request();
        })
        .then(([scriptendpoint, response]) => {
          should(response).be.an.Object();
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(ModelData)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
          return Model;
        })
        .then(() => {
          return Model
            .please()
            .delete(ModelData)
            .request();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().getOrCreate(ModelData, {description: 'aa test'})
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal('aa test');
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        });
    });

    it('should be able to get or create a Model (GET)', function() {
      return Model.please().create(ModelData)
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);

          return Model.please().getOrCreate(ModelData, {description: 'newTest'});
        })
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(ModelData)
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);

          return Model.please().update(ModelData, {description: 'newTest'});
        })
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal('newTest');
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        });
    });

    it('should be able to update or create Model (UPDATE)', function() {
      return Model.please().create(ModelData)
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);

          return Model.please().updateOrCreate(ModelData, {description: 'newTest'});
        })
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal('newTest');
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        });
    });

    it('should be able to update or create Model (CREATE)', function() {
      const defaults = {description: 'createTest'};

      return Model.please().updateOrCreate(ModelData, ModelData, defaults)
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(defaults.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        });
    });

    it('should be able to get first Model (SUCCESS)', function() {
      const objects = [
        Model({ name: `${ModelName}_1`, instanceName, script: ModelData.script}),
        Model({ name: `${ModelName}_2`, instanceName, script: ModelData.script})
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first(ModelData);
        })
        .then((scriptendpoint) => {
          should(scriptendpoint).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const objects = [
        Model({ name: `${ModelName}_1`, instanceName, script: ModelData.script}),
        Model({ name: `${ModelName}_2`, instanceName, script: ModelData.script})
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((Models) => {
          should(Models).be.an.Array().with.length(2);
          return Model.please(ModelData).pageSize(1);
        })
        .then((Models) => {
          should(Models).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const objects = [
        Model({ name: `${ModelName}_1`, instanceName, script: ModelData.script}),
        Model({ name: `${ModelName}_2`, instanceName, script: ModelData.script})
      ];
      let asc = null;

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((Models) => {
          should(Models).be.an.Array().with.length(2);
          return Model.please(ModelData).ordering('asc');
        })
        .then((Models) => {
          should(Models).be.an.Array().with.length(2);
          asc = Models;
          return Model.please(ModelData).ordering('desc');
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
      return Model.please().list(ModelData).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

    it('should be able to run script with cache_key', function() {
      return Model(ModelData).save()
        .then(cleaner.mark)
        .then((scriptendpoint) => {
          should(scriptendpoint).be.a.Object();
          should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
          should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
          should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
          should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
          should(scriptendpoint).have.property('links').which.is.Object();

          return Model.please().cacheKey('123').run(scriptendpoint);
        }).then((trace) => {
          should(trace).be.a.Object();
          should(trace).have.property('id').which.is.Number();
          should(trace).have.property('status').which.is.String();
          should(trace).have.property('duration').which.is.Number();
          should(trace).have.property('result').which.is.Object();
          should(trace).have.property('executed_at').which.is.Date();
      });
    });


  it('should be able to run *public* script', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return Model.please().runPublic(scriptendpoint);
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to run *public* script with cache_key', function() {
    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();

        return Model.please().cacheKey('123').runPublic(scriptendpoint);
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to reset', function() {
    let publicLink = null;

    return Model(ModelData).save()
      .then(cleaner.mark)
      .then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('script').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();
        should(scriptendpoint).have.property('public_link').which.is.String();

        return Model.please().reset(scriptendpoint);
      }).then((scriptendpoint) => {
        should(scriptendpoint).be.a.Object();
        should(scriptendpoint).have.property('name').which.is.String().equal(ModelData.name);
        should(scriptendpoint).have.property('instanceName').which.is.String().equal(ModelData.instanceName);
        should(scriptendpoint).have.property('description').which.is.String().equal(ModelData.description);
        should(scriptendpoint).have.property('codebox').which.is.Number().equal(ModelData.script);
        should(scriptendpoint).have.property('links').which.is.Object();
        should(scriptendpoint).have.property('public_link').which.is.String().not.equal(publicLink);
      });
  });

  });

});
