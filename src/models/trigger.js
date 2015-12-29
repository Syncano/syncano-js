import stampit from 'stampit';
import {Meta, Model} from './base';

const TriggerMeta = Meta({
  name: 'trigger',
  pluralName: 'triggers',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/triggers/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/triggers/'
    }
  }
});

const Trigger = stampit()
  .compose(Model)
  .setMeta(TriggerMeta);

export default Trigger;
