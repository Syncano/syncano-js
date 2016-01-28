import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';


describe('Channel', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Channel = null;
  let Instance = null;
  const instanceName = suffix.get('instance');
  const channelName = suffix.get('channel');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Channel = connection.Channel;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Channel().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Channel({name: channelName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should be able to save via model instance', function() {
    const data = {
      name: channelName,
      instanceName: instanceName,
      description: 'test'
    };

    return Channel(data).save()
      .then(cleaner.mark)
      .then((chn) => {
        should(chn).be.a.Object();
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('description').which.is.String().equal(data.description);
        should(chn).have.property('type').which.is.String().equal('default');
        should(chn).have.property('created_at').which.is.String();
        should(chn).have.property('updated_at').which.is.String();
        should(chn).have.property('links').which.is.Object();
        should(chn).have.property('group').which.is.Null()
        should(chn).have.property('group_permissions').which.is.String().equal('none');
        should(chn).have.property('other_permissions').which.is.String().equal('none');
        should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
      });
  });

  it('should be able to update via model instance', function() {
    const data = {
      name: channelName,
      instanceName: instanceName,
      description: 'test'
    };

    return Channel(data).save()
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
    const data = {
      name: channelName,
      instanceName: instanceName,
      description: 'test'
    };

    return Channel(data).save()
      .then((chn) => {
        should(chn).have.property('name').which.is.String().equal(data.name);
        should(chn).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(chn).have.property('description').which.is.String().equal(data.description);

        return chn.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list channels', function() {
      return Channel.please().list({instanceName}).then((channels) => {
        should(channels).be.an.Array();
      });
    });

    it('should be able to create a channel', function() {
      return Channel.please().create({name: channelName, instanceName})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.String();
          should(chn).have.property('updated_at').which.is.String();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to get a channel', function() {
      return Channel.please().create({name: channelName, instanceName})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);

          return chn;
        })
        .then(() => {
          return Channel
            .please()
            .get({name: channelName, instanceName})
            .request();
        })
        .then((chn) => {
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.String();
          should(chn).have.property('updated_at').which.is.String();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to delete a channel', function() {
      return Channel.please().create({name: channelName, instanceName})
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          return chn;
        })
        .then(() => {
          return Channel
            .please()
            .delete({name: channelName, instanceName})
            .request();
        });
    });

    it('should be able to get or create a channel (CREATE)', function() {
      return Channel.please().getOrCreate({name: channelName, instanceName}, {description: 'test'})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.String();
          should(chn).have.property('updated_at').which.is.String();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to get or create a channel (GET)', function() {
      return Channel.please().create({name: channelName, instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');

          return Channel.please().getOrCreate({name: channelName, instanceName}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn.description).which.is.String().equal('test');
        });
    });

    it('should be able to update a channel', function() {
      return Channel.please().create({name: channelName, description: 'test', instanceName})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');

          return Channel.please().update({name: channelName, instanceName}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn.description).which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create channel (UPDATE)', function() {
      return Channel.please().create({name: channelName, instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('test');

          return Channel.please().updateOrCreate({name: channelName, instanceName}, {description: 'newTest'});
        })
        .then((chn) => {
          should(chn).be.an.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to update or create channel (CREATE)', function() {
      let properties = {name: channelName, instanceName};
      let object = {description: 'updateTest'};
      let defaults = {
          description: 'createTest'
      };

      return Channel.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((chn) => {
          should(chn).be.a.Object();
          should(chn).have.property('name').which.is.String().equal(channelName);
          should(chn).have.property('instanceName').which.is.String().equal(instanceName);
          should(chn).have.property('description').which.is.String().equal('createTest');
          should(chn).have.property('type').which.is.String().equal('default');
          should(chn).have.property('created_at').which.is.String();
          should(chn).have.property('updated_at').which.is.String();
          should(chn).have.property('links').which.is.Object();
          should(chn).have.property('group').which.is.Null()
          should(chn).have.property('group_permissions').which.is.String().equal('none');
          should(chn).have.property('other_permissions').which.is.String().equal('none');
          should(chn).have.property('custom_publish').which.is.Boolean().equal(false);
        });
    });

    it('should be able to get first channel (SUCCESS)', function() {
      const names = [
        `${channelName}_1`,
        `${channelName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Channel.please().create({name, instanceName})))
        .then(cleaner.mark)
        .then(() => {
          return Channel.please().first({instanceName});
        })
        .then((chn) => {
          should(chn).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const names = [
        `${channelName}_1`,
        `${channelName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Channel.please().create({name, instanceName})))
        .then(cleaner.mark)
        .then((chns) => {
          should(chns).be.an.Array().with.length(2);
          return Channel.please({instanceName}).pageSize(1);
        })
        .then((chns) => {
          should(chns).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const names = [
        `${channelName}_1`,
        `${channelName}_2`
      ];
      let asc = null;

      return Promise
        .all(_.map(names, (name) => Channel.please().create({name, instanceName})))
        .then(cleaner.mark)
        .then((chns) => {
          should(chns).be.an.Array().with.length(2);
          return Channel.please({instanceName}).ordering('asc');
        })
        .then((chns) => {
          should(chns).be.an.Array().with.length(2);
          asc = chns;
          return Channel.please({instanceName}).ordering('desc');
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
      return Channel.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });
});
