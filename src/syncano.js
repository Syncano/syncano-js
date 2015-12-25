import stampit from 'stampit';
import models from './models';

/**
 * Main Syncano object.
 * @type {Syncano}
 */
const Syncano = stampit();

models.Instance.please().list().then((response) => {
    response.objects[0].delete();
    response.objects[0].save();
})

export default Syncano;
