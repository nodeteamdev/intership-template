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
 * @method findNew
 * @param {}
 * @summary get new books by user activity
 * @returns {Promise<[BookModel]>}
 */
function findNew(lastVisitBooks) {
    return BookModel.aggregate([{
        $match: {
            updatedAt: {
                $gte: lastVisitBooks,
            },
        },
        $unset: [
            'createdAt',
            'updatedAt',
        ],
    }]).lean();
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
 * @method countPerCountry
 * @param {}
 * @summary gets a number of books per country
 * @returns {Promise<[{ code3, value }]>}
 */
function countPerCountry() {
    return BookModel.aggregate([{
        $match: {},
        $unset: [
            'title',
            'description',
            'createdAt',
            'updatedAt',
        ],
        $group: {
            code3: '$code3',
            value: {
                $count: {},
            },
        },
    }]).lean();
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
    findNew,
    findByTitle,
    countPerCountry,
    create,
    updateByTitle,
    deleteById,
};
