const UserModel = require('../User/model');

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function signUp(profile) {
    return UserModel.create(profile);
}

module.exports = {
    signUp,
};
