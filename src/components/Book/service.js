const { exists } = require('./model');
const BookModel = require('./model');

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all Books
 * @returns Promise<BookModel[]>
 */
function countPerCountry() {
  return BookModel.aggregate([
    { $match: { _id: exists } },
    { $group: { _id: '$code3', value: { $sum: 1 } } },
    { $sort: { value: -1 } },
  ]);
}

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all new Books
 * @returns Promise<BookModel[]>
 */
function findNewestBooks() {
  const last7days = new Date();
  last7days.setHours(last7days.getHours() - 168);

  return BookModel.aggregate([
    { $match: { createdAt: { $gt: last7days } } },
    { $project: { createdAt: 1, title: '$title', code3: '$code3' } },
  ]);
}

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all Books
 * @returns Promise<BookModel[]>
 */
function findAll() {
  return BookModel.find({});
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a Book
 * @returns {Promise<BookModel>}
 */
function findById(id) {
  return BookModel.findById(id);
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new Book
 * @returns {Promise<BookModel>}
 */
function create(profile) {
  return BookModel.create(profile);
}

/**
 * Find a Book by id and update
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} Book
 * @summary update a Book's profile
 * @returns {Promise<void>}
 */
function updateById(profile) {
  return BookModel.updateOne({ _id: profile.id }, profile);
}

/**
 * @exports
 * @method searchByEmail
 * @param {string} email
 * @summary get a Book
 * @returns {Promise<BookModel>}
 */
function searchByEmail(email) {
  return BookModel.findOne({ email });
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a Book from database
 * @returns {Promise<void>}
 */
function deleteById(_id) {
  return BookModel.deleteOne({ _id });
}

module.exports = {
  findAll,
  findById,
  searchByEmail,
  create,
  updateById,
  deleteById,
  countPerCountry,
  findNewestBooks,
};
