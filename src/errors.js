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
      value : name || this.constructor.name,
    });

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor);
      return;
    }

    Object.defineProperty(this, 'stack', {
      enumerable : false,
      value : (new Error(message)).stack,
    });
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

