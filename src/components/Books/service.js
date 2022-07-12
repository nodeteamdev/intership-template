const BooksModel = require('./books.model');

function countPerCountry() {
    return BooksModel.aggregate([
        { $group: { _id: '$code3', count: { $sum: 1 } } },
        { $project: { code3: '$_id', count: 1, _id: 0 } },
        { $sort: { code3: 1 } },
        { $project: { code3: 1, value: '$count' } },
    ]);
}

function getNewBooks() {
    return BooksModel.aggregate();
}

module.exports = {
    countPerCountry,
    getNewBooks,
};
