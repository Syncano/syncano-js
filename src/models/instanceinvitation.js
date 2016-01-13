import stampit from 'stampit';
import {Meta, Model} from './base';

const InstanceInvitationMeta = Meta({
  name: 'invitation',
  pluralName: 'invitations',
  endpoints: {
    'detail': {
      'methods': ['delete', 'get'],
      'path': '/v1/instances/{instanceName}/invitations/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/invitations/'
    }
  }
});

const InstanceInvitation = stampit()
  .compose(Model)
  .setMeta(InstanceInvitationMeta);

export default InstanceInvitation;
