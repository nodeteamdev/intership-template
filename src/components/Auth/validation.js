const { AuthError } = require('../../error');
const Validation = require('../validation');
const { tokens } = require('../../config/credentials').JWT;
/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
   * @param {String} profile.firstName
   * @param {String} profile.lastName
   * @param {String} profile.email
   * @param {String} profile.password
   * @returns
   * @memberof AuthValidation
   */
  signUp(profile) {
    return this.Joi
      .object({
        firstName: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        lastName: this.Joi
          .string()
          .min(1)
          .max(30),
        email: this.Joi
          .string()
          .email()
          .required(),
        password: this.Joi
          .string()
          .min(6)
          .max(36)
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
        email: this.Joi
          .string()
          .email()
          .required(),
        password: this.Joi
          .string()
          .min(6)
          .max(36)
          .required(),
      })
      .validate(profile);
  }

  /**
     * @param {String} token

     * @returns
     * @memberof AuthValidation
     */
  tokenValidate(profile) {
    try {
      return this.JWT.verify(profile.token, tokens.refresh.secret);
    } catch (error) {
      throw new AuthError(error.message, 403);
    }
  }
}

module.exports = new AuthValidation();
