const connections = require('../../config/connection');

const booksCollection = connections.collection('books');

// returns array with books number per each country code
async function getBooksPerCountry() {
    return booksCollection
        .aggregate([
            {
                $group: {
                    _id: '$code3',
                    value: {
                        $sum: 1,
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    code3: '$_id',
                    value: 1,
                },
            },
        ])
        .toArray();
}

// returns array with 10 latest books
async function getNewBooks() {
    return booksCollection
        .find()
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray();
}

module.exports = {
    getBooksPerCountry,
    getNewBooks,
};
