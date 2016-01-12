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
    endpoints: {}
  })
  .init(function({ instance }) {
    _.forEach(instance.endpoints, (value) => {
      value.properties = this.getPathProperties(value.path);
    });
  })
  .methods({
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
    please() {
      return QuerySet({model: this, _config: this.getConfig()});
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
          resolve(this.getStamp()(res.body), res);
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
.init(({stamp}) => {
  if (!stamp.fixed.methods.getStamp) {
    stamp.fixed.methods.getStamp = () => stamp;
  }
})
.compose(ConfigMixin, MetaMixin, ConstraintsMixin, Request);

export default Model;
