const UserModel = require('./model');

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
 * @method findByEmail
 * @param {string} email
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findByEmail(email) {
    return UserModel.findOne({ email }).exec();
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
 * @method updateByEmail
 * @param {string} email
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateByEmail(email, newProfile) {
    return UserModel.updateOne({ email }, newProfile).exec();
}

/**
 * @exports
 * @method deleteByEmail
 * @param {string} email
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteByEmail(email) {
    return UserModel.deleteOne({ email }).exec();
}

module.exports = {
    findAll,
    findByEmail,
    create,
    updateByEmail,
    deleteByEmail,
};
