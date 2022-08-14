import Validation from '../validation';

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
  /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @returns
     * @memberof AuthValidation
     */
  validateUserData(profile: string) {
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
     * @returns
     * @memberof UserValidation
     */
  validateToken(data) {
    return this.Joi
      .object({
        token: [
          this.Joi.string(),
          this.Joi.number(),
        ],
      })
      .validate(data);
  }
}

export default new AuthValidation();
