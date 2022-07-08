const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
    /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
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
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
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

module.exports = new UserValidation();
