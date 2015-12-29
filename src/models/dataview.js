import stampit from 'stampit';
import {Meta, Model} from './base';

const DataViewMeta = Meta({
  name: 'dataview',
  pluralName: 'dataviews',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instance}/api/objects/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instance}/api/objects/'
    },
    'get': {
      'methods': ['get'],
      'path': '/v1/instances/{instance}/api/objects/{name}/get/'
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1/instances/{instance}/api/objects/{name}/rename/'
    },
    'clear_cache': {
      'methods': ['post'],
      'path': '/v1/instances/{instance}/api/objects/{name}/clear_cache/'
    }
  }
});

const DataView = stampit()
  .compose(Model)
  .setMeta(DataViewMeta);

export default DataView;
