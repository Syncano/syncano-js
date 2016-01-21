import stampit from 'stampit';
import {Meta, Model} from './base';

const TemplateMeta = Meta({
  name: 'template',
  pluralName: 'templates',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/snippets/templates/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1/instances/{instanceName}/snippets/templates/'
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/snippets/templates/{name}/rename/'
    },
    'render': {
      'methods': ['post'],
      'path': '/v1/instances/{instanceName}/snippets/templates/{name}/render/'
    }
  }
});

const TemplateConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  },
  content: {
    presence: true
  },
  content_type: {
    presence: true
  },
  context: {
    presence: true
  }
};

const Template = stampit()
  .compose(Model)
  .setMeta(TemplateMeta)
  .methods({

    request(path, options) {
      return new Promise((resolve, reject) => {
        this.makeRequest('POST', path, options, (err, res) => {
          if (err || !res.ok) {
            return reject(err, res);
          }
          resolve(res.body, res);
        });
      });
    },

    rename(options = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('rename', this);

      return this.request(path, options);
    },

    render(options = {}) {
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('render', this);

      return this.request(path, options);
    }

  })
  .setConstraints(TemplateConstraints);

export default Template;
