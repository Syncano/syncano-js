import stampit from 'stampit';
import {Meta, Model} from './base';

const TriggerMeta = Meta({
  name: 'trigger',
  pluralName: 'triggers',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v2/instances/{instanceName}/triggers/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v2/instances/{instanceName}/triggers/'
    }
  },
  relatedModels: [ 'TriggerTrace' ]
});

const TriggerConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  label: {
    presence: true,
    string: true
  },
  description: {
    string: true
  },
  signals: {
    presence: true,
    array: true
  },
  event: {
    presence: true,
    object: true
  }
};

/**
 * OO wrapper around instance triggers {@link # endpoint}.
 * @constructor
 * @type {Trigger}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} label
 * @property {String} signal
 * @property {Number} codebox
 * @property {String} class
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Trigger = stampit()
  .compose(Model)
  .setConstraints(TriggerConstraints)
  .setMeta(TriggerMeta);

export default Trigger;
