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
  },
  relatedModels: [
    'Admin', 'Class', 'CodeBox', 'Schedule', 'InstanceInvitation', 'ApiKey'
    , 'Trigger', 'Webhook', 'User', 'Group', 'GCMDevice', 'Channel'
    , 'APNSDevice'
  ]
});

const InstanceConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const Instance = stampit()
  .compose(Model)
  .setMeta(InstanceMeta)
  .setConstraints(InstanceConstraints)

export default Instance;
