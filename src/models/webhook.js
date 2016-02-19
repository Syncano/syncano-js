import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';


const WebhookQuerySet = stampit().compose(QuerySet).methods({

  /**
  * Runs Webhook matching the given lookup properties.
  * @memberOf WebhookQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {Promise}

  * @example {@lang javascript}
  * Webhook.please().run({name: 'test', instanceName: 'test-one'}).then(function(trace) {});

  */
  run(properties = {}, payload = {}) {
    const {WebhookTrace} = this.getConfig();

    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'run';
    this.payload = payload;
    this._serialize = false;

    return this.then((trace) => {
      return WebhookTrace.fromJSON(trace, {
        instanceName: this.properties.instanceName,
        webhookName: this.properties.name
      });
    });
  },

  /**
  * Runs `public` Webhook matching the given lookup properties.
  * @memberOf WebhookQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {Promise}

  * @example {@lang javascript}
  * Webhook.please().runPublic({public_link: '44cfc5552eacc', instanceName: 'test-one'}).then(function(trace) {});

  */
  runPublic(properties = {}, payload = {}) {
    const {WebhookTrace} = this.getConfig();

    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'public';
    this.payload = payload;
    this._serialize = false;

    return this.then((trace) => {
      return WebhookTrace.fromJSON(trace, {
        instanceName: this.properties.instanceName,
        webhookName: this.properties.name
      });
    });
  },

  /**
  * Resets Webhook matching the given lookup properties.
  * @memberOf WebhookQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {WebhookQuerySet}

  * @example {@lang javascript}
  * Webhook.please().reset({name: 'test', instanceName: 'test-one'}).then(function(trace) {});

  */
  reset(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'reset';

    return this;
  }

});

const WebhookMeta = Meta({
  name: 'webhook',
  pluralName: 'webhooks',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/webhooks/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/webhooks/'
    },
    'run': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/webhooks/{name}/run/'
    },
    'reset': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/webhooks/{name}/reset_link/'
    },
    'public': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/webhooks/p/{public_link}/'
    }
  },
  relatedModels: ['WebhookTrace']
});

const WebhookConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  codebox: {
    presence: true
  }
};

/**
 * OO wrapper around instance webhooks {@link # endpoint}.
 * @constructor
 * @type {Webhook}

 * @property {String} name
 * @property {String} instanceName
 * @property {String} public_link
 * @property {Boolean} public
 * @property {Number} codebox
 * @property {String} [description = null]
 * @property {String} [links = {}]
 */
const Webhook = stampit()
  .compose(Model)
  .setMeta(WebhookMeta)
  .setQuerySet(WebhookQuerySet)
  .setConstraints(WebhookConstraints)
  .methods({

    /**
    * Runs current Webhook.
    * @memberOf Webhook
    * @instance

    * @param {Object} [payload = {}]
    * @returns {Promise}

    * @example {@lang javascript}
    * Webhook.please().get({instanceName: 'test-one', id: 1}).then(function(codebox) {
        codebox.run({some: 'variable'}).then(function(trace) {});
      });
    */
    run(payload = {}) {
      const {WebhookTrace} = this.getConfig();
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('run', this);

      return this.makeRequest('POST', path, {payload})
        .then((body) => {
          return WebhookTrace.fromJSON(body, {
            instanceName: this.instanceName,
            webhookName: this.name
          });
        });
    },

    /**
    * Runs current `public` Webhook.
    * @memberOf Webhook
    * @instance

    * @param {Object} [payload = {}]
    * @returns {Promise}

    * @example {@lang javascript}
    * Webhook.please().get({instanceName: 'test-one', id: 1}).then(function(codebox) {
        codebox.runPublic({some: 'variable'}).then(function(trace) {});
      });
    */
    runPublic(payload = {}) {
      const {WebhookTrace} = this.getConfig();
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('public', this);

      return this.makeRequest('POST', path, {payload})
        .then((body) => {
          return WebhookTrace.fromJSON(body, {
            instanceName: this.instanceName,
            webhookName: this.name
          });
        });
    },

    /**
    * Resets current Webhook.
    * @memberOf Webhook
    * @instance
    * @returns {Promise}

    * @example {@lang javascript}
    * Webhook.please().get({instanceName: 'test-one', name: 'test'}).then(function(webhook) {
        webhook.reset().then(function() {});
      });
    */
    reset() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('reset', this);

      return this.makeRequest('POST', path).then((body) => this.serialize(body));
    }

  });

export default Webhook;
