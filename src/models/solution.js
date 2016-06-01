import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List, Delete, Update, Create} from '../querySet';
import _ from 'lodash';

const SolutionQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Create,
  List,
  Delete,
  Update
).methods({

  star(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'star';

    return this;
  },

  unstar(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'unstar';

    return this;
  },

  getVersions(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'GET';
    this.endpoint = 'versions'

    return this;
  },

  createVersion(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = payload;
    this.method = 'POST';
    this.endpoint = 'versions';

    return this;
  },

  getVersion(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'GET';
    this.endpoint = 'versionDetail';

    return this;
  },

  installVersion(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.payload = payload;
    this.endpoint = 'versionInstall';

    return this;
  },

  createVersionFromInstance(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.payload = payload;
    this.endpoint = 'createFromInstance';

    return this;
  }

});

const SolutionMeta = Meta({
  name: 'solution',
  pluralName: 'solutions',
  endpoints: {
    'list': {
      'methods': ['get'],
      'path': '/v1.1/marketplace/solutions/'
    },
    'detail': {
      'methods': ['get', 'post', 'patch', 'put', 'delete'],
      'path': '/v1.1/marketplace/solutions/{id}/'
    },
    'star': {
      'methods': ['post'],
      'path': '/v1.1/marketplace/solutions/{id}/star/'
    },
    'unstar': {
      'methods': ['post'],
      'path': '/v1.1/marketplace/solutions/{id}/unstar/'
    },
    'versions': {
      'methods': ['post', 'get'],
      'path': '/v1.1/marketplace/solutions/{id}/versions/'
    },
    'createFromInstance': {
      'methods': ['post', 'get'],
      'path': '/v1.1/marketplace/solutions/{id}/versions/create_from_instance/'
    },
    'versionDetail': {
      'methods': ['get'],
      'path': '/v1.1/marketplace/solutions/{id}/versions/{version_id}/'
    },
    'versionInstall': {
      'methods': ['post'],
      'path': '/v1.1/marketplace/solutions/{id}/versions/{version_id}/install/'
    }
  }
});

const SolutionConstraints = {
  label: {
    presence: true,
    string: true
  },
  description: {
    string: true
  },
  metadata: {
    object: true
  },
  public: {
    boolean: true
  }
};

/**
 * OO wrapper around Invoice.
 * @constructor
 * @type {Invoice}

 * @property {String} status
 * @property {Array} items
 * @property {String} period
 * @property {String} amount
 * @property {Number} id
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Solution = stampit()
  .compose(Model)
  .setQuerySet(SolutionQuerySet)
  .setMeta(SolutionMeta)
  .setConstraints(SolutionConstraints)
  .methods({

    star() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('star', this);

      return this.makeRequest('POST', path);
    },

    unstar() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('unstar', this);

      return this.makeRequest('POST', path);
    },

    getVersions() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('versions', this);

      return this.makeRequest('GET', path);
    },

    getVersion(version_id) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('versionDetail', _.assign({}, this, {version_id}));

      return this.makeRequest('GET', path);
    },

    installVersion(version_id, payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('versionInstall', _.assign({}, this, {version_id}));

      return this.makeRequest('POST', path, {payload});
    },

    createVersion(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('versions', this);

      return this.makeRequest('POST', path, {payload});
    },

    createVersionFromInstance(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('createFromInstance', this);

      return this.makeRequest('POST', path, {payload});
    }

  });

export default Solution;
