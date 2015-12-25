import stampit from 'stampit';
import superagent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';


const Request = stampit()
  .refs({
    model: null,
    connection: {
      root: 'https://api.syncano.io',
      accountKey: ''
    }
  })
  .props({
    endpoint: null,
    method: null,
    type: 'json',
    accept: 'json',
    headres: {},

    properties: {},
    query: {},
    payload: {},
    _serialize: true
  })
  .methods({
    serialize(response) {
      if (this._serialize === false) {
        return response;
      }

      if (this.endpoint === 'list') {
        return _.map(response.objects, (object) => this.model(object));
      } else if (this.endpoint === 'detail') {
        return this.model(response);
      }

      return response;
    },

    request() {
      if (_.isEmpty(this.method)) {
        throw Error('"method" is required.');
      }

      if (_.isEmpty(this.endpoint)) {
        throw Error('"endpoint" is required.');
      }

      const meta = this.model.getMeta();
      const endpoint = meta.endpoints[this.endpoint] || {};
      const allowedMethods = endpoint.methods || [];
      const url = `${this.connection.root}${endpoint.path}`;
      const method = this.method.toLowerCase();
      let request = superagent[method];

      if (_.isUndefined(request) || !_.includes(allowedMethods, method)) {
        throw Error(`Invalid request method: "${this.method}".`);
      }

      if (_.isUndefined(endpoint)) {
        throw Error(`Invalid request endpoint: "${this.endpoint}".`);
      }

      if (!_.isEmpty(this.connection.accountKey)) {
        this.headres['Authorization'] = `Token ${this.connection.accountKey}`;
      }

      request = request(url)
        .type(self.type)
        .accept(self.accept)
        .set(this.headres)
        .query(this.query)
        .send(this.payload);

      return new Promise((resolve, reject) => {
        request.end((err, res) => {
          if (err || !res.ok) {
            return reject(err);
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
    const attrs = _.assign({}, self.properties, object);
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
          const attrs = _.assign({}, self.properties, properties, defaults);
          this.create(attrs)
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

    this.method = 'PUT';
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
          const attrs = _.assign({}, self.properties, properties, defaults);
          this.create(attrs)
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
      throw new Error(`Invalid order value: "${value}", allowed choices are ${allowed.join()}.`);
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
  Request,
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