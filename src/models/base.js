import stampit from 'stampit';
import Promise from 'bluebird';
import _ from 'lodash';
import validate from 'validate.js';
import QuerySet from '../querySet';
import Request from '../request';
import {ValidationError} from '../errors';
import {ConfigMixin, MetaMixin, ConstraintsMixin} from '../utils';

validate.Promise = Promise;

validate.validators.object = function(value) {
  if(value) {
    if(!validate.isObject(value)) {
      return "is not an object";
    }
  }
  return null;
}

validate.validators.array = function(value) {
  if(value) {
    if(!validate.isArray(value)) {
      return "is not an array";
    }
  }
  return null;
}

validate.validators.boolean = function(value) {
  if(value) {
    if(typeof value !== 'boolean') {
      return "is not a boolean";
    }
  }
  return null;
}

validate.validators.string = function(value) {
  if(value) {
    if(!validate.isString(value)) {
      return "is not a string";
    }
  }
  return null;
}

/**
 * Object which holds whole configuration for {@link Model}.

 * @constructor
 * @type {Meta}

 * @property {String} [name = null]
 * @property {String} [pluralName = null]
 * @property {Array}  [properties = []]
 * @property {Array}  [endpoints = {}]
 * @property {Array}  [relatedModels = undefined]

 * @example {@lang javascript}
 * var MyMeta = Meta({name: 'test'});
 * var MyModel = SomeModel.setMeta(MyMeta);
 */
export const Meta = stampit()
  .props({
    name: null,
    pluralName: null,
    properties: [],
    endpoints: {}
  })
  .init(function({ instance }) {
    _.forEach(instance.endpoints, (value) => {
      value.properties = this.getPathProperties(value.path);
      instance.properties = _.union(instance.properties, value.properties);
    });
  })
  .methods({

    /**
    * Gets required properties from object. Used mostly during serialization.
    * @memberOf Meta
    * @instance
    * @param {Object} object
    * @returns {Object}
    */
    getObjectProperties(object) {
      return _.reduce(this.properties, (result, property) => {
        result[property] = object[property];
        return result;
      }, {});
    },

    /**
    * Makes a copy of target and adds required properties from source.

    * @memberOf Meta
    * @instance

    * @param {Object} source
    * @param {Object} target

    * @returns {Object}
    */
    assignProperties(source, target) {
      const dateFields = _.mapValues(_.pick(target, ['created_at', 'updated_at', 'executed_at']), (o) =>  new Date(o));
      return _.assign({}, this.getObjectProperties(source), target, dateFields);
    },

    getPathProperties(path) {
      const re = /{([^}]*)}/gi;
      let match = null;
      let result = [];

      while ((match = re.exec(path)) !== null) {
        result.push(match[1]);
      }

      return result;
    },

    /**
    * Resolves endpoint path e.g: `/v1.1/instances/{name}/` will be converted to `/v1.1/instances/someName/`.

    * @memberOf Meta
    * @instance

    * @param {String} endpointName
    * @param {Object} properties

    * @returns {String}
    */
    resolveEndpointPath(endpointName, properties) {
      if (_.isEmpty(this.endpoints[endpointName])) {
        return Promise.reject(new Error(`Invalid endpoint name: "${endpointName}".`));
      }

      const endpoint = this.endpoints[endpointName];
      const diff = _.difference(endpoint.properties, _.keys(properties));
      let path = endpoint.path;

      if (diff.length) {
        return Promise.reject(new Error(`Missing path properties "${diff.join()}" for "${endpointName}" endpoint.`));
      }

      _.forEach(endpoint.properties, (property) => {
        path = path.replace(`{${property}}`, properties[property]);
      });

      return path;
    },

    /**
    * Looks for the first allowed method from `methodNames` for selected endpoint.

    * @memberOf Meta
    * @instance

    * @param {String} endpointName
    * @param {...String} methodNames

    * @returns {String}
    */
    findAllowedMethod(endpointName, ...methodNames) {
      const endpoint = this.endpoints[endpointName];
      const methods = _.intersection(_.map(methodNames, (m) => m.toLowerCase()), endpoint.methods);

      if (_.isEmpty(methods)) {
        return Promise.reject(new Error(`Unsupported request methods: ${methodNames.join()}.`));
      }

      return methods[0];
    }
  });

/**
 * Base {@link https://github.com/stampit-org/stampit|stamp} for all models which wraps all raw JavaScript objects.
 * **Not** meant to be used directly more like mixin in other {@link https://github.com/stampit-org/stampit|stamps}.

 * @constructor
 * @type {Model}

 * @property {Syncano} _config private attribute which holds {@link Syncano} object
 * @property {Meta} _meta private attribute which holds {@link Meta} object
 * @property {Object} _constraints private attribute which holds validation constraints
 * @property {Request} _request private attribute which holds {@link Request} configuration
 * @property {Request} _querySet private attribute which holds {@link QuerySet} stamp

 * @example {@lang javascript}
 * var MyModel = stampit()
    .compose(Model)
    .setMeta(MyMeta)
    .setConstraints(MyConstraints);
 */
