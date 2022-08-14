import { UpdateResult, DeleteResult } from 'mongodb';
import UserModel, { User } from './model';

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<User[]>
 */
function findAll(): Promise<User[]> {
  return UserModel.find({}).exec();
}

/**
 * @exports
 * @method findOne
 * @param {string} email
 * @summary get a user
 * @returns {Promise<User>}
 */
function findByEmail(email: string): Promise<User | null> {
  return UserModel.findOne({ email }).exec();
}

/**
 * @exports
 * @method create
 * @param {User} profile
 * @summary create a new user
 * @returns {Promise<User>}
 */
function create(profile: User): Promise<User> {
  return UserModel.create(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateByEmail
 * @param {string} email
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateByEmail(email: string, newProfile: User): Promise<UpdateResult> {
  return UserModel.updateOne({ email }, newProfile).exec();
}

/**
 * @exports
 * @method deleteOne
 * @param {string} email
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteByEmail(email: string): Promise<DeleteResult> {
  return UserModel.deleteOne({ email }).exec();
}

export default {
  findAll,
  findByEmail,
  create,
  updateByEmail,
  deleteByEmail,
};
