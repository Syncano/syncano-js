import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const InvoiceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
).methods({

  pdf(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'GET';
    this.endpoint = 'pdf';

    return this;
  },

  retryPayment(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.payload = {payload}
    this.endpoint = 'retryPayment';

    return this;
  }

});

const InvoiceMeta = Meta({
  name: 'invoice',
  pluralName: 'invoices',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/billing/invoices/{id}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/billing/invoices/'
    },
    'pdf': {
      'methods': ['get'],
      'path': '/v1.1/billing/invoices/{id}/pdf/'
    },
    'retryPayment': {
      'methods': ['post'],
      'path': '/v1.1/billing/invoices/{id}/retry_payment/'
    }
  }
});
/**
 * OO wrapper around Invoice.
 * @constructor
 * @type {Invoice}

 * @property {String} status
 * @property {Array} items
 * @property {String} period
 * @property {String} amount
 * @property {Number} id
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Invoice = stampit()
  .compose(Model)
  .setQuerySet(InvoiceQuerySet)
  .setMeta(InvoiceMeta)
  .methods({

    pdf() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('pdf', this);

      return this.makeRequest('POST', path);
    },

    retryPayment(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('retryPayment', this);

      return this.makeRequest('POST', path, {payload});
    }

  });

export default Invoice;
