import stampit from 'stampit';
import models from './models';
import _ from 'lodash';

/**
 * Main Syncano object.
 * @type {Syncano}
 */
const Syncano = stampit()
  .refs({
    connection: {
      baseUrl: 'https://api.syncano.io',
      accountKey: ''
    }
  })
  .methods({
    setKey(key) {
      if(_.isEmpty(key)) throw Error('Key is required');
      this.accountKey = key;
    },
    setBaseUrl(url) {
      if(_.isEmpty(key)) throw Error('Url is required');
      this.baseUrl = url;
    },
    instance() {
      return stampit().compose(models.Instance);
    }
  });

export default Syncano;
