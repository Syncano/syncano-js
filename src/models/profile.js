import stampit from 'stampit';
import {Meta, Model} from './base';
import {BaseQuerySet, Get, Update} from '../querySet';

const ProfileQuerySet = stampit().compose(
  BaseQuerySet,
  Get,
  Update
);

const ProfileMeta = Meta({
  name: 'profile',
  pluralName: 'profiles',
  endpoints: {
    'detail': {
      'methods': ['get', 'put', 'patch'],
      'path': '/v1.1/billing/profile/'
    }
  }
});
/**
 * OO wrapper around Profile.
 * @constructor
 * @type {Invoice}

 * @property {Object} balance
 * @property {Object} subscription
 * @property {String} hard_limit
 * @property {String} soft_limit
 * @property {String} company_name
 * @property {String} first_name
 * @property {String} last_name
 * @property {String} address_line1
 * @property {String} address_line2
 * @property {String} address_city
 * @property {String} address_state
 * @property {String} address_zip
 * @property {String} address_country
 * @property {String} tax_number
 * @property {String} [failed_invoice = null]
 */
const Profile = stampit()
  .compose(Model)
  .setQuerySet(ProfileQuerySet)
  .setMeta(ProfileMeta);

export default Profile;
