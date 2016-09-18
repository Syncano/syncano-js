import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, hex, createCleaner} from './utils';

describe('APNS Device', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('APNSDevice');
  const deviceLabel = suffix.get('apns');
  const devId = 'd8a46770-c20b-11e5-a837-0800200c9a66';
  const registrationId = hex.getRandom(64);
  const data = {
    label: deviceLabel,
    instanceName: instanceName,
    registration_id: registrationId,
    device_id: devId
  };
  const userData = {
    instanceName,
    username: 'testuser',
    password: 'y5k8Y4&-'
  };
  let objects = null;
  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.APNSDevice;

    objects = [
      Model({ registration_id: hex.getRandom(64), instanceName, label: deviceLabel, user: data.user, device_id: devId}),
      Model({ registration_id: hex.getRandom(64), instanceName, label: deviceLabel, user: data.user, device_id: devId})
    ];

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.User.please().create(userData).then((user) => {
        data.user = user.id;
      });
    })
  });

  beforeEach(function() {
    data.registration_id = hex.getRandom(64);
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
    should(Model({label: deviceLabel}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "registration_id"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user}).save()).be.rejectedWith(/registration_id/);
  });

  it('should validate "registration_id"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: 123}).save()).be.rejectedWith(/registration_id/);
  });

  it('should validate "device_id"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: registrationId, device_id: []}).save()).be.rejectedWith(/device_id/);
  });

  it('should validate "user"', function() {
    should(Model({label: deviceLabel, instanceName, user: 'user', registration_id: registrationId, device_id: devId}).save()).be.rejectedWith(/user/);
  });

  it('should validate "metadata"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: registrationId, device_id: devId, metadata: 'metadata'}).save()).be.rejectedWith(/metadata/);
  });

  it('should validate "is_active"', function() {
    should(Model({label: deviceLabel, instanceName, user: data.user, registration_id: registrationId, device_id: devId, metadata: {}, is_active: 'no'}).save()).be.rejectedWith(/is_active/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apns).have.property('label').which.is.String().equal(data.label);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(apns).have.property('user').which.is.Number().equal(data.user);
        should(apns).have.property('is_active').which.is.Boolean().equal(true);
        should(apns).have.property('created_at').which.is.Date();
        should(apns).have.property('updated_at').which.is.Date();
        should(apns).have.property('links').which.is.Object();
        should(apns).have.property('metadata').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {

    return Model(data).save()
      .then(cleaner.mark)
      .then((apns) => {
        should(apns).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apns).have.property('label').which.is.String().equal(data.label);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

        apns.label = 'new label';
        return apns.save();
      })
      .then((apns) => {
        should(apns).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apns).have.property('label').which.is.String().equal('new label');
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
      });
  });

  it('should be able to delete via model instance', function() {

    return Model(data).save()
      .then((apns) => {
        should(apns).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apns).have.property('label').which.is.String().equal(data.label);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

        return apns.delete();
      });
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list({instanceName}).then((devices) => {
        should(devices).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(apns).have.property('user').which.is.Number().equal(data.user);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.Date();
          should(apns).have.property('updated_at').which.is.Date();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(data),
        Model(_.assign({}, data, {registration_id: hex.getRandom(64)}))
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
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

          return apns;
        })
        .then(() => {
          return Model
            .please()
            .get({registration_id: data.registration_id, instanceName})
            .request();
        })
        .then(([apns, response]) => {
          should(response).be.an.Object();
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(apns).have.property('user').which.is.Number().equal(data.user);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.Date();
          should(apns).have.property('updated_at').which.is.Date();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.Object();
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(data)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

          return apns;
        })
        .then(() => {
          return Model
            .please()
            .delete({registration_id: data.registration_id, instanceName})
            .request();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(data.label);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
          should(apns).have.property('user').which.is.Number().equal(data.user);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.Date();
          should(apns).have.property('updated_at').which.is.Date();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.Object();
      });
    });

    it('should be able to get or create a Model (GET)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(data.label);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

          return Model.please().getOrCreate(data, {label: 'new label'});
      })
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(apns.label).which.is.String().equal(data.label);
      });
    });

    it('should be able to update a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

        return Model.please().update({registration_id: data.registration_id, instanceName}, {label: 'new label'});
      })
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(apns.label).which.is.String().equal('new label');
      });
    });

    it('should be able to update or create a Model (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(data.label);
          should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

        return Model.please().updateOrCreate(data, {label: 'new label'});
      })
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(apns.label).which.is.String().equal('new label');
      });
    });

    it('should be able to update or create a Model (CREATE)', function() {
      let properties = {registration_id: registrationId, instanceName};
      let object = {label: 'new label'};
      let defaults = {
          label: deviceLabel,
          user: data.user,
          registration_id: registrationId,
          device_id: devId
      };

      return Model.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(defaults.label);
          should(apns).have.property('registration_id').which.is.String().equal(properties.registration_id);
          should(apns).have.property('user').which.is.Number().equal(data.user);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.Date();
          should(apns).have.property('updated_at').which.is.Date();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.Object();
        });
      });

    it('should be able to get first Model (SUCCESS)', function() {

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((apns) => {
          should(apns).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((apns) => {
          should(apns).be.an.Array().with.length(2);
          return Model.please({instanceName}).pageSize(1);
        })
        .then((apns) => {
          should(apns).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      let asc = null;

      return Model.please().bulkCreate(objects)
      .then(cleaner.mark)
      .then((apns) => {
          should(apns).be.an.Array().with.length(2);
          return Model.please({instanceName}).ordering('asc');
        })
        .then((apns) => {
          should(apns).be.an.Array().with.length(2);
          asc = apns;
          return Model.please({instanceName}).ordering('desc');
        }).then((desc) => {
          const ascLabels = _.map(asc, 'label');
          const descLabels = _.map(desc, 'label');
          descLabels.reverse();

          should(desc).be.an.Array().with.length(2);

          _.forEach(ascLabels, (ascLabel, index) => {
            should(ascLabel).be.equal(descLabels[index]);
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

    it('should be able to send message directly from device', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then(() => {
          return connection.APNSConfig.please().update({instanceName}, {
            development_certificate: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12'),
            development_bundle_identifier: 'com.syncano.testAPNS'
          });
        })
        .then(() => {
          return Model
            .please()
            .sendMessage({registration_id: data.registration_id, instanceName}, {environment: 'development', aps: {alert: 'message'}});
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
        });
    });

    it('should be able to send messages directly from device', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then(() => {
          return connection.APNSConfig.please().update({instanceName}, {
            development_certificate: Syncano.file(__dirname + '/certificates/ApplePushDevelopment.p12'),
            development_bundle_identifier: 'com.syncano.testAPNS'
          });
        })
        .then(() => {
          return Model
            .please()
            .sendMessages({instanceName}, {environment: 'development', aps: {alert: 'message'}, registration_ids: [data.registration_id]}).request();
        })
    });
  });
});
