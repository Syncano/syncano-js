import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe.only('CustomSocket', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.get('CustomSocket');
  const name = suffix.get('socket');
  const data = {
    instanceName,
    name,
    dependencies: [
      {
        type: 'script',
        runtime_name: 'python_library_v5.0',
        name: 'script1',
        source: 'print "script1"'
      },
      {
        type: 'script',
        runtime_name: 'python_library_v5.0',
        name: 'script2',
        source: 'print "script2"'
      }
    ],
    endpoints: {
      end1: {
        calls: [
          {
            type: 'script',
            name: 'script1',
            methods: ['POST']
          },
          {
            type: 'script',
            name: 'script2',
            methods: ['GET']
          }
        ]
      }
    }
  }

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.CustomSocket;

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

  it('should require "name"', function() {
    should(Model({ instanceName }).save()).be.rejectedWith(/name/);
  });

  it('should require "endpoints"', function() {
    should(Model({ instanceName, name }).save()).be.rejectedWith(/endpoints/);
  });

  it('should validate "endpoints"', function() {
    should(Model({ instanceName, name, endpoints: [] }).save()).be.rejectedWith(/endpoints/);
  });

  it('should require "dependencies"', function() {
    should(Model({ instanceName, name, endpoints: {} }).save()).be.rejectedWith(/dependencies/);
  });

  it('should validate "dependencies"', function() {
    should(Model({ instanceName, name, endpoints: {}, dependencies: 'dep' }).save()).be.rejectedWith(/dependencies/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((socket) => {
        should(socket).be.an.Object();
        should(socket).have.property('instanceName').which.is.String().equal(instanceName);
        should(socket).have.property('name').which.is.String().equal(name);
        should(socket).have.property('status').which.is.String();
        should(socket).have.property('links').which.is.Object();
        should(socket).have.property('created_at').which.is.Date();
        should(socket).have.property('updated_at').which.is.Date();
        should(socket).have.property('dependencies').which.is.Array();
        should(socket).have.property('status_info').which.is.String();
        should(socket).have.property('endpoints').which.is.Object();
        should(socket).have.property('metadata').which.is.Object();
      })
  });

  it('should be able to update via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((socket) => {
        socket.dependencies = [
          {
            type: 'script',
            runtime_name: 'python_library_v5.0',
            name: 'script1',
            source: 'print "script1"'
          }
        ];
        return socket.save();
      })
      .then((socket) => {
        should(socket.dependencies).be.an.Array().with.length(1);
      })
  });

  it('should be able to delete via model instance', function() {
    return Model(data).save()
      .then((socket) => {
        return socket.delete();
      })
  });

})
