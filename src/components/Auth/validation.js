const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
     * @param {String} data.email - email
     * @returns
     * @memberof UserValidation
     */
  findByEmail(data) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
      })
      .validate(data);
  }
}

module.exports = new AuthValidation();
