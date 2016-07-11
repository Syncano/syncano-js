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
* const manager = connection.BatchManager;
* manager.addObjects({ object: DataObject({data}), action: 'save' }, { object: DataObject({other_data}), action: 'create' });
* manager.batch().then(() => {
*   // success
* })
*
* @example {@lang javascript}
* const connection = Syncano();
* const manager = connection.BatchManager;
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
    objectsMap: {
      create: {
        method: 'POST',
        endpoint: 'list'
      },
      update: {
        method: 'PATCH',
        endpoint: 'detail'
      },
      delete: {
        method: 'DELETE',
        endpoint: 'detail'
      }
    }
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
      _.each(objects, (object) => {
          this.objects = _.concat(this.objects, object);
      });
      this.objects = _.flatten(this.objects);
      if(!_.every(this.objects, (object) => {
        return _.has(object, 'object._meta') && _.has(object, 'action');
      })) {
        this.removeObjects();
        throw new Error('The Batch Manager only accepts properly formatted object models.');
      }
      return this;
    },

    addSingleObject(object, action) {
      if(!_.has(object, '_meta')) {
        throw new Error('The supplied object is not a valid model.');
      }
      this.objects = _.concat(this.objects, { object, action });
      return this;
    },

    batch() {
      if(_.isEmpty(this.objects)) {
        throw new Error('No objects provided for batching.');
      }
      const requests = _.map(this.objects, (object) => {
        return {
          method: this.objectsMap[object.action].method,
          path: object.object.getMeta().resolveEndpointPath(this.objectsMap[object.action].endpoint, object.object),
          body: object.object.toJSON()
        }
      });
      //console.log(requests);
      return this.makeRequest('POST', this.batchUrl, { payload: {requests}});
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
