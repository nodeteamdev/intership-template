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
  forgotPassword(email) {
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
          .required()
          .label('Password'),
        passwordConfirmation: this.Joi
          .any()
          .valid(
            this.Joi.ref('password'),
          )
          .required()
          .label('Confirm password')
          .options({ messages: { 'any.only': '{{#label}} does match' } }),
      })
      .validate(profile);
  }
}

module.exports = new AuthValidation();
