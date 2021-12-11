const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
  return UserModel.find({}).lean().exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(id) {
  return UserModel.findById(id).lean().exec();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
  return UserModel.create(profile).lean().exec();
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
function updateById(_id, newProfile) {
  return UserModel.updateOne({ _id }, newProfile).lean().exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
  return UserModel.deleteOne({ _id }).lean().exec();
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
