import stampit from 'stampit';
import _ from 'lodash';
import QuerySet from '../querySet';

export const Meta = stampit()
  .props({
    name: null,
    pluralName: null,
    endpoints: {}
  })
  .init(({ instance, stamp }) => {
    _.forEach(instance.endpoints, (value) => {
      value.properties = stamp.getPathProperties(value.path);
    });
  })
  .static({
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

export const Please = stampit().static({
  please() {
    return QuerySet({model: this});
  }
});

export const Model = stampit()
  .methods({
    save() {

    },
    delete() {

    }
  })
  .static({
    setMeta(meta) {
      this.fixed._meta = Meta(meta);
      return this;
    },

    getMeta() {
      return this.fixed._meta;
    }
  })
  .compose(Please);

export default Model;