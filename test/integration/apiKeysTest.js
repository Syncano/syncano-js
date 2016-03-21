import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('ApiKey', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let ApiKey = null;
  const instanceName = suffix.get('ApiKey');
  const description = suffix.get('description');
  const data = {
    instanceName: instanceName,
    description: description
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    ApiKey = connection.ApiKey;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(ApiKey().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(ApiKey({}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "description"', function() {
    should(ApiKey({instanceName, description: 123}).save()).be.rejectedWith(/description/);
  });

  it('should validate "ignore_acl"', function() {
    should(ApiKey({instanceName, ignore_acl: 123}).save()).be.rejectedWith(/ignore_acl/);
  });

  it('should validate "allow_user_create"', function() {
    should(ApiKey({instanceName, allow_user_create: 123}).save()).be.rejectedWith(/allow_user_create/);
  });

  it('should validate "allow_anonymous_read"', function() {
    should(ApiKey({instanceName, allow_anonymous_read: 123}).save()).be.rejectedWith(/allow_anonymous_read/);
  });

  it('should be able to save via model instance', function() {
    return ApiKey(data).save()
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
    return ApiKey(data).save()
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
    return ApiKey(data).save()
      .then((apk) => {
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);

        return apk.delete();
      });
  });

  it('should be able to reset key via model instance', function() {
    let apiKey, keyId;
    return ApiKey(data).save()
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
      return ApiKey.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to create an api key', function() {
      return ApiKey.please().create({instanceName})
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
      const objects = [
        ApiKey(data),
        ApiKey(data)
      ];

      return ApiKey.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get an api key', function() {
      let keyId = null;

      return ApiKey.please().create({instanceName})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          keyId = apk.id;

          return apk;
        })
        .then(() => {
          return ApiKey
            .please()
            .get({id: keyId, instanceName})
            .request();
        })
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

    it('should be able to delete an api key', function() {
      let keyId = null;

      return ApiKey.please().create({instanceName})
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          keyId = apk.id;
          return apk;
        })
        .then(() => {
          return ApiKey
            .please()
            .delete({id: keyId, instanceName})
            .request();
        });
    });

    it('should be able to update an api key', function() {
      return ApiKey.please().create({instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String().equal('test');

          return ApiKey.please().update({id: apk.id, instanceName}, {description: 'newTest'});
        })
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String().equal('newTest');
        });
    });

    it('should be able to reset an api key', function() {
      let apiKey, keyId;
      return ApiKey.please().create({instanceName, description: 'test'})
        .then(cleaner.mark)
        .then((apk) => {
          should(apk).be.an.Object();
          should(apk).have.property('instanceName').which.is.String().equal(instanceName);
          should(apk).have.property('description').which.is.String().equal('test');

          apiKey = apk.api_key;
          keyId = apk.id;

          return ApiKey.please().reset({id: apk.id, instanceName});
        })
        .then((apk) => {
          should(apk.id).be.equal(keyId);
          should(apk.key_id).not.equal(apiKey);
        });
    });

    it('should be able to get first api key', function() {
      const descriptions = [
        'description_1',
        'description_2'
      ];

      return Promise
        .mapSeries(descriptions, (desc) => ApiKey.please().create({description: desc, instanceName}))
        .then(cleaner.mark)
        .then(() => {
          return ApiKey.please().first({instanceName});
        })
        .then((apk) => {
          should(apk).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const descriptions = [
        'description_1',
        'description_2'
      ];

      return Promise
        .mapSeries(descriptions, (desc) => ApiKey.please().create({description: desc, instanceName}))
        .then(cleaner.mark)
        .then((keys) => {
            should(keys).be.an.Array().with.length(2);
            return ApiKey.please({instanceName}).pageSize(1);
        })
        .then((keys) => {
          should(keys).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const descriptions = [
        'description_1',
        'description_2'
      ];
      let asc = null;

      return Promise
        .mapSeries(descriptions, (desc) => ApiKey.please().create({description: desc, instanceName}))
        .then(cleaner.mark)
        .then((keys) => {
          should(keys).be.an.Array().with.length(2);
          return ApiKey.please({instanceName}).ordering('asc');
        })
        .then((keys) => {
          should(keys).be.an.Array().with.length(2);
          asc = keys;
          return ApiKey.please({instanceName}).ordering('desc');
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
      return ApiKey.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
