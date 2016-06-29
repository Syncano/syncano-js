import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner } from './utils';
import _ from 'lodash';

describe.only('BatchManager', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Class = null;
  let Model = null;
  let Objects = null;
  let Instance = null;
  let Manager = null;
  const instanceName = suffix.get('name');
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
    Manager = connection.BatchManager;

    Objects = _.map(_.range(10), (int) => {
      return { object: Model({ name: `name-${int}`, instanceName, className }), action: 'save' }
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
    should(Manager.addObjects({ something: 'thing' })).be.rejectedWith(/properly formatted object models/);
  });

  it('should validate objects added via the #addSingleObject() method', function() {
    should(Manager.addSingleObject({ something: 'thing' }, 'save')).be.rejectedWith(/not a valid model/);
  });

  it('should be able to batch create objects', function() {
    console.log(Objects);
    return Manager.addObjects(Objects).batch()
      .then(cleaner.mark)
      .then((objects) => {
        should(objects).be.an.Array().with.length(10);
      })
   });

   it('should be able to batch delete objects', function() {
     return Manager.addObjects(Objects).batch()
       .then((objects) => {
         const removeObjects = _.map(objects, (obj) => {
           return { object: Model(obj), action: 'delete' }
         });
        return Manager.removeObjects().addObjects(removeObjects).batch()
       })
       .then(() => {
         return Model.please().list({instanceName, className});
       })
       .then((objects) => {
         should(objects).be.an.Array().with.length(0);
       })
    });

    it('should be able to batch update objects', function() {
      return Manager.addObjects(_.take(Objects, 2)).batch()
        .then(cleaner.mark)
        .then((objects) => {
          should(objects).be.an.Array().with.length(2);
          const updateObjects = _.map(objects, (obj) => {
            return { object: Model(_.assign({}, obj, { name: 'new_name'})), action: 'update' }
          });
         return Manager.removeObjects().addObjects(updateObjects).batch()
        })
        .then(() => {
          return Model.please().list({instanceName, className});
        })
        .then((objects) => {
          should(objects).be.an.Array().with.length(2);
          should(objects[0]).have.property('name').which.is.String().equal('new_name');
          should(objects[1]).have.property('name').which.is.String().equal('new_name');
        })
     });

     it('should be able to batch different actions', function() {
       return Manager.addObjects(_.take(Objects, 3)).batch()
         .then((objects) => {
           should(objects).be.an.Array().with.length(3);
           const mixedObjects = [
             { object: Model(objects[0]), action: 'delete' },
             { object: Model(_.assign({}, objects[1], { name: 'new_name'})), action: 'update' },
             { object: Model({ name: 'created_object', instanceName, className}), action: 'save' }
           ]
          return Manager.removeObjects().addObjects(mixedObjects).batch()
         })
         .then(() => {
           return Model.please().list({instanceName, className});
         })
         .then(cleaner.mark)
         .then((objects) => {
           should(objects).be.an.Array().with.length(3);
           should(objects[0]).have.property('name').which.is.String().equal('new_name');
           should(objects[2]).have.property('name').which.is.String().equal('created_object');
         })
      });
});
