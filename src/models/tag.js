import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, List} from '../querySet';

const TagQuerySet = stampit().compose(
  BaseQuerySet,
  List,
  Get
);

const TagMeta = Meta({
  name: 'tag',
  pluralName: 'tags',
  endpoints: {
    'detail': {
      'methods': ['get'],
      'path': '/v1.1/marketplace/tags/{name}/'
    },
    'list': {
      'methods': ['get'],
      'path': '/v1.1/marketplace/tags/'
    }
  }
});
/**
 * OO wrapper around Tag.
 * @constructor
 * @type {Tag}
 */
const Tag = stampit()
  .compose(Model)
  .setQuerySet(TagQuerySet)
  .setMeta(TagMeta);

export default Tag;
