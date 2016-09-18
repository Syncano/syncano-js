import should from 'should/as-function';
import Syncano from '../../src/syncano';
import {suffix, credentials} from './utils';

describe('Tag', function() {
  this.timeout(15000);

  let connection = null;
  let Model = null;
  let Instance = null;
  const instanceName = suffix.getHyphened('Tag');

  before(function() {
    connection = Syncano(credentials.getCredentials());
    Instance = connection.Instance;
    Model = connection.Tag;

    return Instance.please().create({name: instanceName});
  });

  after(function() {
    return Instance.please().delete({name: instanceName});
  });
  describe('#please()', function() {

    it('should be able to list Models', function() {
      return Model.please().list().then((Models) => {
        should(Models).be.an.Array();
      });
    });

    it('should be able to get Model', function() {
      return Model.please().list().then((Models) => {
        return Model.please().get(Models[0]);
      })
      .then((Model) => {
        should(Model).be.an.Object();
        should(Model).have.property('name').which.is.String();
        should(Model).have.property('count').which.is.Number();
        should(Model).have.property('links').which.is.Object();
      })
    });
  });
});
