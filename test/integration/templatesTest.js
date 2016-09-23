import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('Template', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('Template');
  const templateName = suffix.get('template');
  const templateContent = "<h1>{{ title }}</h1>";
  const contentType = 'text/html';
  const data = {
    name: templateName,
    instanceName: instanceName,
    content_type: contentType,
    content: templateContent
  };
  let objects = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Template;

    objects = [
      Model(data),
      Model(_.assign({}, data, {name: `${templateName}1`}))
    ];

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  afterEach(function() {
    return cleaner.clean();
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({name: templateName}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "content"', function() {
    should(Model({name: templateName, instanceName}).save()).be.rejectedWith(/content/);
  });

  it('should validate "content"', function() {
    should(Model({name: templateName, instanceName, content: {}}).save()).be.rejectedWith(/content/);
  });

  it('should require "content_type"', function() {
    should(Model({name: templateName, instanceName, content: templateContent}).save()).be.rejectedWith(/content_type/);
  });

  it('should validate "content_type"', function() {
    should(Model({name: templateName, instanceName, content: templateContent, content_type: 1337}).save()).be.rejectedWith(/content_type/);
  });

  it('should validate "context"', function() {
    should(Model({name: templateName, instanceName, content: templateContent, content_type: contentType, context: 'my_context'}).save()).be.rejectedWith(/context/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
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
    return Model(data).save()
      .then(cleaner.mark)
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
    return Model(data).save()
      .then((tpl) => {
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);

        return tpl.delete();
      });
  });

  it('should be able to render a template via model instance', function() {
    return Model(data).save()
      .then(cleaner.mark)
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
    return Model(data).save()
      .then((tpl) => {
        should(tpl).be.a.Object();
        should(tpl).have.property('name').which.is.String().equal(data.name);
        should(tpl).have.property('instanceName').which.is.String().equal(data.instanceName);

        return tpl.rename({ new_name: 'my_template' });
      })
      .then(cleaner.mark)
      .then((tpl) => {
        should(tpl.name).be.a.String().equal('my_template');
      });
  });

  describe('#please()', function() {

    it('should be able to list templates', function() {
      return Model.please().list({instanceName}).then((templates) => {
        should(templates).be.an.Array();
      });
    });

    it('should be able to create a template', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
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

    it('should be able to bulk create objects', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a template', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((tpl) => {
          should(tpl).be.a.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);

          return tpl;
        })
        .then(() => {
          return Model
            .please()
            .get({name: templateName, instanceName})
            .request();
        })
        .then(([tpl, response]) => {
          should(response).be.an.Object();
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
      return Model.please().create(data)
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          return tpl;
        })
        .then(() => {
          return Model
            .please()
            .delete({name: templateName , instanceName})
            .request();
        });
    });

    it('should be able to get or create a template (CREATE)', function() {
      return Model.please().getOrCreate(data, {content: 'my template'})
        .then(cleaner.mark)
        .then((tpl) => {
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
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);

          return Model.please().getOrCreate(data, {content: 'template content'});
        })
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl.content).which.is.String().equal(templateContent);
        });
    });

    it('should be able to update a template', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl).have.property('content').which.is.String().equal(templateContent);

          return Model.please().update(data, {content: 'new content'});
        })
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl).have.property('content').which.is.String().equal('new content');
        });
    });

    it('should be able to rename a template', function() {
      return Model.please().create(data)
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl).have.property('content').which.is.String().equal(templateContent);

          return Model.please().rename({name: templateName, instanceName}, {new_name: 'new_name'});
        })
        .then(cleaner.mark)
        .then((tpl) => {
          should(tpl).have.property('name').which.is.String().equal('new_name');
        });
    });

    it('should be able to render a template', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((tpl) => {
          should(tpl).be.an.Object();

          return Model.please().render({name: templateName, instanceName}, { title: 'My Title' });
        })
        .then((tpl) => {
          should(tpl).be.a.String().equal('<h1>My Title</h1>');
        });
    });

    it('should be able to update or create template (UPDATE)', function() {
      return Model.please().create(data)
        .then(cleaner.mark)
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl).have.property('content').which.is.String().equal(templateContent);

          return Model.please().updateOrCreate({name: templateName, instanceName}, {content: 'new content'});
        })
        .then((tpl) => {
          should(tpl).be.an.Object();
          should(tpl).have.property('name').which.is.String().equal(templateName);
          should(tpl).have.property('instanceName').which.is.String().equal(instanceName);
          should(tpl.content).which.is.String().equal('new content');
        });
    });

    it('should be able to update or create template (CREATE)', function() {
      const properties = {name: templateName, instanceName, content_type: contentType};
      const object = {content: 'updateTest'};
      const defaults = {
          content: 'createTest'
      };

      return Model.please().updateOrCreate(properties, object, defaults)
        .then(cleaner.mark)
        .then((tpl) => {
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
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName});
        })
        .then((tpl) => {
          should(tpl).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(2);
          return Model.please({instanceName}).pageSize(1);
        })
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      let asc = null;

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(2);
          return Model.please({instanceName}).ordering('asc');
        })
        .then((tpls) => {
          should(tpls).be.an.Array().with.length(4);
          asc = tpls;
          return Model.please({instanceName}).ordering('desc');
        }).then((desc) => {
          const ascNames = _.map(asc, 'name');
          const descNames = _.map(desc, 'name');
          descNames.reverse();

          should(desc).be.an.Array().with.length(4);

          _.forEach(ascNames, (ascName, index) => {
            should(ascName).be.equal(descNames[index]);
          });
        });
    });
    it('should be able to get raw data', function() {
      return Model.please().list({instanceName}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });
  });
});
