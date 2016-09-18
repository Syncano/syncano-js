import should from 'should/as-function';
import _ from 'lodash';
import Syncano from '../../src/syncano';
import {ValidationError} from '../../src/errors';
import {suffix, credentials} from './utils';


describe('GCMMessage', function() {
  this.timeout(15000);

  const instanceName = suffix.getHyphened('GCMMessage');
  const data = {
    instanceName,
    content: {
      registration_ids: [
        suffix.get('id1'),
        suffix.get('id2')
      ],
      'environment': 'development'
    }
  };
  let objects = null;
  let connection = null;
  let Model = null;
  let Instance = null;

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.GCMMessage;

    objects = [
      Model(data),
      Model(data)
    ];

    return Instance.please().create({name: instanceName}).then(() => {
      return connection.GCMConfig.please().update({instanceName}, {
        development_api_key: suffix.get('key')
      })
    });
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });

  it('should be validated', function() {
    should(Model().save()).be.rejectedWith(ValidationError);
  });

  it('should require "instanceName"', function() {
    should(Model().save()).be.rejectedWith(/instanceName/);
  });

  it('should require "content"', function() {
    should(Model({instanceName}).save()).be.rejectedWith(/content/);
  });

  it('should validate "content"', function() {
    should(Model({instanceName, content: 'meh'}).save()).be.rejectedWith(/content/);
  });

  it('should require "content.reqistration_ids"', function() {
    should(Model({instanceName, content: {}}).save()).be.rejectedWith(/registration_ids/);
  });

  it('should validate "content.reqistration_ids"', function() {
    should(Model({instanceName, content: {registration_ids: 'ids'}}).save()).be.rejectedWith(/registration_ids/);
  });

  it('should require "content.environment"', function() {
    should(Model({instanceName, content: {registration_ids: [1]}}).save()).be.rejectedWith(/environment/);
  });

  it('should validate "content.environment"', function() {
    should(Model({instanceName, content: {registration_ids: [1], environment: 'test'}}).save()).be.rejectedWith(/environment/);
  });

  it('should be able to save via model instance', function() {
    return Model(data).save()
      .then((object) => {
        should(object).be.a.Object();
        should(object).have.property('id').which.is.Number();
        should(object).have.property('instanceName').which.is.String().equal(instanceName);
        should(object).have.property('status').which.is.String();
        should(object).have.property('created_at').which.is.Date();
        should(object).have.property('updated_at').which.is.Date();
        should(object).have.property('links').which.is.Object();
        should(object).have.property('result').which.is.Object();
        should(object).have.property('content').which.is.Object();
        should(object.content).have.property('environment').which.is.String();
        should(object.content).have.property('registration_ids').which.is.Array();
      });
  });

  describe('#please()', function() {

    it('should be able to list objects', function() {
      return Model.please().list(data).then((objects) => {
        should(objects).be.an.Array();
      });
    });

    it('should be able to create an object', function() {
      return Model.please().create(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();
        });
    });

    it('should be able to bulk create objects', function() {
      return Model.please().bulkCreate(objects)
        .then((result) => {
          should(result).be.an.Array().with.length(2);
        });
    });

    it('should be able to get an object', function() {
      return Model.please().create(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();

          return _.assign({}, data, {id: object.id});
        })
        .then((query) => {
          return Model
            .please()
            .get(query)
            .request();
        })
        .then(([object, response]) => {
          should(response).be.an.Object();
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();
        });
    });

    it('should be able to get or create an object (CREATE)', function() {
      return Model.please().getOrCreate(_.assign({}, data, {id: 9999999}), {})
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();
        });
    });

    it('should be able to get or create an object (GET)', function() {
      return Model.please().create(data)
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();

          return Model.please().getOrCreate(_.assign({}, data, {id: object.id}), {});
        })
        .then((object) => {
          should(object).be.a.Object();
          should(object).have.property('id').which.is.Number();
          should(object).have.property('instanceName').which.is.String().equal(instanceName);
          should(object).have.property('status').which.is.String();
          should(object).have.property('result').which.is.Object();
          should(object).have.property('content').which.is.Object();
        });
    });

    it('should be able to get first object (SUCCESS)', function() {
      return Model.please().first(data)
        .then((object) => {
          should(object).be.an.Object();
        });
    });

    it('should be able to change page size', function() {
      return Model.please(data).pageSize(1)
        .then((objects) => {
          should(objects).be.an.Array().with.length(1);
        });
    });

    it('should be able to change ordering', function() {
      let asc = null;

      return Model.please(data).ordering('asc')
        .then((objects) => {
          should(objects).be.an.Array();
          asc = objects;
          return Model.please(data).ordering('desc');
        }).then((desc) => {
          const ascAttrs = _.map(asc, 'id');
          const descAttrs = _.map(desc, 'id');
          descAttrs.reverse();

          should(desc).be.an.Array();

          _.forEach(ascAttrs, (ascId, index) => {
            should(ascId).be.equal(descAttrs[index]);
          });
        });
    });

    it('should be able to get raw data', function() {
      return Model.please().list(data).raw().then((response) => {
        should(response).be.a.Object();
        should(response).have.property('objects').which.is.Array();
        should(response).have.property('next').which.is.null();
        should(response).have.property('prev').which.is.null();
      });
    });
  });
});
