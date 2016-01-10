import stampit from 'stampit';
import {Meta, Model} from './base';
import instance_models from './instance_models';
import _ from 'lodash';

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
  }
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
  .init(function() {
    _.forEach(instance_models, (model, name) => {
      this[name] = model.setConfig(this.getConfig()).setProperties({instance: this.name}).please();
    });
  });

export default Instance;
