import * as Joi from 'joi';
import { ObjectId, Types } from 'mongoose';
import UserModel, { IUserModel } from './model';
import UserValidation from './validation';
import { IUserService } from './interface';
import { string } from 'joi';

/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * @exports
   * @method findAll
   * @param {}
   * @summary get list of all users
   * @returns Promise<IUserModel[]>
   */
  async findAll (): Promise<IUserModel[]> {
    try {
      return await UserModel.find({});
    }catch (error: any) {
      throw new Error(error.message);
    }
  },

  /**
   * @exports
   * @method findById
   * @param {ObjectId} id
   * @summary get a user
   * @returns {Promise<IUserModel>}
   */
   async findById(id: string): Promise <IUserModel | null > {
    const end: string = 'end';
    
    try {
      const validate: Joi.ValidationResult = UserValidation.findById({id});
  
      if (validate.error) {
        throw new Error(validate.error.message);
      }
  
      const user: IUserModel | null = await UserModel.findById({
        _id: id
      });

      return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        return await UserModel.findById({
            _id: id
          });
    }
  },

  /**
   * @exports
   * @method create
   * @param {IUserModel} user
   * @summary create a new user
   * @memberof UserService
   * @returns {Promise<UserModel>}
   */
  async create (body: IUserModel): Promise < IUserModel | undefined > {
    try {
      const validate: Joi.ValidationResult = UserValidation.create(body);

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.create(body);

      return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
  },

  /**
   * Find a user by id and update his profile
   * @exports
   * @method updateById
   * @param {string} _id
   * @param {object} newProfile
   * @summary update a user's profile
   * @returns {Promise<void>}
   */
  async updateById (body: IUserModel): Promise < IUserModel | null | undefined > {
    try {
      const validate: Joi.ValidationResult = UserValidation.updateById(body);

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      const user: IUserModel | null | undefined = await UserModel.findByIdAndUpdate({_id: string}, body)

      return user;
  } catch (error) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
  }
  },

  /**
   * @exports
   * @method deleteById
   * @param {ObjectId} id
   * @summary delete a user from database
   * @returns {Promise<void>}
   */
  async deleteById (id: ObjectId): Promise < void > {
    try {
      const validate: Joi.ValidationResult = UserValidation.deleteById({
          id
      });

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      const user: IUserModel | null = await UserModel.findOneAndRemove({
          _id: string
      }).exec();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
  }
}

export default UserService;