import { Request, Response, NextFunction } from 'express';

function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  next(err);
}

export default logErrors;
