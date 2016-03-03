import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe('Webhooks', function() {
  this.timeout(15000);

  let connection = null;
  let Webhook = null;
  let CodeBox = null;
  let Instance = null;

  const instanceName = suffix.get('Webhooks');
  const webhookName = suffix.get('webhook');
  const runtimeName = 'python';
  const codeBoxLabel = suffix.get('codeBox');
  let codeBoxId = null;
  let webhookData = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    CodeBox = connection.CodeBox;
    Webhook = connection.Webhook;

    return Instance
      .please()
      .create({name: instanceName})
      .then((instance) => {
        return CodeBox.please().create({
          instanceName: instance.name,
          label: codeBoxLabel,
          runtime_name: runtimeName,
          source: 'print "test"'
        });
      }).then((codebox) => {
        codeBoxId = codebox.id;
      });
  });

  beforeEach(function() {
    webhookData = {
      name: webhookName,
      instanceName: instanceName,
      script: codeBoxId,
      description: 'test',
      public: true
    };
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function(done) {
    return Webhook.please().delete({
      instanceName,
      name: webhookName
    })
    .then(() => done())
    .catch(() => done());
  });

  it('should be validated', function() {
    should(Webhook().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Webhook({name: webhookName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "script"', function() {
    should(Webhook({name: webhookName, instanceName}).save()).be.rejectedWith(/script/);
  });

  it('should be able to save via model instance', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();

        webhook.description = 'new description';
        return webhook.save();
      })
      .then((webhook) => {
        should(webhook).be.an.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal('new description');
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
      });
  });

  it('should be able to delete via model instance', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();

        return webhook.delete();
      });
  });

  it('should be able to run codebox via model instance', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();

        return webhook.run();
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to run *public* codebox via model instance', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();

        return webhook.runPublic();
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to reset via model instance', function() {
    let publicLink = null;

    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();
        should(webhook).have.property('public_link').which.is.String();

        publicLink = webhook.public_link;
        return webhook.reset();
      }).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('codebox').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();
        should(webhook).have.property('public_link').which.is.String().not.equal(publicLink);
      });
  });

  describe('#please()', function() {

    afterEach(function() {
      return Webhook
        .please()
        .list(webhookData)
        .then((webhooks) => {
          return Promise.mapSeries(webhooks, (webhook) => Webhook.please().delete({name: webhook.name, instanceName}));
        });
    });

    it('should be able to list webhooks', function() {
      return Webhook.please().list(webhookData).then((webhooks) => {
        should(webhooks).be.an.Array();
      });
    });

    it('should be able to create a webhook', function() {
      return Webhook.please().create(webhookData).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();
        should(webhook).have.property('public_link').which.is.String();
      });
    });

    it('should be able to bulk create an objects', function() {
      const objects = [
        Webhook(webhookData),
        Webhook(_.assign({}, webhookData, {name: `${webhookName}1`}))
      ];

      return Webhook.please().bulkCreate(objects)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a webhook', function() {
      return Webhook.please().create(webhookData)
        .then((webhook) => {
          should(webhook).be.a.Object();
          should(webhook).have.property('name').which.is.String().equal(webhookData.name);
          should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
          should(webhook).have.property('description').which.is.String().equal(webhookData.description);
          should(webhook).have.property('script').which.is.Number().equal(webhookData.script);

          return webhook;
        })
        .then(() => {
          return Webhook
            .please()
            .get(webhookData)
            .request();
        })
        .then((webhook) => {
          should(webhook).be.a.Object();
          should(webhook).have.property('name').which.is.String().equal(webhookData.name);
          should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
          should(webhook).have.property('description').which.is.String().equal(webhookData.description);
          should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        });
    });

    it('should be able to delete a webhook', function() {
      return Webhook.please().create(webhookData)
        .then((webhook) => {
          should(webhook).be.a.Object();
          should(webhook).have.property('name').which.is.String().equal(webhookData.name);
          should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
          should(webhook).have.property('description').which.is.String().equal(webhookData.description);
          should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
          return webhook;
        })
        .then(() => {
          return Webhook
            .please()
            .delete(webhookData)
            .request();
        });
    });

    it('should be able to get or create a webhook (CREATE)', function() {
      return Webhook.please().getOrCreate(webhookData, {description: 'aa test'}).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal('aa test');
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
      });
    });

    it('should be able to get or create a webhook (GET)', function() {
      return Webhook.please().create(webhookData).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);

        return Webhook.please().getOrCreate(webhookData, {description: 'newTest'});
      })
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
      });
    });

    it('should be able to update a webhook', function() {
      return Webhook.please().create(webhookData).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);

        return Webhook.please().update(webhookData, {description: 'newTest'});
      })
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal('newTest');
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
      });
    });

    it('should be able to update or create webhook (UPDATE)', function() {
      return Webhook.please().create(webhookData).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);

        return Webhook.please().updateOrCreate(webhookData, {description: 'newTest'});
      })
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal('newTest');
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
      });
    });

    it('should be able to update or create webhook (CREATE)', function() {
      const defaults = {description: 'createTest'};

      return Webhook.please().updateOrCreate(webhookData, webhookData, defaults).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(defaults.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
      });
    });

    it('should be able to get first webhook (SUCCESS)', function() {
      const names = [
        `${webhookName}_1`,
        `${webhookName}_2`
      ];

      return Promise
        .mapSeries(names, (name) => Webhook.please().create({name, instanceName, script: codeBoxId}))
        .then(() => {
          return Webhook.please().first(webhookData);
        })
        .then((webhook) => {
          should(webhook).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const names = [
        `${webhookName}_1`,
        `${webhookName}_2`
      ];

      return Promise
        .mapSeries(names, (name) => Webhook.please().create({name, instanceName, script: codeBoxId}))
        .then((webhooks) => {
          should(webhooks).be.an.Array().with.length(2);
          return Webhook.please(webhookData).pageSize(1);
        })
        .then((webhooks) => {
          should(webhooks).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const names = [
        `${webhookName}_1`,
        `${webhookName}_2`
      ];
      let asc = null;

      return Promise
        .mapSeries(names, (name) => Webhook.please().create({name, instanceName, script: codeBoxId}))
        .then((webhooks) => {
          should(webhooks).be.an.Array().with.length(2);
          return Webhook.please(webhookData).ordering('asc');
        })
        .then((webhooks) => {
          should(webhooks).be.an.Array().with.length(2);
          asc = webhooks;
          return Webhook.please(webhookData).ordering('desc');
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
      return Webhook.please().list(webhookData).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

    it('should be able to run codebox', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();

        return Webhook.please().run(webhook);
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to run *public* codebox', function() {
    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();

        return Webhook.please().runPublic(webhook);
      }).then((trace) => {
        should(trace).be.a.Object();
        should(trace).have.property('id').which.is.Number();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('status').which.is.String();
        should(trace).have.property('duration').which.is.Number();
        should(trace).have.property('result').which.is.Object();
        should(trace).have.property('executed_at').which.is.Date();
      });
  });

  it('should be able to reset', function() {
    let publicLink = null;

    return Webhook(webhookData).save()
      .then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('script').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();
        should(webhook).have.property('public_link').which.is.String();

        publicLink = webhook.public_link;
        return Webhook.please().reset(webhookData);
      }).then((webhook) => {
        should(webhook).be.a.Object();
        should(webhook).have.property('name').which.is.String().equal(webhookData.name);
        should(webhook).have.property('instanceName').which.is.String().equal(webhookData.instanceName);
        should(webhook).have.property('description').which.is.String().equal(webhookData.description);
        should(webhook).have.property('codebox').which.is.Number().equal(webhookData.script);
        should(webhook).have.property('links').which.is.Object();
        should(webhook).have.property('public_link').which.is.String().not.equal(publicLink);
      });
  });

  });

});
