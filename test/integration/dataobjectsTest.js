import should from 'should/as-function';
import Promise from 'bluebird';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('Dataobject', function() {
  this.timeout(15000);

  const cleaner = createCleaner();
  let connection = null;
  let Class = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.get('Dataobject');
  const className = suffix.get('class');
  const data = {
    name: className,
    instanceName: instanceName,
    description: suffix.get('description'),
    schema: [
      { name: "title", type: "string", "order_index": true, "filter_index": true },
      { name: "author", type: "string", "order_index": true, "filter_index": true  },
      { name: "reads", type: "integer" }
    ]
  };
  const dataObj = {
    title: "Pulp",
    author: "Bukowski",
    reads: 0,
    className: className,
    instanceName: instanceName
  };

  before(function(done) {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Class = connection.Class;
    Model = connection.DataObject;

    Instance.please().create({name: instanceName}).then(() => {
      Class.please().create(data).then(() => done());
    })
  });

  afterEach(function() {
    return cleaner.clean();
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model({className}).save()).be.rejectedWith(/instanceName/);
  });

  it('should require "className"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/className/);
  });

  it('should validate "owner"', function() {
    should(Model({instanceName, className, owner: 'me'}).save()).be.rejectedWith(/owner/);
  });

  it('should validate "owner_permissions"', function() {
    should(Model({instanceName, className, owner_permissions: 'maybe'}).save()).be.rejectedWith(/owner_permissions/);
  });

  it('should validate "group"', function() {
    should(Model({instanceName, className, group: 'some_group'}).save()).be.rejectedWith(/group/);
  });

  it('should validate "group_permissions"', function() {
    should(Model({instanceName, className, group_permissions: 'meh'}).save()).be.rejectedWith(/group_permissions/);
  });

  it('should validate "other_permissions"', function() {
    should(Model({instanceName, className, other_permissions: 'meh'}).save()).be.rejectedWith(/other_permissions/);
  });

  it('should validate "channel"', function() {
    should(Model({instanceName, className, channel: 'some_channel'}).save()).be.rejectedWith(/channel/);
  });

  it('should validate "channel_room"', function() {
    should(Model({instanceName, className, channel_room: 2}).save()).be.rejectedWith(/channel_room/);
  });

  it('should be able to save via model instance', function() {
    return Model(dataObj).save()
      .then(cleaner.mark)
      .then((dataobj) => {
        should(dataobj).be.a.Object();
        should(dataobj).have.property('id').which.is.Number();
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('created_at').which.is.Date();
        should(dataobj).have.property('updated_at').which.is.Date();
        should(dataobj).have.property('links').which.is.Object();
        should(dataobj).have.property('channel').which.is.Null();
        should(dataobj).have.property('owner').which.is.Null();
        should(dataobj).have.property('group_permissions').which.is.String().equal('none');
        should(dataobj).have.property('other_permissions').which.is.String().equal('none');
        should(dataobj).have.property('owner_permissions').which.is.String().equal('full');
        should(dataobj).have.property('title').which.is.String().equal('Pulp');
        should(dataobj).have.property('author').which.is.String().equal('Bukowski');
        should(dataobj).have.property('reads').which.is.Number().equal(0);
      });
  });

  it('should be able to update via model instance', function() {
    return Model(dataObj).save()
      .then(cleaner.mark)
      .then((dataobj) => {
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('title').which.is.String().equal('Pulp');
        should(dataobj).have.property('author').which.is.String().equal('Bukowski');
        should(dataobj).have.property('reads').which.is.Number().equal(0);

        dataobj.title = "Brave New World";
        dataobj.author = "Aldous Huxley";
        return dataobj.save();
      })
      .then((dataobj) => {
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('title').which.is.String().equal('Brave New World');
        should(dataobj).have.property('author').which.is.String().equal('Aldous Huxley');
      })
  });

  it('should be able to increment a model field', function() {
    return Model(dataObj).save()
      .then(cleaner.mark)
      .then((dataobj) => {
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('title').which.is.String().equal('Pulp');
        should(dataobj).have.property('author').which.is.String().equal('Bukowski');
        should(dataobj).have.property('reads').which.is.Number().equal(0);

        return dataobj.increment('reads', 1);
      })
      .then((dataobj) => {
        should(dataobj).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobj).have.property('title').which.is.String().equal('Pulp');
        should(dataobj).have.property('author').which.is.String().equal('Bukowski');
        should(dataobj).have.property('reads').which.is.Number().equal(1);
      })
  });

  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list({instanceName, className}).then((dataobjects) => {
        should(dataobjects).be.an.Array();
      });
    });

    it('should be able to create a Model', function() {

      return Model.please().create(dataObj)
        .then(cleaner.mark)
        .then((dataobject) => {
          should(dataobject).be.a.Object();
          should(dataobject).have.property('id').which.is.Number();
          should(dataobject).have.property('instanceName').which.is.String().equal(data.instanceName);
          should(dataobject).have.property('created_at').which.is.Date();
          should(dataobject).have.property('updated_at').which.is.Date();
          should(dataobject).have.property('links').which.is.Object();
          should(dataobject).have.property('channel').which.is.Null();
          should(dataobject).have.property('owner').which.is.Null();
          should(dataobject).have.property('group_permissions').which.is.String().equal('none');
          should(dataobject).have.property('other_permissions').which.is.String().equal('none');
          should(dataobject).have.property('owner_permissions').which.is.String().equal('full');
          should(dataobject).have.property('title').which.is.String().equal('Pulp');
          should(dataobject).have.property('author').which.is.String().equal('Bukowski');
        });
    });

    it('should be able to bulk create objects', function() {
      const objects = [
        Model(dataObj),
        Model(dataObj)
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get a Model', function() {
      let objId = null;

      return Model.please().create(dataObj)
      .then(cleaner.mark)
      .then((dataobject) => {
        should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
        objId = dataobject.id;

        return dataobject;
      })
      .then(() => {
        return Model
          .please()
          .get({id: objId, instanceName, className})
          .request();
      })
      .then((dataobject) => {
        should(dataobject).be.a.Object();
        should(dataobject).have.property('id').which.is.Number();
        should(dataobject).have.property('instanceName').which.is.String().equal(data.instanceName);
        should(dataobject).have.property('created_at').which.is.Date();
        should(dataobject).have.property('updated_at').which.is.Date();
        should(dataobject).have.property('links').which.is.Object();
        should(dataobject).have.property('channel').which.is.Null();
        should(dataobject).have.property('owner').which.is.Null();
        should(dataobject).have.property('group_permissions').which.is.String().equal('none');
        should(dataobject).have.property('other_permissions').which.is.String().equal('none');
        should(dataobject).have.property('owner_permissions').which.is.String().equal('full');
        should(dataobject).have.property('title').which.is.String().equal('Pulp');
        should(dataobject).have.property('author').which.is.String().equal('Bukowski');
      });
    });

    it('should be able to delete a Model', function() {
      let objId = null;

      return Model.please().create(dataObj)
        .then((dataobject) => {
          should(dataobject).be.an.Object();
          should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
          objId = dataobject.id;
          return dataobject;
        })
        .then(() => {
          return Model
            .please()
            .delete({id: objId, instanceName, className})
            .request();
        });
    });

    it('should be able to update a Model', function() {

      return Model.please().create(dataObj)
        .then(cleaner.mark)
        .then((dataobject) => {
          should(dataobject).be.an.Object();
          should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
          should(dataobject).have.property('author').which.is.String().equal('Bukowski');

          return Model.please().update({id: dataobject.id, instanceName, className}, {title: 'Women'});
        })
        .then((dataobject) => {
          should(dataobject).be.an.Object();
          should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
          should(dataobject).have.property('title').which.is.String().equal('Women');
        });
    });

    it('should be able to increment a field', function() {
      return Model.please().create(dataObj)
        .then(cleaner.mark)
        .then((dataobject) => {
          should(dataobject).be.an.Object();
          should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
          should(dataobject).have.property('author').which.is.String().equal('Bukowski');

          return Model.please().increment({id: dataobject.id, instanceName, className}, {reads: 1});
        })
        .then((dataobject) => {
          should(dataobject).be.an.Object();
          should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
          should(dataobject).have.property('reads').which.is.Number().equal(1);
        });
    });

    it('should be able to get first Model', function() {
      const descriptions = [
        { title: "Pulp", author: "Bukowski"},
        { title: "Blade Runner", author: "Dick" }
      ];

      return Promise
        .mapSeries(descriptions, (item) => Model.please().create({title: item.title, author: item.author, instanceName, className}))
        .then(cleaner.mark)
        .then(() => {
          return Model.please().first({instanceName, className});
        })
        .then((dataobject) => {
          should(dataobject).be.an.Object();
        });
    });

    it('should be able to get specific model fields', function() {
      let objId = null;

      return Model.please().create(dataObj)
      .then(cleaner.mark)
      .then((dataobject) => {
        should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);
        objId = dataobject.id;

        return dataobject;
      })
      .then(() => {
        return Model
          .please()
          .get({id: objId, instanceName, className})
          .fields(['author'])
          .request();
      })
      .then((dataobject) => {
        should(dataobject).have.property('author').equal(dataObj.author);
        should(dataobject).not.have.property('title');
      });
    });

     it('should be able to change ordering by field', function() {
       const objects = [
         Model(_.merge({}, dataObj, { title: "Pulp", author: "Bukowski"})),
         Model(_.merge({}, dataObj, { title: "Blade Runner", author: "Dick" }))
       ];
       let asc = null;

       return Model.please().bulkCreate(objects)
          .then(cleaner.mark)
          .then((dataobjects) => {
            should(dataobjects).be.an.Array().with.length(2);
            return Model.please({instanceName, className}).orderBy('author');
          })
          .then((dataobjects) => {
            should(dataobjects).be.an.Array().with.length(2);
            asc = dataobjects;
            return Model.please({instanceName, className}).orderBy('-author');
          })
          .then((desc) => {
            const ascTitles= _.map(asc, 'title');
            const descTitles = _.map(desc, 'title');
            descTitles.reverse();
            should(desc).be.an.Array().with.length(2);

            _.forEach(ascTitles, (ascTitle, index) => {
              should(ascTitle).be.equal(descTitles[index]);
            });
          });
      });

     it('should be able to filter model by field', function() {
       const objects = [
         Model(_.merge({}, dataObj, { title: "Pulp", author: "Bukowski"})),
         Model(_.merge({}, dataObj, { title: "Blade Runner", author: "Dick" }))
       ];

       return Model.please().bulkCreate(objects)
         .then(cleaner.mark)
         .then((dataobjects) => {
           should(dataobjects).be.an.Array().with.length(2);
           return Model.please({instanceName, className}).filter({ title: { _eq: "Pulp"} })
         })
         .then((dataobjects) => {
           should(dataobjects).be.an.Array().with.length(1);
           should(dataobjects[0]).have.property('title').equal('Pulp');
           should(dataobjects[0]).have.property('author').equal('Bukowski');
         });

     });

    it('should be able to change page size', function() {
      const objects = [
        Model(_.merge({}, dataObj, { title: "Pulp", author: "Bukowski"})),
        Model(_.merge({}, dataObj, { title: "Blade Runner", author: "Dick" }))
      ];

      return Model.please().bulkCreate(objects)
        .then(cleaner.mark)
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(2);
          return Model.please({instanceName, className}).pageSize(1);
        })
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(1);
        });

    });

    it('should be able to get raw data', function() {
      return Model.please().list({instanceName, className}).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });

    it('should be able to get template response', function() {

      return Model.please().create(dataObj)
      .then(cleaner.mark)
      .then((dataobject) => {
        should(dataobject).have.property('instanceName').which.is.String().equal(instanceName);

        return dataobject;
      })
      .then(() => {
        return Model
          .please()
          .list({instanceName, className})
          .templateResponse('objects_html_table')
          .request();
      })
      .then((response) => {
        should(response).be.html;
      });
    });
  });
});
