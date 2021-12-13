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
  refreshToken(profile) {
    return this.Joi
      .object({
        userId: this.Joi
          .string()
          .required(),
        token: this.Joi
          .string()
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
  forgotPassEmail(email) {
    return this.Joi
      .object({
        email: this.Joi
          .string()
          .email()
          .required(),
      })
      .validate(email);
  }

  /**
   * @param {String} profile.email
   * @param {String} profile.password
   * @returns
   * @memberof AuthValidation
   */
  resetPassword(profile) {
    return this.Joi
      .object({
        password: this.Joi
          .string()
          .min(6)
          .max(30)
          .required(),
      })
      .validate(profile);
  }
}

module.exports = new AuthValidation();
