import stampit from 'stampit';
import superagent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';


const Request = stampit()
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
    request(callback) {
      if (_.isEmpty(this.method)) {
        throw Error('"method" is required');
      }

      if (_.isEmpty(this.endpoint)) {
        throw Error('"endpoint" is required');
      }

      const method = this.method.toLowerCase();
      let request = superagent[method];

      if (_.isUndefined(request)) {
        throw Error(`Invalid request method: "${this.method}"`);
      }

      request = request(this.endpoint)
        .type(self.type)
        .accept(self.accept)
        .set(this.headres)
        .query(this.query)
        .send(this.payload);

      if (_.isFunction(callback)) {
        request = request.end(callback);
      }

      return request;
    },

    then(callback) {
      return new Promise((resolve, reject) => {
        this.request((err, res) => {
          if (err || !res.ok) {
            return reject(err);
          }
          resolve(res);
        });
      }).then(callback);
    },

    end(callback) {
      return this.request(callback);
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