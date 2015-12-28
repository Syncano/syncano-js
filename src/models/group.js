import stampit from 'stampit';
import {Meta, Model} from './base';

const GroupMeta = Meta({
  name: 'instance',
  pluralName: 'instances',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/groups/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instance}/groups/'
    },
    'users': {
      'methods': ['get', 'post', 'delete'],
      'path': '/v1/instances/{instance}/groups/{id}/users/'
    }
  }
});

const Group = stampit()
  .compose(Model)
  .setMeta(GroupMeta);

export default Group;
