import Validation from '../validation';
import Joi from 'joi';
import { IUserModel } from './model';
import { ObjectId } from 'mongoose';

/**
 * @exports
 * @class
 * @extends Validation
 */
class UserValidation extends Validation {
  
  /**
   * 
   * Creates an instance of UserValidation
   * @memberof UserValidation
   */
  constructor(){
    super();
  }

  /**
     * @param {ObjectId} data.id - objectId
     * @returns {Joi.ValidationResult<{id: string}>}
     * @memberof UserValidation
     */
  findById(body: {id: string}): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required()
  });

  return schema.validate(body);
  }

  /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult}
     * @memberof UserValidation
     */
  create(profile: IUserModel): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      email: Joi.string().email({
          minDomainSegments: 2
      }).required(),
      fullName: Joi.string().required()
  });

  return schema.validate(profile);
  }

  /**
     * @param {{ id: string, fullName: string }} body
     * @returns
     * @memberof UserValidation
     */
  updateById(data: IUserModel): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
      fullName: Joi.string().required()
    })

    return schema.validate(data)
  }

  /**
     * @param {{ id: string }} body
     * @returns
     * @memberof UserValidation
     */
  deleteById(body: {
    id: ObjectId;
  }): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required()
  });

  return schema.validate(body);
  }
}

export default new UserValidation();