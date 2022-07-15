const BooksModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all books
 * @returns {Promise<BooksModel[]>}
 */
function findAll({ skip, limit }) {
    return BooksModel.find({}).skip(skip).limit(limit).exec();
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a book
 * @returns {Promise<BooksModel>}
 */
function findById(_id, projection) {
    return BooksModel.findOne({ _id }, projection).exec();
}

/**
 * @exports
 * @method getGroupedByCountry
 * @param {}
 * @summary get list of all books
 * @returns {Promise<BooksModel[]>}
 */
function getGroupedByCountry({ skip, limit }) {
    return BooksModel.aggregate(
        [
            {
                $group: { _id: '$code3', count: { $sum: 1 } },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ],
    );
}

/**
 * @exports
 * @method getNewBooks
 * @param {}
 * @summary get list of all users
 * @returns {Promise<BooksModel[]>}
 */
function getNewBooks({ skip, limit }) {
    return BooksModel.aggregate(
        [
            {
                $sort: { updatedAt: -1 },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ],
    );
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new book
 * @returns {Promise<BooksModel>}
 */
function create(book) {
    return BooksModel.create(book);
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newBook
 * @summary update a book's profile
 * @returns {Promise<void>}
 */
function updateById(_id, newBook) {
    return BooksModel.updateOne({ _id }, newBook).exec();
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a book from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
    return BooksModel.deleteOne({ _id }).exec();
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    getGroupedByCountry,
    getNewBooks,
};
