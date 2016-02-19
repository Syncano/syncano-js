import stampit from 'stampit';
import {Meta, Model} from './base';

const TriggerMeta = Meta({
  name: 'trigger',
  pluralName: 'triggers',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/triggers/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/triggers/'
    }
  },
  relatedModels: [ 'TriggerTrace' ]
});

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
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const Trigger = stampit()
  .compose(Model)
  .setMeta(TriggerMeta);

export default Trigger;
