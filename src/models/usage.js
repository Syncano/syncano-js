import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get} from '../querySet';

const UsageQuerySet = stampit().compose(
  BaseQuerySet,
  Get
);

const UsageMeta = Meta({
  name: 'usage',
  pluralName: 'usages',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/usage/'
    }
  }
});
/**
 * OO wrapper around Usage.
 * @constructor
 * @type {Usage}
 */
const Usage = stampit()
  .compose(Model)
  .setQuerySet(UsageQuerySet)
  .setMeta(UsageMeta);

export default Usage;
