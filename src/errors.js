export class SyncanoError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'SyncanoError';
  }
}

export class ValidationError extends SyncanoError {

  constructor(errors = {}) {
    let message = _.reduce(errors, (result, value, key) => {
      result += `${key} - ${value.join()} `;
      return result;
    }, '');

    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }

}

