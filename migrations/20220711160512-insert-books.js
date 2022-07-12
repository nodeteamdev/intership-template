const csv = require('csvtojson');
const path = require('node:path');
const model = require('../src/components/Book/model');

module.exports = {
    async up() {
        const csvBooks = await csv().fromFile(path.join(__dirname, './books.csv'));
        await model.create(csvBooks);
    },

    async down(db) {
        return db.collection('bookmodel').deleteMany({});
    },
};
