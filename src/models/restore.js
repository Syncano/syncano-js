import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Get} from '../querySet';

const RestoreQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Get
).methods({

  restore(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.payload = payload;
    this.endpoint = 'restore';
    return this;
  }

});

const RestoreMeta = Meta({
  name: 'restore',
  pluralName: 'restores',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/restores/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/instances/{instanceName}/restores/'
    },
    'restore': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/restores/'
    }
  }
});

const RestoreConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    },
    id: {
      number: true
    }
  }
};

/**
 * OO wrapper around instance restores {@link # endpoint}.
 * @constructor
 * @type {Backup}

 * @property {Number} id
 * @property {String} instance
 * @property {String} created_at
 * @property {String} updated_at
 * @property {Number} size
 * @property {String} status
 * @property {String} status_info
 * @property {String} description
 * @property {String} label
 * @property {Object} [links = {}]
 */
const Restore = stampit()
  .compose(Model)
  .setQuerySet(RestoreQuerySet)
  .setMeta(RestoreMeta)
  .setConstraints(RestoreConstraints)
  .methods({

    restore(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('restore', this);

      return this.makeRequest('POST', path, {payload});
    }

  });

export default Restore;
