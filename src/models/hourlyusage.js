import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, List, Total, StartDate, EndDate, CurrentMonth} from '../querySet';

const HourlyUsageQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Total,
  StartDate,
  EndDate,
  CurrentMonth
);

const HourlyUsageMeta = Meta({
  name: 'hourlyusage',
  pluralName: 'hourlyusages',
  endpoints: {
    'list': {
      'methods': ['get'],
      'path': '/v1.1/usage/hourly/'
    }
  }
});
/**
 * OO wrapper around HourlyUsage.
 * @constructor
 * @type {HourlyUsage}
 */
const HourlyUsage = stampit()
  .compose(Model)
  .setQuerySet(HourlyUsageQuerySet)
  .setMeta(HourlyUsageMeta);

export default HourlyUsage;
