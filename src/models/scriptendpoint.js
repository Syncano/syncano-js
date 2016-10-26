import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';


const ScriptEndpointQuerySet = stampit().compose(QuerySet).methods({

  /**
  * Runs ScriptEndpoint matching the given lookup properties.
  * @memberOf ScriptEndpointQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @param {Object} payload the payload to be sent
  * @returns {Promise}

  * @example {@lang javascript}
  * ScriptEndpoint.please().run({name: 'test', instanceName: 'test-one'}).then(function(trace) {});

  */
  run(properties = {}, payload = {}) {
    const {ScriptEndpointTrace} = this.getConfig();

    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'run';
    this.payload = payload;
    this._serialize = false;

    return this.then((trace) => {
      return ScriptEndpointTrace.fromJSON(trace, {
        instanceName: this.properties.instanceName,
        webhookName: this.properties.name
      });
    });
  }
});

const ScriptEndpointMeta = Meta({
  name: 'scriptendpoint',
  pluralName: 'scriptendpoints',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v2/instances/{instanceName}/endpoints/scripts/{name}/edit/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v2/instances/{instanceName}/endpoints/scripts/'
    },
    'run': {
      'methods': ['post', 'get'],
      'path': '/v2/instances/{instanceName}/endpoints/scripts/{name}/'
    }
  },
  relatedModels: ['ScriptEndpointTrace']
});

const ScriptEndpointConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  name: {
    presence: true,
    string: true,
    length: {
      minimum: 5
    }
  },
  description: {
    string: true
  },
  public: {
    boolean: true
  },
  script: {
    presence: true,
    numericality: true
  }
};

/**
 * OO wrapper around instance webhooks {@link # endpoint}.
 * @constructor
 * @type {ScriptEndpoint}

 * @property {String} name
 * @property {String} instanceName
 * @property {String} public_link
 * @property {Boolean} public
 * @property {Number} codebox
 * @property {String} [description = null]
 * @property {String} [links = {}]
 */
const ScriptEndpoint = stampit()
  .compose(Model)
  .setMeta(ScriptEndpointMeta)
  .setQuerySet(ScriptEndpointQuerySet)
  .setConstraints(ScriptEndpointConstraints)
  .methods({

    /**
    * Runs current ScriptEndpoint.
    * @memberOf ScriptEndpoint
    * @instance

    * @param {Object} [payload = {}]
    * @returns {Promise}

    * @example {@lang javascript}
    * ScriptEndpoint.please().get({instanceName: 'test-one', id: 1}).then(function(codebox) {
        codebox.run({some: 'variable'}).then(function(trace) {});
      });
    */
    run(payload = {}, cache_key) {
      const {ScriptEndpointTrace} = this.getConfig();
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('run', this);

      if(!_.isEmpty(cache_key)) _.assign(payload, { query: {cache_key} })

      return this.makeRequest('POST', path, {payload})
        .then((body) => {
          return ScriptEndpointTrace.fromJSON(body, {
            instanceName: this.instanceName,
            webhookName: this.name
          });
        });
    }
  });

export default ScriptEndpoint;
