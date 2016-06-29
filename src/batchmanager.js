import stampit from 'stampit';
import _ from 'lodash';
import Promise from 'bluebird';

/**
* Manager for handling batch requests to the platform. Supported actions are 'save', 'update', 'delete'. Meant to be used directly form the {@link Syncano} instance.
*
* @constructor
* @type {BatchManager}
*
* @example {@lang javascript}
* const connection = Syncano();
* const manager = connection.BatchManager;
* manager.addObjects({ object: DataObject({data}), action: 'save' }, { object: DataObject({other_data}), action: 'save' });
* manager.batch().then(() => {
*   // success
* })
*
* @example {@lang javascript}
* const connection = Syncano();
* const manager = connection.BatchManager;
* manager.addSingleObject(DataObject({data}), 'save');
* manager.batch().then(() => {
*   // success
* })
*/
const BatchManager = stampit()
  .props({
    objects: null
  })
  .methods({

    addObjects(...objects) {
      _.each(objects, (object) => {
          this.objects = _.concat(this.objects, object);
      });
      this.objects = _.flatten(this.objects);
      if(!_.every(this.objects, (object) => {
        return _.has(object, 'object._meta') && _.has(object, 'action');
      })) {
        this.removeObjects();
        return Promise.reject(new Error('The Batch Manager only accepts properly formatted object models.'));
      }
      return this;
    },

    addSingleObject(object, action) {
      if(!_.has(object, '_meta')) {
        return Promise.reject(new Error('The supplied object is not a valid model.'))
      }
      this.objects = _.concat(this.objects, { object, action });
      return this;
    },

    batch() {
      if(_.isEmpty(this.objects)) {
        return Promise.reject(new Error('No objects provided for batching.'));
      }
      return Promise.mapSeries(this.objects, (object) => object.object[object.action]())
    },

    removeObjects() {
      this.objects = null;
      return this;
    },

    getObjects() {
      return this.objects;
    }

  });

export default BatchManager;