export const Model = stampit({
  refs: {
    _querySet: QuerySet
  },

  static: {
    /**
    * Sets {@link QuerySet} and returns new {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf Model
    * @static

    * @param {QuerySet} querySet {@link QuerySet} definition
    * @returns {Model}

    * @example {@lang javascript}
    * var MyStamp = stampit().compose(Model).setQuerySet({});

    */
    setQuerySet(querySet) {
      return this.refs({_querySet: querySet});
    },

    /**
    * Gets {@link QuerySet} from {@link https://github.com/stampit-org/stampit|stampit} definition.

    * @memberOf Model
    * @static
    * @returns {QuerySet}

    * @example {@lang javascript}
    * var querySet = stampit().compose(Model).getQuerySet();

    */
    getQuerySet() {
      return this.fixed.refs._querySet;
    },

    /**
    * Returns {@link QuerySet} instance which allows to do ORM like operations on {@link https://syncano.io/|Syncano} API.

    * @memberOf Model
    * @static

    * @param {Object} [properties = {}] some default properties for all ORM operations
    * @returns {QuerySet}

    * @example {@lang javascript}
    * MyModel.please().list();

    */
    please(properties = {}) {
      const querySet = this.getQuerySet();
      const defaultProps = _.assign({}, this.getDefaultProperties(), properties);
      return querySet({
        model: this,
        properties: defaultProps,
        _config: this.getConfig()
      });
    },

    /**
    * Used only for serialization for raw object to {@link https://github.com/stampit-org/stampit|stamp}.

    * @memberOf Model
    * @static

    * @param {Object} rawJSON
    * @param {Object} [properties = {}] some default properties which will be assigned to model instance
    * @returns {Model}

    */
    fromJSON(rawJSON, properties = {}) {
      const meta = this.getMeta();
      const attrs = meta.assignProperties(properties, rawJSON);
      return this(attrs);
    }
  },
  methods: {

    /**
    * Checks if model instance if already saved.
    * @memberOf Model
    * @instance
    * @returns {Boolean}
    */
    isNew() {
      return !_.has(this, 'links');
    },

    /**
    * Validates current model instance in context of defined constraints.
    * @memberOf Model
    * @instance
    * @returns {Object|undefined}
    */
    validate() {
      const constraints = this.getConstraints();
      const attributes = this.toJSON();

      if (_.isEmpty(constraints)) {
        return;
      }

      return validate(attributes, constraints);
    },

    /**
    * Serializes raw JavaScript object into {@link Model} instance.
    * @memberOf Model
    * @instance
    * @returns {Model}
    */
    serialize(object) {
      const meta = this.getMeta();
      return this.getStamp()(meta.assignProperties(this, object));
    },

    /**
    * Creates or updates the current instance.
    * @memberOf Model
    * @instance
    * @returns {Promise}
    */
    save() {
      const meta = this.getMeta();
      const errors = this.validate();
      let path = null;
      let endpoint = 'list';
      let method = 'POST';
      let payload = this.toJSON();

      if (!_.isEmpty(errors)) {
        return Promise.reject(new ValidationError(errors));
      }

      try {
        if (!this.isNew()) {
          endpoint = 'detail';
          method = meta.findAllowedMethod(endpoint, 'PUT', 'PATCH', 'POST');
        }

        path = meta.resolveEndpointPath(endpoint, this);
      } catch(err) {
        return Promise.reject(err);
      }

      return this.makeRequest(method, path, {payload}).then((body) => this.serialize(body));
    },

    /**
    * Removes the current instance.
    * @memberOf Model
    * @instance
    * @returns {Promise}
    */
    delete() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('detail', this);

      return this.makeRequest('DELETE', path);
    },

    toJSON() {
      const attrs = [
        // Private stuff
        '_config',
        '_meta',
        '_request',
        '_constraints',
        '_querySet',

        // Read only stuff
        'links',
        'created_at',
        'updated_at'
      ];

      return _.omit(this, attrs.concat(_.functions(this)));
    }
  }
})
.init(({instance, stamp}) => {
  if (!stamp.fixed.methods.getStamp) {
    stamp.fixed.methods.getStamp = () => stamp;
  }
  if(_.has(instance, '_meta.relatedModels')) {
    const relatedModels = instance._meta.relatedModels;
    const properties = instance._meta.properties.slice();
    const last = _.last(properties);
    const lastIndex = _.lastIndexOf(properties, last);
    properties[lastIndex] = _.camelCase(`${instance._meta.name} ${last}`);
    let map = {};
    map[last] = properties[lastIndex];

    map = _.reduce(properties, (result, property) => {
      result[property] = property;
      return result;
    }, map);

    _.forEach(instance.getConfig(), (model, name) => {
      if(_.includes(relatedModels, name)) {

        instance[model.getMeta().pluralName] = (_properties = {}) => {

          const parentProperties = _.reduce(map, (result, target, source) => {
            const value = _.get(instance, source, null);

            if (value !== null) {
              result[target] = value;
            }

            return result;
          }, {});

          return stampit().compose(model).please(_.assign(parentProperties, _properties));
        };
      }
    });
  }
  if(_.has(instance, '_config')) _.defaults(instance, instance.getDefaultProperties());
})
.compose(ConfigMixin, MetaMixin, ConstraintsMixin, Request);

export default Model;
