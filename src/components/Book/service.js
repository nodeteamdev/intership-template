const BookModel = require('./model');

function getCountryBooksService() {
    return BookModel.aggregate([
        {
            $group: {
                _id: '$code3',
                total: {
                    $sum: 1,
                },
            },
        },
    ]);
}

function getNewBooksService() {
    return BookModel.aggregate([
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);
}

module.exports = {
    getCountryBooksService,
    getNewBooksService,
};
