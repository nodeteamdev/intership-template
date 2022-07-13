const csvtojson = require('csvtojson');
const BookService = require('../src/components/Book/service');

module.exports = {
  async up(db) {
    // csvtojson()
    //   .fromFile('books.csv')
    //   .then((csvData) => {
    //     db.collection('books2').insertOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } });
    //   }).catch((err) => {
    //     throw new Error(err);
    //   });
    db.collection('albums').insertOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } });
  },
  async down(db) {
    await db.collection('albums').updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } });
  },
};
