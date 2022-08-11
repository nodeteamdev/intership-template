import { Request, Response, NextFunction } from 'express';
import logger from '../../helpers/logger';

const logErrors = (
    error: Error,
    _req: Request,
    _res: Response,
    next: NextFunction,
) => {
    logger(error, 'logErrors middleware', 'error');

    next(error);
};

export default logErrors;
