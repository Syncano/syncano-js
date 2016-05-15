import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const InvoiceQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  List
);

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

const Invoice = stampit()
  .compose(Model)
  .setQuerySet(InvoiceQuerySet)
  .setMeta(InvoiceMeta);

export default Invoice;
