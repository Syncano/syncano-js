import stampit from 'stampit';
import {Meta, Model} from './base';

const TemplateMeta = Meta({
  name: 'template',
  pluralName: 'templates',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1/instances/{instanceName}/snippets/templates/{name}'
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
  instanceName: {
    presence: true,
    length: {
      minimum: 5
    }
  }
};

const Template = stampit()
  .compose(Model)
  .setMeta(TemplateMeta)
  .setConstraints(TemplateConstraints);

export default Template;
