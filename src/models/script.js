import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';


const ScriptQuerySet = stampit().compose(QuerySet).methods({

  /**
  * Runs Script matching the given lookup properties.
  * @memberOf ScriptQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {ScriptQuerySet}

  * @example {@lang javascript}
  * Script.please().run({id: 1, instanceName: 'test-one'}).then(function(trace) {});

  */
  run(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'run';
    this.payload = payload;
    this._serialize = false;

    return this;
  },

  /**
  * Gets allowed runtimes.
  * @memberOf ScriptQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {ScriptQuerySet}

  * @example {@lang javascript}
  * Script.please().runtimes({instanceName: 'test-one'}).then(function(trace) {});

  */
  getRuntimes(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'runtimes';
    this._serialize = false;

    return this;
  }

});


const ScriptMeta = Meta({
  name: 'script',
  pluralName: 'scripts',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/scripts/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/scripts/'
    },
    'runtimes': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/scripts/runtimes/'
    },
    'run': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/snippets/scripts/{id}/run/'
    }
  },
  relatedModels: [ 'ScriptTrace' ]
});

const ScriptConstraints = {
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  runtime_name: {
    presence: true,
    inclusion: ['golang', 'nodejs_library_v1.0', 'ruby', 'nodejs_library_v0.4', 'python_library_v4.2', 'python_library_v5.0', 'php', 'swift']
  },
  source: {
    string: true
  },
  config: {
    object: true
  },
  label: {
    presence: true,
    string: true
  },
  description: {
    string: true
  }
}

/**
 * OO wrapper around scripts {@link http://docs.syncano.com/v4.0/docs/codebox-list-codeboxes endpoint}.
 * **Script** has special method called ``run`` which will execute attached source code.
 * @constructor
 * @type {Script}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} label
 * @property {String} source
 * @property {String} runtime_name
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {Date} [created_at = null]
 * @property {Date} [updated_at = null]
 */
const Script = stampit()
  .compose(Model)
  .setMeta(ScriptMeta)
  .setConstraints(ScriptConstraints)
  .setQuerySet(ScriptQuerySet)
  .methods({

    /**
    * Runs current Script.
    * @memberOf Script
    * @instance

    * @param {Object} [payload = {}]
    * @returns {Promise}

    * @example {@lang javascript}
    * Script.please().get({instanceName: 'test-one', id: 1}).then(function(script) {
    *   script.run({some: 'variable'}).then(function(trace) {});
    * });
    */
    run(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('run', this);

      return this.makeRequest('POST', path, {payload});
    },

    /**
    * Gets allowed runtimes.
    * @memberOf Script
    * @instance

    * @returns {Promise}

    * @example {@lang javascript}
    * Script.please().runtimes({instanceName: 'test-one', id: 1}).then(function(script) {
    *   script.runtimes().then(function(runtimes) {});
    * });
    */
    getRuntimes() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('runtimes', this);

      return this.makeRequest('GET', path);
    }

  });

export default Script;
