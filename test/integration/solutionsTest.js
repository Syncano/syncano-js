import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';
import {ValidationError} from '../../src/errors';

describe('Solution', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('Solution');
  const solutionData = {
    label: 'test-solution',
    description: 'my test solution',
    metadata: {
      test: 'test'
    },
    public: true
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Solution;

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

  it('should require "label"', function() {
    should(Model({}).save()).be.rejectedWith(/label/);
  });

  it('should validate "label"', function() {
    should(Model({ label: []}).save()).be.rejectedWith(/label/);
  });

  it('should validate "description"', function() {
    should(Model({ label: 'label', description: []}).save()).be.rejectedWith(/description/);
  });

  it('should validate "metadata"', function() {
    should(Model({ label: 'label', description: 'my solution', metadata: 'meta'}).save()).be.rejectedWith(/metadata/);
  });

  it('should validate "public"', function() {
    should(Model({ label: 'label', description: 'my solution', metadata: {}, public: 'yes'}).save()).be.rejectedWith(/public/);
  });

  it('should be able to save via model instance', function() {
    return Model(solutionData).save()
      .then(cleaner.mark)
      .then((Model) => {
        should(Model).have.property('id').which.is.Number();
        should(Model).have.property('version_id');
        should(Model).have.property('starred_by_me').which.is.Null();
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('links').which.is.Object();
        should(Model).have.property('tags').which.is.Array();
        should(Model).have.property('created_at').which.is.Date();
        should(Model).have.property('updated_at').which.is.Date();
        should(Model).have.property('versions').which.is.Object();
        should(Model).have.property('author').which.is.Object();
        should(Model).have.property('stars_count').which.is.Number().equal(0);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);
        should(Model).have.property('public').which.is.Boolean().equal(solutionData.public);
        should(Model).have.property('metadata').which.is.Object();
        should(Model.metadata).have.property('test').which.is.String().equal(solutionData.metadata.test);
      })
  });

  it('should be able to update via model instance', function() {
    return Model(solutionData).save()
      .then(cleaner.mark)
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);

        Model.description = 'new description';
        return Model.save();
      })
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal('new description');
        should(Model).have.property('label').which.is.String().equal(solutionData.label);
      })
  });

  it('should be able to delete via model instance', function() {
    return Model(solutionData).save()
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);

        return Model.delete();
      });
  });

  it('should be able to star via model instance', function() {
    return Model(solutionData).save()
      .then(cleaner.mark)
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);

        return Model.star();
      })
  });

  it('should be able to unstar via model instance', function() {
    return Model(solutionData).save()
      .then(cleaner.mark)
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);

        return Model.unstar();
      })
  });

  it('should be able to get versions via model instance', function() {
    return Model(solutionData).save()
      .then(cleaner.mark)
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);

        return Model.getVersions();
      })
      .then((versions) => {
        should(versions).be.an.Object();
        should(versions).have.property('next').which.is.Null();
        should(versions).have.property('prev').which.is.Null();
      })
  });

  it('should be able to create a version via model instance', function() {
    return Model(solutionData).save()
      .then(cleaner.mark)
      .then((Model) => {
        should(Model).have.property('description').which.is.String().equal(solutionData.description);
        should(Model).have.property('label').which.is.String().equal(solutionData.label);

        return Model.createVersion({ type: 'stable', data: Syncano.file(__dirname + '/files/dummy.txt')});
      })
      .then((version) => {
        should(version).be.an.Object();
        should(version).have.property('id').which.is.Number();
        should(version).have.property('links').which.is.Object();
        should(version).have.property('data').which.is.Object();
        should(version).have.property('created_at').which.is.String();
        should(version).have.property('number').which.is.String().equal('1.0');
        should(version).have.property('type').which.is.String().equal('stable');
      })
  });

  // it('should be able to create a version from instance via model instance', function() {
  //   return Model(solutionData).save()
  //     .then(cleaner.mark)
  //     .then((Model) => {
  //       should(Model).have.property('description').which.is.String().equal(solutionData.description);
  //       should(Model).have.property('label').which.is.String().equal(solutionData.label);
  //
  //       return Model.createFromInstance({ instance: instanceName, type: 'stable', export_spec: true});
  //     })
  //     .then((version) => {
  //       should(version).be.an.Object();
  //       should(version).have.property('id').which.is.Number();
  //       should(version).have.property('links').which.is.Object();
  //       should(version).have.property('data').which.is.Object();
  //       should(version).have.property('created_at').which.is.String();
  //       should(version).have.property('number').which.is.String().equal('1.0');
  //       should(version).have.property('type').which.is.String().equal('stable');
  //     })
  // });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list().then((Models) => {
        should(Models).be.an.Array();
      });
    });

  });


});
