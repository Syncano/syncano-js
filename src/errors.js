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


export function PaginationError(message) {
  this.name = 'PaginationError';
  this.message = message || '';
  this.stack = (new Error()).stack;
}

PaginationError.prototype = Object.create(SyncanoError.prototype);
PaginationError.prototype.constructor = SyncanoError;


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


export function RequestError(error) {
  this.name = 'RequestError';
  this.status = error.status;
  this.errors = error.response.body;
  this.originalError = error;
  this.response = error.response;
  this.message = '';
  this.stack = (new Error()).stack;

  if (_.isObject(this.errors)) {
    this.message = _.reduce(['detail', 'error', '__all__', 'non_field_errors'], (result, value) => {
      let error = this.errors[value];

      if (_.isArray(error)) {
        error = error.join(', ');
      }

      result += error || '';
      return result;
    }, this.message);

    if (_.isEmpty(this.message)) {
      this.message = _.map(this.errors, (value, key) => {
        if (_.isArray(value)) {
          value = value.join(', ');
        }
        return `"${key}" ${value}`;
      }).join('\n');
    }
  }

  if (_.isEmpty(this.message)) {
    this.message = error.message;
  }
}

RequestError.prototype = Object.create(SyncanoError.prototype);
RequestError.prototype.constructor = RequestError;
