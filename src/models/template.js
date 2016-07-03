import stampit from 'stampit';
import {Meta, Model, Rename} from './base';
import _ from 'lodash';
import QuerySet, {Rename as QsRename} from '../querySet';

const TemplateQuerySet = stampit().compose(QuerySet, QsRename).methods({

  render(properties = {}, context = {}) {
    this.properties = _.assign({}, this.properties, properties);
    this.method = 'POST';
    this.endpoint = 'render';
    this.payload = {context};
    this.responseAttr = 'text';
    this.raw();

    return this;
  }

});

const TemplateMeta = Meta({
  name: 'template',
  pluralName: 'templates',
  endpoints: {
    'detail': {
      'methods': ['delete', 'patch', 'put', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/templates/{name}/'
    },
    'list': {
      'methods': ['post', 'get'],
      'path': '/v1.1/instances/{instanceName}/snippets/templates/'
    },
    'rename': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/snippets/templates/{name}/rename/'
    },
    'render': {
      'methods': ['post'],
      'path': '/v1.1/instances/{instanceName}/snippets/templates/{name}/render/'
    }
  }
});

const TemplateConstraints = {
  name: {
    presence: true,
    string: true,
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
    presence: true,
    string: true
  },
  content_type: {
    presence: true,
    string: true
  },
  context: {
    object: true
  }
};

/**
 * OO wrapper around templates {@link # endpoint}.
 * @constructor
 * @type {Template}

 * @property {String} name
 * @property {String} instanceName
 * @property {String} content
 * @property {String} content_type
 * @property {Object} context
 * @property {String} [links = {}]
 */
const Template = stampit()
  .compose(Model)
  .setMeta(TemplateMeta)
  .setQuerySet(TemplateQuerySet)
  .compose(Rename)
  .methods({

    render(context = {}) {
      const options = {
        payload: {context},
        responseAttr: 'text'
      }
      const meta = this.getMeta();
      const path = meta.resolveEndpointPath('render', this);

      return this.makeRequest('POST', path, options);
    }

  })
  .setConstraints(TemplateConstraints);

export default Template;
