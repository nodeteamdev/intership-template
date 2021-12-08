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
  findById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
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
  create(profile) {
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

  /**
   * @param {String} data.id - objectId
   * @param {String} data.firstName
   * @param {String} data.lastName
   * @returns
   * @memberof UserValidation
   */
  updateById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
        firstName: this.Joi
          .string()
          .min(1)
          .max(30),
        lastName: this.Joi
          .string()
          .min(1)
          .max(36),
      })
      .validate(data);
  }

  /**
   * @param {String} data.id - objectId
   * @returns
   * @memberof UserValidation
   */
  deleteById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }
}

module.exports = new UserValidation();
