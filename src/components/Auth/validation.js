const Validation = require('../validation');
const AuthError = require('../../error/AuthError');

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
     * @param {String} profile.token
     * @returns
     * @memberof AuthValidation
     */
    checkToken(token) {
        try {
            return this.JWT.verify(token, process.env.SECRET);
        } catch (error) {
            throw new AuthError(error.message, 403);
        }
    }
}

module.exports = new AuthValidation();
