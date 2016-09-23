import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials, createCleaner} from './utils';
import Stripe from 'stripe';

describe('Card', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('Card');
  const stripe = Stripe(process.env.STRIPE_KEY);
  let token = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Card;

    return stripe.tokens.create({
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2017,
        cvc: 123
      }
    }, (err, resp) => {
      token = resp.id;
      return Instance.please().create({name: instanceName});
    });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Instance.please().list().then((Models) => {
        should(Models).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {
      return Model.please().create({token})
        .then((Model) => {
          should(Model).have.property('name').which.is.Null();
          should(Model).have.property('address_line1').which.is.Null();
          should(Model).have.property('address_line1_check').which.is.Null();
          should(Model).have.property('address_line2').which.is.Null();
          should(Model).have.property('address_zip').which.is.Null();
          should(Model).have.property('address_zip_check').which.is.Null();
          should(Model).have.property('address_state').which.is.Null();
          should(Model).have.property('address_country').which.is.Null();
          should(Model).have.property('address_city').which.is.Null();
          should(Model).have.property('dynamic_last4').which.is.Null();
          should(Model).have.property('exp_month').which.is.Number().equal(12);
          should(Model).have.property('last4').which.is.String().equal('4242');
          should(Model).have.property('exp_year').which.is.Number().equal(2017);
          should(Model).have.property('funding').which.is.String().equal('credit');
          should(Model).have.property('brand').which.is.String().equal('Visa');
          should(Model).have.property('cvc_check').which.is.String().equal('pass');
          should(Model).have.property('country').which.is.String().equal('US');
          should(Model).have.property('fingerprint').which.is.String();
          should(Model).have.property('id').which.is.String();
          should(Model).have.property('links').which.is.Object();
        });
    });

    it('should be able to get a Model', function() {
      return Model.please().get()
        .then((Model) => {
          should(Model).have.property('name').which.is.Null();
          should(Model).have.property('address_line1').which.is.Null();
          should(Model).have.property('address_line1_check').which.is.Null();
          should(Model).have.property('address_line2').which.is.Null();
          should(Model).have.property('address_zip').which.is.Null();
          should(Model).have.property('address_zip_check').which.is.Null();
          should(Model).have.property('address_state').which.is.Null();
          should(Model).have.property('address_country').which.is.Null();
          should(Model).have.property('address_city').which.is.Null();
          should(Model).have.property('dynamic_last4').which.is.Null();
          should(Model).have.property('exp_month').which.is.Number().equal(12);
          should(Model).have.property('last4').which.is.String().equal('4242');
          should(Model).have.property('exp_year').which.is.Number().equal(2017);
          should(Model).have.property('funding').which.is.String().equal('credit');
          should(Model).have.property('brand').which.is.String().equal('Visa');
          should(Model).have.property('cvc_check').which.is.String().equal('pass');
          should(Model).have.property('country').which.is.String().equal('US');
          should(Model).have.property('fingerprint').which.is.String();
          should(Model).have.property('id').which.is.String();
          should(Model).have.property('links').which.is.Object();
        });
    });

    it('should be able to update a Model', function() {
      return Model.please().update({}, { name: 'John'})
        .then((Model) => {
          should(Model).have.property('name').which.is.String().equal('John');
        });
    });

    it('should be able to delete a Model', function() {
      return Model.please().delete().request();
    });

  });


});
