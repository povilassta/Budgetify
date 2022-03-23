class ConflictError extends Error {
  name = this.constructor.name;
  statusCode = 409;

  constructor(message) {
    super(message);
  }
}

export default ConflictError;
