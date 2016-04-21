import Promisify from 'tiny-promisify';
import mapSeries from 'promise-map-series';
import Spread from 'promise-spread';

Promise.promisify = Promisify;
Promise.mapSeries = mapSeries;
Promise.spread = Spread;

export default Promise;
