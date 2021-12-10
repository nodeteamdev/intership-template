const BookModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<BookModel[]>
 */
function findAll() {
    return BookModel.find({}).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} title
 * @summary get a book
 * @returns {Promise<BookModel>}
 */
function findByTitle(title) {
    return BookModel.findOne({ title }).exec();
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new book
 * @returns {Promise<BookModel>}
 */
function create(profile) {
    return BookModel.create(profile);
}

/**
 * Find a book by id and update it's profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a book's profile
 * @returns {Promise<void>}
 */
function updateByTitle(title, newProfile) {
    return BookModel.updateOne({ title }, newProfile).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a book from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
    return BookModel.deleteOne({ _id }).exec();
}

module.exports = {
    findAll,
    findByTitle,
    create,
    updateByTitle,
    deleteById,
};
