const BookModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns {Promise<[]>}
 */
function findAll() {
    return BookModel.find({}).lean();
}

/**
 * @exports
 * @method findById
 * @param {string} title
 * @summary get a book
 * @returns {Promise<{}>}
 */
function findByTitle(title) {
    return BookModel.findOne({ title }).lean();
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
 * @returns {Promise<{}>}
 */
function updateByTitle(newProfile) {
    return BookModel.updateOne({
        title: newProfile.title,
    }, newProfile).lean();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a book from database
 * @returns {Promise<{}>}
 */
function deleteById(_id) {
    return BookModel.deleteOne({ _id }).lean();
}

module.exports = {
    findAll,
    findByTitle,
    create,
    updateByTitle,
    deleteById,
};
