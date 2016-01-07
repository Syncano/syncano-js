import _ from 'lodash';

export class SyncanoError extends Error {
  constructor(message = '') {
    super(message);

    // extending Error is weird and does not propagate `message`
    Object.defineProperty(this, 'message', {
      enumerable : false,
      value : message
    });

    Object.defineProperty(this, 'name', {
      enumerable : false,
      value : this.constructor.name
    });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
      return;
    }

    Object.defineProperty(this, 'stack', {
      enumerable : false,
      value : (new Error(message)).stack
    });
  }
}

export class RequestError extends SyncanoError {
  constructor(statusCode = 400, errors = {}, response = null) {
    let message = '';

    if (_.isObject(errors)) {
      message = _.reduce(['detail', 'error', '__all__'], (result, value) => {
        result += errors[value] || '';
      }, message);

      if (_.isEmpty(message)) {
        _.forEach(errors, (value, key) => {
          if (_.isArray(value)) {
            value = value.join();
          }
          message += `${key}: ${value}\n`;
        });
      }
    }

    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.response = response;
  }
}

export class ValidationError extends SyncanoError {

  constructor(errors = {}) {
    const message = _.reduce(errors, (result, value, key) => {
      result += `${key} - ${value.join()} `;
      return result;
    }, '');

    super(message);
    this.errors = errors;
  }

}

