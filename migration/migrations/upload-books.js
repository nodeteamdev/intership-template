const path = require('path');
const csv = require('csvtojson');

const uploadBooks = {
    async up(db) {
        const data = await csv().fromFile(path.join(__dirname, '../data/books.csv'));

        const books = db.collection('books');
        await books.insertMany(data);
        await books.aggregate([
            {
                $addFields: {
                    createdAt: {
                        $toDate: '$_id',
                    },
                    updatedAt: {
                        $toDate: '$_id',
                    },
                },
            },
        ]);
    },
    async down(db) {
        const books = db.collection('books');
        books.deleteMany({});
    },
};

module.exports = uploadBooks;
