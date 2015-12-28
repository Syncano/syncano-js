import stampit from 'stampit';
import {Meta, Model} from './base';

const AdminMeta = Meta({
  name: 'instance',
  pluralName: 'instances',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/admins/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/admins/'
    }
  }
});

const Admin = stampit()
  .compose(Model)
  .setMeta(AdminMeta);

export default Admin;
