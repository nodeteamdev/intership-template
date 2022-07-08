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
  getUser(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }

  /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
  newUser(profile) {
    return this.Joi
      .object({
        firstname: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        lastname: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        email: this.Joi.string().email(),
        password: this.Joi
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
     * @returns
     * @memberof UserValidation
     */
  updateUser(data) {
    return this.Joi
      .object({
        firstname: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        lastname: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
        email: this.Joi.string().email(),
        password: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(data);
  }

  /**
     * @param {String} data.id - objectId
     * @returns
     * @memberof UserValidation
     */
  deleteUser(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }

  loginUser(data) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        password: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(data);
  }

  refreshTokenUser(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }

  logoutUser(data) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }
}

module.exports = new UserValidation();
