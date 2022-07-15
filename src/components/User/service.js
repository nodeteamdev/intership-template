const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll({ skip, limit }) {
    return UserModel.find({}, { password: 0, refreshToken: 0 }).skip(skip).limit(limit).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById(_id, projection) {
    return UserModel.findOne({ _id }, projection).exec();
}

function findByEmail(email, projection) {
    return UserModel.findOne({ email }, projection).exec();
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
    return UserModel.updateOne({ _id }, newProfile).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
    return UserModel.deleteOne({ _id }).exec();
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    create,
    updateById,
    deleteById,
};
