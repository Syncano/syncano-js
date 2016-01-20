import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';

describe('ApiKey', function() {
  this.timeout(15000);

  let connection = null;
  let Instance = null;
  let ApiKey = null;
  let ApiKeyId = null;
  const instanceName = suffix.get('instance');
  const apiKeyName = suffix.get('api_key');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    ApiKey = connection.ApiKey;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function(done) {
    return ApiKey.please().delete({
      instanceName: instanceName,
      id: ApiKeyId
    })
    .then(() => done())
    .catch(() => done());
  });

  it('should be validated', function() {
    should(ApiKey().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(ApiKey({name: apiKeyName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should be able to save via model instance', function() {
    const data = {
      instanceName: instanceName,
      description: 'test'
    };

    return ApiKey(data).save()
      .then((apk) => {
        should(apk).be.an.Object();
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);
        should(apk).have.property('created_at').which.is.String();
        should(apk).have.property('links').which.is.Object();
        should(apk).have.property('id').which.is.Number();
        should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
        should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
        should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);
        should(apk).have.property('api_key').which.is.String();
        ApiKeyId = apk.id;
      });
  });

  it('should be able to update via model instance', function() {
    const data = {
      instanceName: instanceName,
      description: suffix.get('description')
    };

    return ApiKey(data).save()
      .then((apk) => {
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);
        should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
        should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
        should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);

        ApiKeyId = apk.id;

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
    const data = {
      instanceName: instanceName,
      description: suffix.get('description')
    };

    return ApiKey(data).save()
      .then((apk) => {
        should(apk).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apk).have.property('description').which.is.String().equal(data.description);

        return apk.delete();
      });
  });

  describe('#please()', function() {

    afterEach(function() {
      return ApiKey
        .please()
        .list({instanceName})
        .then((keys) => {
          const ids = _.map(keys, 'id');
          return Promise.all(_.map(ids, (id) => ApiKey.please().delete({id, instanceName})));
        });
    });

    it('should be able to list api keys', function() {
      return ApiKey.please().list({instanceName}).then((keys) => {
        should(keys).be.an.Array();
      });
    });

    it('should be able to create an api key', function() {
      return ApiKey.please().create({instanceName}).then((apk) => {
        should(apk).be.an.Object();
        should(apk).have.property('instanceName').which.is.String().equal(instanceName);
        should(apk).have.property('description').which.is.String();
        should(apk).have.property('created_at').which.is.String();
        should(apk).have.property('links').which.is.Object();
        should(apk).have.property('id').which.is.Number();
        should(apk).have.property('ignore_acl').which.is.Boolean().equal(false);
        should(apk).have.property('allow_anonymous_read').which.is.Boolean().equal(false);
        should(apk).have.property('allow_user_create').which.is.Boolean().equal(false);
        should(apk).have.property('api_key').which.is.String();
      });
    });

    it('should be able to get an api key', function() {
      let keyId = null;

      return ApiKey.please().create({instanceName}).then((apk) => {
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
        should(apk).have.property('created_at').which.is.String();
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
      return ApiKey.please().create({instanceName, description: 'test'}).then((apk) => {
        should(apk).be.an.Object();
        should(apk).have.property('instanceName').which.is.String().equal(instanceName);
        should(apk).have.property('description').which.is.String().equal('test');

        return ApiKey.please().update({id: apk.id, instanceName}, {description: 'newTest'});
      })
      .then((apk) => {
        should(apk).be.an.Object();
        should(apk).have.property('instanceName').which.is.String().equal(instanceName);
        should(apk).have.property('description').which.is.String().equal('newTest');
      })
    });

    it('should be able to get first api key', function() {
      const descriptions = [
        'description_1',
        'description_2'
      ];

      return Promise
        .all(_.map(descriptions, (desc) => ApiKey.please().create({description: desc, instanceName})))
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
        .all(_.map(descriptions, (desc) => ApiKey.please().create({description: desc, instanceName})))
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
        .all(_.map(descriptions, (desc) => ApiKey.please().create({description: desc, instanceName})))
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
