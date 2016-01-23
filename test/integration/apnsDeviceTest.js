import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, hex} from './utils';

describe('APNS Device', function() {
  this.timeout(15000);

  let connection = null;
  let APNSDevice = null;
  let Instance = null;
  const instanceName = suffix.get('instance');
  let deviceLabel = suffix.get('apns');
  const userId = Math.floor(Math.random()*9);
  const devId = 'd8a46770-c20b-11e5-a837-0800200c9a66';

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    APNSDevice = connection.APNSDevice;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(APNSDevice().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(APNSDevice({label: deviceLabel}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "user_id"', function() {
    should(APNSDevice({label: deviceLabel, instanceName}).save()).be.rejectedWith(/user_id/);
  });

  it('should require "registration_id"', function() {
    should(APNSDevice({label: deviceLabel, instanceName, user_id: userId}).save()).be.rejectedWith(/registration_id/);
  });

  it('should require "device_id"', function() {
    should(APNSDevice({label: deviceLabel, instanceName, user_id: userId, registration_id: hex.getRandom(64)}).save()).be.rejectedWith(/device_id/);
  });

  it('should be able to save via model instance', function() {
    const data = {
      label: deviceLabel,
      instanceName: instanceName,
      user_id: userId,
      registration_id: hex.getRandom(64),
      device_id: devId
    };

    return APNSDevice(data).save()
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apns).have.property('label').which.is.String().equal(data.label);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);
        should(apns).have.property('user_id').which.is.Number().equal(data.user_id);
        should(apns).have.property('is_active').which.is.Boolean().equal(true);
        should(apns).have.property('created_at').which.is.String();
        should(apns).have.property('updated_at').which.is.String();
        should(apns).have.property('links').which.is.Object();
        should(apns).have.property('metadata').which.is.String();
      });
  });

  it('should be able to update via model instance', function() {
    const data = {
      label: deviceLabel,
      instanceName: instanceName,
      user_id: userId,
      registration_id: hex.getRandom(64),
      device_id: devId
    };

    return APNSDevice(data).save()
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
    const data = {
      label: deviceLabel,
      instanceName: instanceName,
      user_id: userId,
      registration_id: hex.getRandom(64),
      device_id: devId
    };

    return APNSDevice(data).save()
      .then((apns) => {
        should(apns).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(apns).have.property('label').which.is.String().equal(data.label);
        should(apns).have.property('registration_id').which.is.String().equal(data.registration_id);

        return apns.delete();
      });
  });

  describe('#please()', function() {

    afterEach(function() {
      return APNSDevice
        .please()
        .list({instanceName})
        .then((devices) => {
          const devcs = _.map(devices, 'registration_id');
          return Promise.all(_.map(devcs, (registration_id) => APNSDevice.please().delete({registration_id, instanceName})));
        });
    });

    it('should be able to list APNS devices', function() {
      return APNSDevice.please().list({instanceName}).then((devices) => {
        should(devices).be.an.Array();
      });
    });

    it('should be able to create an APNS device', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);
          should(apns).have.property('user_id').which.is.Number().equal(userId);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.String();
          should(apns).have.property('updated_at').which.is.String();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.String();
      });
    });

    it('should be able to get an APNS device', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);

          return apns;
        })
        .then(() => {
          return APNSDevice
            .please()
            .get({registration_id: regId, instanceName})
            .request();
        })
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);
          should(apns).have.property('user_id').which.is.Number().equal(userId);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.String();
          should(apns).have.property('updated_at').which.is.String();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.String();
        });
    });

    it('should be able to delete an APNS device', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);

          return apns;
        })
        .then(() => {
          return APNSDevice
            .please()
            .delete({registration_id: regId, instanceName})
            .request();
        });
    });

    it('should be able to get or create an APNS device (CREATE)', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);
          should(apns).have.property('user_id').which.is.Number().equal(userId);
          should(apns).have.property('is_active').which.is.Boolean().equal(true);
          should(apns).have.property('created_at').which.is.String();
          should(apns).have.property('updated_at').which.is.String();
          should(apns).have.property('links').which.is.Object();
          should(apns).have.property('metadata').which.is.String();
      });
    });

    it('should be able to get or create an APNS device (GET)', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: 'test', instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal('test');
          should(apns).have.property('registration_id').which.is.String().equal(regId);

          return APNSDevice.please().getOrCreate({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId}, {label: 'new label'});
      })
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('registration_id').which.is.String().equal(regId);
        should(apns.label).which.is.String().equal('test');
      });
    });

    it('should be able to update an APNS device', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);

        return APNSDevice.please().update({registration_id: regId, instanceName}, {label: 'new label'});
      })
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('registration_id').which.is.String().equal(regId);
        should(apns.label).which.is.String().equal('new label');
      });
    });

    it('should be able to update or create an APNS device (UPDATE)', function() {
      const regId = hex.getRandom(64);
      return APNSDevice.please().create({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId})
        .then((apns) => {
          should(apns).be.an.Object();
          should(apns).have.property('instanceName').which.is.String().equal(instanceName);
          should(apns).have.property('label').which.is.String().equal(deviceLabel);
          should(apns).have.property('registration_id').which.is.String().equal(regId);

        return APNSDevice.please().updateOrCreate({label: deviceLabel, instanceName, user_id: userId, registration_id: regId, device_id: devId}, {label: 'new label'});
      })
      .then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('registration_id').which.is.String().equal(regId);
        should(apns.label).which.is.String().equal('new label');
      });
    });

    it('should be able to update or create an APNS device (CREATE)', function() {
      const regId = hex.getRandom(64);
      let properties = {registration_id: regId, instanceName};
      let object = {label: 'new label'};
      let defaults = {
          label: deviceLabel,
          user_id: userId,
          registration_id: regId,
          device_id: devId
      };

      return APNSDevice.please().updateOrCreate(properties, object, defaults).then((apns) => {
        should(apns).be.an.Object();
        should(apns).have.property('instanceName').which.is.String().equal(instanceName);
        should(apns).have.property('label').which.is.String().equal(deviceLabel);
        should(apns).have.property('registration_id').which.is.String().equal(regId);
        should(apns).have.property('user_id').which.is.Number().equal(userId);
        should(apns).have.property('is_active').which.is.Boolean().equal(true);
        should(apns).have.property('created_at').which.is.String();
        should(apns).have.property('updated_at').which.is.String();
        should(apns).have.property('links').which.is.Object();
        should(apns).have.property('metadata').which.is.String();
      });
    });

    it('should be able to get first instance (SUCCESS)', function() {
      const regIds = [
        hex.getRandom(64),
        hex.getRandom(64)
      ];

      return Promise
        .all(_.map(regIds, (id) => APNSDevice.please().create({registration_id: id, instanceName, label: deviceLabel, user_id: userId, device_id: devId})))
        .then(() => {
          return APNSDevice.please().first({instanceName});
        })
        .then((apns) => {
          should(apns).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const regIds = [
        hex.getRandom(64),
        hex.getRandom(64)
      ];

      return Promise
        .all(_.map(regIds, (id) => APNSDevice.please().create({registration_id: id, instanceName, label: deviceLabel, user_id: userId, device_id: devId})))
        .then((apns) => {
          should(apns).be.an.Array().with.length(2);
          return APNSDevice.please({instanceName}).pageSize(1);
        })
        .then((apns) => {
          should(apns).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const regIds = [
        hex.getRandom(64),
        hex.getRandom(64)
      ];
      let asc = null;

      return Promise
      .all(_.map(regIds, (id) => APNSDevice.please().create({registration_id: id, instanceName, label: deviceLabel, user_id: userId, device_id: devId})))
      .then((apns) => {
          should(apns).be.an.Array().with.length(2);
          return APNSDevice.please({instanceName}).ordering('asc');
        })
        .then((apns) => {
          should(apns).be.an.Array().with.length(2);
          asc = apns;
          return APNSDevice.please({instanceName}).ordering('desc');
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
      return APNSDevice.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

  });

});
