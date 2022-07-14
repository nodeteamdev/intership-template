const csv = require('csvtojson');
const path = require('node:path');
const model = require('../src/components/Book/model');

module.exports = {
    async up() {
        const csvBooks = await csv().fromFile(path.join(__dirname, './books.csv'));

        try {
            await model.create(csvBooks);
        } catch (err) {
            throw new Error(`Could not update changelog: ${err.message}`);
        }
    },

    async down(db) {
        return db.collection('bookmodel').deleteMany({});
    },
};
