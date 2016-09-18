import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner } from './utils';
import _ from 'lodash';

describe('BatchManager', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Class = null;
  let Model = null;
  let Objects = null;
  let Instance = null;
  let Manager = null;
  const instanceName = suffix.getHyphened('name');
  const className = suffix.get('class');
  const classData = {
    name: className,
    instanceName,
    schema: [
      { name: 'name', type: 'string'}
    ]
  };

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Class = connection.Class;
    Model = connection.DataObject;
    Manager = connection.BatchManager({instanceName});

    Objects = _.map(_.range(10), (int) => {
      return { object: Model({ name: `name-${int}`, instanceName, className, id: int+1 }), action: 'create' }
    });

    return Instance.please().create({name: instanceName}).then(() => {
      return Class.please().create(classData);
    });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    Manager.removeObjects();
    return cleaner.clean();
  });

  it('should validate objects added via the #addObjects() method', function() {
    should(() => {
      Manager.addObjects({ something: 'thing' })
    }).throw(/properly formatted objects/);
  });

  it('should validate objects added via the #addObjects() method', function() {
    should(() => {
      Manager.addObjects([{ something: 'thing' }])
    }).throw(/properly formatted objects/);
  });

  it('should validate objects added via the #addSingleObject() method', function() {
    should(() => {
      Manager.addSingleObject({ something: 'thing' }, 'save');
    }).throw(/not a valid object/);
  });

  it('should validate max number of objects added to batch', function() {
    should(() => {
      Manager.addObjects(Objects).addObjects(Objects).addObjects(Objects)
             .addObjects(Objects).addObjects(Objects).addObjects(Objects);
    }).throw(/Only 50 objects can be batched at once/);
  });

  it('should be able to batch create objects', function() {
    return Manager.addObjects(Objects).batch()
      .then((objects) => {
        should(objects).be.an.Array().with.length(10);
      })
   });

  it('should be able to batch update objects', function() {
    const updateObjects = _.map(_.take(Objects, 2), (obj) => {
      return _.assign({}, obj, { object: Model({instanceName, className, id: obj.object.id, name: 'new_name'}), action: 'update'})
    });
    return new Promise((resolve) => {
      setInterval(() => resolve(), 1000);
    })
    .then(() => Manager.addObjects(updateObjects).batch())
    .then(() => Model.please().list({instanceName, className}).pageSize(2))
    .then((objects) => {
      should(objects).be.an.Array().with.length(2);
      should(objects[0]).have.property('name').which.is.String().equal('new_name');
      should(objects[1]).have.property('name').which.is.String().equal('new_name');
    })
  });

  it('should be able to batch different actions', function() {
    const mixedObjects = [
      { object: Objects[0].object, action: 'delete'},
      { object: Model({ instanceName, className, name: 'new_name2', id: 2}), action: 'update'},
      { object: Model({ name: 'created_object', instanceName, className}), action: 'create' }
    ]
    return new Promise((resolve) => {
      setInterval(() => resolve(), 1000);
    })
    .then(() => Manager.addObjects(mixedObjects).batch())
    .then(() => Model.please().list({instanceName, className}))
    .then((objects) => {
      should(objects).be.an.Array().with.length(10);
      should(objects[0]).have.property('name').which.is.String().equal('new_name2');
      should(objects[9]).have.property('name').which.is.String().equal('created_object');
    })
  });

  it('should be able to batch delete objects', function() {
    const removeObjects = _.map(Objects, (obj) => {
      return _.assign({}, obj, { action: 'delete'})
    })
    .concat({ object: Model({ name: 'created_object', instanceName, className, id: 11}), action: 'delete' })
    return new Promise((resolve) => {
      setInterval(() => resolve(), 1000);
    })
    .then(() => Manager.addObjects(removeObjects).batch())
    .then(() => Model.please().list({instanceName, className}))
    .then((objects) => {
      should(objects).be.an.Array().with.length(0);
    })
  });
});
