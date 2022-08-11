import UserModel, { User } from './model';

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
function findById(id: string) {
    return UserModel.findById(id).exec();
}

/**
 * @exports
 * @method create
 * @param {UserData} data
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create(data: User) {
    return UserModel.create(data);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} id
 * @param {UserData} data
 * @summary update a user's profile
 * @returns {Promise<UserModel>}
 */
function updateById(id: string, data: User) {
    return UserModel.findOneAndUpdate({ _id: id }, data, { new: true }).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} id
 * @summary delete a user from database
 * @returns {Promise<UserModel>}
 */
function deleteById(id: string) {
    return UserModel.findOneAndDelete({ _id: id }).exec();
}

export {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
};
