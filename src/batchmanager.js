import stampit from 'stampit';
import _ from 'lodash';
import Request from './request';

/**
* Manager for handling batch requests to the platform. Supported actions are 'create', 'update', 'delete'. Meant to be used directly form the {@link Syncano} instance.
*
* @constructor
* @type {BatchManager}
*
* @example {@lang javascript}
* const connection = Syncano();
* const manager = connection.BatchManager({instanceName});
* manager.addObjects({ object: DataObject({data}), action: 'save' }, { object: DataObject({other_data}), action: 'create' });
* manager.batch().then(() => {
*   // success
* })
*
* @example {@lang javascript}
* const connection = Syncano();
* const manager = connection.BatchManager({instanceName});
* manager.addSingleObject(DataObject({data}), 'create');
* manager.batch().then(() => {
*   // success
* })
*/
const BatchManager = stampit()
  .compose(Request)
  .props({
    objects: [],
    batchUrl: '/v1.1/instances/{instance}/batch/',
    maxBatchObjects: 50
  })
  .init(function() {
    if(!_.has(this, 'instanceName') && !_.has(this.getDefaultProperties(), 'instanceName')) {
      throw new Error('No instance name specified.');
    }
    this.instanceName = this.instanceName || this.getDefaultProperties().instanceName;
    this.batchUrl = _.replace(this.batchUrl, '{instance}', this.instanceName);
  })
  .methods({

    addObjects(...objects) {
      this.validateObjectsLength(_.size(_.flatten(objects)));
      _.each(objects, (object) => {
          this.objects = _.concat(this.objects, object);
      });
      this.objects = _.flatten(this.objects);
      if(!_.every(this.objects, (object) => {
        return _.has(object, 'object._meta') && _.has(object, 'action');
      })) {
        this.removeObjects();
        throw new Error('The Batch Manager only accepts properly formatted objects.');
      }
      return this;
    },

    addObjectsFromArray(objects, action) {
      this.validateObjectsLength(objects.length);
      _.each(objects, (object) => {
        this.objects = _.concat(this.objects, { object, action });
      });
      return this;
    },

    addSingleObject(object, action) {
      if(!_.has(object, '_meta')) {
        throw new Error('The supplied object is not a valid object.');
      }
      this.validateObjectsLength(1);
      this.objects = _.concat(this.objects, { object, action });
      return this;
    },

    batch() {
      if(_.isEmpty(this.objects)) {
        throw new Error('No objects provided for batching.');
      }
      const requests = _.map(this.objects, (batch) => batch.object.toBatchObject(batch.action));

      return this.makeRequest('POST', this.batchUrl, { payload: {requests}});
    },

    validateObjectsLength(length) {
      const existingLength = _.size(this.objects);
      if(_.add(existingLength, length) > this.maxBatchObjects) {
        throw new Error('Only 50 objects can be batched at once.');
      }
    },

    removeObjects() {
      this.objects = [];
      return this;
    },

    getObjects() {
      return this.objects;
    }

  });

export default BatchManager;
