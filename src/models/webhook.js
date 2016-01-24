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
    const WebhookTrace = this.getConfig().WebhookTrace;

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
      'methods': ['get'],
      'path': '/v1/instances/{instanceName}/webhooks/p/{publicLink}/{name}/'
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
      const WebhookTrace = this.getConfig().WebhookTrace;
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('run', this);

      return new Promise((resolve, reject) => {
        this.makeRequest('POST', path, {payload}, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }

          const trace = WebhookTrace.fromJSON(res.body, {
            instanceName: this.instanceName,
            webhookName: this.name
          });

          resolve(trace, res);
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

      return new Promise((resolve, reject) => {
        this.makeRequest('POST', path, {}, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(this.serialize(res.body), res);
        });
      });
    }

  });

export default Webhook;
