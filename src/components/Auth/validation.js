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
   * @memberof AuthValidation
   */
  token(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
        userId: this.Joi.string(),
      })
      .validate(data);
  }

  /**
   * @param {String} profile.email
   * @param {String} profile.firstName
   * @param {String} profile.lastName [optional]
   * @returns
   * @memberof UserValidation
   */
  signIn(data) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        password: this.Joi
          .string()
          .min(6)
          .max(30)
          .required(),
      })
      .validate(data);
  }

  /**
   * @param {String} profile.email
   * @param {String} profile.password
   * @param {String} profile.firstName
   * @param {String} profile.lastName [optional]
   * @returns
   * @memberof UserValidation
   */
  signUp(profile) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        password: this.Joi
          .string()
          .min(6)
          .max(30)
          .required(),
        firstName: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        lastName: this.Joi
          .string()
          .min(1)
          .max(36),
      })
      .validate(profile);
  }
}

module.exports = new AuthValidation();
