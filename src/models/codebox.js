import stampit from 'stampit';
import {Meta, Model} from './base';

const CodeBoxMeta = Meta({
  name: 'codebox',
  pluralName: 'codeboxes',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/'
    },
    'run': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/codeboxes/{id}/run/'
    }
  },
  relatedModels: [ 'CodeBoxTrace' ]
});

const CodeBox = stampit()
  .compose(Model)
  .setMeta(CodeBoxMeta);

export default CodeBox;