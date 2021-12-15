const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthUserValidation extends Validation {
    /**
     * @param {String} profile.fullName
     * @param {String} profile.email
     * @param {String} profile.password
     * @returns
     * @memberof UserValidation
     */
    create(profile) {
        return this.Joi
            .object({
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                email: this.Joi.string().email(),
                password: this.Joi
                    .string()
                    .min(4)
                    .max(10)
                    .required(),
            })
            .validate(profile);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.password
     * @returns
     * @memberof UserValidation
     */
    signIn(profile) {
        return this.Joi
            .object({
                email: this.Joi.string().email(),
                password: this.Joi
                    .string()
                    .min(4)
                    .max(10)
                    .required(),
            })
            .validate(profile);
    }
}

module.exports = new AuthUserValidation();
