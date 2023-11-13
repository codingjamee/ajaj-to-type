class NotFoundError extends Error {
    constructor(message) {
    super(message);
    this.name = "Not Found";
    this.statusCode = 404;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = 401;
    }
}

class BadRequestError extends Error {
    constructor(message) {
    super(message);
    this.name = "Bad Request";
    this.statusCode = 400;
    }
}

module.exports = { NotFoundError, UnauthorizedError, BadRequestError }

