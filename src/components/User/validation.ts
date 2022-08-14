import Validation from '../validation';

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
  /**
     * @param {String} data.email - objectEmail
     * @returns
     * @memberof UserValidation
     */
  findByEmail(data: string) {
    return this.Joi
      .object({
        // id: this.Joi.objectId(),
        email: this.Joi.string().email().required(),
      })
      .validate(data);
  }

  /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof UserValidation
     */
  create(profile: string) {
    return this.Joi
      .object({
        email: this.Joi.string().email().required(),
        fullName: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(profile);
  }

  /**
     * @param {String} data.email - objectEmail
     * @param {String} data.fullName
     * @returns
     * @memberof UserValidation
     */
  updateByEmail(data: string) {
    return this.Joi
      .object({
        // id: this.Joi.objectId(),
        email: this.Joi.string().email().required(),
        fullName: this.Joi
          .string()
          .min(1)
          .max(30)
          .required(),
      })
      .validate(data);
  }

  /**
     * @param {String} data.email - objectEmail
     * @returns
     * @memberof UserValidation
     */
  deleteByEmail(data: string) {
    return this.Joi
      .object({
        email: this.Joi.string().email().required(),
      })
      .validate(data);
  }
}

export default new UserValidation();
