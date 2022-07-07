const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * @param {String} profile.fullName
     * @param {String} profile.email
     * @param {String} profile.password
     * @returns
     * @memberof AuthValidation
     */
    signUp(profile) {
        return this.Joi
            .object({
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                email: this.Joi.string().email().required(),
                password: this.Joi
                    .string()
                    .min(8)
                    .max(64)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.password
     * @returns
     * @memberof AuthValidation
     */
    signIn(profile) {
        return this.Joi
            .object({
                email: this.Joi.string().email().required(),
                password: this.Joi
                    .string()
                    .min(8)
                    .max(64)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} data.refreshToken
     * @returns
     * @memberof AuthValidation
     */
    refresh(data) {
        return this.Joi
            .object({
                refreshToken: this.Joi.string().required(),
            })
            .validate(data);
    }
}

module.exports = new AuthValidation();
