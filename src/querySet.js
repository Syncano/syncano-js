import stampit from 'stampit';
import Promise from 'bluebird';
import _ from 'lodash';
import Request from './request';


const QuerySetRequest = stampit().compose(Request)
  .refs({
    model: null
  })
  .props({
    endpoint: 'list',
    method: 'GET',
    headers: {},

    properties: {},
    query: {},
    payload: {},
    attachments: {},
    _serialize: true
  })
  .methods({
    serialize(response) {
      if (this._serialize === false) {
        return response;
      }

      if (this.endpoint === 'list') {
        return _.map(response.objects, (object) => this.model.fromJSON(object, this.properties));
      } else if (this.endpoint === 'detail') {
        return this.model.fromJSON(response, this.properties);
      }

      return response;
    },

    request() {
      const meta = this.model.getMeta();
      const endpoint = meta.endpoints[this.endpoint] || {};
      const allowedMethods = endpoint.methods || [];
      const path = meta.resolveEndpointPath(this.endpoint, this.properties);
      const method = this.method.toLowerCase();
      const requestOptions = {
        headers: this.headers,
        query: this.query,
        payload: this.payload,
        attachments: this.attachments
      };

      return new Promise((resolve, reject) => {
        if (!_.includes(allowedMethods, method)) {
          return reject(new Error(`Invalid request method: "${this.method}".`));
        }

        this.makeRequest(method, path, requestOptions, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(this.serialize(res.body), res);
        });
      })
    },

    then(callback) {
      return this.request().then(callback);
    }
  });


const Create = stampit().methods({
  create(object) {
    const attrs = _.assign({}, this.properties, object);
    const instance = this.model(attrs);

    return instance.save();
  }
});

const Get = stampit().methods({
  get(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'GET';
    this.endpoint = 'detail';

    return this;
  }
});

const GetOrCreate = stampit().methods({
  getOrCreate(properties = {}, defaults = {}) {
    return new Promise((resolve, reject) => {
      this.get(properties)
        .then(resolve)
        .catch(() => {
          const attrs = _.assign({}, this.properties, properties, defaults);
          return this.create(attrs)
            .then(resolve)
            .catch(reject);
        });
    });
  }
});

const List = stampit().methods({
  list(properties = {}, query = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.query = _.assign({}, this.query, query);

    this.method = 'GET';
    this.endpoint = 'list';
    return this;
  }
});

const Delete = stampit().methods({
  delete(properties = {}) {
    this.properties = _.assign({}, this.properties, properties);

    this.method = 'DELETE';
    this.endpoint = 'detail';
    return this;
  }
});

const Update = stampit().methods({
  update(properties = {}, object = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.payload = object;

    this.method = 'PATCH';
    this.endpoint = 'detail';
    return this;
  }
});

const UpdateOrCreate = stampit().methods({
  updateOrCreate(properties = {}, object = {}, defaults = {}) {
    return new Promise((resolve, reject) => {
      this.update(properties, object)
        .then(resolve)
        .catch(() => {
          const attrs = _.assign({}, this.properties, properties, defaults);
          return this.create(attrs)
            .then(resolve)
            .catch(reject);
        })
    });
  }
});

const First = stampit().methods({
  first(properties = {}, query = {}) {
    return new Promise((resolve, reject) => {
      this.pageSize(1)
        .list(properties, query)
        .then((objects) => {
          if (objects.length > 0) {
            resolve(objects[0]);
          } else {
            resolve();
          }
        })
        .catch(reject)
    });
  }
});

const PageSize = stampit().methods({
  pageSize(value) {
    this.query['page_size'] = value;
    return this;
  }
});

const Ordering = stampit().methods({
  ordering(value = 'asc') {
    const allowed = ['asc', 'desc'];
    const ordering = value.toLowerCase();

    if (!_.includes(allowed, ordering)) {
      throw Error(`Invalid order value: "${value}", allowed choices are ${allowed.join()}.`);
    }

    this.query['ordering'] = ordering;
    return this;
  }
});

const Raw = stampit().methods({
  raw() {
    this._serialize = false;
    return this;
  }
});

const QuerySet = stampit.compose(
  QuerySetRequest,
  Create,
  Get,
  GetOrCreate,
  List,
  Delete,
  Update,
  UpdateOrCreate,
  First,
  PageSize,
  Ordering,
  Raw
);

export default QuerySet;