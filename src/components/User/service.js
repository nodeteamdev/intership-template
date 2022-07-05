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
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(id) {
    return UserModel.findById(id).exec();
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
 * @param {string} email
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateById(email, newProfile) {
    return UserModel.updateOne({ email }, newProfile).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} email
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(email) {
    return UserModel.deleteOne({ email }).exec();
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
