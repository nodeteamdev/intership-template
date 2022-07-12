const BooksModel = require('./model');

const { convertation } = require('./convertation');

module.exports = {
  async up() {
    await BooksModel.create(convertation);
  },
  async down() {
    await BooksModel.deleteOne({});
  },
};
