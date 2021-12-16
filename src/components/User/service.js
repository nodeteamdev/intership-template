const bcrypt = require('bcrypt');
const UserModel = require('./model');

const saltRounds = 10;

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns {Promise<[]>}
 */
function findAll() {
    return UserModel.find({}).lean();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<{}>}
 */
function findById(id) {
    return UserModel.findById(id).lean();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(profile) {
    const hash = bcrypt.hashSync(profile.password, saltRounds);
    return UserModel.create({
        fullName: profile.fullName,
        email: profile.email,
        password: hash,
        role: profile.role,
    });
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<{}>}
 */
function updateById(_id, newProfile) {
    return UserModel.updateOne({ _id }, newProfile).lean();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<{}>}
 */
function deleteById(_id) {
    return UserModel.deleteOne({ _id }).lean();
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
