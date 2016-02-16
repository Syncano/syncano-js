import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Create, Delete, Update, List, First, Ordering, PageSize} from '../querySet';

const ApiKeyQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Create,
  Delete,
  Update,
  List,
  First,
  Ordering,
  PageSize
);

const ApiKeyMeta = Meta({
  name: 'apiKey',
  pluralName: 'apiKeys',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/api_keys/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/api_keys/'
    }
  }
});

const ApiKeyConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const ApiKey = stampit()
  .compose(Model)
  .setMeta(ApiKeyMeta)
  .setQuerySet(ApiKeyQuerySet)
  .setConstraints(ApiKeyConstraints);

export default ApiKey;
