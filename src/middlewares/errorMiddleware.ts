import { ErrorRequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err as HttpException;
  return res.status(status || 500).json({ message });
};

export default errorMiddleware;
