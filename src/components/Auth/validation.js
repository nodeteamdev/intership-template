const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
    register(data) {
        return this.Joi
            .object({
                email: this.Joi.string().email(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
                password: this.Joi
                    .string()
                    .min(4)
                    .max(30)
                    .required(),
            })
            .validate(data);
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
    login(profile) {
        return this.Joi
            .object({
                email: this.Joi.string().email(),
                password: this.Joi
                    .string()
                    .min(4)
                    .max(30)
                    .required(),
            })
            .validate(profile);
    }
}

module.exports = new AuthValidation();
