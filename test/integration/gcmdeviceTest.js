import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner, hex} from './utils';

describe('GCMDevice', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('GCMDevice');
  const registrationId = hex.getRandom(64);
  const deviceLabel = suffix.get('gcm');
  const devId = '10000000001';
  const data = {
    instanceName,
    registration_id: registrationId,
    label: deviceLabel,
    device_id: devId
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.GCMDevice;

    objects = [
      Model({instanceName, registration_id: `${registrationId}1`, label: deviceLabel, device_id: devId}),
      Model({instanceName, registration_id: `${registrationId}2`, label: deviceLabel, device_id: devId})
    ];

    return Instance.please().create({name: instanceName});
  });

  beforeEach(function() {
    data.registration_id = hex.getRandom(64);
  })

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
    should(Model({registration_id: registrationId}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "registration_id"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/registration_id/);
  });

  it('should validate "registration_id"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: 1337}).save()).be.rejectedWith(/registration_id/);
  });

  it('should validate "device_id"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: registrationId, device_id: 1337}).save()).be.rejectedWith(/device_id/);
  });

  it('should validate "user"', function() {
    should(Model({label: deviceLabel, instanceName, user: 'user', registration_id: registrationId, device_id: devId}).save()).be.rejectedWith(/user/);
  });

  it('should validate "metadata"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: registrationId, device_id: devId, metadata: 'metadata'}).save()).be.rejectedWith(/metadata/);
  });

  it('should validate "is_active"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: registrationId, device_id: devId , is_active: 'no'}).save()).be.rejectedWith(/is_active/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();

        return object.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list(data).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {
      return Model.please().create(data)
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
      });
    });

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(data),
        Model(_.assign({}, data, {registration_id: `${registrationId}1`}))
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
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('metadata').which.is.Object();
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();

          return object;
        })
        .then(() => {
          return Model
            .please()
            .get(data)
            .request();
        })
        .then(([object, response]) => {
          should(response).be.an.Object();
          should(object).be.a.Object();
          should(object).have.property('label').which.is.String().equal(data.label);
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(object).have.property('links').which.is.Object();
          should(object).have.property('metadata').which.is.Object();
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().getOrCreate(data, {label: 'test2'})
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal('test2');
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(object).have.property('links').which.is.Object();
        should(object).have.property('metadata').which.is.Object();
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
      });
    });

    it('should be able to get or create an object (GET)', function() {
      return Model.please().create(data)
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);

        return Model.please().getOrCreate(data, {label: 'newTest'});
      })
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('label').which.is.String().equal(data.label);
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('registration_id').which.is.String().equal(data.registration_id);
      });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((gcm) => {
          should(gcm).be.an.Object();
          should(gcm).have.property('instanceName').which.is.String().equal(instanceName);
          should(gcm).have.property('label').which.is.String().equal(data.label);
          should(gcm).have.property('registration_id').which.is.String().equal(data.registration_id);

        return Model.please().update({registration_id: data.registration_id, instanceName}, {label: 'new label'});
      })
      .then((gcm) => {
        should(gcm).be.an.Object();
        should(gcm).have.property('instanceName').which.is.String().equal(instanceName);
        should(gcm).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(gcm.label).which.is.String().equal('new label');
      });
    });

    it('should be able to update or create a Model (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((gcm) => {
          should(gcm).be.an.Object();
          should(gcm).have.property('instanceName').which.is.String().equal(instanceName);
          should(gcm).have.property('label').which.is.String().equal(data.label);
          should(gcm).have.property('registration_id').which.is.String().equal(data.registration_id);

        return Model.please().updateOrCreate(data, {label: 'new label'});
      })
      .then((gcm) => {
        should(gcm).be.an.Object();
        should(gcm).have.property('instanceName').which.is.String().equal(instanceName);
        should(gcm).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(gcm.label).which.is.String().equal('new label');
      });
    });

    it('should be able to update or create a Model (CREATE)', function() {
      const properties = {registration_id: registrationId, instanceName};
      const object = {label: 'new label'};
      const defaults = {
          label: 'label',
          registration_id: registrationId
      };

      return Model.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((gcm) => {
          should(gcm).be.an.Object();
          should(gcm).have.property('instanceName').which.is.String().equal(instanceName);
          should(gcm).have.property('registration_id').which.is.String().equal(defaults.registration_id);
          should(gcm.label).which.is.String().equal(defaults.label);
        });
      });

    it('should be able to get first Model (SUCCESS)', function() {
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
          const ascIds = _.map(asc, 'registration_id');
          const descIds = _.map(desc, 'registration_id');
          descIds.reverse();

          should(desc).be.an.Array().with.length(2);

          _.forEach(ascIds, (ascId, index) => {
            should(ascId).be.equal(descIds[index]);
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

    it('should be able to send message directly from device', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then(() => {
          return connection.GCMConfig.please().update({instanceName}, {
            development_api_key: suffix.get('key')
          })
        })
        .then(() => {
          return Model.please().sendMessage({registration_id: data.registration_id, instanceName}, {environment: 'development'});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();
          should(object.content).have.property('environment').which.is.String();
          should(object.content).have.property('registration_ids').which.is.Array();
        });
    });

    it('should be able to send messages directly from device', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then(() => {
          return connection.GCMConfig.please().update({instanceName}, {
            development_api_key: suffix.get('key')
          })
        })
        .then(() => {
          return Model.please().sendMessages({instanceName}, {environment: 'development', registration_ids: [data.registration_id]}).request();
        })
    });
  });
});
