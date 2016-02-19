import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';

const InstanceQuerySet = stampit().compose(QuerySet).methods({

  rename(properties = {}, object = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = object;

    this.method = 'POST';
    this.endpoint = 'rename';
    return this;
  }

});

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
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1/instances/{name}/rename/'
    }
  },
  relatedModels: [
    'Admin', 'Class', 'CodeBox', 'Schedule', 'InstanceInvitation', 'ApiKey'
    , 'Trigger', 'Webhook', 'User', 'Group', 'GCMDevice', 'Channel'
    , 'APNSDevice', 'Template'
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
  .methods({

    rename(payload = { new_name: this.name }) {
      const options = {payload};
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('rename', this);

      return this.makeRequest('POST', path, options);
    }

  })
  .setQuerySet(InstanceQuerySet)
  .setConstraints(InstanceConstraints)

export default Instance;
