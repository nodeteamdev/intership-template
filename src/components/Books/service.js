const BooksModel = require('./books.model');

function countPerCountry() {
    return BooksModel.aggregate([
        { $group: { _id: '$code3', value: { $sum: 1 } } },
        { $project: { code3: { $toUpper: '$_id' }, _id: 0, value: 1 } },
        { $sort: { code3: 1 } },
    ]);
}

module.exports = {
    countPerCountry,
};
