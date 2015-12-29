import stampit from 'stampit';
import _ from 'lodash';
import QuerySet from '../querySet';
import {ConfigMixin, MetaMixin} from '../utils';


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
      const endpoint = this.endpoints[endpointName];
      const diff = _.difference(endpoint.properties, _.keys(properties));
      let path = endpoint.path;

      if (diff.length > 0) {
        throw new Error(`Missing path "${endpointName}" properties "${diff.join()}"`)
      }

      _.forEach(endpoint.properties, (property) => {
        path = path.replace(`{${property}}`, properties[property]);
      });

      return path;
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

    },

    save() {

    },

    delete() {

    }
  }
}).compose(ConfigMixin, MetaMixin);

export default Model;
