const csv = require('csvtojson');
const path = require('node:path');
const BookModel = require('../../components/Books/model');

module.exports = {
  async up() {
    const csvBooks = await csv().fromFile('./src/albums-migrations/mocks/books.csv');

    try {
      await BookModel.create(csvBooks);
    } catch (error) {
      throw new Error(`Could not update changelog: ${error.message}`);
    }
  },

  async down(db) {
    return db.collection('books').deleteMany({});
  },
};
