import stampit from 'stampit';
import _ from 'lodash';
import {Meta, Model} from './base';
import QuerySet from '../querySet';


const CodeBoxQuerySet = stampit().compose(QuerySet).methods({

  /**
  * Runs CodeBox matching the given lookup properties.
  * @memberOf CodeBoxQuerySet
  * @instance

  * @param {Object} properties lookup properties used for path resolving
  * @returns {CodeBoxQuerySet}

  * @example {@lang javascript}
  * CodeBox.please().run({id: 1, instanceName: 'test-one'}).then(function(trace) {});

  */
  run(properties = {}, payload = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'POST';
    this.endpoint = 'run';
    this.payload = payload;
    this._serialize = false;

    return this;
  }

});


const CodeBoxMeta = Meta({
  name: 'codebox',
  pluralName: 'codeboxes',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/{id}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/codeboxes/'
    },
    'run': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/codeboxes/{id}/run/'
    }
  },
  relatedModels: [ 'CodeBoxTrace' ]
});

/**
 * OO wrapper around codeboxes {@link http://docs.syncano.com/v4.0/docs/codebox-list-codeboxes endpoint}.
 * **CodeBox** has special method called ``run`` which will execute attached source code.
 * @constructor
 * @type {CodeBox}

 * @property {Number} id
 * @property {String} instanceName
 * @property {String} label
 * @property {String} source
 * @property {String} runtime_name
 * @property {String} [description = null]
 * @property {String} [links = {}]
 * @property {String} [created_at = null]
 * @property {String} [updated_at = null]
 */
const CodeBox = stampit()
  .compose(Model)
  .setMeta(CodeBoxMeta)
  .setQuerySet(CodeBoxQuerySet)
  .methods({

    /**
    * Runs current CodeBox.
    * @memberOf CodeBox
    * @instance

    * @param {Object} [payload = {}]
    * @returns {Promise}

    * @example {@lang javascript}
    * CodeBox.please().get({instanceName: 'test-one', id: 1}).then(function(codebox) {
    *   codebox.run({some: 'variable'}).then(function(trace) {});
    * });
    */
    run(payload = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('run', this);

      return new Promise((resolve, reject) => {
        this.makeRequest('POST', path, {payload}, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(res.body, res);
        });
      });
    }

  });

export default CodeBox;
