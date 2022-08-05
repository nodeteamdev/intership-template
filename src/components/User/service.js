const UserModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll() {
    return UserModel.find({}, { password: 0, hash: 0 }).exec();
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
 * @method findByEmail
 * @param {string} email
 * @summary get a user by email
 * @returns {Promise<UserModel>}
 */
function findByEmail(email) {
    return UserModel.findOne(email).exec();
}

/**
 * @exports
 * @method findBySocket
 * @param {string} socketId
 * @summary get a user by email
 * @returns {Promise<UserModel>}
 */
function findBySocket(socket) {
    return UserModel.findOne(socket).exec();
}

/**
 * @exports
 * @method findByHash
 * @param {string} hash
 * @summary get a user by hash
 * @returns {Promise<UserModel>}
 */
function findByHash(hash) {
    return UserModel.findOne({ hash }).exec();
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
    findByHash,
    findBySocket,
    create,
    updateById,
    deleteById,
};
