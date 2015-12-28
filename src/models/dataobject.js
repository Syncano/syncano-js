import stampit from 'stampit';
import {Meta, Model} from './base';

const DataObjectMeta = Meta({
  name: 'dataobject',
  pluralName: 'dataobjects',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/classes/{class}/objects/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/classes/{class}/objects/'
    }
  }
});

const DataObject = stampit()
  .compose(Model)
  .setMeta(DataObjectMeta);

export default DataObject;
