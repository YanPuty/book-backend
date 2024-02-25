class HttpError extends Error {
  /** */
  constructor(message, statusCode, name, errorCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  toJSON() {
    if (this.errorCode != null) {
      return {
        statusCode: this.statusCode,
        error: this.name,
        message: this.message,
        errorCode: this.errorCode,
        payload: this.payload,
      };
    } else {
      return {
        statusCode: this.statusCode,
        error: this.name,
        message: this.message,
      };
    }
  }
}

module.exports = HttpError;
