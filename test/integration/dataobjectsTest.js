import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials, createCleaner} from './utils';

describe('DataObject', function() {
  this.timeout(65000);

  const cleaner = createCleaner();
  let connection = null;
  let Class = null;
  let Instance = null;
  let Model = null;
  const instanceName = suffix.getHyphened('Dataobject');
  const className = suffix.get('class');
  const description = suffix.get('description');
  const data = {
    name: className,
    instanceName,
    description,
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
  const geoPointClass = {
    name: 'locations',
    instanceName,
    description,
    schema: [
      { name: "location_name", type: "string" },
      { name: "coordinates", type: "geopoint", "filter_index": true }
    ]
  };
  const arrayClass = {
    name: 'arrays',
    instanceName,
    schema: [
      { name: 'name', type: 'string'},
      { name: 'numbers', type: 'array'}
    ]
  };
  const booksClass = {
    name: 'books',
    instanceName,
    schema: [
      { name: 'title', type: 'string'},
      { name: 'authors', type: 'relation', target: 'authors', filter_index: true }
    ]
  };
  const authorsClass = {
    name: 'authors',
    instanceName,
    schema: [
      { name: 'name', type: 'string', filter_index: true},
      { name: 'year_born', type: 'integer'}
    ]
  };
  const objectClass = {
    name: 'objects',
    instanceName,
    schema: [
      { name: 'name', type: 'string'},
      { name: 'someobj', type: 'object'}
    ]
  };
  const philipKDick = {
    instanceName,
    className: 'authors',
    name: 'Philip K Dick',
    year_born: 1928
  };
  const charlesBukowski = {
    instanceName,
    className: 'authors',
    name: 'Charles Bukowski',
    year_born: 1920
  };
  const location1 = {
    instanceName,
    className: geoPointClass.name,
    location_name: "Explorer HQ",
    coordinates: {
      latitude: 52.226972,
      longitude: 21.001542
    }
  };
  let objects = null;
  let objects2 = null;
  let objects3 = null;
  let books = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Class = connection.Class;
    Model = connection.DataObject;

    objects = [
      Model({ title: "Pulp", author: "Bukowski", instanceName, className}),
      Model({ title: "Blade Runner", author: "Dick", instanceName, className })
    ];

    objects2 = [
      Model(_.merge({}, dataObj, { title: "Pulp", author: "Bukowski"})),
      Model(_.merge({}, dataObj, { title: "Blade Runner", author: "Dick" }))
    ];

    objects3 = _.map(_.range(30), (int) => Model({instanceName, className: authorsClass.name, name: 'Somebody', year_born: int}));

    books = [
      Model({instanceName, className: 'books', title: 'Ubik'}),
      Model({instanceName, className: 'books', title: 'Man in the high castle'})
    ];

    return Instance.please().create({name: instanceName}).then(() => {
      return Class.please().bulkCreate([Class(data), Class(geoPointClass), Class(authorsClass), Class(booksClass), Class(arrayClass), Class(objectClass)]);
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
    should(Model({instanceName, className, channel: 1}).save()).be.rejectedWith(/channel/);
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
      })
  });

  it('should be able to save with an object field via model instance', function() {
    return Model({ instanceName, className: objectClass.name, name: 'John', someobj: { age: 18, height: 181}}).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('channel').which.is.Null();
        should(object).have.property('owner').which.is.Null();
        should(object).have.property('group_permissions').which.is.String().equal('none');
        should(object).have.property('other_permissions').which.is.String().equal('none');
        should(object).have.property('owner_permissions').which.is.String().equal('full');
        should(object).have.property('someobj').which.is.Object();
        should(object.someobj).have.property('age').which.is.Number().equal(18);
        should(object.someobj).have.property('height').which.is.Number().equal(181);
      })
  });

  it('should be able to save with an array field via model instance', function() {
    return Model({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]}).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.an.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('channel').which.is.Null();
        should(object).have.property('owner').which.is.Null();
        should(object).have.property('group_permissions').which.is.String().equal('none');
        should(object).have.property('other_permissions').which.is.String().equal('none');
        should(object).have.property('owner_permissions').which.is.String().equal('full');
        should(object).have.property('name').which.is.String().equal('John');
        should(object).have.property('numbers').which.is.Array().with.length(5);
      })
  });

  it('should be able to add array elements via model instance', function() {
    return Model({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]}).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.an.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('channel').which.is.Null();
        should(object).have.property('owner').which.is.Null();
        should(object).have.property('group_permissions').which.is.String().equal('none');
        should(object).have.property('other_permissions').which.is.String().equal('none');
        should(object).have.property('owner_permissions').which.is.String().equal('full');
        should(object).have.property('name').which.is.String().equal('John');
        should(object).have.property('numbers').which.is.Array().with.length(5);

        return object.add('numbers', [6, 7, 8, 9])
      })
      .then((object) => {
        should(object).have.property('numbers').which.is.Array().with.length(9);
      });
  });

  it('should be able to remove array elements via model instance', function() {
    return Model({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]}).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.an.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('channel').which.is.Null();
        should(object).have.property('owner').which.is.Null();
        should(object).have.property('group_permissions').which.is.String().equal('none');
        should(object).have.property('other_permissions').which.is.String().equal('none');
        should(object).have.property('owner_permissions').which.is.String().equal('full');
        should(object).have.property('name').which.is.String().equal('John');
        should(object).have.property('numbers').which.is.Array().with.length(5);

        return object.remove('numbers', [3, 4, 5])
      })
      .then((object) => {
        should(object).have.property('numbers').which.is.Array().with.length(2);
      });
  });

  it('should be able to add unique array elements via model instance', function() {
    return Model({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]}).save()
      .then(cleaner.mark)
      .then((object) => {
        should(object).be.an.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('channel').which.is.Null();
        should(object).have.property('owner').which.is.Null();
        should(object).have.property('group_permissions').which.is.String().equal('none');
        should(object).have.property('other_permissions').which.is.String().equal('none');
        should(object).have.property('owner_permissions').which.is.String().equal('full');
        should(object).have.property('name').which.is.String().equal('John');
        should(object).have.property('numbers').which.is.Array().with.length(5);

        return object.addUnique('numbers', [4, 5, 6, 7])
      })
      .then((object) => {
        should(object).have.property('numbers').which.is.Array().with.length(7);
      });
  });

  it('should be able to save with a geopoint via model instance', function() {
    return Model(location1).save()
      .then(cleaner.mark)
      .then((dataobj) => {
        should(dataobj).be.a.Object();
        should(dataobj).have.property('id').which.is.Number();
        should(dataobj).have.property('instanceName').which.is.String().equal(instanceName);
        should(dataobj).have.property('created_at').which.is.Date();
        should(dataobj).have.property('updated_at').which.is.Date();
        should(dataobj).have.property('links').which.is.Object();
        should(dataobj).have.property('channel').which.is.Null();
        should(dataobj).have.property('owner').which.is.Null();
        should(dataobj).have.property('group_permissions').which.is.String().equal('none');
        should(dataobj).have.property('other_permissions').which.is.String().equal('none');
        should(dataobj).have.property('owner_permissions').which.is.String().equal('full');
        should(dataobj).have.property('coordinates').which.is.Object();
        should(dataobj).have.property('location_name').which.is.String().equal(location1.location_name);
        should(dataobj.coordinates).have.property('type').which.is.String().equal('geopoint');
        should(dataobj.coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);
        should(dataobj.coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);
      });
  });

  it('should be able to update geopoint via model instance', function() {
    return Model(location1).save()
      .then(cleaner.mark)
      .then((dataobj) => {
        should(dataobj).have.property('location_name').which.is.String().equal(location1.location_name);
        should(dataobj.coordinates).have.property('type').which.is.String().equal('geopoint');
        should(dataobj.coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);
        should(dataobj.coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);

        dataobj.coordinates = { latitude: 40.739496, longitude: -73.985720 };
        return dataobj.save();
      })
      .then((dataobj) => {
        should(dataobj.coordinates).have.property('latitude').which.is.Number().equal(40.739496);
        should(dataobj.coordinates).have.property('longitude').which.is.Number().equal(-73.985720);
      })
  });

  it('should be able to save with relation via model instance', function() {
    let authorId = null;

    return Model(philipKDick).save()
      .then(cleaner.mark)
      .then((author) => {
        should(author).be.an.Object();
        should(author).have.property('instanceName').which.is.String().equal(philipKDick.instanceName);
        should(author).have.property('className').which.is.String().equal(philipKDick.className);
        should(author).have.property('name').which.is.String().equal(philipKDick.name);
        should(author).have.property('year_born').which.is.Number().equal(philipKDick.year_born);

        authorId = author.id;

        return Model({instanceName, className: 'books', title: 'Ubik', authors: [author.id]}).save();
      })
      .then(cleaner.mark)
      .then((book) => {
        should(book).be.an.Object();
        should(book).have.property('instanceName').which.is.String().equal(instanceName);
        should(book).have.property('className').which.is.String().equal('books');
        should(book).have.property('title').which.is.String().equal('Ubik');
        should(book).have.property('authors').which.is.Object();
        should(book.authors).have.property('target').which.is.String().equal('authors');
        should(book.authors).have.property('value').which.is.Array().with.length(1);
        should(book.authors.value[0]).be.a.Number().equal(authorId);
      })
  });

  it('should be able to add relation via model instance', function() {
    let authorIds = null;

    return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
      .then(cleaner.mark)
      .then((authors) => {
        should(authors).be.an.Array().with.length(2);

        authorIds = _.map(authors, (x) => x.id)

        return Model({instanceName, className: 'books', title: 'Ubik', authors: [authorIds[0]]}).save();
      })
      .then(cleaner.mark)
      .then((book) => {
        should(book).be.an.Object();
        should(book).have.property('instanceName').which.is.String().equal(instanceName);
        should(book).have.property('className').which.is.String().equal('books');
        should(book).have.property('title').which.is.String().equal('Ubik');
        should(book).have.property('authors').which.is.Object();
        should(book.authors).have.property('target').which.is.String().equal('authors');
        should(book.authors).have.property('value').which.is.Array().with.length(1);
        should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);

        return book.add('authors', [authorIds[1]]);
      })
      .then((book) => {
        should(book.authors).have.property('target').which.is.String().equal('authors');
        should(book.authors).have.property('value').which.is.Array().with.length(2);
        should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
        should(book.authors.value[1]).be.a.Number().equal(authorIds[1]);
      })
  });

  it('should be able to remove relation via model instance', function() {
    let authorIds = null;

    return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
      .then(cleaner.mark)
      .then((authors) => {
        should(authors).be.an.Array().with.length(2);

        authorIds = _.map(authors, (x) => x.id)

        return Model({instanceName, className: 'books', title: 'Ubik', authors: authorIds}).save();
      })
      .then(cleaner.mark)
      .then((book) => {
        should(book).be.an.Object();
        should(book).have.property('instanceName').which.is.String().equal(instanceName);
        should(book).have.property('className').which.is.String().equal('books');
        should(book).have.property('title').which.is.String().equal('Ubik');
        should(book).have.property('authors').which.is.Object();
        should(book.authors).have.property('target').which.is.String().equal('authors');
        should(book.authors).have.property('value').which.is.Array().with.length(2);
        should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
        should(book.authors.value[1]).be.a.Number().equal(authorIds[1]);

        return book.remove('authors', [authorIds[1]]);
      })
      .then((book) => {
        should(book.authors).have.property('target').which.is.String().equal('authors');
        should(book.authors).have.property('value').which.is.Array().with.length(1);
        should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
      })
  });

  it('should be able to get related objects via model instance', function() {
    let authorIds = null;

    return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
      .then(cleaner.mark)
      .then((authors) => {
        should(authors).be.an.Array().with.length(2);

        authorIds = _.map(authors, (x) => x.id)

        return Model({instanceName, className: 'books', title: 'Ubik', authors: authorIds}).save();
      })
      .then(cleaner.mark)
      .then((book) => {
        should(book).be.an.Object();
        should(book).have.property('instanceName').which.is.String().equal(instanceName);
        should(book).have.property('className').which.is.String().equal('books');
        should(book).have.property('title').which.is.String().equal('Ubik');
        should(book).have.property('authors').which.is.Object();
        should(book.authors).have.property('target').which.is.String().equal('authors');
        should(book.authors).have.property('value').which.is.Array().with.length(2);
        should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
        should(book.authors.value[1]).be.a.Number().equal(authorIds[1]);

        return book.getRelatedObjects('authors');
      })
      .then((authors) => {
        should(authors).be.an.Array().with.length(2);
      })
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

    it('should be able to fetch all objects', function(done) {
      return Model.please().bulkCreate(objects3)
        .then(cleaner.mark)
        .then(() => {
          const all = Model.please().all({instanceName, className: authorsClass.name}, { page_size: 10});

          all.on('page', function(page) {
            should(page).be.an.Array().with.length(10);
          });

          all.on('stop', function(pages) {
            should(pages).be.an.Array().with.length(30);
            done();
          })
        });
    });

    it('should be able to fetch a specified number of pages', function(done) {
      let currentPage = 0;
      return Model.please().bulkCreate(objects3)
        .then(cleaner.mark)
        .then(() => {
          const all = Model.please().all({instanceName, className: authorsClass.name}, { page_size: 10}, true, 2);

          all.on('page', function(page) {
            currentPage++;
            should(page).be.an.Array().with.length(10);
          });

          all.on('stop', function(pages) {
            should(currentPage).be.equal(2);
            should(pages).be.an.Array().with.length(20);
            done();
          })
        });
    });

    it('should be able to save with an array field', function() {
      return Model.please().create({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]})
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.an.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('channel').which.is.Null();
          should(object).have.property('owner').which.is.Null();
          should(object).have.property('group_permissions').which.is.String().equal('none');
          should(object).have.property('other_permissions').which.is.String().equal('none');
          should(object).have.property('owner_permissions').which.is.String().equal('full');
          should(object).have.property('name').which.is.String().equal('John');
          should(object).have.property('numbers').which.is.Array().with.length(5);
        })
    });

    it('should be able to add array elements', function() {
      return Model.please().create({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]})
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.an.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('channel').which.is.Null();
          should(object).have.property('owner').which.is.Null();
          should(object).have.property('group_permissions').which.is.String().equal('none');
          should(object).have.property('other_permissions').which.is.String().equal('none');
          should(object).have.property('owner_permissions').which.is.String().equal('full');
          should(object).have.property('name').which.is.String().equal('John');
          should(object).have.property('numbers').which.is.Array().with.length(5);

          return Model.please().add({ instanceName, className: arrayClass.name, id: object.id }, { numbers: [6, 7, 8, 9]})
        })
        .then((object) => {
          should(object).have.property('numbers').which.is.Array().with.length(9);
        });
    });

    it('should be able to remove array elements', function() {
      return Model.please().create({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]})
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.an.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('channel').which.is.Null();
          should(object).have.property('owner').which.is.Null();
          should(object).have.property('group_permissions').which.is.String().equal('none');
          should(object).have.property('other_permissions').which.is.String().equal('none');
          should(object).have.property('owner_permissions').which.is.String().equal('full');
          should(object).have.property('name').which.is.String().equal('John');
          should(object).have.property('numbers').which.is.Array().with.length(5);

          return Model.please().remove({ instanceName, className: arrayClass.name, id: object.id }, { numbers: [3, 4, 5]})
        })
        .then((object) => {
          should(object).have.property('numbers').which.is.Array().with.length(2);
        });
    });

    it('should be able to add unique array elements', function() {
      return Model.please().create({ instanceName, className: arrayClass.name, name: 'John', numbers: [1, 2, 3, 4, 5]})
        .then(cleaner.mark)
        .then((object) => {
          should(object).be.an.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('created_at').which.is.Date();
          should(object).have.property('updated_at').which.is.Date();
          should(object).have.property('links').which.is.Object();
          should(object).have.property('channel').which.is.Null();
          should(object).have.property('owner').which.is.Null();
          should(object).have.property('group_permissions').which.is.String().equal('none');
          should(object).have.property('other_permissions').which.is.String().equal('none');
          should(object).have.property('owner_permissions').which.is.String().equal('full');
          should(object).have.property('name').which.is.String().equal('John');
          should(object).have.property('numbers').which.is.Array().with.length(5);

          return Model.please().addUnique({ instanceName, className: arrayClass.name, id: object.id }, { numbers: [4, 5, 6, 7]})
        })
        .then((object) => {
          should(object).have.property('numbers').which.is.Array().with.length(7);
        });
    });

    it('should be able to create a model with a relation field', function() {
      let authorId = null;

      return Model.please().create(philipKDick)
        .then(cleaner.mark)
        .then((author) => {
          should(author).be.an.Object();
          should(author).have.property('instanceName').which.is.String().equal(philipKDick.instanceName);
          should(author).have.property('className').which.is.String().equal(philipKDick.className);
          should(author).have.property('name').which.is.String().equal(philipKDick.name);
          should(author).have.property('year_born').which.is.Number().equal(philipKDick.year_born);

          authorId = author.id;

          return Model.please().create({instanceName, className: 'books', title: 'Ubik', authors: [author.id]})
        })
        .then(cleaner.mark)
        .then((book) => {
          should(book).be.an.Object();
          should(book).have.property('instanceName').which.is.String().equal(instanceName);
          should(book).have.property('className').which.is.String().equal('books');
          should(book).have.property('title').which.is.String().equal('Ubik');
          should(book).have.property('authors').which.is.Object();
          should(book.authors).have.property('target').which.is.String().equal('authors');
          should(book.authors).have.property('value').which.is.Array().with.length(1);
          should(book.authors.value[0]).be.a.Number().equal(authorId);
        })
    });

    it('should be able to add relation', function() {
      let authorIds = null;

      return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
        .then(cleaner.mark)
        .then((authors) => {
          should(authors).be.an.Array().with.length(2);

          authorIds = _.map(authors, (x) => x.id)

          return Model.please().create({instanceName, className: 'books', title: 'Ubik', authors: [authorIds[0]]});
        })
        .then(cleaner.mark)
        .then((book) => {
          should(book).be.an.Object();
          should(book).have.property('instanceName').which.is.String().equal(instanceName);
          should(book).have.property('className').which.is.String().equal('books');
          should(book).have.property('title').which.is.String().equal('Ubik');
          should(book).have.property('authors').which.is.Object();
          should(book.authors).have.property('target').which.is.String().equal('authors');
          should(book.authors).have.property('value').which.is.Array().with.length(1);
          should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);

          return Model.please().add({id: book.id, instanceName, className: 'books'}, { authors: [authorIds[1]]});
        })
        .then((book) => {
          should(book.authors).have.property('target').which.is.String().equal('authors');
          should(book.authors).have.property('value').which.is.Array().with.length(2);
          should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
          should(book.authors.value[1]).be.a.Number().equal(authorIds[1]);
        });
    });

    it('should be able to filter objects by relation using #is()', function() {
      let authorIds = null;

      return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
        .then(cleaner.mark)
        .then((authors) => {
          should(authors).be.an.Array().with.length(2);

          authorIds = _.map(authors, (x) => x.id);

          books[0].authors = [authorIds[0]];

          return Model.please().bulkCreate(books);
        })
        .then(cleaner.mark)
        .then(() => {

          return Model.please().list({instanceName, className: 'books'}).is('authors', { name: { _eq: 'Philip K Dick'}})
        })
        .then((books) => {
          should(books).be.an.Array().with.length(1);
          should(books[0]).be.an.Object();
          should(books[0]).have.property('instanceName').which.is.String().equal(instanceName);
          should(books[0]).have.property('className').which.is.String().equal('books');
          should(books[0]).have.property('title').which.is.String().equal('Ubik');
          should(books[0]).have.property('authors').which.is.Object();
          should(books[0].authors).have.property('target').which.is.String().equal('authors');
          should(books[0].authors).have.property('value').which.is.Array().with.length(1);
          should(books[0].authors.value[0]).be.a.Number().equal(authorIds[0]);
        })
    });

    it('should be able to filter objects by relation using #contains()', function() {
      let authorIds = null;

      return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
        .then(cleaner.mark)
        .then((authors) => {
          should(authors).be.an.Array().with.length(2);

          authorIds = _.map(authors, (x) => x.id);

          books[1].authors = [authorIds[1]];

          return Model.please().bulkCreate(books);
        })
        .then(cleaner.mark)
        .then(() => {

          return Model.please().list({instanceName, className: 'books'}).contains('authors', [authorIds[1]])
        })
        .then((books) => {
          should(books).be.an.Array().with.length(1);
          should(books[0]).be.an.Object();
          should(books[0]).have.property('instanceName').which.is.String().equal(instanceName);
          should(books[0]).have.property('className').which.is.String().equal('books');
          should(books[0]).have.property('title').which.is.String().equal('Man in the high castle');
          should(books[0]).have.property('authors').which.is.Object();
          should(books[0].authors).have.property('target').which.is.String().equal('authors');
          should(books[0].authors).have.property('value').which.is.Array().with.length(1);
          should(books[0].authors.value[0]).be.a.Number().equal(authorIds[1]);
        })
    });

    it('should be able to remove relation', function() {
      let authorIds = null;

      return Model.please().bulkCreate([Model(philipKDick), Model(charlesBukowski)])
        .then(cleaner.mark)
        .then((authors) => {
          should(authors).be.an.Array().with.length(2);

          authorIds = _.map(authors, (x) => x.id)

          return Model.please().create({instanceName, className: 'books', title: 'Ubik', authors: authorIds});
        })
        .then(cleaner.mark)
        .then((book) => {
          should(book).be.an.Object();
          should(book).have.property('instanceName').which.is.String().equal(instanceName);
          should(book).have.property('className').which.is.String().equal('books');
          should(book).have.property('title').which.is.String().equal('Ubik');
          should(book).have.property('authors').which.is.Object();
          should(book.authors).have.property('target').which.is.String().equal('authors');
          should(book.authors).have.property('value').which.is.Array().with.length(2);
          should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
          should(book.authors.value[1]).be.a.Number().equal(authorIds[1]);

          return Model.please().remove({id: book.id, instanceName, className: 'books'}, { authors: [authorIds[1]]});
        })
        .then((book) => {
          should(book.authors).have.property('target').which.is.String().equal('authors');
          should(book.authors).have.property('value').which.is.Array().with.length(1);
          should(book.authors.value[0]).be.a.Number().equal(authorIds[0]);
        });
    });

    it('should be able to list objects near coordinates', function() {
      return Model.please().create(location1)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().list({instanceName, className: location1.className}).near({ coordinates: {latitude: 52.229676, longitude: 21.012229}});
        })
        .then((objects) => {
          should(objects).be.an.Array().with.length(1);
          should(objects[0].coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);   should(objects[0].coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);
        })
    });

    it('should be able to list objects near coordinates within a distance in kilometers', function() {
      return Model.please().create(location1)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().list({instanceName, className: location1.className}).near({ coordinates: {latitude: 51.865512, longitude: 20.866603, distance_in_kilometers: 50}});
        })
        .then((objects) => {
          should(objects).be.an.Array().with.length(1);
          should(objects[0].coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);   should(objects[0].coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);
        })
    });

    it('should be able to list objects near coordinates within a distance in miles', function() {
      return Model.please().create(location1)
        .then(cleaner.mark)
        .then(() => {
          return Model.please().list({instanceName, className: location1.className}).near({ coordinates: {latitude: 51.982047, longitude: 20.521618, distance_in_miles: 31}});
        })
        .then((objects) => {
          should(objects).be.an.Array().with.length(1);
          should(objects[0].coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);   should(objects[0].coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);
        })
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

    it('should be able to create a Model with a geopoint', function() {
      return Model.please().create(location1)
        .then(cleaner.mark)
        .then((dataobj) => {
          should(dataobj).be.a.Object();
          should(dataobj).have.property('id').which.is.Number();
          should(dataobj).have.property('instanceName').which.is.String().equal(instanceName);
          should(dataobj).have.property('created_at').which.is.Date();
          should(dataobj).have.property('updated_at').which.is.Date();
          should(dataobj).have.property('links').which.is.Object();
          should(dataobj).have.property('channel').which.is.Null();
          should(dataobj).have.property('owner').which.is.Null();
          should(dataobj).have.property('group_permissions').which.is.String().equal('none');
          should(dataobj).have.property('other_permissions').which.is.String().equal('none');
          should(dataobj).have.property('owner_permissions').which.is.String().equal('full');
          should(dataobj).have.property('coordinates').which.is.Object();
          should(dataobj).have.property('location_name').which.is.String().equal(location1.location_name);
          should(dataobj.coordinates).have.property('type').which.is.String().equal('geopoint');
          should(dataobj.coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);
          should(dataobj.coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);
        });
    });

    it('should be able to update a Model with a geopoint', function() {
      return Model.please().create(location1)
        .then(cleaner.mark)
        .then((dataobject) => {
          should(dataobject).be.a.Object();
          should(dataobject.coordinates).have.property('type').which.is.String().equal('geopoint');
          should(dataobject.coordinates).have.property('latitude').which.is.Number().equal(location1.coordinates.latitude);
          should(dataobject.coordinates).have.property('longitude').which.is.Number().equal(location1.coordinates.longitude);

          return Model.please().update({ id: dataobject.id, instanceName: dataobject.instanceName, className: dataobject.className }, { coordinates: { latitude: 40.739496, longitude: -73.985720 } })
        })
        .then((dataobject) => {
          should(dataobject.coordinates).have.property('latitude').which.is.Number().equal(40.739496);
          should(dataobject.coordinates).have.property('longitude').which.is.Number().equal(-73.985720);
        });
    });

    it('should be able to bulk create objects', function() {
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
      .then(([dataobject, response]) => {
        should(response).be.an.Object();
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
      return Model.please().bulkCreate(objects2)
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
      .then(([dataobject, response]) => {
        should(response).be.an.Object();
        should(dataobject).have.property('author').equal(dataObj.author);
        should(dataobject).not.have.property('title');
      });
    });

     it('should be able to change ordering by field', function() {
       let asc = null;

       return Model.please().bulkCreate(objects2)
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
      return Model.please().bulkCreate(objects2)
        .then(cleaner.mark)
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(2);
          return Model.please({instanceName, className}).pageSize(1);
        })
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(1);
        });
    });

    it('should send correct query when using pagination with filtering', function() {
      return Model.please().bulkCreate(objects2)
        .then(cleaner.mark)
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(2);
          return Model.please({instanceName, className}).pageSize(1).fields(['title']);
        })
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(1);
          should(dataobjects[0]).have.property('title').which.is.String();
          should(dataobjects[0]).not.have.property('author');
          return dataobjects.next();
        })
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(1);
          should(dataobjects[0]).have.property('title').which.is.String();
          should(dataobjects[0]).not.have.property('author');
        })
    });

    it('should be able to get count', function() {
      return Model.please().bulkCreate(objects2)
        .then(cleaner.mark)
        .then((dataobjects) => {
          should(dataobjects).be.an.Array().with.length(2);
          return Model.please({instanceName, className}).count();
        })
        .then((response) => {
          should(response).have.property('objects_count').which.is.Number().equal(2);
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
