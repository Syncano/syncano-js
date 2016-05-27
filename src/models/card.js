import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Update, Create, Delete} from '../querySet';

const CardQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Update,
  Create,
  Delete
);

const CardMeta = Meta({
  name: 'card',
  pluralName: 'card',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch', 'delete'],
      'path': '/v1.1/billing/card/'
    },
    'list': {
      'methods': ['post'],
      'path': '/v1.1/billing/card/'
    }
  }
});

/**
 * OO wrapper around Card.
 * @constructor
 * @type {Card}

 * @property {String} name
 * @property {String} address_zip
 * @property {String} address_state
 * @property {String} address_country
 * @property {String} address_line2
 * @property {String} address_line1
 * @property {String} address_city
 */
const Card = stampit()
  .compose(Model)
  .setQuerySet(CardQuerySet)
  .setMeta(CardMeta);

export default Card;
