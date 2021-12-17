const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
   * @param {String} profile.email
   * @param {String} profile.fullName
   * @param {String} profile.password
   * @returns
   * @memberof AuthValidation
   */
    register(profile) {
        return this.Joi
            .object({
                password: this.Joi.string()
                    .regex(/^[a-zA-Z0-9]{6,16}$/)
                    .min(6)
                    .required(),
                email: this.Joi.string()
                    .email(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
            })
            .validate(profile);
    }

    /**
   * @param {String} data.id - objectId
   * @param {String} data.fullName
   * @param {String} data.email
   * @param {String} data.password
   * @returns
   * @memberof AuthValidation
   */
    login(data) {
        return this.Joi
            .object({
                _id: this.Joi.objectId(),
                password: this.Joi.string()
                    .regex(/^[a-zA-Z0-9]{6,16}$/)
                    .min(6)
                    .required(),
                email: this.Joi.string()
                    .email(),
                fullName: this.Joi
                    .string()
                    .min(1)
                    .max(30)
                    .required(),
            })
            .validate(data);
    }

    /**
   * @param {String} data.token
   * @returns
   * @memberof AuthValidation
   */
    refreshToken(data) {
        return this.Joi
            .object({
                refreshToken: [
                    this.Joi.string(),
                    this.Joi.number(),
                ],
            }).and('refreshToken')

            .validate(data);
    }
}

module.exports = new AuthValidation();
