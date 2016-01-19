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
  const instanceName = suffix.get('instance');
  const className = suffix.get('class');
  const data = {
    name: className,
    instanceName: instanceName,
    description: suffix.get('description'),
    schema: [
      { name: "title", type: "string" },
      { name: "author", type: "string" }
    ]
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

  it('should be able to save via model instance', function() {
    const dataobj = {
      title: "Pulp",
      author: "Bukowski",
      className: className,
      instanceName: instanceName
    };

    return DataObject(dataobj).save()
      .then((dataobj) => {
        should(dataobj).be.a.Object();
        should(dataobj).have.property('id').which.is.Number();
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('created_at').which.is.String();
        should(dataobj).have.property('updated_at').which.is.String();
        should(dataobj).have.property('links').which.is.Object();
        should(dataobj).have.property('channel').which.is.Null();
        should(dataobj).have.property('owner').which.is.Null();
        should(dataobj).have.property('group_permissions').which.is.String().equal('none');
        should(dataobj).have.property('other_permissions').which.is.String().equal('none');
        should(dataobj).have.property('owner_permissions').which.is.String().equal('full');
        should(dataobj).have.property('title').which.is.String().equal('Pulp');
        should(dataobj).have.property('author').which.is.String().equal('Bukowski');
      });
  });

  it('should be able to update via model instance', function() {
    const dataobj = {
      title: "Pulp",
      author: "Bukowski",
      className: className,
      instanceName: instanceName
    };

    return DataObject(dataobj).save()
      .then((dataobj) => {
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('title').which.is.String().equal('Pulp');
        should(dataobj).have.property('author').which.is.String().equal('Bukowski');

        dataobj.title = "Brave New World";
        dataobj.author = "Aldous Huxley";
        return dataobj.save();
      })
      .then((dataobj) => {
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('title').which.is.String().equal('Brave New World');
        should(dataobj).have.property('author').which.is.String().equal('Aldous Huxley');
      })
  });

});
