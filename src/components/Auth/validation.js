const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof AuthValidation
     */
    login(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email().trim().lowercase(),
                password: this.Joi.string()
                    .pattern(/^[a-zA-Z ]{3,20}$/)
                    .trim()
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.password
     * @returns
     * @memberof AuthValidation
     */
    signUp(profile) {
        return this.Joi
            .object({
                email: this.Joi.string().email().trim().lowercase(),
                password: this.Joi.string()
                    .pattern(/^[a-zA-Z ]{3,20}$/)
                    .trim()
                    .required(),
            })
            .validate(profile);
    }
}

module.exports = new AuthValidation();
