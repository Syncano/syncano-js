import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';
import _ from 'lodash';

const PlanQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
).methods({

  subscribe(properties = {}, commitment = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.payload = {commitment}
    this.endpoint = 'subscribe';

    return this;
  }

});

const PlanMeta = Meta({
  name: 'plan',
  pluralName: 'plans',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/billing/plans/{name}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/billing/plans/'
    },
    'subscribe': {
      'methods': ['post'],
      'path': '/v1.1/billing/plans/{name}/subscribe/'
    }
  }
});
/**
 * OO wrapper around Plan.
 * @constructor
 * @type {Subscription}

 * @property {String} name
 * @property {Object} pricing
 * @property {Object} options
 */
const Plan = stampit()
  .compose(Model)
  .setQuerySet(PlanQuerySet)
  .setMeta(PlanMeta)
  .methods({

    subscribe(commitment = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('subscribe', this);

      return this.makeRequest('POST', path, {commitment});
    }

  });

export default Plan;
