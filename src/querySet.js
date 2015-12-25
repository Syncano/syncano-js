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
    payload: {}
  })
  .methods({
    serialize(response) {
      if (this.endpoint === 'list') {
        response.objects = _.map(response.objects, (object) => this.model(object));
      } else if (this.endpoint === 'detail') {
        response = this.model(response);
      }
      return response;
    },

    request() {
      if (_.isEmpty(this.method)) {
        throw Error('"method" is required');
      }

      if (_.isEmpty(this.endpoint)) {
        throw Error('"endpoint" is required');
      }

      const meta = this.model.getMeta();
      const endpoint = meta.endpoints[this.endpoint] || {};
      const allowedMethods = endpoint.methods || [];
      const url = `${this.connection.root}${endpoint.path}`;
      const method = this.method.toLowerCase();
      let request = superagent[method];

      if (_.isUndefined(request) || !_.includes(allowedMethods, method)) {
        throw Error(`Invalid request method: "${this.method}"`);
      }

      if (_.isUndefined(endpoint)) {
        throw Error(`Invalid request endpoint: "${this.endpoint}"`);
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

const List = stampit()
  .methods({
    list() {
      this.method = 'GET';
      this.endpoint = 'list';
      return this;
    }
  });

const QuerySet = stampit.compose(Request, List);


export default QuerySet;