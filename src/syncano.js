import stampit from 'stampit';
import models from './models';
import _ from 'lodash';

/**
 * Main Syncano object.
 * @type {Syncano}
 */
const Syncano = stampit()
  .init(({instance}) => {
    _.forEach(models, (model, name) => {
      instance[name] = stampit().compose(model).setBaseObject(this);
    });
  })
  .refs({
    baseUrl: 'https://api.syncano.io',
    accountKey: ''
  })
  .methods({
    setKey(key) {
      if(_.isEmpty(key)) throw Error('Key is required');
      this.accountKey = key;
    },
    setBaseUrl(url) {
      if(_.isEmpty(key)) throw Error('Url is required');
      this.baseUrl = url;
    }
  });

export default Syncano;
