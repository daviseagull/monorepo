export class HttpError extends Error {
  statusCode: number

  private constructor(status: number, msg: string) {
    super(msg)
    this.statusCode = status
  }

  static internalServerError(msg: string): HttpError {
    return new HttpError(500, msg)
  }

  static badRequest(msg: string): HttpError {
    return new HttpError(400, msg)
  }

  static unauthorized(msg: string): HttpError {
    return new HttpError(401, msg)
  }

  static forbidden(msg: string): HttpError {
    return new HttpError(403, msg)
  }
}
