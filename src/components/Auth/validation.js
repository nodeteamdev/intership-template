const Joi = require('joi');

const signUpBodyValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().required().label('name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.required().label('Password'),
    });
    return schema.validate(body);
};

const logInBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password'),
    });
    return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label('Refresh Token'),
    });
    return schema.validate(body);
};

module.exports = {
    signUpBodyValidation,
    logInBodyValidation,
    refreshTokenBodyValidation,
};
