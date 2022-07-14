const BooksModel = require('./books.model');

function countPerCountry() {
    return BooksModel.aggregate([
        { $group: { _id: '$code3', count: { $sum: 1 } } },
        { $project: { code3: '$_id', _id: 0, value: '$count' } },
        { $sort: { code3: 1 } },
    ]);
}

function getNewBooks() {
    return BooksModel.aggregate([
        {
            $match: {
                $or: [
                    { createdAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } },
                    { updatedAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } },
                ],
            },
        },
    ]);
}

module.exports = {
    countPerCountry,
    getNewBooks,
};
