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

const GroupConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  label: {
    presence: true
  }
};


const Group = stampit()
  .compose(Model)
  .setMeta(GroupMeta)
  .setConstraints(GroupConstraints);

export default Group;
