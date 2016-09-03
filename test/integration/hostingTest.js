import Syncano from '../../src/syncano';
import should from 'should/as-function';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('Hosting', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.get('hosting');
  const data = {
    instanceName,
    label: 'test hosting',
    description: 'test hosting desc',
    domains: ['test.com']
  }

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Hosting;

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

  it('should validate "label"', function() {
    should(Model({ instanceName, label: [] }).save()).be.rejectedWith(/label/);
  });

  it('should validate "description"', function() {
    should(Model({ instanceName, label: 'sth', description: [] }).save()).be.rejectedWith(/description/);
  });

  it('should validate "domains"', function() {
    should(Model({ instanceName, label: 'sth', description: 'sth', domains: 'sth' }).save()).be.rejectedWith(/domains/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(hosting).have.property('id').which.is.Number();
        should(hosting).have.property('fileId').which.is.Undefined();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('links').which.is.Object();
        should(hosting).have.property('created_at').which.is.Date();
        should(hosting).have.property('updated_at').which.is.Date();
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);
        should(hosting.domains[0]).be.a.String().equal(data.domains[0]);
      });
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        hosting.description = 'some new description';
        return hosting.save()
      })
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal('some new description');
      })
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.delete();
      })
  });

  it('should be able to set default via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.setDefault();
      })
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(2);
        should(hosting.domains[0]).be.a.String().equal(data.domains[0]);
        should(hosting.domains[1]).be.a.String().equal('default');
      })
  });

  it.skip('should be able to list files via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((hosting) => {
        should(hosting).be.an.Object();
        should(hosting).have.property('description').which.is.String().equal(data.description);
        should(hosting).have.property('label').which.is.String().equal(data.label);
        should(hosting).have.property('domains').which.is.Array().with.length(1);

        return hosting.listFiles();
      })
  });

});
