import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Total} from '../querySet';

const DailyUsageQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Total
);

const DailyUsageMeta = Meta({
  name: 'dailyusage',
  pluralName: 'dailyusages',
  endpoints: {
    'list': {
      'methods': ['get'],
      'path': '/v1.1/usage/daily/'
    }
  }
});
/**
 * OO wrapper around DailyUsage.
 * @constructor
 * @type {DailyUsage}
 */
const DailyUsage = stampit()
  .compose(Model)
  .setQuerySet(DailyUsageQuerySet)
  .setMeta(DailyUsageMeta);

export default DailyUsage;
