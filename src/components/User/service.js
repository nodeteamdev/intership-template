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

function findBy_nickName(nickName) {
    return UserModel.findOne({ nickName: nickName });
}

function isExistsEmail(email) {
    return UserModel.exists({ email });
}

function isExists_nickName(nickName) {
    return UserModel.exists({ nickName: nickName });
}

function findByEmail(email) {
    return UserModel.findOne({ email: email })
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
    findBy_nickName,
    create,
    updateById,
    deleteById,
    isExistsEmail,
    isExists_nickName,
    findByEmail,
};
