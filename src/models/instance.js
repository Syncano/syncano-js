import stampit from 'stampit';
import {Meta, Model} from './base';

const InstanceMeta = Meta({
  name: 'instance',
  pluralName: 'instances',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/'
    }
  }
});

const Instance = stampit()
  .compose(Model)
  .setMeta(InstanceMeta);

export default Instance;
