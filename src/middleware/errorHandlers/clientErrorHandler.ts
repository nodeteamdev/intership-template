import { Request, Response, NextFunction } from 'express';
import AuthError from '../../error/AuthError';
import ResourceNotFoundError from '../../error/ResourceNotFoundError';
import ValidationError from '../../error/ValidationError';

const clientErrorHandler = (
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof ValidationError) {
        // 422 Validation response
        res.status(422).json({
            message: error.name,
            details: error.details,
        });
    } else if (error instanceof ResourceNotFoundError) {
        // 404 Resource not found response
        res.status(404).json({
            message: error.name,
            details: error.message,
        });
    } else if (error instanceof AuthError) {
        // 401 Unauthorized found response
        res.status(401).json({
            message: error.name,
            details: error.message,
        });
    } else if (process.env.DEBUG === 'true') {
        // unhandled client error response with DEBUG flag
        res.status(500).json({
            message: error.name,
            details: error.message,
        });
    } else {
        // unhandled client error response without DEBUG flag
        res.status(500).json({
            message: 'Internal Server Error',
            details: 'Oops, something\'s broken... Please leave us short feedback so we can fix it faster.',
        });
    }

    // pass to the next error middleware
    next(error);
};

export default clientErrorHandler;
