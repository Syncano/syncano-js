import stampit from 'stampit';
import {validate} from '../utils';
import _ from 'lodash';

const Endpoint = stampit()
.props({
  calls: [],
  callConstraints: {
    name: {
      presence: true,
      string: true
    },
    methods: {
      array: true
    }
  }
})
.init(function({instance}) {
  if(!validate.isString(instance.name)) throw new Error('Endpoint name must be a string.');
})
.methods({

  addScriptCall({ name, methods }) {
    const call = { name, methods, type: 'script' };
    this.validate(call, this.callConstraints);
    this.calls = _.concat(this.calls, call);
  },

  validate(object, constraints) {
    const errors = validate(object, constraints);
    const message = _.map(errors, (value, key) => {
      return `"${key}" ${value.join(', ')}`;
    }).join('\n');
    if (!_.isEmpty(errors)) {
      throw new Error(message);
    }
  }

});

export default Endpoint;
