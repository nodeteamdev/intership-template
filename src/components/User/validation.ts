import Joi from 'joi';
import Validation from '../validation';
import { IUser } from './model';
import { IFindById } from './interfaces/find-by-id.interface';
import { IDeleteById } from './interfaces/delete-by-id.interface';
import { IUpdateById } from './interfaces/update-by-id.interface';

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
  findById(data: IFindById): Joi.ValidationResult {
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
  create(profile: IUser): Joi.ValidationResult {
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
  updateById(data: IUpdateById): Joi.ValidationResult {
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
  deleteById(data: IDeleteById): Joi.ValidationResult {
    return this.Joi
      .object({
        id: this.Joi.objectId(),
      })
      .validate(data);
  }
}

export default new UserValidation();
