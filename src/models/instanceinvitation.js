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

const InstanceInvitationConstraints = {
  email: {
    presence: true
  },
  role: {
    presence: true
  },
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const InstanceInvitation = stampit()
  .compose(Model)
  .setMeta(InstanceInvitationMeta)
  .setConstraints(InstanceInvitationConstraints);


export default InstanceInvitation;
