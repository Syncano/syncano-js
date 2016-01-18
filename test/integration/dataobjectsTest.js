import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';

describe('Dataobject', function() {
  this.timeout(15000);

  let connection = null;
  let Class = null;
  let Instance = null;
  let DataObject = null;
  const schema = [
    { name: 'title', type: 'string'}
  ];
  const instanceName = suffix.get('instance');
  const className = suffix.get('class');
  const data = {
    name: className,
    instanceName: instanceName,
    description: suffix.get('description')
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Class = connection.Class;
    DataObject = connection.DataObject;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  beforeEach(function() {
    return Class.please().create(data);
  });

  afterEach(function(done) {
    return Class.please().delete({
      instanceName: instanceName,
      name: className
    })
    .then(() => done())
    .catch(() => done());
  });

  it('should be validated', function() {
    should(DataObject().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(DataObject({className: className}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "className"', function() {
    should(DataObject({instanceName: instanceName}).save()).be.rejectedWith(/className/);
  });

});
