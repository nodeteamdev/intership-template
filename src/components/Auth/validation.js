const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
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
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} profile.email
     * @returns
     * @memberof AuthValidation
     */
    checkMail(profile) {
        return this.Joi
            .object({
                email: this.Joi.string().trim().email().required(),
            })
            .validate(profile);
    }
}

module.exports = new AuthValidation();
