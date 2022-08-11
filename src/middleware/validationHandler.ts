import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import ValidationError from '../error/ValidationError';

type JoiValidateFunction = (data: any) => Joi.ValidationResult;

const validateData = (data: any) => (validationMethod: JoiValidateFunction) => (
    _req: Request,
    _res:Response,
    next: NextFunction,
) => {
    const { error } = validationMethod(data);
    const valid = error === null || error === undefined;

    if (!valid) {
        throw new ValidationError(error.details);
    }
    next();
};

const validateAny = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => {
    const data = { ...req.params, ...req.query, ...req.body };
    return validateData(data)(validationMethod)(req, res, next);
};

// eslint-disable-next-line arrow-body-style
const validateParams = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => validateData(req.params)(validationMethod)(req, res, next);

// eslint-disable-next-line arrow-body-style
const validateQuery = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => validateData(req.query)(validationMethod)(req, res, next);

// eslint-disable-next-line arrow-body-style
const validateBody = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => validateData(req.body)(validationMethod)(req, res, next);

export {
    validateAny,
    validateParams,
    validateQuery,
    validateBody,
};
