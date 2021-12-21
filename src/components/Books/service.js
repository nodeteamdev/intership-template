const BookModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of new books
 * @returns Promise<BookModel[]>
 */
function findAll() {
    return BookModel.find({}).exec();
}
/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all books
 * @returns Promise<BookModel[]>
 */
function getNewBooks() {
    return BookModel.find().sort({ createdAt: -1 }).limit(5).lean();
}
function getCountOfBooksByCountry() {
    return BookModel.aggregate([
        {
            $group: {
                _id: '$code3',
                value: {
                    $sum: 1,

                },

            },
        },
    ]);
}
/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a book
 * @returns {Promise<BookModel>}
 */
function findById(id) {
    return BookModel.findById(id).exec();
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
 * Find a book by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a book profile
 * @returns {Promise<void>}
 */
function updateById(_id, newProfile) {
    return BookModel.findOneAndUpdate({ _id }, newProfile, { new: true }).lean();
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
    findById,
    create,
    updateById,
    deleteById,
    getNewBooks,
    getCountOfBooksByCountry,
};
