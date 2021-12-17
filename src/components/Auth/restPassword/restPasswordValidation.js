const Validation = require('../../validation');
/**
 * @exports
 * @class
 * @extends Validation
 */
class RestPasswordValidation extends Validation {
    /**
 * @param {String} profile.email
 * @returns
 * @memberof RestPasswordValidation
 */
    forgotPassword(profile) {
        return this.Joi
            .object({
                email: this.Joi.string()
                    .email()
                    .required(),

            })
            .validate(profile);
    }

    /**
 * @param {String} data.password1
 * @param {String} data.password2
 * @param {String} data.refreshToken
 * @returns
 * @memberof RestPasswordValidation
 */
    confirmPassword(data) {
        return this.Joi
            .object({
                password1: this.Joi.string()
                    .regex(/^[a-zA-Z0-9]{6,16}$/)
                    .min(6)
                    .required(),
                password2: this.Joi.valid(this.Joi.ref('password1'))
                    .required(),
                refreshToken: [
                    this.Joi.string(),
                    this.Joi.number(),
                ],
            }).and('refreshToken')
            .validate(data);
    }
}

module.exports = new RestPasswordValidation();
