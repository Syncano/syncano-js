import stampit from 'stampit';
import {Meta, Model} from './base';

const GroupMeta = Meta({
  name: 'group',
  pluralName: 'groups',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/groups/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/groups/'
    },
    'users': {
      'methods': ['get', 'post', 'delete'],
      'path': '/v1/instances/{instanceName}/groups/{id}/users/'
    }
  }
});

const Group = stampit()
  .compose(Model)
  .setMeta(GroupMeta);

export default Group;
