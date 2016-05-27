import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const SubscriptionQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
).methods({

  cancel(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.payload = {payload}
    this.endpoint = 'cancel';

    return this;
  }

});

const SubscriptionMeta = Meta({
  name: 'subscription',
  pluralName: 'subscriptions',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/billing/subscriptions/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/billing/subscriptions/'
    },
    'cancel': {
      'methods': ['post'],
      'path': '/v1.1/billing/subscriptions/{id}/cancel/'
    }
  }
});
/**
 * OO wrapper around Subscription.
 * @constructor
 * @type {Subscription}

 * @property {String} end
 * @property {String} commitment
 * @property {String} start
 * @property {String} pricing
 * @property {Number} id
 * @property {String} plan
 */
const Subscription = stampit()
  .compose(Model)
  .setQuerySet(SubscriptionQuerySet)
  .setMeta(SubscriptionMeta)
  .methods({

    cancel(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('cancel', this);

      return this.makeRequest('POST', path, {payload});
    }

  });

export default Subscription;
