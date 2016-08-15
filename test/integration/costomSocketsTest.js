import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('CustomSocket', function() {
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
        source: "print ARGS['GET']['test']"
      },
      {
        type: 'script',
        runtime_name: 'python_library_v5.0',
        name: 'script2',
        source: "print ARGS['POST']['test']"
      }
    ],
    endpoints: {
      end1: {
        calls: [
          {
            type: 'script',
            name: 'script1',
            methods: ['GET']
          },
          {
            type: 'script',
            name: 'script2',
            methods: ['POST']
          }
        ]
      }
    }
  };

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

  it('should be able to recheck via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((socket) => {
        return socket.recheck();
      })
      .then((result) => {
        should(result).be.an.Object();
        should(result).have.property('name').which.is.String().equal(name);
        should(result).have.property('status').which.is.String();
        should(result).have.property('links').which.is.Object();
        should(result).have.property('created_at').which.is.String();
        should(result).have.property('updated_at').which.is.String();
        should(result).have.property('dependencies').which.is.Array();
        should(result).have.property('status_info').which.is.String();
        should(result).have.property('endpoints').which.is.Object();
        should(result).have.property('metadata').which.is.Object();
      })
  });

  it('should be able to get endpoint details via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((socket) => {
        return socket.getEndponintDetails('end1');
      })
      .then((result) => {
        should(result).be.an.Object();
        should(result).have.property('links').which.is.Object();
        should(result).have.property('name').which.is.String().equal('end1');
        should(result).have.property('calls').which.is.Array().with.length(2);
      })
  });

  it('should be able to GET endpoint via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((socket) => {
        return socket.get('end1', { test: 'test_script'});
      })
      .then((result) => {
        should(result).be.an.Object();
        should(result).have.property('status').which.is.String().equal('success');
        should(result).have.property('duration').which.is.Number();
        should(result).have.property('result').which.is.Object();
        should(result.result).have.property('stderr').which.is.String().equal('');
        should(result.result).have.property('stdout').which.is.String().equal('test_script');
        should(result).have.property('executed_at').which.is.String();
        should(result).have.property('id').which.is.Number();
      })
  });

  it('should be able to POST to an endpoint via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
      .then((socket) => {
        return socket.post('end1', { test: 'test_script'});
      })
      .then((result) => {
        should(result).be.an.Object();
        should(result).have.property('status').which.is.String().equal('success');
        should(result).have.property('duration').which.is.Number();
        should(result).have.property('result').which.is.Object();
        should(result.result).have.property('stderr').which.is.String().equal('');
        should(result.result).have.property('stdout').which.is.String().equal('test_script');
        should(result).have.property('executed_at').which.is.String();
        should(result).have.property('id').which.is.Number();
      })
  });

})