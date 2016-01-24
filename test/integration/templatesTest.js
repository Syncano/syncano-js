import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe('Template', function() {
  this.timeout(15000);

  let connection = null;
  let Template = null;
  let Instance = null;
  const instanceName = suffix.get('instance');
  const templateName = suffix.get('template');
  const templateContent = "<h1>{{ title }}</h1>";
  const contentType = 'text/html';

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Template = connection.Template;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function(done) {
    return Template.please().delete({
      instanceName: instanceName,
      name: templateName
    })
    .then(() => done())
    .catch(() => done());
  });

  it('should be validated', function() {
    should(Template().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Template({name: templateName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "content"', function() {
    should(Template({name: templateName, instanceName}).save()).be.rejectedWith(/content/);
  });

  it('should require "content_type"', function() {
    should(Template({name: templateName, instanceName, content: templateContent}).save()).be.rejectedWith(/content_type/);
  });



  it('should be able to save via model instance', function() {
    const data = {
      name: templateName,
      instanceName: instanceName,
      content_type: contentType,
      content: templateContent
    };

    return Template(data).save()
      .then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(tpl).have.property('links').which.is.Object();
        should(tpl).have.property('content').which.is.String().equal(data.content);
        should(tpl).have.property('content_type').which.is.String().equal(data.content_type);
        should(tpl).have.property('context').which.is.Object();
      });
  });

  it('should be able to update via model instance', function() {
    const data = {
      name: templateName,
      instanceName: instanceName,
      content_type: contentType,
      content: templateContent
    };

    return Template(data).save()
      .then((tpl) => {
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(tpl).have.property('content').which.is.String().equal(data.content);

        tpl.content = '<h2>{ title }</h2>';
        return tpl.save();
      })
      .then((tpl) => {
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(tpl).have.property('content').which.is.String().equal('<h2>{ title }</h2>');
      });
  });

  it('should be able to delete via model instance', function() {
    const data = {
      name: templateName,
      instanceName: instanceName,
      content_type: contentType,
      content: templateContent
    };

    return Template(data).save()
      .then((tpl) => {
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);

        return tpl.delete();
      });
  });

  it('should be able to render a template via model instance', function() {
    const data = {
      name: templateName,
      instanceName: instanceName,
      content_type: contentType,
      content: templateContent
    };

    return Template(data).save()
      .then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);

        return tpl.render({ title: 'My Title' });
      }).then((tpl) => {
        should(tpl).be.a.String().equal('<h1>My Title</h1>');
      });
  });

  it('should be able to rename a template via model instance', function() {
    const data = {
      name: templateName,
      instanceName: instanceName,
      content_type: contentType,
      content: templateContent
    };

    return Template(data).save()
      .then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);

        return tpl.rename({ new_name: 'my_template' });
      }).then((tpl) => {
        should(tpl.name).be.a.String().equal('my_template');
      });
  });

  describe('#please()', function() {

    afterEach(function() {
      return Template
        .please()
        .list({instanceName})
        .then((templates) => {
          const names = _.map(templates, 'name');
          return Promise.all(_.map(names, (name) => Template.please().delete({name, instanceName})));
        });
    });

    it('should be able to list templates', function() {
      return Template.please().list({instanceName}).then((templates) => {
        should(templates).be.an.Array();
      });
    });

    it('should be able to create a template', function() {
      return Template.please().create({name: templateName, instanceName, content: templateContent, content_type: contentType}).then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl).have.property('links').which.is.Object();
        should(tpl).have.property('content').which.is.String().equal(templateContent);
        should(tpl).have.property('content_type').which.is.String().equal(contentType);
        should(tpl).have.property('context').which.is.Object();
      });
    });

    it('should be able to get a template', function() {
      return Template.please().create({name: templateName, instanceName, content: templateContent, content_type: contentType}).then((tpl) => {
          should(tpl).be.a.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);

          return tpl;
        })
        .then(() => {
          return Template
            .please()
            .get({name: templateName, instanceName})
            .request();
        })
        .then((tpl) => {
          should(tpl).be.a.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl).have.property('links').which.is.Object();
          should(tpl).have.property('content').which.is.String().equal(templateContent);
          should(tpl).have.property('content_type').which.is.String().equal(contentType);
          should(tpl).have.property('context').which.is.Object();
        });
    });

    it('should be able to delete a template', function() {
      return Template.please().create({name: templateName, instanceName, content: templateContent, content_type: contentType}).then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          return tpl;
        })
        .then(() => {
          return Template
            .please()
            .delete({name: templateName , instanceName})
            .request();
        });
    });

    it('should be able to get or create a template (CREATE)', function() {
      return Template.please().getOrCreate({name: templateName, instanceName, content: templateContent, content_type: contentType}, {content: 'my template'}).then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl).have.property('links').which.is.Object();
        should(tpl).have.property('content').which.is.String().equal('my template');
        should(tpl).have.property('content_type').which.is.String().equal(contentType);
        should(tpl).have.property('context').which.is.Object();
      });
    });

    it('should be able to get or create a template (GET)', function() {
      return Template.please().create({name: templateName, instanceName, content: 'template content', content_type: contentType}).then((tpl) => {
        should(tpl).be.an.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);

        return Template.please().getOrCreate({name: templateName, instanceName, content_type: contentType}, {content: 'template content'});
      })
      .then((tpl) => {
        should(tpl).be.an.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl.content).which.is.String().equal('template content');
      });
    });

    it('should be able to update a template', function() {
      return Template.please().create({name: templateName, instanceName, content: 'template content', content_type: contentType}).then((tpl) => {
        should(tpl).be.an.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl).have.property('content').which.is.String().equal('template content');

        return Template.please().update({name: templateName, instanceName}, {content: 'new content'});
      })
      .then((tpl) => {
        should(tpl).be.an.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl.content).which.is.String().equal('new content');
      });
    });

    it('should be able to update or create template (UPDATE)', function() {
      return Template.please().create({name: templateName, instanceName, content: 'template content', content_type: contentType}).then((tpl) => {
        should(tpl).be.an.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl).have.property('content').which.is.String().equal('template content');

        return Template.please().updateOrCreate({name: templateName, instanceName}, {content: 'new content'});
      })
      .then((tpl) => {
        should(tpl).be.an.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl.content).which.is.String().equal('new content');
      });
    });

    it('should be able to update or create template (CREATE)', function() {
      let properties = {name: templateName, instanceName, content_type: contentType};
      let object = {content: 'updateTest'};
      let defaults = {
          content: 'createTest'
      };

      return Template.please().updateOrCreate(properties, object, defaults).then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(templateName);
        should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
        should(tpl).have.property('links').which.is.Object();
        should(tpl).have.property('content').which.is.String().equal('createTest');
        should(tpl).have.property('content_type').which.is.String().equal(contentType);
        should(tpl).have.property('context').which.is.Object();
      });
    });

    it('should be able to get first template (SUCCESS)', function() {
      const names = [
        `${templateName}_1`,
        `${templateName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Template.please().create({name, instanceName, content: templateContent, content_type: contentType})))
        .then(() => {
          return Template.please().first({instanceName});
        })
        .then((tpl) => {
          should(tpl).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      const names = [
        `${templateName}_1`,
        `${templateName}_2`
      ];

      return Promise
        .all(_.map(names, (name) => Template.please().create({name, instanceName, content: templateContent, content_type: contentType})))
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(2);
          return Template.please({instanceName}).pageSize(1);
        })
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      const names = [
        `${templateName}_1`,
        `${templateName}_2`
      ];
      let asc = null;

      return Promise
        .all(_.map(names, (name) => Template.please().create({name, instanceName, content: templateContent, content_type: contentType})))
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(2);
          return Template.please({instanceName}).ordering('asc');
        })
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(2);
          asc = tpls;
          return Template.please({instanceName}).ordering('desc');
        }).then((desc) => {
          const ascNames = _.map(asc, 'name');
          const descNames = _.map(desc, 'name');
          descNames.reverse();

          should(desc).be.an.Array().with.length(2);

          _.forEach(ascNames, (ascName, index) => {
            should(ascName).be.equal(descNames[index]);
          });
        });
    });
    it('should be able to get raw data', function() {
      return Template.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });
  });
});
