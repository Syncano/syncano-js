import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe('Class', function() {
  this.timeout(15000);

  const connection = Syncano(credentials);
  const Class = connection.Class;
  const instanceName = suffix.get('instance');
  const className = suffix.get('class');

  before(function() {
    return connection.Instance.please().create({name: instanceName});
  });

  after(function() {
    return connection.Instance.please().delete({name: instanceName});
  });

  afterEach(function(done) {
    return connection.Class.please().delete({
      instanceName: instanceName,
      name: className
    })
    .then(() => done())
    .catch(() => done());
  });

  it('should be validated', function() {
    should(Class().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Class({name: className}).save()).be.rejectedWith(/instanceName/);
  });

  it('should be able to save via model instance', function() {
    const data = {
      name: className,
      instanceName: instanceName,
      description: 'test'
    };

    return Class(data).save()
      .then((cls) => {
        should(cls).be.a.Object();
        should(cls).have.property('name').which.is.String().equal(data.name);
        should(cls).have.property('description').which.is.String().equal(data.description);
        // should(cls).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(cls).have.property('created_at').which.is.String();
        should(cls).have.property('updated_at').which.is.String();
        should(cls).have.property('links').which.is.Object();
        should(cls).have.property('metadata').which.is.Object();
      });
  });

});
