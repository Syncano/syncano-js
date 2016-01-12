// something is wrong with babel6 in terms of error inheritance
// so for now we will use almost plain js here
import _ from 'lodash';


export function SyncanoError(message) {
  this.name = 'SyncanoError';
  this.message = message || '';
  this.stack = (new Error()).stack;
}

SyncanoError.prototype = Object.create(Error.prototype);
SyncanoError.prototype.constructor = SyncanoError;


export function ValidationError(errors = {}) {
  this.name = 'ValidationError';
  this.stack = (new Error()).stack;
  this.errors = errors;
  this.message = _.map(errors, (value, key) => {
    return `"${key}" ${value.join(', ')}`;
  }).join('\n');
}

ValidationError.prototype = Object.create(SyncanoError.prototype);
ValidationError.prototype.constructor = ValidationError;


export function RequestError(statusCode = 400, errors = {}, response = null) {
  this.name = 'RequestError';
  this.statusCode = statusCode;
  this.errors = errors;
  this.response = response;
  this.message = '';
  this.stack = (new Error()).stack;

  if (_.isObject(errors)) {
    this.message = _.reduce(['detail', 'error', '__all__'], (result, value) => {
      result += errors[value] || '';
    }, this.message);

    if (_.isEmpty(this.message)) {
      this.message = _.map(errors, (value, key) => {
        if (_.isArray(value)) {
          value = value.join(', ');
        }
        return `"${key}" ${value}`;
      }).join('\n');
    }
  }
}

RequestError.prototype = Object.create(SyncanoError.prototype);
RequestError.prototype.constructor = RequestError;
