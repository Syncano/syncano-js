import stampit from 'stampit';
import {Meta, Model} from './base';

const DataObjectMeta = Meta({
  name: 'dataobject',
  pluralName: 'dataobjects',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{className}/objects/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{className}/objects/'
    }
  }
});

const DataobjectConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  className: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const DataObject = stampit()
  .compose(Model)
  .setMeta(DataObjectMeta)
  .setConstraints(DataobjectConstraints);

export default DataObject;
