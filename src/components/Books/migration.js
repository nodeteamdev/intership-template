const { adapter } = require('./adapters/convertation');

const BooksModel = require('./model');

module.exports = {
  async up() {
    await BooksModel.create(adapter);
  },
  async down() {
    await BooksModel.deleteOne({});
  },
};
