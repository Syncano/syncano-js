import stampit from 'stampit';
import {Meta, Model} from './base';

const CodeBoxTraceMeta = Meta({
  name: 'codeboxtrace',
  pluralName: 'codeboxtraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{codeboxId}/traces/{traceId}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{codeboxId}/traces/'
    }
  }
});

const CodeBoxTrace = stampit()
  .compose(Model)
  .setMeta(CodeBoxTraceMeta);

export default CodeBoxTrace;
