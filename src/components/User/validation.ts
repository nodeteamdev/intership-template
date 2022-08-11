import Joi from "@hapi/joi";
import Validation from "../validation";

export interface FindById {
  id: string
}

interface Create {
  email: string,
  fullName: string
}

interface UpdateById {
  id: string,
  fullName: string
}

interface DeleteById {
  id: string
}

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
  findById(data: FindById) {
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
  create(profile: Create) {
    return this.Joi
      .object({
        email: this.Joi.string().email(),
        fullName: this.Joi
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
  updateById(data: UpdateById) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
        fullName: this.Joi
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
  deleteById(data: DeleteById) {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }
}

export default new UserValidation();
