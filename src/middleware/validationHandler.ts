import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { DataToValidate } from '../components/validation';
import ValidationError from '../error/ValidationError';

type JoiValidateFunction = (data: DataToValidate) => Joi.ValidationResult;

const validateData = (data: DataToValidate) => (validationMethod: JoiValidateFunction) => (
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
    const data = { ...req.params, ...req.query, ...req.body } as DataToValidate;
    return validateData(data)(validationMethod)(req, res, next);
};

const validateParams = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => validateData(req.params as DataToValidate)(validationMethod)(req, res, next);

const validateQuery = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => validateData(req.query as DataToValidate)(validationMethod)(req, res, next);

const validateBody = (validationMethod: JoiValidateFunction) => (
    req: Request,
    res:Response,
    next: NextFunction,
) => validateData(req.body as DataToValidate)(validationMethod)(req, res, next);

export {
    validateAny,
    validateParams,
    validateQuery,
    validateBody,
};
