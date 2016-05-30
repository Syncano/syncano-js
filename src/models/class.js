import stampit from 'stampit';
import {Meta, Model} from './base';

const ClassMeta = Meta({
  name: 'class',
  pluralName: 'classes',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/classes/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/classes/'
    }
  },
  relatedModels: [ 'DataObject' ]
});

const ClassConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    presence: true,
    string: true
  },
  description: {
    string: true
  },
  schema: {
    array: true
  },
  group: {
    numericality: true
  },
  group_permissions: {
    inclusion: ['none', 'read', 'create_objects']
  },
  other_permissions: {
    inclusion: ['none', 'read', 'create_objects']
  },
  metadata: {
    object: true
  }
};

/**
 * OO wrapper around instance groups {@link http://docs.syncano.com/v4.0/docs/instancesinstanceclasses endpoint}.
 * @constructor
 * @type {Class}

 * @property {String} name
 * @property {String} instanceName
 * @property {Number} objects_count
 * @property {Array} schema
 * @property {String} status
 * @property {Object} metadata
 * @property {String} revision
 * @property {String} expected_revision
 * @property {String} group
 * @property {String} group_permissions
 * @property {String} other_permissions
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]

 */
const Class = stampit()
  .compose(Model)
  .setMeta(ClassMeta)
  .setConstraints(ClassConstraints);

export default Class;
