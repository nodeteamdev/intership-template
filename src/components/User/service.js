const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
  return UserModel.find({});
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(id) {
  return UserModel.findById(id).lean();
}

/**
 * @exports
 * @method isExists
 * @param {string} {id: value, email: value,}
 * @summary
 * @returns {Boolean}
 */
function isExists(fields) {
  return UserModel.exists(fields);
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
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
function updateById(_id, newProfile) {
  return UserModel.updateOne({ _id }, newProfile);
}

/**
 * @exports
 * @method searchByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function searchByEmail(email) {
  return UserModel.findOne({ email }).lean();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
  return UserModel.deleteOne({ _id });
}

module.exports = {
  findAll,
  findById,
  searchByEmail,
  create,
  updateById,
  deleteById,
  isExists,
};
