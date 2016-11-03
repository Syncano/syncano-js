import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';


describe('User', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('User');
  const data = {
    instanceName,
    password: 'y5k8Y4&-'
  };
  const data2 = {
    instanceName,
    password: 'x5Z2f8*='
  };
  let objects = null;

  beforeEach(function() {
    data.username = suffix.get('user');
    data2.username = suffix.get('user');
    objects = [
      Model(data),
      Model(data2)
    ];
  });

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.User;

    return Instance.please().create({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({username: data.username, password: data.password}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "username"', function() {
    should(Model({instanceName, password: data.password}).save()).be.rejectedWith(/username/);
  });

  it('should validate "username"', function() {
    should(Model({username: 1337, instanceName}).save()).be.rejectedWith(/username/);
  });

  it('should require "password"', function() {
    should(Model({username: data.username, instanceName}).save()).be.rejectedWith(/password/);
  });

  it('should validate "password"', function() {
    should(Model({username: data.username, instanceName, password: 1337}).save()).be.rejectedWith(/password/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('groups').which.is.Array();
        should(object).have.property('username').which.is.String().equal(data.username);
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('groups').which.is.Array();
        should(object).have.property('username').which.is.String().equal(data.username);

        return object.delete();
      });
  });

  it('should be able to reset key via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('groups').which.is.Array();
        should(object).have.property('username').which.is.String().equal(data.username);

        return object.resetKey();
      });
  });

  it('should be able to get groups via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((user) => {
        return user.getGroups();
      })
      .then((groups) => {
        should(groups).be.an.Array();
      })
  });

  it.skip('should be able to add group via model instance', function() {
    let groupId = null;

    return connection.Group({ instanceName, label: 'group-label', description: 'group-desc'}).save()
      .then(cleaner.mark)
      .then((group) => {
        groupId = group.id;
        return Model(data).save()
      })
      .then(cleaner.mark)
      .then((user) => {
        return user.addGroup({ group: groupId });
      })
      .then((group) => {
        should(group).be.an.Object();
        should(group).have.property('id').which.is.Number().equal(groupId);
        should(group).have.property('user').which.is.Number();
        should(group).have.property('instanceName').which.is.String().equal(instanceName);
        should(group).have.property('description').which.is.String().equal('group-desc');
        should(group).have.property('label').which.is.String().equal('group-label');
      });
  });

  it.skip('should be able to get group via model instance', function() {
    let groupId = null;
    let tempUser = null;

    return connection.Group({ instanceName, label: 'group-label', description: 'group-desc'}).save()
      .then(cleaner.mark)
      .then((group) => {
        groupId = group.id;
        return Model(data).save()
      })
      .then(cleaner.mark)
      .then((user) => {
        tempUser = user;
        return tempUser.addGroup({ group: groupId });
      })
      .then(() => {
        return tempUser.getGroup({ id: groupId})
      })
      .then(() => {
        return tempUser.getGroups()
      })
      .then((groups) => {
        should(groups).be.an.Array().with.length(1);
      })
  });

  it.skip('should be able to delete group via model instance', function() {
    let groupId = null;
    let tempUser = null;

    return connection.Group({ instanceName, label: 'group-label', description: 'group-desc'}).save()
      .then(cleaner.mark)
      .then((group) => {
        groupId = group.id;
        return Model(data).save()
      })
      .then(cleaner.mark)
      .then((user) => {
        tempUser = user;
        return tempUser.addGroup({ group: groupId });
      })
      .then(() => {
        return tempUser.getGroups()
      })
      .then((groups) => {
        should(groups).be.an.Array().with.length(1);
        return tempUser.deleteGroup({ id: groupId });
      })
      .then(() => {
        return tempUser.getGroups()
      })
      .then((groups) => {
        should(groups).be.an.Array().with.length(0);
      })
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list({instanceName}).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to list objects as template', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().list({instanceName}).templateResponse('objects_html_table').then((response) => {
            should(response).be.html;
          });
        })
    });

    it('should be able to create an object', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);
        });
    });

    it('should be able to update an object', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();

          return Model.please().update({id: object.id, instanceName}, {username: 'dummyTest'});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('username').which.is.String().equal('dummyTest');
        })
    });

    it('should be able to delete an object', function() {
      return Model(data).save()
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

          return Model.please().delete({id: object.id, instanceName});
        });
    });

    it.skip('should be able to update an object (userKey & apiKey)', function() {
      let accountKey = null;
      let apiKey = null;

      return connection.ApiKey.please().create({instanceName})
        .then((key) => {
          apiKey = key.api_key;
          return Model.please().create(data);
        })
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();

          accountKey = connection.getAccountKey();
          connection.setUserKey(object.user_key);
          connection.setApiKey(apiKey);
          connection.setAccountKey(null);

          return Model.please().update({id: object.id, instanceName}, {username: 'dummyTest'});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('username').which.is.String().equal('dummyTest');

          connection.setUserKey(null);
          connection.setApiKey(null);
          connection.setAccountKey(accountKey);
        });
    });

    it('should be able to reset key in object', function() {

      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

          return Model.please().resetKey(_.assign({id: object.id}, data));
        });
    });

    it('should be able to login', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

          return Model.please().login(data, data);
        });
    });

    it('should be able get currently logged in user details', function() {
      return connection.ApiKey.please().create({instanceName, allow_user_create: true})
        .then(cleaner.mark)
        .then((apiKey) => {
          connection.setAccountKey('');
          connection.setApiKey(apiKey.api_key);

          return Model.please().create(data);
        })
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

          return Model.please().login(data, data);
        })
        .then(() => {
          return Model.please().get({instanceName});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

          connection.setAccountKey(credentials.accountKey);
          connection.setApiKey('');
        });
    });

    xit('should be able to do a social login', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

          return Model.please().socialLogin({instanceName, backend: 'facebbok'}, {access_token: '123'});
        });
    });

    it('should be able to get schema', function() {
      return Model.please().getSchema({instanceName})
        .then((schema) => {
          should(schema).be.an.Object();
          should(schema).have.property('schema').which.is.Array();
        })
    });

    it('should be able to update schema', function() {
      return Model.please().updateSchema({instanceName}, [{ name: 'age', type: 'integer'}])
        .then(() => {
          return Model.please().getSchema({instanceName})
        })
        .then((schema) => {
          should(schema).be.an.Object();
          should(schema).have.property('schema').which.is.Array().with.length(1);
          should(schema.schema[0]).have.property('type').which.is.String().equal('integer');
          should(schema.schema[0]).have.property('name').which.is.String().equal('age');
        })
    });

    it.skip('should be able to get groups', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((object) => {
          return Model.please().getGroups({ instanceName, user: object.id})
        })
        .then((groups) => {
          should(groups).be.an.Array();
        })
    });

    it.skip('should be able to add group', function() {
      let groupId = null;
      let userId = null;

      return connection.Group.please().create({ instanceName, label: 'group-label', description: 'group-desc'})
        .then(cleaner.mark)
        .then((group) => {
          groupId = group.id;
          return Model.please().create(data)
        })
        .then(cleaner.mark)
        .then((object) => {
          userId = object.id;
          return Model.please().addGroup({ instanceName, user: userId}, {group: groupId})
        })
        .then(() => {
          return Model.please().getGroups({ instanceName, user: userId})
        })
        .then((groups) => {
          should(groups).be.an.Array().with.length(1);
        })
    });

    it.skip('should be able to delete group', function() {
      let groupId = null;
      let userId = null;

      return connection.Group.please().create({ instanceName, label: 'group-label', description: 'group-desc'})
      .then(cleaner.mark)
      .then((group) => {
        groupId = group.id;
        return Model.please().create(data)
      })
      .then(cleaner.mark)
      .then((object) => {
        userId = object.id
        return Model.please().addGroup({ instanceName, user: userId}, {group: groupId})
      })
      .then(() => {
        return Model.please().getGroups({ instanceName, user: userId})
      })
      .then((groups) => {
        should(groups).be.an.Array().with.length(1);
        return Model.please().deleteGroup({ instanceName, user: userId}, {id: groupId})
      })
      .then(() => {
        return Model.please().getGroups({ instanceName, user: userId})
      })
      .then((groups) => {
        should(groups).be.an.Array().with.length(0);
      })
    });

    it.skip('should be able to get group', function() {
      let groupId = null;
      let tempUser = null;

      return connection.Group.please().create({ instanceName, label: 'group-label', description: 'group-desc'})
      .then(cleaner.mark)
      .then((group) => {
        groupId = group.id;
        return Model.please().create(data)
      })
      .then(cleaner.mark)
      .then((object) => {
        tempUser = object;
        return Model.please().addGroup({ instanceName, user: tempUser.id}, {group: groupId})
      })
      .then(() => {
        return Model.please().getGroup({ instanceName, user: tempUser.id, id: groupId})
      })
      .then((group) => {
        should(group).be.an.Object();
        should(group).have.property('id').which.is.Number().equal(groupId);
        should(group).have.property('instanceName').which.is.String().equal(instanceName);
        should(group).have.property('user').which.is.Number().equal(tempUser.id);
        should(group).have.property('description').which.is.String().equal('group-desc');
        should(group).have.property('label').which.is.String().equal('group-label');
      })
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
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);

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
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);
        });
    });

    it.skip('should be able to get an object (userKey & apiKey)', function() {
      let accountKey = null;
      let apiKey = null;

      return connection.ApiKey.please().create({instanceName})
        .then(cleaner.mark)
        .then((key) => {
          apiKey = key.api_key;
          return Model.please().create(data);
        })
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);
          should(object).have.property('user_key').which.is.String();

          accountKey = connection.getAccountKey();
          connection.setUserKey(object.user_key);
          connection.setApiKey(apiKey);
          connection.setAccountKey(null);

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
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('groups').which.is.Array();
          should(object).have.property('username').which.is.String().equal(data.username);
          should(object).have.property('user_key').which.is.String();

          connection.setUserKey(null);
          connection.setApiKey(null);
          connection.setAccountKey(accountKey);
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
