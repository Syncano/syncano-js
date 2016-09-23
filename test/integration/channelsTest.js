import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';


describe('Channel', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  let Class = null;
  let dataObject = null;
  const instanceName = suffix.getHyphened('Channel');
  const channelName = suffix.get('channel');
  const className = suffix.get('class');
  const data = {
    name: channelName,
    instanceName: instanceName,
    description: 'test'
  };
  const classData = {
    name: className,
    instanceName: instanceName
  };
  const objectData = {
    className: className,
    instanceName: instanceName,
    channel: channelName
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Channel;
    Class = connection.Class;
    dataObject = connection.DataObject;
    objects = [
      Model({name: `${channelName}_1`, instanceName}),
      Model({name: `${channelName}_2`, instanceName})
    ];

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
    should(Model({name: channelName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "name"', function() {
    should(Model({name: {}, instanceName}).save()).be.rejectedWith(/name/);
  });

  it('should validate "description"', function() {
    should(Model({name: {}, instanceName, description: 3}).save()).be.rejectedWith(/description/);
  });

  it('should validate "type"', function() {
    should(Model({name: {}, instanceName, type: 'some_type'}).save()).be.rejectedWith(/type/);
  });

  it('should validate "group"', function() {
    should(Model({name: {}, instanceName, group: 'some_group'}).save()).be.rejectedWith(/group/);
  });

  it('should validate "group_permissions"', function() {
    should(Model({name: {}, instanceName, group_permissions: 'dunno'}).save()).be.rejectedWith(/group_permissions/);
  });

  it('should validate "other_permissions"', function() {
    should(Model({name: {}, instanceName, other_permissions: 'dunno'}).save()).be.rejectedWith(/other_permissions/);
  });

  it('should validate "custom_publish"', function() {
    should(Model({name: {}, instanceName, custom_publish: 'maybe'}).save()).be.rejectedWith(/custom_publish/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((chn) => {
        should(chn).be.a.Object();
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('description').which.is.String().equal(data.description);
        should(chn).have.property('type').which.is.String().equal('default');
        should(chn).have.property('created_at').which.is.Date();
        should(chn).have.property('updated_at').which.is.Date();
        should(chn).have.property('links').which.is.Object();
        should(chn).have.property('group').which.is.Null()
        should(chn).have.property('group_permissions').which.is.String().equal('none');
        should(chn).have.property('other_permissions').which.is.String().equal('none');
        should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
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

  it('should be able to start and stop polling a channel', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((chn) => {
        let poll = chn.poll();

        poll.on('start', function() {
          should(true).ok;
        });

        poll.on('stop', function() {
          should(true).ok;
        });

        poll.start();
        poll.stop();
      });
  });

  it('should be able to poll for messages', function() {
    return Model(Object.assign({}, data, { custom_publish: true })).save()
      .then(cleaner.mark)
      .then((chn) => {
        let poll = chn.poll();

        poll.on('custom', function(message) {
          should(message).have.property('author').which.is.Object();
          should(message).have.property('created_at').which.is.Date();
          should(message).have.property('id').which.is.Number().equal(1);
          should(message).have.property('action').which.is.String().equal('custom');
          should(message).have.property('payload').which.is.Object();
          should(message.payload).have.property('content').which.is.String().equal('message content');
          should(message).have.property('metadata').which.is.Object();
          should(message.metadata).have.property('type').which.is.String().equal('message');
        });

        return chn.publish({ content: 'message content' });
      });
  });

  it('should be able to poll for dataobject events', function() {
    let poll = null;

    return Model(data).save()
      .then(cleaner.mark)
      .then((chn) => {
          poll = chn.poll();

          poll.on('create', function(data) {
            should(data).have.property('author').which.is.Object();
            should(data).have.property('id').which.is.Number();
            should(data).have.property('action').which.is.String().equal('create');
            should(data).have.property('payload').which.is.Object();
            should(data).have.property('metadata').which.is.Object();
          });
          poll.on('update', function(data) {
            should(data).have.property('author').which.is.Object();
            should(data).have.property('id').which.is.Number();
            should(data).have.property('action').which.is.String().equal('update');
            should(data).have.property('payload').which.is.Object();
            should(data).have.property('metadata').which.is.Object();
          });
          poll.on('delete', function(data) {
            should(data).have.property('author').which.is.Object();
            should(data).have.property('id').which.is.Number();
            should(data).have.property('action').which.is.String().equal('delete');
            should(data).have.property('payload').which.is.Object();
            should(data).have.property('metadata').which.is.Object();
          });

          return dataObject(objectData).save()
        })
        .then((obj) => {
          obj.group_permissions = 'full';
          return obj.save();
        })
        .then((obj) => {
          return obj.delete();
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
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.Date();
          should(chn).have.property('updated_at').which.is.Date();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(data),
        Model(_.assign({}, data, {name: `${channelName}_1`}))
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);

          return chn;
        })
        .then(() => {
          return Model
            .please()
            .get({name: channelName, instanceName})
            .request();
        })
        .then(([chn, response]) => {
          should(response).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.Date();
          should(chn).have.property('updated_at').which.is.Date();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(data)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          return chn;
        })
        .then(() => {
          return Model
            .please()
            .delete({name: channelName, instanceName})
            .request();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().getOrCreate({name: channelName, instanceName}, {description: 'test'})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.Date();
          should(chn).have.property('updated_at').which.is.Date();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to get or create a Model (GET)', function() {
      return Model.please().create({name: channelName, instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');

          return Model.please().getOrCreate({name: channelName, instanceName}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn.description).which.is.String().equal('test');
        });
    });

    it('should be able to start and stop polling a channel', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((chn) => {
          const poll = Model.please().poll(chn);

          poll.on('start', function() {
            should(true).ok;
          });

          poll.on('stop', function() {
            should(true).ok;
          });

          poll.start();
          poll.stop();
        });
    });

    it('should be able to poll for messages', function() {
      return Model(Object.assign({}, data, { custom_publish: true })).save()
        .then(cleaner.mark)
        .then((chn) => {
          const poll = Model.please().poll({instanceName, name: chn.name});

          poll.on('custom', function(message) {
            should(message).have.property('author').which.is.Object();
            should(message).have.property('created_at').which.is.Date();
            should(message).have.property('id').which.is.Number().equal(1);
            should(message).have.property('action').which.is.String().equal('custom');
            should(message).have.property('payload').which.is.Object();
            should(message.payload).have.property('content').which.is.String().equal('message content');
            should(message).have.property('metadata').which.is.Object();
            should(message.metadata).have.property('type').which.is.String().equal('message');
          });

          Model.please().publish(chn, { content: 'message content' });

        });
    });

    it('should be able to poll for dataobject events', function() {
      return Model(data).save()
        .then(cleaner.mark)
        .then((chn) => {
            const poll = Model.please().poll(chn);

            poll.on('create', function(data) {
              should(data).have.property('author').which.is.Object();
              should(data).have.property('id').which.is.Number();
              should(data).have.property('action').which.is.String().equal('create');
              should(data).have.property('payload').which.is.Object();
              should(data).have.property('metadata').which.is.Object();
            });
            poll.on('update', function(data) {
              should(data).have.property('author').which.is.Object();
              should(data).have.property('id').which.is.Number();
              should(data).have.property('action').which.is.String().equal('update');
              should(data).have.property('payload').which.is.Object();
              should(data).have.property('metadata').which.is.Object();
            });
            poll.on('delete', function(data) {
              should(data).have.property('author').which.is.Object();
              should(data).have.property('id').which.is.Number();
              should(data).have.property('action').which.is.String().equal('delete');
              should(data).have.property('payload').which.is.Object();
              should(data).have.property('metadata').which.is.Object();
            });

            return dataObject(objectData).save()
          })
          .then((obj) => {
            obj.group_permissions = 'full';
            return obj.save();
          })
          .then((obj) => {
            return obj.delete();
          });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');

          return Model.please().update({name: channelName, instanceName}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn.description).which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create Model (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');

          return Model.please().updateOrCreate({name: channelName, instanceName}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create Model (CREATE)', function() {
      const properties = {name: channelName, instanceName};
      const object = {description: 'updateTest'};
      const defaults = {
          description: 'createTest'
      };

      return Model.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('createTest');
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.Date();
          should(chn).have.property('updated_at').which.is.Date();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to get first Model (SUCCESS)', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((chn) => {
          should(chn).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
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
      let asc = null;

      return Model.please().bulkCreate(objects)
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
