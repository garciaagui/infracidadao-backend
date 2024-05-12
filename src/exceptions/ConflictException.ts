import HttpException from './HttpException';

export default class ConflictException extends HttpException {
  private static status = 409;

  constructor(message: string) {
    super(ConflictException.status, message);
  }
}
