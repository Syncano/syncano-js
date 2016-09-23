import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';


describe('Instance Invitation', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('Invitation');
  const email = Date.now() + '@invitation.com';
  const email2 = Date.now() + '@devitation.com';
  const data = {
    email,
    role: 'read',
    instanceName
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.InstanceInvitation;

    objects = [
      Model({email: email, role: 'read', instanceName}),
      Model({email: email2, role: 'read', instanceName})
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
    should(Model({email: email}).save()).be.rejectedWith(/instanceName/);
  });

  it('should validate "email"', function() {
    should(Model({instanceName, email: 'meh'}).save()).be.rejectedWith(/email/);
  });

  it('should validate "role"', function() {
    should(Model({instanceName, email, role: 'president'}).save()).be.rejectedWith(/role/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((inv) => {
        should(inv).be.an.Object();
        should(inv).have.property('id').which.is.Number();
        should(inv).have.property('email').which.is.String().equal(data.email);
        should(inv).have.property('role').which.is.String().equal('read');
        should(inv).have.property('key').which.is.String();
        should(inv).have.property('inviter').which.is.String();
        should(inv).have.property('created_at').which.is.Date();
        should(inv).have.property('updated_at').which.is.Date();
        should(inv).have.property('state').which.is.String().equal('new');
        should(inv).have.property('links').which.is.Object();
        should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
      });
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((inv) => {
        should(inv).be.an.Object();
        should(inv).have.property('email').which.is.String().equal(data.email);
        should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);

        return inv.delete();
      });
  });

  it('should be able to resend via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((inv) => {
        should(inv).be.an.Object();
        should(inv).have.property('email').which.is.String().equal(data.email);
        should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);

        return inv.resend();
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
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('id').which.is.Number();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('role').which.is.String().equal('read');
          should(inv).have.property('key').which.is.String();
          should(inv).have.property('inviter').which.is.String();
          should(inv).have.property('created_at').which.is.Date();
          should(inv).have.property('updated_at').which.is.Date();
          should(inv).have.property('state').which.is.String().equal('new');
          should(inv).have.property('links').which.is.Object();
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
        });
    });

    it('should be able to bulk create objects', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a Model', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);

          return inv;
        })
        .then((inv) => {
          return Model
            .please()
            .get({id: inv.id, instanceName})
            .request();
        })
        .then(([inv, response]) => {
          should(response).be.an.Object();
          should(inv).be.an.Object();
          should(inv).have.property('id').which.is.Number();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('role').which.is.String().equal('read');
          should(inv).have.property('key').which.is.String();
          should(inv).have.property('inviter').which.is.String();
          should(inv).have.property('created_at').which.is.Date();
          should(inv).have.property('updated_at').which.is.Date();
          should(inv).have.property('state').which.is.String().equal('new');
          should(inv).have.property('links').which.is.Object();
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().create(data)
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
          return inv;
        })
        .then((inv) => {
          return Model
            .please()
            .delete({id: inv.id, instanceName})
            .request();
        });
    });

    it('should be able to resend invitation', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
          return inv;
        })
        .then((inv) => {
          return Model
            .please()
            .resend({id: inv.id, instanceName})
            .request();
        });
    });

    it('should be able to get or create a Model (CREATE)', function() {
      return Model.please().getOrCreate({id: null, instanceName}, {email, role: 'read'})
        .then(cleaner.mark)
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('id').which.is.Number();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('role').which.is.String().equal('read');
          should(inv).have.property('key').which.is.String();
          should(inv).have.property('inviter').which.is.String();
          should(inv).have.property('created_at').which.is.Date();
          should(inv).have.property('updated_at').which.is.Date();
          should(inv).have.property('state').which.is.String().equal('new');
          should(inv).have.property('links').which.is.Object();
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
        });
    });

    it('should be able to get or create a Model (GET)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);

          return Model.please().getOrCreate({id: inv.id, instanceName}, {email, role: 'read'});
        })
        .then((inv) => {
          should(inv).be.an.Object();
          should(inv).have.property('email').which.is.String().equal(data.email);
          should(inv).have.property('instanceName').which.is.String().equal(data.instanceName);
        });
    });

    it('should be able to get first Model (SUCCESS)', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((inv) => {
          should(inv).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((inv) => {
          should(inv).be.an.Array().with.length(2);
          return Model.please({instanceName}).pageSize(1);
        })
        .then((inv) => {
          should(inv).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      let asc = null;

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((inv) => {
          should(inv).be.an.Array().with.length(2);
          return Model.please({instanceName}).ordering('asc');
        })
        .then((inv) => {
          should(inv).be.an.Array().with.length(2);
          asc = inv;
          return Model.please({instanceName}).ordering('desc');
        }).then((desc) => {
          const ascNames = _.map(asc, 'id');
          const descNames = _.map(desc, 'id');
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
