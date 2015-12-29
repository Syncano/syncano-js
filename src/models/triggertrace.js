import stampit from 'stampit';
import {Meta, Model} from './base';

const TriggerTraceMeta = Meta({
  name: 'triggertrace',
  pluralName: 'triggertraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/triggers/{trigger_id}/traces/{trace_id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/triggers/{trigger_id}/traces/'
    }
  }
});

const TriggerTrace = stampit()
  .compose(Model)
  .setMeta(TriggerTraceMeta);

export default TriggerTrace;
