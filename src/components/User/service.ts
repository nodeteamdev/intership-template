import UserModel, { IUser } from './model';

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
  return UserModel.find({}).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */

function findById(id: string): Promise<IUser> {
  return UserModel.findById(id).exec();
}
/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */

function create(profile: IUser): Promise<IUser> {
  return UserModel.create(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */

function updateById(_id: string, newProfile: {}): Promise<IUser> {
  return UserModel.updateOne({ _id }, newProfile).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */

function deleteById(_id: string): Promise<IUser> {
  return UserModel.deleteOne({ _id }).exec();
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
