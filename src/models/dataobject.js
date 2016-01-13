import stampit from 'stampit';
import {Meta, Model} from './base';

const DataObjectMeta = Meta({
  name: 'dataobject',
  pluralName: 'dataobjects',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{className}/objects/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/classes/{className}/objects/'
    }
  }
});

const DataObject = stampit()
  .compose(Model)
  .setMeta(DataObjectMeta);

export default DataObject;
