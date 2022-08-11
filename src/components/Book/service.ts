const BookModel = require('./model');

async function getAllBooksCountPerCountry() {
    return BookModel
        .aggregate([
            {
                $group: {
                    _id: '$code3',
                    value: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    code3: '$_id',
                    value: '$value',
                },
            },
        ])
        .exec();
}

async function getNewBooks(limit) {
    return BookModel
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .exec();
}

module.exports = {
    getAllBooksCountPerCountry,
    getNewBooks,
};
