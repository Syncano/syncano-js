import stampit from 'stampit';
import {Meta, Model} from './base';
import {Get, List} from '../querySet';

const CodeBoxTraceQuerySet = stampit().compose(
  Get,
  List
);

const CodeBoxTraceMeta = Meta({
  name: 'codeboxtrace',
  pluralName: 'codeboxtraces',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{codeboxId}/traces/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{codeboxId}/traces/'
    }
  }
});

const CodeBoxConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  codeboxId: {
    presence: true
  }
};

const CodeBoxTrace = stampit()
  .compose(Model)
  .setQuerySet(CodeBoxTraceQuerySet)
  .setConstraints(CodeBoxConstraints)
  .setMeta(CodeBoxTraceMeta);

export default CodeBoxTrace;
