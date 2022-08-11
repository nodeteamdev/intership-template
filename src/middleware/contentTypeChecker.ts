import { Request, Response, NextFunction } from 'express';

const SUPPORTED_CONTENT_TYPES = ['application/x-www-form-urlencoded', 'application/json'];

const contentTypeChecker = (req: Request, _res: Response, next: NextFunction) => {
    const contentType = req.headers['content-type'];
    if (contentType !== undefined && SUPPORTED_CONTENT_TYPES.indexOf(contentType) === -1) {
        next(new Error('Unsupported Content-Type'));
    }
    next();
};

export default contentTypeChecker;
