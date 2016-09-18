import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('ApiKey', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let Model = null;
  let objects = null;
  let descriptions = null;
  const instanceName = suffix.getHyphened('ApiKey');
  const description = suffix.get('description');
  const data = {
    instanceName: instanceName,
    description: description
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.ApiKey;
    descriptions = [
      Model({description: 'description_1', instanceName }),
      Model({description: 'description_2', instanceName })
    ];
    objects = [
      Model(data),
      Model(data)
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
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "description"', function() {
    should(Model({instanceName, description: 123}).save()).be.rejectedWith(/description/);
  });

  it('should validate "ignore_acl"', function() {
    should(Model({instanceName, ignore_acl: 123}).save()).be.rejectedWith(/ignore_acl/);
  });

  it('should validate "allow_user_create"', function() {
    should(Model({instanceName, allow_user_create: 123}).save()).be.rejectedWith(/allow_user_create/);
  });

  it('should validate "allow_anonymous_read"', function() {
    should(Model({instanceName, allow_anonymous_read: 123}).save()).be.rejectedWith(/allow_anonymous_read/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((apk) => {
        should(apk).be.an.Object();
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);
        should(apk).have.property('created_at').which.is.Date();
        should(apk).have.property('links').which.is.Object();
        should(apk).have.property('id').which.is.Number();
        should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
        should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
        should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);
        should(apk).have.property('api_key').which.is.String();
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((apk) => {
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);
        should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
        should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
        should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);

        apk.description = 'new description';
        apk.ignore_acl = true;
        apk.allow_anonymous_read = true;
        apk.allow_user_create = true;
        return apk.save();
      })
      .then((apk) => {
        should(apk).have.property('description').which.is.String().equal('new description');
        should(apk).have.property('ignore_acl').which.is.Boolean().equal(true);
        should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(true);
        should(apk).have.property('allow_user_create').which.is.Boolean().equal(true);
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((apk) => {
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);

        return apk.delete();
      });
  });

  it('should be able to reset key via model instance', function() {
    let apiKey, keyId;
    return Model(data).save()
      .then(cleaner.mark)
      .then((apk) => {
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);

        apiKey = apk.api_key;
        keyId = apk.id;

        return apk.reset();
      })
      .then((apk) => {
        should(apk.id).be.equal(keyId);
        should(apk.key_id).not.equal(apiKey);
      });
  });

  describe('#please()', function() {

    it('should be able to list api keys', function() {
      return Model.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to create an api key', function() {
      return Model.please().create({instanceName})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String();
          should(apk).have.property('created_at').which.is.Date();
          should(apk).have.property('links').which.is.Object();
          should(apk).have.property('id').which.is.Number();
          should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
          should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
          should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);
          should(apk).have.property('api_key').which.is.String();
        });
    });

    it('should be able to bulk create a api keys', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get an api key', function() {
      let keyId = null;

      return Model.please().create({instanceName})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          keyId = apk.id;

          return apk;
        })
        .then(() => {
          return Model
            .please()
            .get({id: keyId, instanceName})
            .request();
        })
        .then(([apk, response]) => {
          should(response).be.an.Object();
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String();
          should(apk).have.property('created_at').which.is.Date();
          should(apk).have.property('links').which.is.Object();
          should(apk).have.property('id').which.is.Number();
          should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
          should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
          should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);
          should(apk).have.property('api_key').which.is.String();
        });
    });

    it('should be able to delete an api key', function() {
      let keyId = null;

      return Model.please().create({instanceName})
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          keyId = apk.id;
          return apk;
        })
        .then(() => {
          return Model
            .please()
            .delete({id: keyId, instanceName})
            .request();
        });
    });

    it('should be able to update an api key', function() {
      return Model.please().create({instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String().equal('test');

          return Model.please().update({id: apk.id, instanceName}, {description: 'newTest'});
        })
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to reset an api key', function() {
      let apiKey, keyId;
      return Model.please().create({instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String().equal('test');

          apiKey = apk.api_key;
          keyId = apk.id;

          return Model.please().reset({id: apk.id, instanceName});
        })
        .then((apk) => {
          should(apk.id).be.equal(keyId);
          should(apk.key_id).not.equal(apiKey);
        });
    });

    it('should be able to get first api key', function() {
      return Model.please().bulkCreate(descriptions)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((apk) => {
          should(apk).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(descriptions)
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

      return Model.please().bulkCreate(descriptions)
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
      return Model.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
