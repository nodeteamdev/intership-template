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
     * @param {String} profile.password
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
  create(profile) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        password: this.Joi
          .string(),
        fullName: this.Joi
          .string()
          .required(),
      })
      .validate(profile);
  }

  /**
     * @param {String} data.id - objectId
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
  updateById(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
        fullName: this.Joi
          .string()
          .required(),
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
