const UserModel = require('../User/model');

/**
 * @exports
 * @method findByEmail
 * @param {}
 * @summary get user by EMail
 * @returns Promise<UserModel[]>
 */
function findByEmail(email) {
  return UserModel.findOne({ email }).exec();
}

module.exports = {
  findByEmail,
};
