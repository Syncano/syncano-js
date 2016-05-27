import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List, Delete, Update} from '../querySet';

const SolutionQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List,
  Delete,
  Update
);

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
    'version': {
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
  .setConstraints(SolutionConstraints);

export default Solution;
