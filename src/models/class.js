import stampit from 'stampit';
import {Meta, Model} from './base';

const ClassMeta = Meta({
  name: 'class',
  pluralName: 'classes',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/'
    }
  },
  relatedModels: [ 'DataObject' ]
});

const ClassConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const Class = stampit()
  .compose(Model)
  .setMeta(ClassMeta)
  .setConstraints(ClassConstraints);

export default Class;
