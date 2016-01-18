import stampit from 'stampit';
import {Meta, Model} from './base';

const AdminMeta = Meta({
  name: 'admin',
  pluralName: 'admins',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/admins/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/admins/'
    }
  }
});

const Admin = stampit()
  .compose(Model)
  .setMeta(AdminMeta);

export default Admin;
