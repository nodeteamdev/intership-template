import { Request, Response, NextFunction } from 'express';
import logger from '../../helpers/logger';

const errorHandler = (
    error: Error,
    _req: Request,
    _res: Response,
    _next: NextFunction,
) => {
    // TODO: handle some errors
    if (error instanceof TypeError) {
        logger('Use TypeScript!', 'errorHandler middleware', 'warn');
    } else {
        logger('The error was not handled..', 'errorHandler middleware', 'warn');
    }
};

export default errorHandler;
