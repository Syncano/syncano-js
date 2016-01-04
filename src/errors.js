export class SyncanoError extends Error {

}

export class ValidationError extends SyncanoError {

  constructor(errors = {}) {
    let message = 'ValidationError';

    if (!_.isEmpty(errors)) {
      const keys = _.keys(errors);
      message += `: ${keys[0]} - ${errors[keys[0]].join()}`;
    }

    super(message);
    this.errors = errors;
  }

}

