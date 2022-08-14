import { Request, Response, NextFunction } from 'express';
import ValidationError from './ValidationError';

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('logErrors', err.toString());
  next(err);
}

function clientErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('clientError', err.toString());

  if (err instanceof ValidationError) {
    res.status(422).json({
      error: err.name,
      details: err.message,
    });
  } else {
    next(err);
  }
}

function errorHandler(err: any, req: Request, res: Response) {
  console.error('lastErrors', err.toString());

  res.status(500).json({
    message: err.name,
    details: err.message,
  });
}

export default {
  clientErrorHandler,
  logErrors,
  errorHandler,
};
