import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  detail = 'Error Connecting to Database';
  statusCode = 500;

  constructor() {
    super('Error Connecting to Database');

    // because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.detail }];
  }
}
