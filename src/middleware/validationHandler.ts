const ValidationError = require('../error/ValidationError');

const validateData = (data) => (validationMethod) => (_req, _res, next) => {
    const { error } = validationMethod(data);
    const valid = error === null || error === undefined;

    if (!valid) {
        throw new ValidationError(error.details);
    }
    next();
};

const validateAny = (validationMethod) => (req, res, next) => {
    const data = { ...req.params, ...req.query, ...req.body };
    return validateData(data)(validationMethod)(req, res, next);
};

// eslint-disable-next-line arrow-body-style
const validateParams = (validationMethod) => (req, res, next) => {
    return validateData(req.params)(validationMethod)(req, res, next);
};

// eslint-disable-next-line arrow-body-style
const validateQuery = (validationMethod) => (req, res, next) => {
    return validateData(req.query)(validationMethod)(req, res, next);
};

// eslint-disable-next-line arrow-body-style
const validateBody = (validationMethod) => (req, res, next) => {
    return validateData(req.body)(validationMethod)(req, res, next);
};

module.exports = {
    validateAny,
    validateParams,
    validateQuery,
    validateBody,
};
