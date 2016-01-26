import stampit from 'stampit';
import {Meta, Model} from './base';

const GCMConfigMeta = Meta({
  name: 'gcmconfig',
  pluralName: 'gcmconfig',
  endpoints: {
    'detail': {
      'methods': ['post', 'get', 'patch', 'put'],
      'path': '/v1/instances/{instanceName}/push_notifications/gcm/config/'
    }
  }
});

const GCMConfigConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const GCMConfig = stampit()
  .compose(Model)
  .setMeta(GCMConfigMeta)
  .setConstraints(GCMConfigConstraints);

export default GCMConfig;
