import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List} from '../querySet';

const CustomSocketQuerySet = stampit().compose(
  BaseQuerySet,
  List
);

const CustomSocketMeta = Meta({
  name: 'customsocket',
  pluralName: 'customsockets',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/instances/{instanceName}/sockets/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/sockets/'
    }
  }
});

const CostomSocketConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  endpoints: {
    presence: true,
    object: true
  },
  dependencies: {
    presence: true,
    object: true
  }
};

/**
 * OO wrapper around CustomSocket.
 * @constructor
 * @type {CustomSocket}

 */
const CustomSocket = stampit()
  .compose(Model)
  .setQuerySet(CustomSocketQuerySet)
  .setMeta(CustomSocketMeta)
  .setConstraints(CostomSocketConstraints)

export default CustomSocket;
