import stampit from 'stampit';
import Promise from 'bluebird';
import _ from 'lodash';
import validate from 'validate.js';
import QuerySet from '../querySet';
import Request from '../request';
import {ValidationError} from '../errors';
import {ConfigMixin, MetaMixin, ConstraintsMixin} from '../utils';

validate.Promise = Promise;


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
    getObjectProperties(object) {
      return _.reduce(this.properties, (result, property) => {
        result[property] = object[property];
        return result;
      }, {});
    },

    assingProperties(source, target) {
      return _.assign({}, this.getObjectProperties(source), target);
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

    resolveEndpointPath(endpointName, properties) {
      if (_.isEmpty(this.endpoints[endpointName])) {
        throw new Error(`Invalid endpoit name: "${endpointName}".`);
      }

      const endpoint = this.endpoints[endpointName];
      const diff = _.difference(endpoint.properties, _.keys(properties));
      let path = endpoint.path;

      if (diff.length > 0) {
        throw new Error(`Missing path properties "${diff.join()}" for "${endpointName}" endpoint.`)
      }

      _.forEach(endpoint.properties, (property) => {
        path = path.replace(`{${property}}`, properties[property]);
      });

      return path;
    },

    findAllowedMethod(endpointName, ...methodNames) {
      const endpoint = this.endpoints[endpointName];
      const methods = _.intersection(_.map(methodNames, (m) => m.toLowerCase()), endpoint.methods);

      if (_.isEmpty(methods)) {
        throw Error(`Unsupported request methods: ${methodNames.join()}.`);
      }

      return methods[0];
    }
  });

export const Model = stampit({
  static: {
    please(properties = {}) {
      return QuerySet({
        model: this,
        properties: properties,
        _config: this.getConfig()
      });
    },

    fromJSON(rawJSON, properties = {}) {
      const meta = this.getMeta();
      const attrs = meta.assingProperties(properties, rawJSON);
      return this(attrs);
    }
  },
  methods: {
    isNew() {
      return !_.has(this, 'links');
    },

    validate() {
      const constraints = this.getConstraints();
      const attributes = this.toJSON();

      if (_.isEmpty(constraints)) {
        return;
      }

      return validate(attributes, constraints);
    },

    serialize(object) {
      const meta = this.getMeta();
      return this.getStamp()(meta.assingProperties(this, object));
    },

    save() {
      const meta = this.getMeta();
      const errors = this.validate();
      let path = null;
      let endpoint = 'list';
      let method = 'POST';
      let payload = JSON.stringify(this);

      return new Promise((resolve, reject) => {
        if (!_.isEmpty(errors)) {
          return reject(new ValidationError(errors));
        }

        try {
          if (!this.isNew()) {
            endpoint = 'detail';
            method = meta.findAllowedMethod(endpoint, 'PUT', 'POST');
          }

          path = meta.resolveEndpointPath(endpoint, this);
        } catch(err) {
          return reject(err);
        }

        this.makeRequest(method, path, {payload}, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(this.serialize(res.body), res);
        });
      });
    },

    delete() {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('detail', this);

      return new Promise((resolve, reject) => {
        this.makeRequest('DELETE', path, {}, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(null, res);
        });
      });
    },

    toJSON() {
      return _.omit(this, '_config', '_meta', '_request', '_constraints');
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
})
.compose(ConfigMixin, MetaMixin, ConstraintsMixin, Request);

export default Model;
