const UserModel = require('../User/model');

/**
 * @exports
 * @method signUp
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function signUp(profile) {
    return UserModel.create(profile);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} email
 * @param {object} newPassword
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function resetPassword(email, newPassword) {
    return UserModel.updateOne({ email }, { $set: { password: newPassword } }).exec();
}

module.exports = {
    signUp,
    resetPassword,
};
