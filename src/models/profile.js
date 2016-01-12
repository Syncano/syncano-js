import stampit from 'stampit';
import {Meta, Model} from './base';

const ProfileMeta = Meta({
  name: 'profile',
  pluralName: 'profiles',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{class}/objects/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{class}/objects/'
    }
  }
});

const Profile = stampit()
  .compose(Model)
  .setMeta(ProfileMeta);

export default Profile;
