import stampit from 'stampit';
import {Meta, Model} from './base';

const UserMeta = Meta({
  name: 'instance',
  pluralName: 'instances',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{name}/users/{id}/'
    },
    'reset_key': {
      'methods': ['post'],
      'path': '/v1/instances/{name}/users/{id}/reset_key/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{name}/users/'
    },
    'groups': {
      'methods': ['get', 'post'],
      'path': '/v1/instances/{name}/users/{id}/groups/'
    }
  }
});

const User = stampit()
  .compose(Model)
  .setMeta(UserMeta);

export default User;
