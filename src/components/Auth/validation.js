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
  signUp(profile) {
    return this.Joi
      .object({
        firstName: this.Joi
          .string()
          .min(1)
          .max(36)
          .required()
          .label('First Name'),
        lastName: this.Joi
          .string()
          .allow(null, '')
          .label('Last Name'),
        email: this.Joi
          .string()
          .email()
          .required(),
        password: this.Joi
          .string()
          .min(6)
          .max(36)
          .required()
          .label('Password'),
        password2: this.Joi
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
  Tokens(profile) {
    return this.Joi
      .object({
        accessToken: this.Joi
          .string()
          .required(),
        refreshToken: this.Joi
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
        password2: this.Joi
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
